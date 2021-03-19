var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(200).send('Welcome to Health Assist');
});

module.exports = router;
