//import express
const express = require("express");
//import and configure dotenv
const dotenv = require("dotenv");
dotenv.config();
//import cors
const cors = require("cors");
//import database sanitizer
const sanitize = require("sanitize");

//get port from .env file (default to 5000 for local, Vercel will set port)
const port = process.env.PORT || 5000;

//allow CORS for the frontend URL (support both local and Vercel deployments)
let frontendUrl = "http://localhost:5173";
if (process.env.FRONTEND_URL) {
  frontendUrl = process.env.FRONTEND_URL;
} else if (process.env.VERCEL_URL) {
  frontendUrl = `https://${process.env.VERCEL_URL}`;
}

const corsOptions = {
  origin: ["http://localhost:5173", frontendUrl, process.env.APP_URL].filter(
    Boolean,
  ),
  optionsSuccessStatus: 200,
  credentials: true,
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

// Only start server if not in Vercel environment (VERCEL=1 indicates Vercel runtime)
if (!process.env.VERCEL) {
  //start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

//export app for Vercel serverless functions
module.exports = app;
