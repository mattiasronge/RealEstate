const mongoose = require('mongoose');

/**
 * Roll: Databasstrukturen för manuell produkt. Admin kan ladda upp produkten till api. Då lagras produkten här.
 * Produktmanualtabell har förhållande till kundsidatabell och kategori-plats, kategori-område, kategori-tabell.
 * Denna relation kommer att implementeras via sidor, plats, område, typ 
																																   
																	   
 */
var ProductManualSchema = new mongoose.Schema({
    ref_key : String,
    model_type : {
        type : String,
        default : 'manual'
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
    created_at : {
        type : Date,
        default : Date.now
    }
});


var ProductManualModel = mongoose.model('product-manual', ProductManualSchema);

module.exports = ProductManualModel;