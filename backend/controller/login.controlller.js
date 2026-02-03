//import login service
const loginService = require("../services/login.service");
//import jsonwebtoken
const jwt = require("jsonwebtoken");
//import dotenv to access environment variables
const jwtSecret = process.env.JWT_SECRET;
//create logIn controller

async function logIn(req, res, next) {
  try {
    const employeeData = req.body;
    const employee = await loginService.logIn(employeeData);
    //check if login failed
    if (employee.status === "fail") {
      return res.status(401).json({
        status: "fail",
        message: employee.message,
      });
    }
    //if login successful
    // Generate JWT token
    const payload = {
      employee_role: employee.data.company_role_id,
      employee_first_name: employee.data.employee_first_name,
      employee_email: employee.data.employee_email,
    };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1w" });
    // console.log(token);
    // Send response with token
    const sendBack = {
      employee_token: token,
    };
    res.status(200).json({
      status: "success",
      message: "Employee logged in successfully",
      data: sendBack,
    });
  } catch (error) {}
}

module.exports = {
  logIn,
};
