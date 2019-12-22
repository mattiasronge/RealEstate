const express = require('express');
const CategAreaController = require('./categ-area-controller');


  // Hanterar routing för area category

const router = express.Router();


router.get('/categarea', CategAreaController.index);
router.get('/categarea/:id', CategAreaController.show);
router.post('/categarea', CategAreaController.create);
router.put('/categarea/:id', CategAreaController.update);
router.delete('/categarea/:id', CategAreaController.remove);


module.exports = router;