require("dotenv").config();
const express = require("express");
const app = express();
const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

// Error Handling
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;