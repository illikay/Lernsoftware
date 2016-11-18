
//einbinden der Node.js Module 

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var app = express();


//einbinden der Routing-Dateien in die Hauptkonfigurationsdatei des Node.js - Servers 

var index  = require('./routes/index')
var user = require('./routes/user');
var benutzer = require('./routes/benutzer');


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
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.methodOverride());
app.use(bodyParser.json());
app.use(app.router);

//einbinden der statischen Ordner in das Backend

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));  //Hier befinden sich die Dateien, die mit Angular.js erstellt worden sind 

//Error Handler für uncaught Exceptions

process.on('uncaughtException', (err) => { console.error(`Caught exception: ${err}`); });


//Routen-Handling mit Weiterleitung der Http-Requests 

app.get('/users', user.list);	//Beispiel-Route von Express.js erzeugt

app.post('/benutzer' , benutzer.create); // fügt neuen Benutzer ein

app.get('/benutzer' , benutzer.get); // listet alle Benutzer auf

app.get('/benutzer/:benutzerId' , benutzer.show); //listet nur einen Benutzer auf

app.delete('/benutzer' , benutzer.deleteByName); // löscht einen Benutzer anhand seines Namens

app.delete('/benutzer/:benutzerId' , benutzer.deleteById); // löscht einen Benutzer anhand seiner Id 



//laden der Basis-Datei, des mit Angular.js erstellten Frontends als Basis-Url

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, 'static' , 'index.html')); 
});


//erzeugt den Server, wird immer dann ausgeführt, wenn der Server einen Request empfängt 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
