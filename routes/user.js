const express = require('express');
const router = express.Router();
const verifyToken = require('../policies/verifyToken');
const UserController =  require('../controllers/UserController');

router.get('/someRoute', ()=>{});

module.exports = router;