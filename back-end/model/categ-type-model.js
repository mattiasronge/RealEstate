const mongoose = require('mongoose');


var CategTypeSchema = new mongoose.Schema({
    title : String,
    parent_id : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categ-type'
    },
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


var CategTypeModel = mongoose.model('categ-type', CategTypeSchema);

module.exports = CategTypeModel;