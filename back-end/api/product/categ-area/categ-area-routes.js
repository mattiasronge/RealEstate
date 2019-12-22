const express = require('express');
const CategAreaController = require('./categ-area-controller');

/**
* Hantera dirigeringen för områdeskategori.
* Åtgärderna kommer att fortsätta i styrenhetsdelen. så behöver importera controller-delen.
*/
const router = express.Router();


router.get('/categarea', CategAreaController.index);
router.get('/categarea/:id', CategAreaController.show);
router.post('/categarea', CategAreaController.create);
router.put('/categarea/:id', CategAreaController.update);
router.delete('/categarea/:id', CategAreaController.remove);


module.exports = router;