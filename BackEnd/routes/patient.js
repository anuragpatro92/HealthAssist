var express = require('express');
const { getPatientDetails } = require('../controllers/patient/getPatientDetails');
const { addPatientInfo, updatePatientInfo} = require('../controllers/patient/PatientInfo');
var router = express.Router();

router.get('/:id', async(req, res) => {
  try {
    const resp = await getPatientDetails(req.params.id);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Patient details fetched successfully'
    });
  }catch(e) {
    res.status(500).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});

//Add Patient Info
router.post('/', async(req, res) => {
  try {
    const resp = await addPatientInfo(req.body.name,req.body.email,req.body.phone,req.body.age, req.body.sex,req.body.height,req.body.weight,req.body.chronic_conditions);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Patient Info Saved successfully'
    });
  }catch(e) {
    res.status(401).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});



//Update Patient Info
router.put('/:id', async(req, res) => {
  try {
    const resp = await updatePatientInfo(req.params.id,req.body.name,req.body.email,req.body.phone,req.body.age, req.body.sex,req.body.height,req.body.weight,req.body.chronic_conditions);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Patient Info Updated successfully'
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
