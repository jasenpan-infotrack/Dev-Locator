var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seatSchema = Schema({
    index: Number,
    top: Number,
    left: Number,
    width: Number,
    height: Number
});

var Seat = mongoose.model('Seat', seatSchema);

module.exports = { Seat };