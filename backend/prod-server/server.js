'use strict';
//importerar moduler
var express = require('express');
var registerRoutes = require('../routes');
var setEnvironment = require('../config/env');
var connectToDB = require('../config/db');

var app = express();
//Sätter environment
setEnvironment(app);
//kopplar till db
connectToDB();
registerRoutes(app);

app.get('*', function (req, res) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
        return res.send('Running server in development mode.');
    } else {
    
        return res.sendFile('index.html', { root: process.env.DIST_PATH });
    }
});


// Startar servern på port
app.listen(process.env.PORT, function () {
    console.log('MEVN app listening on port ' + process.env.PORT + ' in ' + process.env.NODE_ENV + ' mode!');
});