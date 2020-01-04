const ProductApiModel = require('../../../model/product-api-model');
const ApiService = require('../../../service/api-service');

const ProductApiController = {
    /**
     * Hämtar alla produkter från tredje part api
     */
    index(req, res){
        ProductApiModel.find({})
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
     * Hämtar en produkt från api
     */      
    show(req, res){
        ProductApiModel.findOne({
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
    showRefkey(req, res){
        ProductApiModel.findOne({
            ref_key : req.params.id
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
     * skapar en produkt till api.
     */    
    create(req, res){
        userAdmin = new ProductApiModel(req.body);
        userAdmin.save((err, user) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(user);
        })
    },
     /**
     * Uppdaterar till api
     */    
    update(req, res){
        ProductApiModel.findOneAndUpdate({
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
     * tar bort object från api
     */      
    remove(req, res){
        ProductApiModel.remove({
            _id : req.params.id
        }, (err, products) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(products);
        });
    },
    getData(req, res){
        // Api Service
        ApiService.getApiDataWithParams(req.body, results => {
            if(!results){
                res.status(500).send();
            }
            res.status(200).json(results);
        });
    },
    getAllRefKeys(req, res){
        ProductApiModel.find({})
        .select('ref_key')
        .exec((err, products) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(products.map(p => p['ref_key']));
        });
    }
};


module.exports = ProductApiController;