"use strict";

const express = require("express");
const http = require("http");
require("dotenv").config(); 
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./helpers/swaggerConnection");
const { dbConnect } = require("./helpers/dbConnection");

const app = express();
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve static files (CSS, JS, images) from the public directory
app.use(express.static('public'));

// Serve uploaded files (like brand logos)
// app.use('/uploads/brand-logo', express.static('uploads/brand-logo'));

// Authentication API Routes
app.use("/api/v1/auth", require("./routes/Api/v1/auth/authRoute"));

// Admin API Routes
app.use("/api/admin", require("./routes/Api/v1/admin/adminRoutes"));

// User API Routes
app.use("/api/v1/user", require("./routes/Api/v1/user/userRoutes"));

// Connect to the database
dbConnect();

// Create an HTTP server using the express app
const server = http.createServer(app);

// Start the server and listen on the provided PORT
server.listen(process.env.PORT, () => {
    console.log(`----------------------------------------------------`);
    console.log(`Listening on ${process.env.BASE_URL}`);
    console.log(`Swagger URL :- ${process.env.BASE_URL}/api-docs`);
    console.log(`----------------------------------------------------`);
});

module.exports = app;
