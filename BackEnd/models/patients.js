var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

var patientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  chronic_conditions: []
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

//userSchema.plugin(timeZone, { paths: ['timestamps','views.createdOn'] });
var PatientModel = mongoose.model('patients', patientSchema);

module.exports = PatientModel;