const CategAreaModel = require('../../../model/categ-area-model');
 // Hantera alla operationer för områdeskategori som kan användas i filtreringsprodukterna.

const CategAreaController = {


// hämtar alla objekt från databasen för områdekategori
    index(req, res){
       
        CategAreaModel.find({}, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
// hämtar ett objekt från områdekategoridatabasen  
    show(req, res){
        CategAreaModel.findOne({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
//Sätter in en ny till db 
    create(req, res){
        userAdmin = new CategAreaModel(req.body);
        userAdmin.save((err, user) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(user);
        })
    },
 // Uppdaterar
    update(req, res){
        CategAreaModel.findOneAndUpdate({
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

// Tar bort  
    remove(req, res){
        CategAreaModel.remove({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    }
};


module.exports = CategAreaController;