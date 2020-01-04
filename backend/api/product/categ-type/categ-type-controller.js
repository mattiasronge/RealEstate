const CategTypeModel = require('../../../model/categ-type-model');
/**
 * Hanterar alla åtgärder för typkategori som kan användas i filtreringsprodukterna.
 * Denna kallas från categ-area-routes.js 
 * 
 */
const CategTypeController = {
    /**
     *  hämtar alla objekt från typkategoridatabasen
     */
    index(req, res){
        CategTypeModel.find({}, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
    /**
     * Hämtar ett object från type category db
     */       
    show(req, res){
        CategTypeModel.findOne({
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
        userAdmin = new CategTypeModel(req.body);
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
        CategTypeModel.findOneAndUpdate({
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
        CategTypeModel.remove({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    }
};


module.exports = CategTypeController;