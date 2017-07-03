var express = require('express');
const Dev = require("../models/devs");

var router = express.Router();

router.get("/", function(req, res){
    res.send("Hello world");
});

router.get("/foo", function(req, res){
    res.send("Foo");
});

router.get("/dev/:_id", (req, res) => {
    const _id = req.params._id;
    Dev.getDevById(_id, result => {
        res.send(result);
    });
});

router.get("/dev", (req, res) => {
    const name = req.query.name;
    Dev.getDevByName(name, (result) => {
        res.send(result);
    });
});

router.post("/dev", (req, res) => {
    const newDev = req.body;
    Dev.addDev(newDev, (result) => {
        res.send(result);
    });
});

router.put("/dev", (req, res) => {
    Dev.updateDev(req.body, result => {
        res.send(result);
    });
});

module.exports = router;