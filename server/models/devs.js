var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var devSchema = Schema({
    name: String,
    team: [],
    specialty: [],
    x: Number,
    y: Number
});

var Dev = mongoose.model('Dev', devSchema);

Dev.addDev = function (dev, callback) {
    const newDev = new Dev(dev);
    newDev.save(callback);
};

Dev.getDevById = function (_id, callback) {
    Dev.findById(_id)
        .then(result => callback(result));
}

Dev.getDevByName = function (name, callback) {
    Dev.find({ "name": name })
        .then(result => callback(result));
};

Dev.updateDev = function (dev, callback) {
    Dev.findByIdAndUpdate(dev._id, dev, function(err, numberAffected, rawResponse) {
        if(err) throw err;
        return callback({rawResponse, numberAffected});
    });
};

module.exports = Dev;