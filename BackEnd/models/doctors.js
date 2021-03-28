var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

var doctorSchema = new Schema({
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
  password: {
    type: String,
    required: true
  },
  cert_id: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  patients: [{ type : Schema.Types.ObjectId , ref: 'patients' }]
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

//userSchema.plugin(timeZone, { paths: ['timestamps','views.createdOn'] });
var DoctorModel = mongoose.model('doctors', doctorSchema);

module.exports = DoctorModel;