var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var devSchema = Schema({
    name: String,
    team: [],
    specialty: [],
    seat: {
        index: number,
        top: number,
        left: number,
        width: number,
        height: number
    }
});

var Dev = mongoose.model('Dev', devSchema);

module.exports = { Dev };