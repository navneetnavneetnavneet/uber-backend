require("dotenv").config({
  path: "./.env",
});
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");

// db connection
require("./db/db").connectDatabase();

// cors
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/users", userRoutes);

module.exports = app;
