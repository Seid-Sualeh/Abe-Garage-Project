// Import the express module
const express = require("express");

// Call the router method from express to create the router
const router = express.Router();

// Import the authMiddleware
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// Import the customer controller
const customerController = require("../controller/customer.controller");

// Create a route to handle the customer creation request in post
router.post(
  "/admin/add-customer",
  [verifyToken, isAdmin],
  customerController.createCustomerController,
);

// Create a route to handle the get all customers request in get
router.get(
  "/admin/customers",
  [verifyToken],
  customerController.getAllCustomersController,
);

// Create a route to handle the get single customer request in get

// router.get(
//   "/admin/customer/:id",
//   [verifyToken, isAdmin],
//   customerController.getSingleCustomerController
// );

router.get(
  "/admin/customer/:customer_id",
  [verifyToken],
  customerController.getSingleCustomerController,
);

// Create a route to handle the customer update request in put
router.put(
  "/admin/customer/edit/:id",
  [verifyToken],
  customerController.updateCustomerController,
);

// Create a route to handle the customer deletion request in delete
router.delete(
  "/admin/customer/:customer_id",
  [verifyToken, isAdmin],
  customerController.deleteCustomerController,
);

router.get("/api/total_customers", customerController.totalNCustomers);
router.get(
  "/api/searched_customer/:credential",
  customerController.searchedCustomerController,
);

// Export the router
module.exports = router;
