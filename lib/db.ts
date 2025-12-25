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

    // Create index on created_at for faster queries
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_created_at ON contact_messages(created_at DESC)
    `);

    // Create index on status for filtering
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_status ON contact_messages(status)
    `);

    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
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
