// Vercel serverless handler for the API
const app = require("../app");

// Vercel expects a handler function for serverless deployment
// Export the Express app directly - Vercel will handle it
module.exports = app;
