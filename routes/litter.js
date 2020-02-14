const express = require('express');
const router = express.Router();
const LitterController =  require('../controllers/LitterController');
const userAuthPolicy = require('../policies/userAuthPolicy');

router.get('/new', userAuthPolicy, LitterController.new);

router.get('/search', userAuthPolicy, LitterController.search);

router.get('/:id', userAuthPolicy, LitterController.select);

router.get('/:id/edit', userAuthPolicy, LitterController.edit);

router.post('/new', userAuthPolicy, LitterController.create);

router.post('/search', userAuthPolicy, LitterController.find);

router.post('/:id', userAuthPolicy, LitterController.update);

router.delete('/:id', userAuthPolicy, LitterController.delete)

module.exports = router;