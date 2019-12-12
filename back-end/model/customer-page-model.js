const mongoose = require('mongoose');


var CustomerPageSchema = new mongoose.Schema({
    url_key : String,
    customer : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user-customer'
    },
    products_m : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product-manual'
    },
    products_a : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product-api'
    },
    is_notify : {
        type : Boolean,
        default : false
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});


var CustomerPageModel = mongoose.model('customer-page', CustomerPageSchema);

module.exports = CustomerPageModel;