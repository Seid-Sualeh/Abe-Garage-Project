//import express
const express = require("express");
//call the route method from express to create router
const router = express.Router();
//import the install routes
const installRouter = require("./install.routes");
//add the install router to the main router
router.use(installRouter);
//export the router
module.exports = router;
