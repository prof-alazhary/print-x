const express = require('express');
const router = express.Router();
const verifyToken = require('../policies/verifyToken');
const LitterController =  require('../controllers/LitterController');


router.get('/new', LitterController.new);

router.get('/search', LitterController.search);

router.get('/:id', LitterController.edit);

router.post('/new', LitterController.create);

router.put('/:id', LitterController.update);

router.delete('/:id', LitterController.delete)

router.post('/search', LitterController.find);

module.exports = router;