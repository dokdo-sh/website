const persistent = require('persistent-json-cache');
const http = require('http');
const https = require('https');
const createError = require('http-errors');
const express = require('express');
i18n = require('i18n-2');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const request = require('request');
const session = require('express-session')
const csrf = require('csurf')
const flatten = require('flat')
const Big = require('big.js');
const { promisify } = require('util');
const asyncv3 = require('async');
// libs

const solarcraftApi = require("./solarcraftApi")
const scapi = new solarcraftApi.default();

var indexRouter = require('./routes/index');
// const { paused } = require('browser-sync');

var serverPort = 4646;

var app = express();


var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(serverPort);

i18n.expressBind(app, {
    // setup some locales - other locales default to en silently
    locales: ['en', 'kr'],
    // change the cookie name from 'lang' to 'locale'
    cookieName: 'locale'
});

app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
    next();
});

////
// Web Stuff

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'justsomerandomness191919',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 864000
    }
}));
app.use(csrf());

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



////

io.on('connection', function(socket) {

    // Socket IO getplayercount

    socket.on('getplayercount', function() {

        (async() => {
            var response = await scapi.getStats();
            var playercount = 0;
            var eggcount = 0;
            var servernames = Object.keys(response[0].servers);
            for (let i = 0; i < servernames.length; i++) {
                let thisserver = response[0].servers[servernames[i]];
                playercount += thisserver.playerCount;
            }
            for (let i = 0; i < servernames.length; i++) {
                let thisserver = response[0].servers[servernames[i]];
                eggcount += thisserver.eggCount;
            }


            let stats = {
                playercount: playercount,
                servercount: servernames.length,
                eggcount: eggcount,
                leaderboard: response[0].leaderBoard
            }

            socket.emit('showplayercount', stats);

        })();
    });
});