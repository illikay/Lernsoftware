
//Einbinden der Node.js Module 

var express = require('express');

var bodyParser = require('body-parser');


var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var app = express();

var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/database');

var jwt = require('jwt-simple');
var User = require('./models/user.js');


//Middleware Body-Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




//Einbinden der Routing-Dateien in die Hauptkonfigurationsdatei des Node.js - Servers 

var index  = require('./routes/index.js');
var user = require('./routes/user.js');
var benutzer = require('./routes/benutzer.js');


require('./config/passport.js')(passport);

require('./uploader/app.js')(app);

var apiRoutes = express.Router();

//Datenbank Integration mit Mongoose

mongoose.connect('mongodb://localhost/benutzerdatenbank');
var db = mongoose.connection;

db.on('error', function callback(){	
console.log("Verbindung zu MongoDb fehlgeschlagen!");	
});

db.once('open', function callback(){	
	console.log("Verbindung zu MongoDB erfolgreich!");	
});


// all environments und Einbinden der Middleware 

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(app.router);

app.use(passport.initialize());

//einbinden der statischen Ordner in das Backend

app.use(express.static(path.join(__dirname, 'shop')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static'))); 
app.use(express.static(path.join(__dirname, 'uploader')));


//Error Handler für uncaught Exceptions

//process.on('uncaughtException', (err) => { console.error(`Caught exception: ${err}`); });



//route für benutzer.js 

app.post('/benutzer' , benutzer.create); // fügt neuen Benutzer ein

app.get('/benutzer/:benutzerId' , benutzer.show); //listet nur einen Benutzer auf

app.delete('/benutzer' , benutzer.deleteByName); // löscht einen Benutzer anhand seines Namens

app.delete('/benutzer/:benutzerId' , benutzer.deleteById); // löscht einen Benutzer anhand seiner Id 

app.put('/benutzer/:benutzerId', benutzer.update);





//route für user authentification!

app.post('/api/signup', user.authenticateNewUser);


app.post('/api/authenticate', user.authenticate); 


//route to a restricted info (GET http://localhost:8080/api/memberinfo)
app.get('/api/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
 
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};






//laden der Angular.js Dateien

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, 'static' , 'index.html')); 
});

app.get('/webshop', function(req, res) {
    res.sendfile(path.join(__dirname, 'shop' , 'index.html')); 
});

app.get('/uploadWebsite', function(req, res) {
    res.sendfile(path.join(__dirname, 'uploader' , 'index.html')); 
});






//erzeugt den Server, wird immer dann ausgeführt, wenn der Server einen Request empfängt 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



