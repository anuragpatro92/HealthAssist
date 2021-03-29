var express = require('express');
var { authenticateDoctor } = require('../controllers/doctor/authenticate');
const { getAllPatients } = require('../controllers/doctor/getAllPatients');
const { addDoctorInfo, updateDoctorInfo} = require('../controllers/doctor/doctorInfo');
var router = express.Router();

router.post('/auth', async(req, res) => {
  try {
    const resp = await authenticateDoctor(req.body.email , req.body.password);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Auth successful'
    });
  }catch(e) {
    res.status(401).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});

router.get('/patientList', async(req, res) => {
  try {
    const resp = await getAllPatients(req.query.doctor_id);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Patient list fetched successfully'
    });
  }catch(e) {
    res.status(404).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});

//Add Doctor Info
router.post('/', async(req, res) => {
  try {
    const resp = await addDoctorInfo(req.body.name,req.body.email,req.body.phone,req.body.password, req.body.cert_id,req.body.address);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Doctor Info Saved successfully'
    });
  }catch(e) {
    res.status(401).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});



//Update Doctor Info
router.put('/:id', async(req, res) => {
  try {
    const resp = await updateDoctorInfo(req.params.id,req.body.name,req.body.email,req.body.phone,req.body.password, req.body.cert_id,req.body.address);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Doctor Info Updated successfully'
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
