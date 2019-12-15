const express = require('express');
const CategTypeController = require('./categ-type-controller');

/**
 *Hanterar routingen för typkategori.
 */
const router = express.Router();


router.get('/categtype', CategTypeController.index);
router.get('/categtype/:id', CategTypeController.show);
router.post('/categtype', CategTypeController.create);
router.put('/categtype/:id', CategTypeController.update);
router.delete('/categtype/:id', CategTypeController.remove);


module.exports = router;