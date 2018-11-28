var mysql = require('mysql');
var alert = require('alert-node');
var nodemailer = require('nodemailer'); 
const { check } = require('express-validator/check');
var db = require('../public/javascripts/dbConnection');

var saltRounds =10;

var bcrypt = require('bcrypt'),
  algorithm = 'aes-256-gcm',
  password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
  iv = '60iP0h6vJoEa';

exports.newUser = function(req,res){
	res.render('userRegistration',{title:'Voting System'});
};

exports.createUser = function(req,res){
	 var full_name = req.body.name;
	 var email     = req.body.email;
	 var password  = req.body.password;
	 var isadmin = req.body.isadmin ? true : false;
	 console.log(isadmin);
	
	 req.session.newUser = email;
	 
	 bcrypt.hash(password, saltRounds, function(err, pass_hash) {
		 var sql = "INSERT INTO user_details (full_name, email, password,vote,isadmin) VALUES (?,?,?,?,?)";
		 db.query(sql,[full_name,email,pass_hash,false,isadmin], function (err, results,fields) {
		    if (err) {
		    	throw err;
		    }
		    alert(full_name+" is added with user ID: " + results.insertId);
		    var emailTemplate = '';		    
		    if(isadmin){
		    	emailTemplate = '<h2>Congratulation!! Your are a administrator to the new system.</h2>'+
			    '<p>Please log in using the following credential : </p><p>Username: '+email+'</p>'+
			    '<p>Password: '+password+'</p>';
		    }else{
		    	 emailTemplate = '<h1>Vote with choice, but let it be only your voice.</h1>'+
				    '<h2>Congratulation!! Your are selected to caste your vote on the election of our candidates</h2>'+
				    '<p>Please log in using the following credential : </p><p>Username: '+email+'</p>'+
				    '<p>Password: '+password+'</p>';
		    }
			var transporter = nodemailer.createTransport({
				  service: 'gmail',
				  auth: {
				    user: req.session.email,
				    pass: 'RozaBella'
				  }
				});

				var mailOptions = {
				  from: req.session.email,
				  to: req.session.newUser,
				  subject: 'Online Voting System',
				  html: 	emailTemplate
				};

				transporter.sendMail(mailOptions, function(error, info){
				  if (error) {
				    console.log(error);
				  } else {
				    console.log('Email sent: ' + info.response);
				  }
				});	
		    res.render('adminHome', { title: 'Voting System' });
		  });
	});
};



