const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


/**
* Bestämmer den aktuella miljön och ställer i lämpliga variabler
@param {Express App} app 
 */

function setEnvironment(app) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
        setDevEnv(app);
    } else {
        setProdEnv(app);
    }
}

/**
 * * Används för att ställa in standardmiljövariabler
 * @param {Express App} app 
 */
function setDevEnv(app) {
    process.env.NODE_ENV = 'development';
    app.use(bodyParser.json()); // Tillåter parse JSON 
    app.use(morgan('dev')); // Loggar HTTP Requests (debugging)
    app.use(cors()); // tillåter Cross Origin Requests
    process.env.DB_URL = 'mongodb://localhost:27017/seller-development';
    process.env.TOKEN_SECRET = '27946982a9a6608996607fe95a6299f9';
}

/**
 * Sätter "production environment "
 * @param {Express App} app 
 */
function setProdEnv(app) {
    process.env.NODE_ENV = 'production';
    process.env.DB_URL = 'mongodb://localhost:27017/seller-production';
    process.env.TOKEN_SECRET = '9f4d50bfa6b2450a9ec766fc5105058e';
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../../dist'));
}


module.exports = setEnvironment;
