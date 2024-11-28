require("dotenv").config({
  path: "./.env",
});
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");

// db connection
require("./db/db").connectDatabase();

// cors
app.use(cors());

// cookie parser
app.use(cookieParser());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/users", userRoutes);

module.exports = app;
