const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');

/* GET home page. */
router.get('/', IndexController.index);

router.get('/login', IndexController.login);

router.get('/logout', IndexController.logout);

module.exports = router;
