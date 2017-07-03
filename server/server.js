const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const api = require('./api');

const app = express();

app.use(express.static(path.resolve(__dirname, "../build")));

mongoose.connect("mongodb://127.0.0.1:27017");

app.use(cors());

app.use("/api", api);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log("server listen to " + PORT);
});