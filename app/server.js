/**
 * Created by sargis.isoyan on 21/11/2017.
 */
const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    http = require('http'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    config = require('./config'),
    models = require('./models');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || config.port;
app.set('port', port);
app.use(bodyParser.urlencoded({extended: true, limit: '200mb', parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '200mb'}));
app.use(cookieParser());

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-type,Accept');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

require('./router')(app);

models.isConnected((err) => {
    if (err) {
        return;
    }
    server.listen(port);
});
server.on('listening', () => {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('\nListening on ' + bind);
});

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

