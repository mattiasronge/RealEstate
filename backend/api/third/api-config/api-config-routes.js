const express = require('express');
const ApiConfigController = require('./api-config-controller');

/**
 * Hanterar routingen för api config db
																								   
 */
const router = express.Router();


router.get('/apiconfig', ApiConfigController.index);
router.get('/apiconfig/:id', ApiConfigController.show);
router.post('/apiconfig', ApiConfigController.create);
router.put('/apiconfig/:id', ApiConfigController.update);
router.delete('/apiconfig/:id', ApiConfigController.remove);


module.exports = router;