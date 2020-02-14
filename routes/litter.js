const express = require('express');
const router = express.Router();
const LitterController =  require('../controllers/LitterController');
const userAuthPolicy = require('../policies/userAuthPolicy');

router.get('/new', userAuthPolicy, LitterController.new);

router.get('/search', userAuthPolicy, LitterController.search);

router.get('/:id', LitterController.select);

router.get('/:id/edit', LitterController.edit);

router.post('/new', LitterController.create);

router.post('/search', LitterController.find);

router.post('/:id', LitterController.update);

router.delete('/:id', LitterController.delete)

module.exports = router;