const CategLocationModel = require('../../../model/categ-location-model');
/**
 * Hantera alla operationer för placeringskategori som kan användas i filtreringsprodukterna.
 * Detta kallas från categ-location-routes.js
 */
const CategLocationController = {
    /**
     * Hämtar alla objekt från databasen för platskategori
     */
    index(req, res){
        CategLocationModel.find({})
        .populate('categ-area')
        .exec((err, categs) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(categs);
        });
    },
    /**
     * Hämtar ett objekt från databasen för platskategori
     */     
    show(req, res){
        CategLocationModel.find({
            _id : req.params.id
        })
        .populate('categ-area')
        .exec((err, categs) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(categs);
        });
    },
     /**
     * Skapar ett
     */       
    create(req, res){
        userAdmin = new CategLocationModel(req.body);
        userAdmin.save((err, user) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(user);
        })
    },
    /**
     * Uppdaterar
     */        
    update(req, res){
        CategLocationModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            new:true,
            multi:true
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
    /**
     * Tar bort
     */     
    remove(req, res){
        CategLocationModel.remove({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    }
};


module.exports = CategLocationController;