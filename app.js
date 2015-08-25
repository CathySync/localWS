var express = require('express');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
//var fse = require('fs-extra');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var parseTest = require('./routes/parseTest');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port : 3306,
  user     : 'root',
  password : 'root',
  database : 'localisationportal',
  stringifyObjects:true
});


connection.connect();
/*
connection.query('SELECT * FROM `company`', function(error, results, next){
    var resp = JSON.stringify(results);
    console.log(resp)
});
connection.close();
*/
var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.header('Access-Control-Allow-Methods', 'GET PUT POST DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    req.conn = connection;
    next();
});
app.use(busboy());
app.use(allowCrossDomain);
app.use('/', routes);
app.use('/users', users);
app.use('/upload', upload);
app.use("/parseTest",parseTest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
      });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
