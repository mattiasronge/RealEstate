const mongoose = require('mongoose');


var ProductManualSchema = new mongoose.Schema({
    ref_key : String,
    title : String,
    description : String,
    images : [String],
    price : Number,
    bedroom : Number,
    bathroom : Number,
    square : Number,
    outside : Number,
    pages : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'customer-page'
    },
    location : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categ-location'
    },
    area : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categ-area'
    },
    type : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categ-type'
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});


var ProductManualModel = mongoose.model('product-manual', ProductManualSchema);

module.exports = ProductManualModel;