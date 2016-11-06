
/**
 * Module dependencies. 
 */

var express = require('express');




var user = require('./routes/user');
var benutzer = require('./routes/benutzer')
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

//Datenbank Integration

mongoose.connect('mongodb://localhost/benutzerdatenbank');
var db = mongoose.connection;

db.on('error', function callback(){	
console.log("Verbindung zu MongoDb fehlgeschlagen!");	
});

db.once('open', function callback(){	
	console.log("Verbindung zu MongoDB erfolgreich!");	
});




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



app.post('/benutzer' , benutzer.list); // fügt neuen Benutzer ein
app.get('/benutzer' , benutzer.get); // listet alle Benutzer auf
app.get('/benutzer/:benutzerId' , benutzer.show); //listet nur einen Benutzer auf
app.delete('/benutzer/:benutzerId' , benutzer.delete); // löscht einen Benutzer 





// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
