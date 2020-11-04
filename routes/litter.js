const express = require('express');
const router = express.Router();
const LitterController = require('../controllers/LitterController');
const userAuthPolicy = require('../policies/userAuthPolicy');
const redirectToNewDomain = require('../policies/redirectToNewDomain');


router.get('/new', redirectToNewDomain, userAuthPolicy, LitterController.new);

router.get('/search', redirectToNewDomain, userAuthPolicy, LitterController.search);

router.get('/:id', redirectToNewDomain, userAuthPolicy, LitterController.select);

router.get('/:id/edit', redirectToNewDomain, userAuthPolicy, LitterController.edit);

router.post('/new', redirectToNewDomain, userAuthPolicy, LitterController.create);

router.post('/search', redirectToNewDomain, userAuthPolicy, LitterController.find);

router.post('/:id', redirectToNewDomain, userAuthPolicy, LitterController.update);

router.delete('/:id', redirectToNewDomain, userAuthPolicy, LitterController.delete)

module.exports = router;