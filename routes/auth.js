const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const redirectToNewDomain = require('../policies/redirectToNewDomain');

router.post('/auth', redirectToNewDomain, AuthController.auth);

module.exports = router;