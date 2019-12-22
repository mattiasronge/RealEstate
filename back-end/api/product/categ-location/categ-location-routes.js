const express = require('express');
const CategLocationController = require('./categ-location-controller');

/**
 * Hantera routingen för platskategori.
 */
const router = express.Router();


router.get('/categlocation', CategLocationController.index);
router.get('/categlocation/:id', CategLocationController.show);
router.post('/categlocation', CategLocationController.create);
router.put('/categlocation/:id', CategLocationController.update);
router.delete('/categlocation/:id', CategLocationController.remove);


module.exports = router;