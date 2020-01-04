const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
/**
 * Databasstrukturen för admin sida .
 * 
 */

var UserAdminSchema = new mongoose.Schema({
    email : String,
    username : String,
    password : String,
    permission : Number,
    created_at : {
        type : Date,
        default : Date.now
    }
});
UserAdminSchema.virtual('nickname').get(function(){
    return this.username.toUpperCase();
});
UserAdminSchema.statics.passwordMatches = function(password, hash){
    return bcrypt.compareSync(password, hash);
};
UserAdminSchema.pre('save', function(next){
    const unsafePassword = this.password;
    this.password = bcrypt.hashSync(unsafePassword);
    next();
});

var UserAdminModel = mongoose.model('user-admin', UserAdminSchema);

module.exports = UserAdminModel;