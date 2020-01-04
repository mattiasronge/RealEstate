const ProductManualModel = require('../../../model/product-manual-model');

const ProductManualController = {
    /**
     * Hämtar alla produkter från manual products table
     */
    index(req, res){
        ProductManualModel.find({})
        .populate('location')
        .populate('area')
        .populate('type')
        .exec((err, products) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(products);
        });
    },
    /**
     * Hämtar en produkt från manual products table
     */      
    show(req, res){
        ProductManualModel.findOne({
            _id : req.params.id
        })
        .populate('location')
        .populate('area')
        .populate('type')
        .exec((err, products) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(products);
        });
    },
    /**
     * Skapar en ny produkt till manual products table
     */      
    create(req, res){
        userAdmin = new ProductManualModel(req.body);
        userAdmin.save((err, user) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(user);
        })
    },
     /**
     * Uppdaterar en produkt i manual products table
     */   
    update(req, res){
        ProductManualModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new:true
        }, (err, products) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(products);
        });
    },
     /**
     *Tar bort produkt från manual products table
     */          
    remove(req, res){
        ProductManualModel.remove({
            _id : req.params.id
        }, (err, products) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(products);
        });
    }
};


module.exports = ProductManualController;