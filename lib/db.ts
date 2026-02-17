/**
 * Database Configuration and Utilities
 * Using Neon Serverless Postgres (optimized for Vercel)
 */

import { Pool } from 'pg';

// Create a connection pool optimized for self-hosted PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.POSTGRES_URL?.includes('sslmode=require') 
    ? { rejectUnauthorized: false }
    : false, // Disable SSL for self-hosted databases
  max: 10,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 5000,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('[DB Pool] Unexpected error:', err);
});

/**
 * Initialize database tables
 * Creates the contact_messages table if it doesn't exist
 */
export async function initDatabase() {
  let client;
  try {
    // Get a client from the pool with timeout
    client = await pool.connect();
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        service VARCHAR(255),
        company VARCHAR(255),
        preferred_date VARCHAR(50),
        preferred_time VARCHAR(50),
        message TEXT,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(50),
        user_agent TEXT
      )
    `);

    // Add new columns to existing tables (safe to run multiple times)
    const newColumns = [
      { name: 'service', type: 'VARCHAR(255)' },
      { name: 'company', type: 'VARCHAR(255)' },
      { name: 'preferred_date', type: 'VARCHAR(50)' },
      { name: 'preferred_time', type: 'VARCHAR(50)' },
    ];
    for (const col of newColumns) {
      await client.query(`
        DO $$ BEGIN
          ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS ${col.name} ${col.type};
        EXCEPTION WHEN duplicate_column THEN NULL;
        END $$;
      `);
    }

    // Make message column nullable for existing tables
    await client.query(`ALTER TABLE contact_messages ALTER COLUMN message DROP NOT NULL`);

    // Create analytics table for visitor tracking
    await client.query(`
      CREATE TABLE IF NOT EXISTS page_analytics (
        id SERIAL PRIMARY KEY,
        page_path VARCHAR(500) NOT NULL,
        referrer VARCHAR(500),
        ip_address VARCHAR(50),
        country VARCHAR(100),
        city VARCHAR(100),
        device_type VARCHAR(50),
        browser VARCHAR(100),
        os VARCHAR(100),
        screen_resolution VARCHAR(50),
        language VARCHAR(20),
        user_agent TEXT,
        session_id VARCHAR(100),
        visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes (use IF NOT EXISTS for idempotency)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_created_at ON contact_messages(created_at DESC)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_status ON contact_messages(status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_analytics_visited_at ON page_analytics(visited_at DESC)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON page_analytics(page_path)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_analytics_country ON page_analytics(country)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_analytics_device ON page_analytics(device_type)`);

    return { success: true };
  } catch (error) {
    console.error('[DB] Database initialization error:', error instanceof Error ? error.message : error);
    return { success: false, error };
  } finally {
    // Always release the client back to the pool
    if (client) {
      client.release();
    }
  }
}

/**
 * Save a contact form submission to the database
 */
export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  company?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, service, company, preferred_date, preferred_time, message, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, created_at`,
      [
        data.name,
        data.email,
        data.phone || null,
        data.service || null,
        data.company || null,
        data.preferredDate || null,
        data.preferredTime || null,
        data.message || null,
        data.ipAddress || null,
        data.userAgent || null,
      ]
    );

    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return { success: false, error };
  }
}

/**
 * Get all contact messages with optional filtering
 */
