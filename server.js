if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const axios = require("axios");

// middleware
app.use(express.json());

const stores = require("./api/routes/stores.js");
app.use("/stores", stores);

app.listen(5000, () => { console.log("Server running!") });