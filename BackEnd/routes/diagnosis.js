var express = require('express');
var axios = require('axios');
//const { getPatientDiagnosis } = require('../controllers/diagnosis/getPatientDiagnosis');
const { addDiagnosis, updateDiagnosis} = require('../controllers/diagnosis/Diagnosis');
const { getDiagnosisList } = require('../controllers/diagnosis/getDiagnosisList');
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


//get diagnosis list 
router.get('/', async(req, res) => {
  try {
    const resp = await getDiagnosisList(req.query.doctor_id);
    res.status(200).send({
      status: 'success',
      content: resp,
      msg: 'Diagnosis List fetched successfully'
    });
  }catch(e) {
    res.status(200).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});

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
    res.status(200).send({
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
    res.status(200).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});

router.post('/drugReccomendation', async(req, res) => {
  try {
    const resp = await axios.post(`http://54.173.122.188:5000/api/drugReccomendation`, {
      symptoms: req.body.symptoms,
      disease: req.body.disease
    });
    if(resp.status === 200) {
      const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      let good_drugs = resp.data.good_drugs.slice(0, randomIntFromInterval(50,150))
      let bad_drugs = resp.data.bad_drugs.slice(0 ,  randomIntFromInterval(50,150))
      res.status(200).send({
        status: 'success',
        content: {
          good_drugs,
          bad_drugs
        },
        msg: 'Fetched drug recommendations'
      });
    } 
  }catch(e) {
    res.status(200).send({
      status: 'failure',
      content: e,
      msg: e.message
    });
  }
});



module.exports = router;
