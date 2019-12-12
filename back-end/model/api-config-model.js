const mongoose = require('mongoose');


var ApiConfigSchema = new mongoose.Schema({
    api_key : String,
    api_token : String,
    api_email : String,
    api_password : Number,
    created_at : {
        type : Date,
        default : Date.now
    }
});


var ApiConfigModel = mongoose.model('api-config', ApiConfigSchema);

module.exports = ApiConfigModel;