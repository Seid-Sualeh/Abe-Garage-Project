//import express
const express = require("express");
//import and configure dotenv
const dotenv = require("dotenv");
dotenv.config();
//import cors
const cors = require("cors");
//import database sanitizer
const sanitize = require("sanitize");
//get port from .env file
const port = process.env.PORT;
//allow CORS for the frontend URL
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
//import routes
const router = require("./routes/index");
//create web server
const app = express();
//middleware to parse JSON requests
app.use(express.json());
// enable CORS
app.use(cors(corsOptions));
//use imported routes
app.use(router);

// Middleware to sanitize input
app.use(sanitize.middleware);
//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//export app
module.exports = app;
