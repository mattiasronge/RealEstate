const mongoose = require('mongoose');

/**
 * Databasstrukturen för produkt-api
 * Produkt-api-tabellen har förhållande till kund-sid-tabe och kategori-plats, kategori-område, kategori-tabell.
 * Denna relation kommer att implementeras via sidor, plats, område, typ
																	   
 */
var ProductApiSchema = new mongoose.Schema({
    ref_key : String,
    model_type : {
        type : String,
        default : 'api'
    },
    title : String,
    description : String,
    description_2 : String,
    currency : {
        type: String,
        default: 'EUR'
    },
    status : String,
    images : [String],
    price : Number,
    bedroom : Number,
    bathroom : Number,
    square : Number,
    outside : Number,
    pages : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'customer-page'
    }],
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
    api_id : {
        type : Number,
        default : 0
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});


var ProductApiModel = mongoose.model('product-api', ProductApiSchema);

module.exports = ProductApiModel;