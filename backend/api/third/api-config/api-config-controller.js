const ApiConfigModel = require('../../../model/api-config-model');

const ApiConfigController = {
    /**
     * Få alla api-listor från db.
										  
     */
    index(req, res){
        ApiConfigModel.find({}, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
    /**
     * Hämtar ett från db
     */
    show(req, res){
        ApiConfigModel.findOne({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
    /**
     * Skapar ett till db
     */    
    create(req, res){
        userAdmin = new ApiConfigModel(req.body);
        userAdmin.save((err, user) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(user);
        })
    },
    /**
     * Uppdaterar ett från db
     */        
    update(req, res){
        ApiConfigModel.findOneAndUpdate({
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
     * Tar bort ett från db
     */          
    remove(req, res){
        ApiConfigModel.remove({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    }
};


module.exports = ApiConfigController;