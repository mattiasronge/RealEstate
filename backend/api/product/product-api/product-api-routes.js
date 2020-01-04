const express = require('express');
const ProductApiController = require('./product-api-controller');
/**
 * Hanterar routing för third-party api
																								   
 */
const router = express.Router();


router.get('/productapi', ProductApiController.index);
router.get('/productapi/refkey', ProductApiController.getAllRefKeys);
router.get('/productapi/:id', ProductApiController.show);
router.get('/productapiFromRef/:id', ProductApiController.showRefkey);
router.post('/productapi', ProductApiController.create);
router.post('/productapi/getdata', ProductApiController.getData);
router.put('/productapi/:id', ProductApiController.update);
router.delete('/productapi/:id', ProductApiController.remove);


module.exports = router;