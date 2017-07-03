var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var devSchema = Schema({
    name: String,
    team: [],
    specialty: [],
    x: Number,
    y: Number
});

var Dev = mongoose.model('Dev', devSchema);

Dev.addOrUpdateDev = function (dev, callback) {
    Dev.findOne({ name: dev.name }, function(error, devInDb){
      if(error) throw error;

      if(!devInDb) {
          const newDev = new Dev(dev);
          
          newDev.save(function(error) {
            if (error) throw error;
            return callback({ description: "created" });
          });
      } else {
          Dev.findByIdAndUpdate(devInDb._id, dev, function(err) {
              if(err) throw err;
              return callback({ description: "updated"})
          });
      }
    });
};

Dev.getDevById = function (_id, callback) {
    Dev.findById(_id)
        .then(result => callback(result));
}

Dev.getDevByName = function (name, callback) {
    Dev.find({ "name": name }, function(error, result) {
      if(error) throw error;
      callback(result);
    });
};

Dev.updateDev = function (dev, callback) {
    Dev.findByIdAndUpdate(dev._id, dev, function(err, numberAffected, rawResponse) {
        if(err) throw err;
        return callback({rawResponse, numberAffected});
    });
};

Dev.getDevBySpecialty = function (specialty, callback) {
  Dev.find({'specialty': specialty}).exec(function(error, devs){
    if(error) throw error;
    return callback(devs);
  });
};

module.exports = Dev;
