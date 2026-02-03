const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");

// import the authMiddleware
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// Route to create a new order
router.post("/admin/order", [verifyToken], orderController.createOrder);

// Route to get all orders
router.get("/admin/orders", orderController.getAllOrders);

// Route to get an order by ID
router.get("/admin/order/:id", orderController.getOrderById);

// Route to get detailed order information by order ID
router.get("/admin/order_detail/:id", orderController.getOrderDetailById);

// Route to get detailed order information by order hash
router.get("/api/order/details/:order_hash", orderController.getOrderAllDetail);

// Route to update an order
router.put("/admin/order/:orderHash/edit", orderController.updateOrder);
router.get("/api/search-customers", orderController.searchOrder);

//Route to get order by CUSTOMER ID
router.get(
  "/api/corder/customer/:customerid",
  orderController.getOrderByCustomerId,
);

module.exports = router;
