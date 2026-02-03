const crypto = require("crypto");
const bcrypt = require("bcrypt");
const connection = require("../config/db.config");

// Check if customer exists
async function checkIfCustomerExists(email) {
  try {
    const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
    const [rows] = await connection.query(query, [email]);

    return rows;
  } catch (error) {
    console.error("Error checking customer existence:", error);
    throw new Error(
      "Could not check customer existence. Please try again later.",
    );
  }
}

// Create a new customer
async function createCustomer(customer) {
  let createdCustomer = {};

  try {
    const hash_id = crypto.randomUUID();

    const queryCustomer = `
      INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash)
      VALUES (?, ?, ?)
    `;

    const result = await connection.query(queryCustomer, [
      customer.customer_email,
      customer.customer_phone_number,
      hash_id,
    ]);

    if (result.affectedRows !== 1) {
      return false;
    }

    const customer_id = result.insertId;

    const queryCustomerInfo = `
      INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status)
      VALUES (?, ?, ?, ?)
    `;

    const result2 = await connection.query(queryCustomerInfo, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
    ]);

    if (result2.affectedRows !== 1) {
      return false;
    }

    createdCustomer = {
      customer_id,
      customer_email: customer.customer_email,
      customer_first_name: customer.customer_first_name,
      customer_last_name: customer.customer_last_name,
    };
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Could not create customer. Please try again later.");
  }

  return createdCustomer;
}

// Get customer by email
async function getCustomerByEmail(customer_email) {
  try {
    const query = `
      SELECT *
      FROM customer_identifier
      INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
      WHERE customer_identifier.customer_email = ?
    `;

    const [rows] = await connection.query(query, [customer_email]);

    return rows;
  } catch (error) {
    console.error("Error getting customer by email:", error);
    throw new Error("Could not get customer by email. Please try again later.");
  }
}

// Get single customer by ID
async function getSingleCustomer(customer_id) {
  try {
    const query = `
      SELECT *
      FROM customer_identifier
      INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
      WHERE customer_identifier.customer_id = ?
    `;

    const [rows] = await connection.query(query, [customer_id]);

    return rows;
  } catch (error) {
    console.error("Error getting single customer:", error);
    throw new Error("Could not get customer. Please try again later.");
  }
}

// Get all customers
async function getAllCustomers(offset) {
  try {
    const query = `
      SELECT *
      FROM customer_identifier
      INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
      ORDER BY customer_info.customer_id DESC, customer_info.customer_first_name ASC
    `;

    const rows = await connection.query(query);
    // console.log(await connection.query(query))
    return rows;
  } catch (error) {
    console.error("Error getting all customers:", error);
    throw new Error("Could not get customers. Please try again later.");
  }
}

// Update customer by ID
async function updateCustomer(customer) {
  try {
    const customer_id = customer.customer_id;

    // Replace undefined values with null
    const customer_email = customer.customer_email || null;
    const customer_phone_number = customer.customer_phone_number || null;
    const customer_first_name = customer.customer_first_name || null;
    const customer_last_name = customer.customer_last_name || null;
    const active_customer_status = customer.active_customer_status || null;
    console.log(`active_customer_status`, active_customer_status);

    const query1 = `
      UPDATE customer_identifier
      SET customer_email = ?, customer_phone_number = ?
      WHERE customer_id = ?
    `;

    const query2 = `
      UPDATE customer_info
      SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ?
      WHERE customer_id = ?
    `;

    const result1 = await connection.query(query1, [
      customer_email,
      customer_phone_number,
      customer_id,
    ]);

    const result2 = await connection.query(query2, [
      customer_first_name,
      customer_last_name,
      active_customer_status,
      customer_id,
    ]);

    return { result1, result2 };
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Could not update customer. Please try again later.");
  }
}

// Delete customer by ID
async function deleteCustomer(customer_id) {
  try {
    if (!customer_id) {
      throw new Error("Customer ID is undefined");
    }

    const query1 = "DELETE FROM customer_info WHERE customer_id = ?";
    const query2 = "DELETE FROM customer_identifier WHERE customer_id = ?";

    const result1 = await connection.query(query1, [customer_id]);
    const result2 = await connection.query(query2, [customer_id]);

    return { result1, result2 };
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw new Error("Could not delete customer. Please try again later.");
  }
}

async function totalNumberOfCustomers() {
  try {
    const [result] = await connection.query(
      "SELECT COUNT(customer_id) AS num FROM customer_identifier",
    );
    //  console.log(result)

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get customers. Please try again later.");
  }
}

async function searchedCustomers(searchWord) {
  try {
    const query = `
      SELECT *
      FROM customer_identifier
      INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
      WHERE customer_identifier.customer_email LIKE ? OR customer_identifier.customer_phone_number LIKE ? OR customer_info.customer_first_name LIKE ? OR customer_info.customer_last_name LIKE ?
    `;

    const rows = await connection.query(query, [
      `%${searchWord}%`,
      `%${searchWord}%`,
      `%${searchWord}%`,
      `%${searchWord}%`,
    ]);
    console.log(rows);
    // console.log(await connection.query(query, [`%${searchWord}%`,`%${searchWord}%`,`%${searchWord}%`,`%${searchWord}%`]))

    return rows;
  } catch (error) {
    console.error("Error getting customer by email:", error);
    throw new Error("Could not get customer by email. Please try again later.");
  }
}

module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getCustomerByEmail,
  getSingleCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  totalNumberOfCustomers,
  searchedCustomers,
};
