const mongoose = require('mongoose');

/**
 * Databasstrukturen för platskategori .
 * Tabell för kategori-placering har förhållande till produktmanualtabell och produkt-api-tabell.
																									   
																		   
 */
var CategLocationSchema = new mongoose.Schema({
    title : String,
    location_id : String,
    areas : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categ-area'
    }],
    products_m : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product-manual'
    }],
    products_a : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product-api'
    }],
    created_at : {
        type : Date,
        default : Date.now
    }
});


var CategLocationModel = mongoose.model('categ-location', CategLocationSchema);

module.exports = CategLocationModel;