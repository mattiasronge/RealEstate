const mongoose = require('mongoose');


var UserCustomerSchema = new mongoose.Schema({
    email : String,
    pages : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'customer-page'
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : Date
});


var UserCustomerModel = mongoose.model('user-customer', UserCustomerSchema);

module.exports = UserCustomerModel;