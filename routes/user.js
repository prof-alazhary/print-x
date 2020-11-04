const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const userAuthPolicy = require('../policies/userAuthPolicy');
const redirectToNewDomain = require('../policies/redirectToNewDomain');


router.get('/edit', redirectToNewDomain, userAuthPolicy, UserController.edit);

router.post('/update', redirectToNewDomain, userAuthPolicy, UserController.update);

module.exports = router;