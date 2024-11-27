require("dotenv").config({
  path: "./.env",
});
const express = require("express");
const app = express();
const cors = require("cors");

// db connection
require("./db/db").connectDatabase();

// cors
app.use(cors());

module.exports = app;
