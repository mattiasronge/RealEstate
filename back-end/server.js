const express = require('express');
const registerRoutes = require('./routes');
const setEnvironment = require('./config/env');
const connectToDB = require('./config/db');


const app = express();


setEnvironment(app);
connectToDB();
registerRoutes(app);


app.get('*', (req, res) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
        return res.send(
            'Running server in development mode.'
        );
    } else {

        return res.sendFile('index.html', { root: __dirname + '/../dist/' });
    }
})

// Startar server på port 3000
app.listen(3000, () => {
    console.log('MEVN app listening on port 3000 in ' + process.env.NODE_ENV + ' mode!');
});