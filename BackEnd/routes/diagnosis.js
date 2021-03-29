var express = require('express');
//const { getPatientDiagnosis } = require('../controllers/diagnosis/getPatientDiagnosis');
const { addDiagnosis, updateDiagnosis} = require('../controllers/diagnosis/Diagnosis');
var router = express.Router();

/*router.get('/:patient_id', async(req, res) => {
  try {
    const resp = await getPatientDiagnosis(req.params.patient_id);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Diagnosis details fetched successfully'
    });
  }catch(e) {
    res.status(500).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});*/

//Add Diagnosis Info
router.post('/', async(req, res) => {
  try {
    const resp = await addDiagnosis(req.body.patient_id,req.body.doctor_id,req.body.status,req.body.symptoms, req.body.diseases,req.body.drugs);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Diagnosis Saved successfully'
    });
  }catch(e) {
    res.status(401).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});



//Update Diagnosis Info
router.put('/:id', async(req, res) => {
  try {
    const resp = await updateDiagnosis(req.params.id,req.body.patient_id,req.body.doctor_id,req.body.status,req.body.symptoms, req.body.diseases,req.body.drugs);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Diagnosis Updated successfully'
    });
  }catch(e) {
    res.status(401).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});



module.exports = router;
