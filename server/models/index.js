var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var devSchema = Schema({
    id: String,
    name: String
});

var Dev = mongoose.model('Dev', devSchema);

module.exports = { Dev };