const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


/**
* Bestämmer den aktuella miljön och ställer i lämpliga variabler
 * @param {Express App} app 
 */
function setEnvironment(app) {
    setDefaultEnv(app);
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
function setDefaultEnv(app) {
    process.env.PORT = 3000;
    process.env.API_BASE_URL = 'https://webapi.resales-online.com';
    process.env.RANDOM_LENGTH = 32;
    process.env.DIST_PATH = __dirname + '/../dist';
    app.use(bodyParser.json()); // Tillåter parse JSON 
    app.use(express.static(process.env.DIST_PATH));
}


function setDevEnv(app) {
    process.env.NODE_ENV = 'development';
    process.env.DB_URL = 'mongodb://localhost:27017/seller-development';
    process.env.TOKEN_SECRET = '36946982a9a6608996607fe95a6299f9';
    process.env.API_NAME = 'TEST';
    app.use(morgan('dev')); // Loggar HTTP Requests (debugging)
    app.use(cors());// tillåter Cross Origin Requests
}

/**
 * Sätter "production environment "
 * @param {Express App} app 
 */
function setProdEnv(app) {
    process.env.NODE_ENV = 'production';
    process.env.DB_URL = 'mongodb://localhost:27017/seller-production';
    process.env.TOKEN_SECRET = '501d50bfa6b2450a9ec766fc5105058e';
    process.env.API_NAME = 'PRODUCT';
}


module.exports = setEnvironment;
