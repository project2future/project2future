var mysql = require('mysql');
var alert = require('alert-node');
var db = require('../public/javascripts/dbConnection');

exports.vote = function(req,res){
	
	var vote = req.body.vote;
	if(vote!== null || vote !== undefined){
		var email = req.session.email;
		db.query('UPDATE user_details SET vote = ? WHERE email = ?',[true,email], function (err, result) {
			if (err) {
			    res.send({
			      "code":400,
			      "failed":"error ocurred"
			    });
			  }else{
				  res.render('acknowledgement', { title: 'Voting System' });
			  }
		});
	}else{
		alert("Please select a candidate to vote");
	}
	
};



