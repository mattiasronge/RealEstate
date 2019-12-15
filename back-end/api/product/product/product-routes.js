const express = require('express');
const ProductController = require('./product-controller');

/**
* Hantering av routing för produktbord.
*/
const router = express.Router();


router.get('/product', ProductController.index);
router.get('/product/:ref_key', ProductController.show);


module.exports = router;