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
            // Api Service
            // ApiService.getApiData(results => {
            //     // console.log('controller index', results);
            //     if(!results){
            //         res.status(500).send();
            //     }
            //     products = results;
            //     res.status(200).json(products);
            // });
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
    }
};


module.exports = ProductApiController;