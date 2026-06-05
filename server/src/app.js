const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const routes = require("./routes");

// Load env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://personal-finance-tracker-9qvi.vercel.app"
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));

// Test Route
app.get("/", (req, res) => {
  res.send("Finance Tracker API Running");
});

// API Routes
app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});