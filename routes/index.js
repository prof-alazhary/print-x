const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  //res.render('index', { title: appConfig.appName });
  res.redirect('/api/litter/new');
});

module.exports = router;
