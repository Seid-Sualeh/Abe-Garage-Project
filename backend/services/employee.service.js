// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    // Insert the email in to the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    // Execute the query
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);
    // Check if the insert was successful
    if (!rows || rows.affectedRows !== 1) {
      console.log("Insert failed or no rows affected");
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return createdEmployee;
}
// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}
// A function to get employee by id
async function getEmployee(employeeId) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee.employee_id = ?";
  const rows = await conn.query(query, [employeeId]);
  return rows[0];
}
// A function to get all employees
async function getAllEmployees() {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee_first_name ASC limit 10";
  const rows = await conn.query(query);
  return rows;
}
// A function to update an employee
async function updateEmployee(employeeId, employee) {
  let updatedEmployee = {};
  try {
    // Handle email update
    if (employee.employee_email) {
      const currentQuery =
        "SELECT employee_email FROM employee WHERE employee_id = ?";
      const current = await conn.query(currentQuery, [employeeId]);
      if (current[0] && current[0].employee_email !== employee.employee_email) {
        const exists = await checkIfEmployeeExists(employee.employee_email);
        if (exists) {
          console.log("Email already exists");
          return false;
        }
        // Update email
        const queryEmail =
          "UPDATE employee SET employee_email = ? WHERE employee_id = ?";
        await conn.query(queryEmail, [employee.employee_email, employeeId]);
      }
    }
    // Handle password update
    if (
      employee.employee_password &&
      employee.employee_password.trim() !== ""
    ) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        employee.employee_password,
        salt,
      );
      const queryPass =
        "UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?";
      await conn.query(queryPass, [hashedPassword, employeeId]);
    }
    // Update the employee_info table
    const query =
      "UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_id = ?";
    const rows = await conn.query(query, [
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
      employeeId,
    ]);
    // Check if the update was successful
    if (!rows || rows.affectedRows !== 1) {
      console.log("Update failed or no rows affected");
      return false;
    }
    // Update the employee_role table
    const query2 =
      "UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?";
    const rows2 = await conn.query(query2, [
      employee.company_role_id,
      employeeId,
    ]);
    // Update the employee table if active_employee is provided
    if (employee.active_employee !== undefined) {
      const query3 =
        "UPDATE employee SET active_employee = ? WHERE employee_id = ?";
      const rows3 = await conn.query(query3, [
        employee.active_employee,
        employeeId,
      ]);
    }
    // Construct the employee object to return
    updatedEmployee = {
      employee_id: employeeId,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return updatedEmployee;
}

// A function to delete an employee
async function deleteEmployee(employeeId) {
  let deletedEmployee = {};
  try {
    // Delete from the employee_pass table
    const query = "DELETE FROM employee_pass WHERE employee_id = ?";
    const rows = await conn.query(query, [employeeId]);
    // Delete from the employee_role table
    const query2 = "DELETE FROM employee_role WHERE employee_id = ?";
    const rows2 = await conn.query(query2, [employeeId]);
    // Delete from the employee_info table
    const query3 = "DELETE FROM employee_info WHERE employee_id = ?";
    const rows3 = await conn.query(query3, [employeeId]);
    // Delete from the employee table
    const query4 = "DELETE FROM employee WHERE employee_id = ?";
    const rows4 = await conn.query(query4, [employeeId]);
    // Construct the employee object to return
    deletedEmployee = {
      employee_id: employeeId,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return deletedEmployee;
}

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
