const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/api/litter/new');
});

router.get('/login', IndexController.login);

module.exports = router;
