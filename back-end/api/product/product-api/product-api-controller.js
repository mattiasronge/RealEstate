const ProductApiModel = require('../../../model/product-api-model');
const ApiService = require('../../../service/api-service');

const ProductApiController = {
    /**
     * Role: Getting all products from the third-party api.
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
     * Role: Getting one product from the third-party api.
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
     * Role: Create one product in the third-party api.
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
     * Role: Update product in the third-party api.
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
     * Role: Remove one product in the third-party api.
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