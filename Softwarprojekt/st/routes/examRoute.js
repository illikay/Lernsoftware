//Einbinden der benötigten Ressourcen und Packages 

var express = require('express');
require('../models/exam');
var mongoose = require('mongoose');
var Exam  = mongoose.model("Exam");

//speichert eine neue Klausur

exports.create = (req , res) => {	
	console.log(req.body);
	var exam  = new Exam(req.body);
	exam.save();
	res.jsonp(exam);		
};

//zeigt alle Klausuren an 

exports.showAll =  function(req , res){  			
	Exam.find().exec(function(err, exam){
		if (err) {
		    console.error('Fehler in der Datenbank!', err);
		    return;
		}
		res.jsonp(exam);		
	});	
};	

//zeigt eine Klausur an anhand der KlausurId

exports.showOne =  function(req , res){  			
	Products.loadByKlausurId(req.params.KlausurId, function (err, exam){
		if (err)   {
		    console.error('Fehler in Products.loadByKlausurId!', err);
		    return;
		}		
		res.jsonp(exam);
		});				
};	

//ändert eine Klausur anhand der KlausurId

exports.update =  function(req , res){  	
	
	Products.loadByKlausurId(req.params.KlausurId, function (err, products){
		if (err)   {
		    console.error('Fehler in Products.loadByKlausurId!', err);
		return;
		}
		exam.update( {sku: req.body.KlausurId , name: req.body.name, description : req.body.description , price : req.body.price} , function(err){
			if (err) {
			    console.error('Fehler in der Datenbank!', err);
			    return;
			}
			res.jsonp(exam);
		});				
	});		
	};	



//löscht einen Benutzer anhand der KlausurId

exports.deleteById = function(req , res){		
	Products.loadByKlausurId(req.params.KlausurId, function (err, exam){			
		exam.remove( function(err){	
			if (err) {
			    console.error('Fehler in der Datenbank!', err);
			    return;
			}
			res.jsonp(exam);
		});
	});
};





	