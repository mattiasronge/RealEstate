const express = require('express');
const UserAdminController = require('./user-admin-controller');


const router = express.Router();


router.get('/useradmin', UserAdminController.index);
router.get('/useradmin/:id', UserAdminController.show);
router.post('/useradmin', UserAdminController.create);
router.put('/useradmin/:id', UserAdminController.update);
router.delete('/useradmin/:id', UserAdminController.remove);


module.exports = router;