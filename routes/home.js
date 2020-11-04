const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');
const redirectToNewDomain = require('../policies/redirectToNewDomain');

/* GET home page. */
router.get('/', redirectToNewDomain, IndexController.index);

router.get('/login', redirectToNewDomain, IndexController.login);

router.get('/logout', redirectToNewDomain, IndexController.logout);

module.exports = router;
