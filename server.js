var express = require('express');
var app = express();
var fs = require("fs");
var file = 'bundle.json';

var bundle = {
   "bundle4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addPlace', function (req, res) {
   // First read existing data.
   fs.readFile( __dirname + "/" + file, 'utf8', function (err, data) {
       data = JSON.parse( data );
	   //now data is an obj, so we can access its properties
	   //data.push(bundle);
       //data["bundle4"] = bundle["bundle4"];
	   console.log(req.body);
	   data["bundle4"] = req.body;
   fs.writeFile(file, JSON.stringify(data), function(err){
	   if(err) throw err;
	   console.log('Bundle added to the file');
   });
       //console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.get('/listPlaces', function (req, res) {
   fs.readFile( __dirname + "/" + file, 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/place/:id', function (req, res) {
   // First read existing data.
   fs.readFile( __dirname + "/" + file, 'utf8', function (err, data) {
       //Define to JSON type
	   bundle = JSON.parse( data );
       var place = bundle["bundle" + req.params.id] 
       console.log("Places: ", place.places );
	   console.log("Name: ", place.name );
       res.end( JSON.stringify(place));
   });
})

app.delete('/deletePlace/:id', function (req, res) {
   // First read existing data.
   fs.readFile( __dirname + "/" + file, 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["bundle" + req.params.id];
       fs.writeFile(file, JSON.stringify(data), function(err){
		   if(err) throw err;
		   console.log('bundle deleted');
	   });
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})