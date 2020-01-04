const mongoose = require('mongoose');
/**
 * Databasstrukturen för områdeskategori. 
 * Tabell för områdeskategori har förhållande till produktmanualtabell och produkt-api-tabell.
																								  
																		   
 */

var CategAreaSchema = new mongoose.Schema({
    title : String,
    area_id : String,
    location : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categ-location'  
    },
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


var CategAreaModel = mongoose.model('categ-area', CategAreaSchema);

module.exports = CategAreaModel;