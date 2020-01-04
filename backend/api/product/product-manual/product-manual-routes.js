const express = require('express');
const ProductManualController = require('./product-manual-controller');

/**
 * Hanterar routing för product manual table
																								   
 */
const router = express.Router();


router.get('/productmanual', ProductManualController.index);
router.get('/productmanual/:id', ProductManualController.show);
router.post('/productmanual', ProductManualController.create);
router.put('/productmanual/:id', ProductManualController.update);
router.delete('/productmanual/:id', ProductManualController.remove);


module.exports = router;