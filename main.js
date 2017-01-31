var express = require('express');
var main = express();
var fs = require("fs");
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';


main.use(express.static('public'));

main.get('/USERS', function (req, res) {
mongodb.connect(url, function(err, db) {
   db.collection('users').find({},{"name": 1, "_id": 0}, function(err, users) {	
 fs.writeFile("users_name_list.json",'', function(err) {
					if(err) {
							return console.log(err);
							}
											
																				});  
			users.forEach( function(User) {			
						
				var json = JSON.stringify(User);
				var a= JSON.parse(json);			
					fs.appendFile("users_name_list.json",a.name+',', function(err) {
					if(err) {
							return console.log(err);
							}										
																					}); 
																		
											});				 
});  
}); 
      
fs.readFile( __dirname + "/" + "users_name_list.json", 'utf8', function (err, data) {
   if (err) {
      return console.error(err);
   } 
var href_names='';   
var a= data;   
   a= a.split(',');   
  fLen = a.length;
   for (i = 0; i < fLen; i++) {
	   href_names+='<form action = "http://127.0.0.1:8081/ONLYONEUSER" method = "GET">'+
         ' <input type="submit" value="'+a[i]+'" name="btn" /><br>'+         
     '</form>'
	 
}
var html_make='<!doctype html>\n<html lang="en">\n' +
    '\n<meta charset="utf-8">\n<title>node.js</title>\n'+href_names +'\n\n';
res.write(html_make);
res.end();
}); 
});

main.get('/ABOUT', function (req, res) {
  res.sendFile( __dirname + "/" + "abouth.html" );
    
 });

main.get('/MYCOLLECTION', function (req, res) {
  res.sendFile( __dirname + "/" + "my_collection.html" );
    
 });
 main.get('/MYCOLLECTION_ADDING', function (req, res) {
function onUpdate(){
res.sendFile( __dirname + "/" + "my_collection_success.html" );}
function onUpdateFail(){
res.sendFile( __dirname + "/" + "my_collection_fail.html" );}
function onLoginFail(){
res.sendFile( __dirname + "/" + "my_collection_login_fail.html" );}
					
 var name = req.query.first_name; 
 var password2 =req.query.last_name;
 var movie_name =req.query.movie_name;
 mongodb.connect(url, function(err, db) {
 db.collection('users').find({ "name": name},{"name": 1,"password":1,"Collection":1, "_id": 0}, function(err, users) {
			if(err){console.log("No users found");}
			else {users.forEach( function(User) {
				var json = JSON.stringify(User);
				var a= JSON.parse(json);
				if (a.name==name&&a.password==password2){
					var n = a.Collection;
					 n = n.search(movie_name);
					console.log(n);
					if (n<=0){onUpdate();
					db.collection('users').updateOne(
							{ "name" : name },
														{
																$set: { "Collection": a.Collection+','+movie_name  }
	
														}, function(err, results) {										
										
				});
				
				}else{
					onUpdateFail();					
				}					
				}else{
					onLoginFail();
				}				
			});	
				 }
});
 }); 
 
 
 
 
 
 
 
 
 });


main.get('/ONLYONEUSER', function (req, res) {
	var href_names='';
var name = req.query.btn;
mongodb.connect(url, function(err, db) {
fs.writeFile('collection_'+name+'.json','', function(err) {
					if(err) {
							return console.log(err);
							}}); 
db.collection('users').find({ "name": name},{"Collection":1, "_id": 0}, function(err, users) {	

											
														 
			users.forEach( function(User) {					
				var json = JSON.stringify(User);
				var a= JSON.parse(json);		
					fs.appendFile('collection_'+name+'.json',a.Collection+',', function(err) {
					if(err) {
							return console.log(err);
							}										
																					}); 																		
											});				 
});  
});
fs.readFile( __dirname + "/" +'collection_'+name+'.json', 'utf8', function (err, data) {
   if (err) {
      return console.error(err);
   } 
var href_names='';   
var a= data;   
   a= a.split(',');   
  fLen = a.length-1;
  href_names+='<form action = "http://127.0.0.1:8081/ONLYONEUSER_ASADMIN" method = "GET">'+
' searching collection for: <input type = "text" value = "'+name+'"name = "name_searcing" readonly>  <br>'+
' Admin name: <input type = "text" name = "first_name">  <br>'+
'Password  :  <input type = "text" name = "last_name">'+
         ' <input type="submit" value="Log in as admin and search!" name="btn" /><br>'+         
     '</form>'
   for (i = 1; i < fLen; i++) {
	   href_names+='<img id="'+a[i]+'" alt = "'+a[i]+'" src="'+a[i]+'.png"/>'
	   
	 
}
var html_make='<!doctype html>\n<html lang="en">\n' +
    '\n<meta charset="utf-8">\n<title>node.js</title>\n'
	+href_names +'\n\n';
res.write(html_make);
res.end();
});	
});





