var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var constantsSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  symptoms: [],
  diseases: []
});

var ConstantsModel = mongoose.model('constants', constantsSchema);

module.exports = ConstantsModel;