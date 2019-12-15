const express = require('express');
const CategAreaController = require('./categ-area-controller');

/**
 * Role: Handling the routing for area category.
 * The operations will be progressed in the controller part. so need to import the controller part.
 */
const router = express.Router();


router.get('/categarea', CategAreaController.index);
router.get('/categarea/:id', CategAreaController.show);
router.post('/categarea', CategAreaController.create);
router.put('/categarea/:id', CategAreaController.update);
router.delete('/categarea/:id', CategAreaController.remove);


module.exports = router;