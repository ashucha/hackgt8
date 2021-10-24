if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const path = require("path");

// middleware
app.use(express.json());
app.use(cors());
app.use("/", express.static("public"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/client/build/index.html"));
  });
}

const stores = require("./routes/api/stores.js");
const prediction = require("./routes/api/prediction.js");
const util = require("./routes/api/util.js");
app.use("/api/stores", stores);
app.use("/api/prediction", prediction);
app.use("/api/util", util);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running!");
});
