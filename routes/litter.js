const express = require('express');
const router = express.Router();
const verifyToken = require('../policies/verifyToken');
const LitterController =  require('../controllers/LitterController');


router.get('/new', LitterController.new);

router.get('/search', LitterController.search);

router.get('/:id', LitterController.select);

router.get('/:id/edit', LitterController.edit);

router.post('/new', LitterController.create);

router.post('/search', LitterController.find);

router.post('/:id', LitterController.update);

router.delete('/:id', LitterController.delete)

module.exports = router;