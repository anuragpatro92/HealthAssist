var express = require('express');
var { authenticateDoctor } = require('../controllers/doctor/authenticate');
const { getAllPatients } = require('../controllers/doctor/getAllPatients');
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

module.exports = router;
