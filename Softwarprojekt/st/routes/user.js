
var User = require('../models/user');
var jwt         = require('jwt-simple');
var config = require('../config/database');


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.authenticateNewUser = function(req, res){	  
	
	console.log(req);
	 if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname) {
		    res.json({success: false, msg: 'Please pass name and password.'});
		  } else {
		    var newUser = new User({
		    	firstname: req.body.firstname,
			    lastname: req.body.lastname,  
			    username: req.body.username,
			    password: req.body.password		     
		    });
		    // save the user
		    newUser.save(function(err) {
		      if (err) {
		        return res.json({success: false, msg: 'Username already exists.'});
		      }
		      res.json({success: true, msg: 'Successful created new user.'});
		    });
		  }
	
	};
	
	
exports.authenticate =  function(req, res) {
	 User.findOne({
		    username: req.body.username
		  }, function(err, user) {
		    if (err) throw err;
		 
		    if (!user) {
		      res.send({success: false, msg: 'Authentication failed. User not found.'});
		    } else {
		      // check if password matches
		      user.comparePassword(req.body.password, function (err, isMatch) {
		        if (isMatch && !err) {
		          // If user is found and password is right create a token
		          var token = jwt.encode(user, config.secret);
		          // return the information including token as JSON
		          res.json({success: true, token: 'JWT ' + token});
		        } else {
		          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
		        }
		      });
		    }
		  });
		};
		
		
