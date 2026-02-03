//import express
const express = require("express");
//create router
const router = express.Router();
//import controllers
const employeeController = require("../controller/employee.controller");
//import auth middleware
const authMiddleware = require("../middleware/auth.middleware");

// Route to add a new employee
router.post(
  "/admin/add-employee",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.createEmployee,
);

// Route to get all employees
router.get(
  "/admin/employees",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployees,
);

// Route to get a single employee
router.get(
  "/admin/employee/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getEmployee,
);

// Route to update an employee
router.put(
  "/admin/employee/edit/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.updateEmployee,
);

// Route to delete an employee
router.delete(
  "/admin/employee/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.deleteEmployee,
);

module.exports = router;
