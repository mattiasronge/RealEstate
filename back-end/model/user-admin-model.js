const mongoose = require('mongoose');


/**
 * Databasstrukturen för admin sida.
 */

var UserAdminSchema = new mongoose.Schema({
    email : String,
    username : String,
    password : String,
    permission : Number,
    created_at : {
        type : Date,
        default : Date.now
    }
});


var UserAdminModel = mongoose.model('user-admin', UserAdminSchema);

module.exports = UserAdminModel;