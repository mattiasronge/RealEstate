const express = require('express');
const CategLocationController = require('./categ-location-controller');

/**
 * Role: Handling the routing for location category.
 * The operations will be progressed in the controller part. so need to import the controller part.
 */
const router = express.Router();


router.get('/categlocation', CategLocationController.index);
router.get('/categlocation/:id', CategLocationController.show);
router.post('/categlocation', CategLocationController.create);
router.put('/categlocation/:id', CategLocationController.update);
router.delete('/categlocation/:id', CategLocationController.remove);


module.exports = router;