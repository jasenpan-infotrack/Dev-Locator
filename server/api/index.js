var express = require('express');
const Dev = require("../models/devs");

var router = express.Router();

router.get("/", function(req, res){
    res.send("Hello world");
});

router.get("/foo", function(req, res){
    res.send("Foo");
});

router.post("/dev/specialty", function(req, res){
    const name = req.body.name;
    const specialty = req.body.specialty;
    Dev.updateSpecialtyByName(name, specialty, (result) => {
        res.send(result);
    });
});

router.get("/dev/:_id", (req, res) => {
    const _id = req.params._id;
    Dev.getDevById(_id, result => {
        res.send(result);
    });
});

router.get("/dev", (req, res) => {
    const name = req.query.name;
    const specialty = req.query.specialty;
    if (!name) {
      return Dev.getDevBySpecialty(specialty, result => { res.send(result) });
    }

    Dev.getDevByName(name, (result) => {
        res.send(result);
    });
});

router.post("/dev", (req, res) => {
    const newDev = req.body;
    Dev.addOrUpdateDev(newDev, (result) => {
        res.send(result);
    });
});

router.put("/dev", (req, res) => {
    Dev.updateDev(req.body, result => {
        res.send(result);
    });
});

module.exports = router;
