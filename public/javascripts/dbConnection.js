require('dotenv').config();
var mysql=require('mysql');
 var connection= mysql.createConnection({
 host:(process.env.DB_HOST|'localhost'),
 user:process.env.DB_USER,
 password:process.env.DB_PASSWORD,
 database:process.env.DB_NAME,
 insecureAuth : true
 
});
 connection.connect(function(err){
	 if(!err) {
	     console.log("Database is connected ...");
		  
	 } else {
	     console.log("Error connecting database ...",err);
	     throw err;
	 }
	 });
/** for one time  use to insert data
var crypt = require('bcrypt');
var saltRounds =10;
var sql = "INSERT INTO user_details (full_name, email, password,vote,isadmin) VALUES (?,?,?,?,?)";
 crypt.hash('voter', saltRounds, function(err, hash) {
	 console.log(hash)
	 connection.query(sql,['W','niranjanajoe1506@gmail.com',hash,false,false], function (err, results,fields) {
	    if (err) throw err;
	    console.log("1 record inserted, ID: " + results.insertId);
	  });
});
 crypt.hash('admin', saltRounds, function(err, hash) {
	 console.log(hash)
	 connection.query(sql,['Admin','niranjanabinoy@gmail.com',hash,false,true], function (err, results,fields) {
	    if (err) throw err;
	    console.log("1 record inserted, ID: " + results.insertId);
	  });
}); 
*/

 module.exports=connection;