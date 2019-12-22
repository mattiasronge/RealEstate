const CategLocationModel = require('../../../model/categ-location-model');

/**
 * Hantera alla funktioner för platskategori som kan användas i filtreringsprodukterna.
 * Denna kallas från categ-location-routes.js
 */

const CategLocationController = {

    //Hämtar alla objekt från databasen för platskategori
    
    index(req, res){
        CategLocationModel.find({}, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
    /**
     * Hämtar ett objekt från platskategoridatabasen
     */      
    show(req, res){
        CategLocationModel.findOne({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
     /**
     * Lägger till
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
            new:true
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