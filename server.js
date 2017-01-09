var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var fs = require("fs");
var file = 'bundle.json';

app.use( bodyParser.text() )

//just for testing
var bundle1 = {
   "bundle4" : {
      "places" : "Övik",
	  "name" : "path4",
	  "info" : "path description",
	  "length" : "5",
	  "polyline" : "lat-lon",
	  "duration" : "8",
	  "image" : "null",
	  "id": 4
   }
}

app.post('/addPlace', function (req, res) {
   // First read existing data.
   fs.readFile( __dirname + "/" + file, 'utf8', function (err, data) {
	   if(err) throw err; 
       
	   data = JSON.parse(data);
	   
       //data["bundle4"] = bundle1["bundle4"];
	   data["bundle4"] = req.body;	//adding obj to the bundle file
	   console.log(data);
	   var strData = JSON.stringify(data);
	   //console.log(req.body);
	   //var strBody = JSON.stringify(req.body);
	   
		fs.writeFile(file, strData, function(err){
			if(err) throw err;
			console.log('Bundle added to the file');
		});
       console.log(strData);
	   //res.end(JSON.stringify(data));
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