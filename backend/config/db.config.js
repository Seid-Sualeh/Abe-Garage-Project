const mysql = require("mysql2/promise");

const dbconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
//create a connection pool
const pool = mysql.createPool(dbconfig);
//prepare a function that will execute the SQL queeries asynchronosly
async function query(sql, params) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    throw error;
  }
}

// Function to test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database successfully.");
    connection.release();
  } catch (err) {
    console.error("Unable to connect to the database:", err.message);
    process.exit(1); // Exit the process with a failure code
  }
}

// Function to execute SQL queries asynchronously
async function query(sql, params) {
  try {
    // Execute the query and destructure the result into rows and fields
    const [rows, fields] = await pool.execute(sql, params);

    // Log the query results for debugging
    console.log("Query result:", rows);

    // Return an object containing both rows and fields
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Throw error for the caller to handle
  }
}

// Test the connection
testConnection();

// Export the query function
module.exports = {
  query,
};
