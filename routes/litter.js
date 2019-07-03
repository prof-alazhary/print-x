const express = require('express');
const router = express.Router();
const verifyToken = require('../policies/verifyToken');
const LitterController =  require('../controllers/LitterController');


router.get('/:id', LitterController.select);

router.post('/new', LitterController.add);

router.put('/:id', LitterController.update);

router.delete('/:id', LitterController.delete)

router.post('/search', LitterController.search);

module.exports = router;