main.get('/ONLYONEUSER_ASADMIN', function (req, res) {
	
var name = req.query.first_name;
var password = req.query.last_name;
var name_searching = req.query.name_searcing;

if(name=="admin"&&password=="admin"){
mongodb.connect(url, function(err, db) {
db.collection('users').find({ "name": name_searching},{"Collection":1, "_id": 0}, function(err, users) {	
fs.writeFile(name_searching+'.json','', function(err) {
					if(err) {
							return console.log(err);
							}
											
														});  
			users.forEach( function(User) {					
				var json = JSON.stringify(User);
				var a= JSON.parse(json);		
					fs.appendFile(name_searching+'.json',a.Collection+',', function(err) {
					if(err) {
							return console.log(err);
							}										
																					}); 																		
											});				 
});  
});
fs.readFile( __dirname + "/" +name_searching+'.json', 'utf8', function (err, data) {
   if (err) {
      return console.error(err);
   } 
var href_names='';   
var a= data;   
   a= a.split(',');   
  fLen = a.length-1;
   for (i = 1; i < fLen; i++) {
	   href_names+='<form action = "http://127.0.0.1:8081/ASADMIN_DELETE" method = "GET">'+
	   '<img id="'+a[i]+'" alt = "'+a[i]+'" src="'+a[i]+'.png"/>'+
	   '<input type="hidden" name="collection_movie" value="'+a[i]+'">'+
	   '<input type="hidden" name="name_user" value="'+name_searching+'">'+
         ' <input type="submit" value="delete" name="btn" /><br>'+         
     '</form>'
	 
}
var html_make='<!doctype html>\n<html lang="en">\n' +
    '\n<meta charset="utf-8">\n<title>node.js</title>\n'+'<form><input type = "text" value = "'+name_searching+'"name = "name_searcing" readonly><br></form>'
	+href_names +'\n\n';
res.write(html_make);
res.end();
}); 
}else{
	
}
});

main.get('/ASADMIN_DELETE', function (req, res) {
var name = req.query.name_user;
var name_movie = req.query.collection_movie;
mongodb.connect(url, function(err, db) {
 db.collection('users').find({ "name": name},{"Collection":1, "_id": 0}, function(err, users) {
			if(err){console.log("No users found");}
			else {users.forEach( function(User) {
				var json = JSON.stringify(User);
				var a= JSON.parse(json);
				var n = a.Collection;console.log(n);
				var m = n.replace(','+name_movie,"");
					
					db.collection('users').updateOne(
							{ "name" : name },
														{
																$set: { "Collection": m}
	
														}, function(err, results) {										
										
				});
				
								
								
			});	
				 }
});
 });
 backURL=req.header('Referer') || '/'; 
  res.redirect(backURL);
});









main.get('/addUser', function (req, res) {	
function onSameName(){
res.sendFile( __dirname + "/" + "wrong_username.html" );}
function onSuccesLogin(){
res.sendFile( __dirname + "/" + "main_page.html" );}    
    var name = req.query.first_name; 
    var password2 =req.query.last_name;	
	
	
	
mongodb.connect(url, function(err, db) {
 db.collection('users').find({ "name": name},{"name": 1,"password":1,"Collection":1, "_id": 0}, function(err, users) {
			if(err){console.log("No users found");}
			else {users.forEach( function(User) {
				var json = JSON.stringify(User);
				var a= JSON.parse(json);
				if (a.name==name&&a.password==password2){					
					db.collection('users').updateOne(
							{ "name" : name },
														{
																$set: { "password": password2  }
	
														}, function(err, results) {						
										
				});				
				onSuccesLogin();
				}else{
					onSameName();					
				}					
								
			})};	
				 
});
 }); 	





});

main.get('/addUser_register', function (req, res) {	
function onSameName(){
res.sendFile( __dirname + "/" + "wrong_username_register.html" );}
function onSuccesLogin(){
res.sendFile( __dirname + "/" + "main_page.html" );}    
var name = req.query.first_name_register; 
var password2 =req.query.last_name_register;	
	
var insertDocument = function(db, callback) {
   db.collection('users').insertOne( {
   "name" : name,
	  "password" : password2,
	   "Collection" : ""  
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Document successfully inserted");
    callback();
  });
  onSuccesLogin();
};	
mongodb.connect(url, function(err, db) {
 db.collection('users').find({ "name": name},{"name": 1,"password":1,"Collection":1, "_id": 0}, function(err, users3) {
			if(err){console.log("No users found");}
			else {users3.count(function (e, count) {
					console.log(count);
					if(count==0){
						insertDocument(db, function() {
      db.close();
  });
								}else{
									onSameName();
								}
					
													}
								);			
			};	
				 
});
 });
});

main.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

var server = main.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example main listening at http://%s:%s", host, port)

})