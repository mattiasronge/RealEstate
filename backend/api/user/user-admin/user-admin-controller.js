const UserAdminModel = require('../../../model/user-admin-model');
//const AuthService = require('../../../service/auth-service');
const MailService = require('../../../service/mail-service');

const UserAdminController = {


    index(req, res){
			        // Hittar alla User-Admin					 
        UserAdminModel.find({}, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
   
    show(req, res){
		  // Hittar en User-Admin					   
        UserAdminModel.findOne({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            const token = AuthService.generateJWT(users);
            res.status(200).json(users.nickname);
        });
    },
 
    create(req, res){
		// Skapar en User-Admin					   
        userAdmin = new UserAdminModel(req.body);
        userAdmin.save((err, user) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(user);
        })
    },
     
    update(req, res){
			 // Uppdaterar User-Admin					
        UserAdminModel.findOneAndUpdate({
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
    
    remove(req, res){
			// Tar bort User-Admin				  
        UserAdminModel.remove({
            _id : req.params.id
        }, (err, users) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).json(users);
        });
    },
    sendEmail1(req, res){
        MailService.send1(req.body, results => {
            if(!results){
                res.status(500).send();
            }
            res.status(200).json(results);
        });
    }
};


module.exports = UserAdminController;