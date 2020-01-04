const mongoose = require('mongoose');

// DB Struktur för API config 
var ApiConfigSchema = new mongoose.Schema({
    api_id : String,
    api_key : String,
    api_email : String,
    api_name : String,
    api_version : String,
    created_at : {
        type : Date,
        default : Date.now
    }
});


var ApiConfigModel = mongoose.model('api-config', ApiConfigSchema);

module.exports = ApiConfigModel;