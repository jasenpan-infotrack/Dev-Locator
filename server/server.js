const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const config = require("../configs.json");

const api = require('./api');

const app = express();

app.use(express.static(path.resolve(__dirname, "../build")));

app.use(bodyParser.json());

mongoose.connect(config.DB_URL);

app.use(cors());

app.use("/api", api);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("server listen to " + PORT);
});