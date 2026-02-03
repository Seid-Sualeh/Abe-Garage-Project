//import express
const express = require("express");
//import router
const router = express.Router();
//import install controller
const installController = require("../controller/install.controller");
//define install route
router.get("/install", installController.install);
//export router
module.exports = router;
