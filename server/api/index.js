var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
    console.log('req')
    res.send("Hello world");
});

router.get("/foo", function(req, res){
    res.send("Foo");
});

module.exports = router;