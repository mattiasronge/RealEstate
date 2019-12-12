const mongoose = require('mongoose');


var CategLocationSchema = new mongoose.Schema({
    title : String,
    products_m : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product-manual'
    },
    products_a : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product-api'
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});


var CategLocationModel = mongoose.model('categ-location', CategLocationSchema);

module.exports = CategLocationModel;