var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var devSchema = Schema({
    name: String,
    specialty: [{ name: String, rating: Number }],
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
    Dev.find({ "name": { "$regex": name, "$options": "i" }}, function(error, result) {
      if(error) throw error;
      callback(result);
    });
};

Dev.updateSpecialtyByName = function (name, specialty, callback)
{
    Dev.findOne({ "name": name }, function(error, result) {
      if(error) throw error;

      if(result['specialty'].find(spe => specialty.name))
      {
        result['specialty'].find(spe => specialty.name).rating = specialty.rating;
      }
      else
      {
        result.specialty.push(specialty);
      }
      result.save( (result)=> callback(result));
    });
};

Dev.updateDev = function (dev, callback) {
    Dev.findByIdAndUpdate(dev._id, dev, function(err, numberAffected, rawResponse) {
        if(err) throw err;
        return callback({rawResponse, numberAffected});
    });
};

Dev.getDevBySpecialty = function (specialtyName, callback) {
    Dev.aggregate([ 
        { $match : {'specialty.name': specialtyName} }
    ]).exec(function(error, devs){
        if(error) throw error;
        return callback(devs.sort((devA, devB) => {
            return devA['specialty'].find(spe => spe.name === specialtyName)['rating'] < devB['specialty'].find(spe => spe.name === specialtyName)['rating'];
        }));
    });
};

module.exports = Dev;
