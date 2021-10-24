if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());
app.use("/", express.static("public"));

const stores = require("./api/routes/stores.js");
const prediction = require("./api/routes/prediction.js");
app.use("/api/stores", stores);
app.use("/api/prediction", prediction);

app.listen(5000, () => {
  console.log("Server running!");
});
