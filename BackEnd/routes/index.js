var express = require('express');
const { getDiseases } = require('../controllers/constants/getDiseases');
const { getSymptoms } = require('../controllers/constants/getSymptoms');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(200).send('Welcome to Health Assist');
});

router.get('/symptoms', async(req, res) => {
  try {
    const resp = await getSymptoms();
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Symptom list fetched successfully'
    });
  }catch(e) {
    res.status(404).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});


router.get('/diseases', async(req, res) => {
  try {
    const resp = await getDiseases();
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Disease list fetched successfully'
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
