//import express
const express = require("express");
//call the route method from express to create router
const router = express.Router();
//import the install routes
const installRouter = require("./install.routes");
//import the employee routes
const employeeRouter = require("./employee.routes");
//import the login routes
const loginRouter = require("./login.routes");
//import the customer routes
const customerRouter = require("./customer.routes");
//import the service routes
const serviceRouter = require("./service.routes");
//import the vehicle routes
const vehicleRouter = require("./vehicle.routes");
//import the order routes
const orderRouter = require("./order.routes");
//add the install router to the main router
router.use(installRouter);
//add the employee router to the main router
router.use(employeeRouter);
//add the login router to the main router
router.use(loginRouter);
//add the customer router to the main router
router.use(customerRouter);
//add the service router to the main router
router.use(serviceRouter);
//add the vehicle router to the main router
router.use(vehicleRouter);
//add the order router to the main router
router.use(orderRouter);
//export the router
module.exports = router;
