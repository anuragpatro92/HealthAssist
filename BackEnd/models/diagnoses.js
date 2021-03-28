var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

var diagnosesSchema = new Schema({
  patient_id: {
    type: Schema.ObjectId, ref: 'patients'
  },
  doctor_id: {
    type: Schema.ObjectId, ref: 'doctors'
  },
  status: {
    type: String,
    enum:['In Progress','Completed'],
    default:'In Progress'
  },
  symptoms: [],
  diseases:[{
    disease_id: { type: String, required: true},
    disease_name: { type: String, required: true},
    status: { 
        type: String, 
        enum:['Suggested','Accepted', 'Rejected'],
        default: 'Suggested',
        required: true
    },
    confidence: {
      type: Number
    }
  }],
  drugs:[{
    drug_id: { type: String, required: true},
    drug_name: { type: String, required: true},
  }]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

//userSchema.plugin(timeZone, { paths: ['timestamps','views.createdOn'] });
var DiagnosesModel = mongoose.model('diagnoses', diagnosesSchema);

module.exports = DiagnosesModel;