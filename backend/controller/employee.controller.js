//import employee service
const employeeService = require("../services/employee.service");
//create the add employee controller
async function createEmployee(req, res, next) {
  // console.log(req.headers);
  console.log(req.body);

  // Check if employee email is provided in the request body
  if (!req.body || !req.body.employee_email) {
    return res.status(400).json({
      error: "Employee email is required!",
    });
  }

  // Check if employee email already exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email,
  );
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!",
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      console.log("Employee creation result:", employee);
      if (!employee || !employee.employee_id) {
        console.log("Employee creation failed:", employee);
        res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

async function getAllEmployees(req, res, next) {
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to fetch all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}

async function getEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;
    const employee = await employeeService.getEmployee(employeeId);
    if (!employee) {
      res.status(404).json({
        error: "Employee not found!",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: employee,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function updateEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;
    const employeeData = req.body;
    const employee = await employeeService.updateEmployee(
      employeeId,
      employeeData,
    );
    if (!employee || !employee.employee_id) {
      res.status(400).json({
        error: "Failed to update the employee!",
      });
    } else {
      res.status(200).json({
        status: "true",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function deleteEmployee(req, res, next) {
  try {
    const employeeId = req.params.id;
    const employee = await employeeService.deleteEmployee(employeeId);
    if (!employee || !employee.employee_id) {
      res.status(400).json({
        error: "Failed to delete the employee!",
      });
    } else {
      res.status(200).json({
        status: "true",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
