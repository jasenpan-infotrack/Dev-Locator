var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var seatSchema = Schema({
    index: number,
    top: number,
    left: number,
    width: number,
    height: number
});

var Seat = mongoose.model('Seat', seatSchema);

module.exports = { Seat };