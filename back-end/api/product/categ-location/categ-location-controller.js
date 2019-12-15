const CategLocationModel = require('../../../model/categ-location-model');
/**
 * Role: Handling all operations for location category that can be used in the filtering products.
 * This is called from categ-location-routes.js
 * package: location category
 * 
 */
const CategLocationController = {
    /**
     * Role: getting the all items from the location category database
     */
    index(req, res){
        CategLocationModel.find({}, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
    /**
     * Role: getting one items from the location category database
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
     * Role: Insert new one to the db
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
     * Role: Updating the data
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
     * Role: Deleting the data
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