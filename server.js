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

const stores = require("./api/api/stores.js");
const prediction = require("./api/api/prediction.js");
const util = require("./api/api/util.js");
app.use("/api/stores", stores);
app.use("/api/prediction", prediction);
app.use("/api/util", util);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running!");
});
