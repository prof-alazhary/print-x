const express = require('express');
const router = express.Router();
const UserController =  require('../controllers/UserController');
const userAuthPolicy = require('../policies/userAuthPolicy');

router.get('/edit', userAuthPolicy, UserController.edit);

router.post('/update', userAuthPolicy, UserController.update);

module.exports = router;