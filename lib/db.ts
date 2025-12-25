/**
 * Database Configuration and Utilities
 * Using Vercel Postgres to store contact form submissions
 */

import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Initialize database tables
 * Creates the contact_messages table if it doesn't exist
 */
export async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(50),
        user_agent TEXT
      )
    `);

    // Create analytics table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        page_path VARCHAR(500) NOT NULL,
        page_title VARCHAR(500),
        referrer TEXT,
        ip_address VARCHAR(50),
        user_agent TEXT,
        country VARCHAR(100),
        city VARCHAR(100),
        device_type VARCHAR(50),
        browser VARCHAR(100),
        os VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create unique visitors table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS unique_visitors (
        id SERIAL PRIMARY KEY,
        visitor_id VARCHAR(255) UNIQUE NOT NULL,
        first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        visit_count INTEGER DEFAULT 1,
        ip_address VARCHAR(50),
        country VARCHAR(100),
        city VARCHAR(100)
      )
    `);

    // Create index on created_at for faster queries
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_created_at ON contact_messages(created_at DESC)
    `);

    // Create index on status for filtering
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_status ON contact_messages(status)
    `);

    // Create indexes for analytics
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC)
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_unique_visitors_id ON unique_visitors(visitor_id)
    `);

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Database initialization error:', error);
    }
    return { success: false, error };
  }
}

/**
 * Save a contact form submission to the database
 */
export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, message, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [data.name, data.email, data.phone || null, data.message, data.ipAddress || null, data.userAgent || null]
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
 * Track page view
 */
export async function trackPageView(data: {
  pagePath: string;
  pageTitle?: string;
  referrer?: string;
  ipAddress?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
}) {
  try {
    await pool.query(
      `INSERT INTO page_views (page_path, page_title, referrer, ip_address, user_agent, country, city, device_type, browser, os)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        data.pagePath,
        data.pageTitle || null,
        data.referrer || null,
        data.ipAddress || null,
        data.userAgent || null,
        data.country || null,
        data.city || null,
        data.deviceType || null,
        data.browser || null,
        data.os || null,
      ]
    );
    return { success: true };
  } catch (error) {
    console.error('Error tracking page view:', error);
    return { success: false, error };
  }
}

/**
 * Track or update unique visitor
 */
export async function trackVisitor(data: {
  visitorId: string;
  ipAddress?: string;
  country?: string;
  city?: string;
}) {
  try {
    const result = await pool.query(
      `INSERT INTO unique_visitors (visitor_id, ip_address, country, city, visit_count, last_visit)
       VALUES ($1, $2, $3, $4, 1, NOW())
       ON CONFLICT (visitor_id) 
       DO UPDATE SET 
         visit_count = unique_visitors.visit_count + 1,
         last_visit = NOW(),
         ip_address = COALESCE($2, unique_visitors.ip_address),
         country = COALESCE($3, unique_visitors.country),
         city = COALESCE($4, unique_visitors.city)
       RETURNING visit_count`,
      [data.visitorId, data.ipAddress || null, data.country || null, data.city || null]
    );
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return { success: false, error };
  }
}

/**
 * Get analytics statistics
 */
export async function getAnalyticsStats() {
  try {
    // Total page views
    const totalViews = await pool.query(`SELECT COUNT(*) as total FROM page_views`);
    
    // Today's views
    const todayViews = await pool.query(`
      SELECT COUNT(*) as today FROM page_views 
      WHERE created_at >= CURRENT_DATE
    `);
    
    // This week's views
    const weekViews = await pool.query(`
      SELECT COUNT(*) as week FROM page_views 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    `);
    
    // Unique visitors
    const uniqueVisitors = await pool.query(`SELECT COUNT(*) as total FROM unique_visitors`);
    
    // Today's unique visitors
    const todayVisitors = await pool.query(`
      SELECT COUNT(*) as today FROM unique_visitors 
      WHERE last_visit >= CURRENT_DATE
    `);

    return {
      success: true,
      data: {
        totalViews: parseInt(totalViews.rows[0].total),
        todayViews: parseInt(todayViews.rows[0].today),
        weekViews: parseInt(weekViews.rows[0].week),
        uniqueVisitors: parseInt(uniqueVisitors.rows[0].total),
        todayVisitors: parseInt(todayVisitors.rows[0].today),
      }
    };
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return {
      success: false,
      error,
      data: {
        totalViews: 0,
        todayViews: 0,
        weekViews: 0,
        uniqueVisitors: 0,
        todayVisitors: 0,
      }
    };
  }
}

/**
 * Get top pages by views
 */
export async function getTopPages(limit: number = 10) {
  try {
    const result = await pool.query(
      `SELECT 
        page_path,
        page_title,
        COUNT(*) as views,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM page_views
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY page_path, page_title
      ORDER BY views DESC
      LIMIT $1`,
      [limit]
    );
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching top pages:', error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get visitor locations
 */
export async function getVisitorLocations(limit: number = 10) {
  try {
    const result = await pool.query(
      `SELECT 
        country,
        city,
        COUNT(*) as visitors
      FROM unique_visitors
      WHERE country IS NOT NULL
      GROUP BY country, city
      ORDER BY visitors DESC
      LIMIT $1`,
      [limit]
    );
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching visitor locations:', error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get device statistics
 */
export async function getDeviceStats() {
  try {
    const deviceTypes = await pool.query(`
      SELECT 
        device_type,
        COUNT(*) as count
      FROM page_views
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
        AND device_type IS NOT NULL
      GROUP BY device_type
      ORDER BY count DESC
    `);

    const browsers = await pool.query(`
      SELECT 
        browser,
        COUNT(*) as count
      FROM page_views
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
        AND browser IS NOT NULL
      GROUP BY browser
      ORDER BY count DESC
      LIMIT 5
    `);

    return {
      success: true,
      data: {
        deviceTypes: deviceTypes.rows,
        browsers: browsers.rows,
      }
    };
  } catch (error) {
    console.error('Error fetching device stats:', error);
    return {
      success: false,
      error,
      data: { deviceTypes: [], browsers: [] }
    };
  }
}

/**
 * Get daily page views for the last 30 days
 */
export async function getDailyPageViews() {
  try {
    const result = await pool.query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as views,
        COUNT(DISTINCT ip_address) as unique_visitors
      FROM page_views
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error('Error fetching daily page views:', error);
    return { success: false, error, data: [] };
  }
}
