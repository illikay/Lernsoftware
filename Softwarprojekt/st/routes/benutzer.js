var express = require('express');

require('../models/benutzerSchema');
var mongoose = require('mongoose');
var Benutzer  = mongoose.model("Benutzer");


exports.list = function(req , res){
	
	var benutzer = new Benutzer(req.body);
	benutzer.save();
	res.jsonp(benutzer);
	
	
};

exports.get =  function(req , res){
	
	Benutzer.find().exec(function(err, benutzer){
		res.jsonp(benutzer);
		
		
	});
	
};
	
	
	exports.show = function(req , res){
		
	Benutzer.load(req.params.benutzerId, function (err, benutzer){
		
		
		res.jsonp(benutzer);
		
	});
	
	};
	
	
	

	exports.delete = function(req , res){
		
	Benutzer.load(req.params.benutzerId, function (err, benutzer){
		
		benutzer.remove (function(err){
			
		
		res.jsonp(benutzer);
		})
		
	});
	
	};
	
	
	
	

	
	



	
	


