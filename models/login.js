var mysql = require('mysql');
var alert = require('alert-node');
var db = require('../public/javascripts/dbConnection');

var bcrypt = require('bcrypt'),
  algorithm = 'aes-256-gcm',
  password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
  iv = '60iP0h6vJoEa';

exports.index = function(req, res) {
	
	var sess = req.session;
	console.log(sess.email);
	if(sess.email){
		if(sess.isadmin === 1) {
		    res.redirect('/adminHome');
		}else{
			res.redirect('/voteHome');
		}
	}
	else {
		res.render('login', { title: 'Voting System' });
	}
};

exports.login = function(req, res) {
	var email= req.body.email;
	 var password = req.body.password;
	  db.query('SELECT * FROM user_details WHERE email = ?',[email], function (error, results, fields) {
	  if (error) {
	    res.send({
	      "code":400,
	      "failed":"error ocurred"
	    });
	  }else{
	    if(results.length >0){
	    	bcrypt.compare(password, results[0].password, function(err, match) {
	  	      if(match===true && results[0].vote === 0){
	  	    	  req.session.email = email;
	  	    	  req.session.isadmin = results[0].isadmin;
	  	    	  if(results[0].isadmin === 1){
	  	    		res.render('adminHome', { title: 'Voting System' });
	  	    	  }else{
	  	    		 res.render('voteHome', { title: 'Voting System' });
	  	    	  }
	  	      }
	  	      else{
	  	    	if(results[0].vote === 1){
	  	    		alert("You have already provided your vote.");
	  	    	}
	  	    	else{
	  	    		alert("Email and password does not match");
	  	    	}
	  	    	res.redirect('/');
	  	      }
	    		
	    	});
	    }
	    else{
	    	alert("Email does not exits");
	    	res.redirect('/');
	    }
	  }
	  });
};

exports.logout = function(req, res) {
	req.session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
		  res.redirect('/');
	  }
	});
};