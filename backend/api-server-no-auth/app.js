require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const jobRouter = require("./routes/jobRouter");
const {
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();

// Simple check that the server is alive (handy on Render)
app.get("/", (req, res) => res.send("API Running!"));

// Routes
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