export async function getContactMessages(filters?: {
  status?: string;
  limit?: number;
  offset?: number;
  search?: string;
}) {
  try {
    // Check if table exists first
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'contact_messages'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.log('Table contact_messages does not exist yet');
      return { success: true, data: [] };
    }

    let query = 'SELECT * FROM contact_messages WHERE 1=1';
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (filters?.status) {
      query += ` AND status = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    if (filters?.search) {
      query += ` AND (name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR message ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      query += ` LIMIT $${paramIndex}`;
      params.push(filters.limit);
      paramIndex++;
    }

    if (filters?.offset) {
      query += ` OFFSET $${paramIndex}`;
      params.push(filters.offset);
    }

    const result = await pool.query(query, params);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get contact message statistics
 */
export async function getMessageStats() {
  try {
    // Check if table exists first
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'contact_messages'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.log('Table contact_messages does not exist yet');
      return {
        success: true,
        data: { total: 0, unread: 0, today: 0, week: 0 }
      };
    }

    const totalResult = await pool.query(`SELECT COUNT(*) as total FROM contact_messages`);
    const unreadResult = await pool.query(`SELECT COUNT(*) as unread FROM contact_messages WHERE status = 'unread'`);
    const todayResult = await pool.query(`
      SELECT COUNT(*) as today FROM contact_messages 
      WHERE created_at >= CURRENT_DATE
    `);
    const weekResult = await pool.query(`
      SELECT COUNT(*) as week FROM contact_messages 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    `);

    return {
      success: true,
      data: {
        total: parseInt(totalResult.rows[0].total),
        unread: parseInt(unreadResult.rows[0].unread),
        today: parseInt(todayResult.rows[0].today),
        week: parseInt(weekResult.rows[0].week),
      }
    };
  } catch (error) {
    console.error('Error fetching message stats:', error);
    return { 
      success: false, 
      error,
      data: { total: 0, unread: 0, today: 0, week: 0 }
    };
  }
}

/**
 * Update message status
 */
export async function updateMessageStatus(id: number, status: 'unread' | 'read' | 'archived') {
  try {
    await pool.query(
      `UPDATE contact_messages 
       SET status = $1
       WHERE id = $2`,
      [status, id]
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating message status:', error);
    return { success: false, error };
  }
}

/**
 * Delete a contact message
 */
export async function deleteContactMessage(id: number) {
  try {
    await pool.query(`DELETE FROM contact_messages WHERE id = $1`, [id]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return { success: false, error };
  }
}

/**
 * Get daily message counts for the last 30 days
 */
export async function getDailyMessageCounts() {
  try {
    const result = await pool.query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM contact_messages
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching daily counts:', error);
    return { success: false, error, data: [] };
  }
}

/**
 * Save page analytics
 */
export async function savePageAnalytics(data: {
  pagePath: string;
  referrer?: string;
  ipAddress?: string;
  country?: string;
  city?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  screenResolution?: string;
  language?: string;
  userAgent?: string;
  sessionId?: string;
}) {
  try {
    await pool.query(
      `INSERT INTO page_analytics 
       (page_path, referrer, ip_address, country, city, device_type, browser, os, screen_resolution, language, user_agent, session_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        data.pagePath,
        data.referrer || null,
        data.ipAddress || null,
        data.country || null,
        data.city || null,
        data.deviceType || null,
        data.browser || null,
        data.os || null,
        data.screenResolution || null,
        data.language || null,
        data.userAgent || null,
        data.sessionId || null
      ]
    );
    return { success: true };
  } catch (error) {
    console.error('Error saving page analytics:', error);
    return { success: false, error };
  }
}

/**
 * Get analytics statistics
 */
export async function getAnalyticsStats(days: number = 30) {
  try {
    // Check if table exists first
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'page_analytics'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      return {
        success: true,
        data: {
          totalVisits: 0,
          uniqueVisitors: 0,
          totalPages: 0,
          avgSessionDuration: 0,
          bounceRate: 0,
        }
      };
    }

    const dateFilter = `visited_at >= CURRENT_DATE - INTERVAL '${days} days'`;

    // Total visits
    const totalVisitsResult = await pool.query(
      `SELECT COUNT(*) as count FROM page_analytics WHERE ${dateFilter}`
    );

    // Unique visitors (by IP)
    const uniqueVisitorsResult = await pool.query(
      `SELECT COUNT(DISTINCT ip_address) as count FROM page_analytics WHERE ${dateFilter}`
    );

    // Total unique pages visited
    const totalPagesResult = await pool.query(
      `SELECT COUNT(DISTINCT page_path) as count FROM page_analytics WHERE ${dateFilter}`
    );

    return {
      success: true,
      data: {
        totalVisits: parseInt(totalVisitsResult.rows[0].count),
        uniqueVisitors: parseInt(uniqueVisitorsResult.rows[0].count),
        totalPages: parseInt(totalPagesResult.rows[0].count),
        avgSessionDuration: 0,
        bounceRate: 0,
      }
    };
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return { 
      success: false, 
      error,
      data: {
        totalVisits: 0,
        uniqueVisitors: 0,
        totalPages: 0,
        avgSessionDuration: 0,
        bounceRate: 0,
      }
    };
  }
}

/**
 * Get visitor analytics by country
 */
export async function getAnalyticsByCountry(days: number = 30) {
  try {
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'page_analytics'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      return { success: true, data: [] };
    }

    const result = await pool.query(`
      SELECT 
        COALESCE(country, 'Unknown') as country,
        COUNT(*) as visits,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM page_analytics
      WHERE visited_at >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY country
      ORDER BY visits DESC
      LIMIT 10
    `);
    
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching analytics by country:', error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get visitor analytics by device
 */
export async function getAnalyticsByDevice(days: number = 30) {
  try {
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'page_analytics'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      return { success: true, data: [] };
    }

    const result = await pool.query(`
      SELECT 
        COALESCE(device_type, 'Unknown') as device_type,
        COUNT(*) as visits,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM page_analytics
      WHERE visited_at >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY device_type
      ORDER BY visits DESC
    `);
    
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching analytics by device:', error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get visitor analytics by browser
 */
export async function getAnalyticsByBrowser(days: number = 30) {
  try {
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'page_analytics'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      return { success: true, data: [] };
    }

    const result = await pool.query(`
      SELECT 
        COALESCE(browser, 'Unknown') as browser,
        COUNT(*) as visits
      FROM page_analytics
      WHERE visited_at >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY browser
      ORDER BY visits DESC
      LIMIT 10
    `);
    
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching analytics by browser:', error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get daily visit counts
 */
export async function getDailyVisitCounts(days: number = 30) {
  try {
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'page_analytics'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      return { success: true, data: [] };
    }

    const result = await pool.query(`
      SELECT 
        DATE(visited_at) as date,
        COUNT(*) as visits,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM page_analytics
      WHERE visited_at >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY DATE(visited_at)
      ORDER BY date ASC
    `);
    
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching daily visit counts:', error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get top pages by visits
 */
export async function getTopPages(days: number = 30, limit: number = 10) {
  try {
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'page_analytics'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      return { success: true, data: [] };
    }

    const result = await pool.query(`
      SELECT 
        page_path,
        COUNT(*) as visits,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM page_analytics
      WHERE visited_at >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY page_path
      ORDER BY visits DESC
      LIMIT ${limit}
    `);
    
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching top pages:', error);
    return { success: false, error, data: [] };
  }
}
