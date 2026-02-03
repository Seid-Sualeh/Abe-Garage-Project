//import express
const express = require("express");
//call the route method from express to create router
const router = express.Router();
//import login controller
const loginControllers = require("../controller/login.controlller");
//create login route
router.post("/api/employee/login", loginControllers.logIn);
//export the router
module.exports = router;
