const mongoose = require('mongoose');

// Kopplar till Mongodb 

function connectToDB() {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, error => {
        if (error) {
            console.log('Unable to connect to database');
            throw error;
        } else {
            console.log('Connected to MongoDB!');
        }
    });
}


module.exports = connectToDB;