
//Einbinden der benötigten Ressourcen und Packages 

var express = require('express');
require('../models/benutzerSchema');
var mongoose = require('mongoose');
var Benutzer  = mongoose.model("Benutzer");

//speichert einen neuen Benutzer in die Datenbank	

exports.create = (req , res) => {			
	var benutzer = new Benutzer(req.body);
	benutzer.save();
	res.jsonp(benutzer);		
};

//zeigt alle Benutzer in der Datenbank an 

exports.get =  function(req , res){  			
	Benutzer.find().exec(function(err, benutzer){
		if (err) {
		    console.error('Fehler in der Datenbank!', err);
		    return;
		}
		res.jsonp(benutzer);		
	});	
};	

//ändert einen Benutzereintrag

exports.update =  function(req , res){  	
	
	Benutzer.load(req.params.benutzerId, function (err, benutzer){
		if (err)   {
		    console.error('Fehler in Benutzer.loadByNameAndEMail!', err);
		return;
		}
		benutzer.update( {Benutzername: req.body.Benutzername , EMailAdresse: req.body.EMailAdresse} , function(err){
			if (err) {
			    console.error('Fehler in der Datenbank!', err);
			    return;
			}
			res.jsonp(benutzer);
		});				
	});		
	};	

//lädt einen Benutzer mit der in der Request-Url gesendeten Id 
	
exports.show = function(req , res){				
	Benutzer.load(req.params.benutzerId, function (err, benutzer){
		if (err) {
		    console.error('Fehler in Benutzer.load!', err);
		    return;
		}
		res.jsonp(benutzer);		
	});
};

//löscht einen Benutzer mit der in der Request-Url gesendeten Id

exports.deleteById = function(req , res){		
	Benutzer.load(req.params.benutzerId, function (err, benutzer){			
		benutzer.remove( function(err){	
			if (err) {
			    console.error('Fehler in der Datenbank!', err);
			    return;
			}
			res.jsonp(benutzer);
		});
	});
};

//löscht einen Benutzer, mit dem im body gesendeten Benutzernamen

exports.deleteByName = function(req , res){		
	Benutzer.loadByNameAndEMail( req.body.Benutzername ,  req.body.EMailAdresse , function (err, benutzer){	
		if (err)   {
		    console.error('Fehler in Benutzer.loadByNameAndEMail!', err);
		return;
		}
		benutzer.remove(function(err){
			if (err) {
			    console.error('Fehler in der Datenbank!', err);
			    return;
			}
			res.jsonp(benutzer);
		});				
	});		
};

		

	
	
	
	

	
	



	
	


