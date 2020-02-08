const express = require('express');
const router = express.Router();
const verifyToken = require('../policies/verifyToken');
const AuthController =  require('../controllers/AuthController');

router.get('/login', AuthController.login);

module.exports = router;