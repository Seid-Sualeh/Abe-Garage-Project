// Load environment variables first
require("dotenv").config();

const mysql = require("mysql2/promise");

// Database configuration optimized for Vercel serverless
const dbconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Connection pool settings for serverless
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Enable keep-alive for better connection handling
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

// Create a connection pool
const pool = mysql.createPool(dbconfig);

// Function to execute SQL queries asynchronously
async function query(sql, params) {
  try {
    // Execute the query and destructure the result into rows and fields
    const [rows, fields] = await pool.execute(sql, params);

    // Return the rows
    return rows;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error; // Throw error for the caller to handle
  }
}

// Export the query function and pool
module.exports = {
  query,
  pool,
};
