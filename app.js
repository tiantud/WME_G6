// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
******************************* csv2json **********************************
**************************************************************************/
var fs = require('fs');
var converter = new Converter({});
var jsonStruct_countrys = "";

//read from file
fs.createReadStream('world_data.csv').pipe(converter);

converter.on("end_parsed", function (jsonObj) {
   jsonStruct_countrys = jsonObj;
   //console.log(jsonObj); 
   fs.writeFile('world_data.json', JSON.stringify(jsonObj), 'utf-8');
});


/**************************************************************************
**************************** handle HTTP METHODS **************************
**************************************************************************/
// GET all countries with all properties
app.get('/items', function (req, res) {
    res.send( jsonStruct_countrys );
});

// GET selected country with all properties, id is the actual ID of country 
app.get('/items/:id', function (req, res) {
	if (parseInt(req.params.id) < jsonStruct_countrys.length() && parseInt(req.params.id) > 0)
		res.send( jsonStruct_countrys[parseInt(req.params.id) - 1]);
	else
		res.status(400).send("No such id " + req.params.id + " in databese.");
    
});

// GET all countries between id1 and id2, id1 and id2 are actral ID
app.get('/items/:id1/:id2', function (req, res) {
	var id1 = parseInt(req.params.id1) - 1;
	var id2 = parseInt(req.params.id2) - 1;
	if (id1<0 || id2<0 || id1>id2 || id1>jsonStruct_countrys.length())
		res.status(400).send("Range not possible.");
		
	var result = new Array();
	for(var i = id1 ;i <= id2; i++){
		result.push(jsonStruct_countrys[i]);
	}
    res.send( result );
});

// GET all properties
app.get('/properties', function (req, res) {
    res.send( Object.keys(jsonStruct_countrys[0]) );
});

//GET selected propertiy
app.get('/properties/:num', function (req, res) {
    var keys = Object.keys(jsonStruct_countrys[0]);
    res.send( keys[req.params.num] );
});


//POST country with given name and two random variables
app.post('/item', function (req, res){
	var keys = Object.keys(jsonStruct_countrys[0]);
	var new_country = {};
	new_country[keys[0]] = (jsonStruct_countrys.length + 1).toString();
	new_country[keys[1]] = req.params.name;
	new_country[keys[2]] = (Math.random() * 25).toString();
	new_country[keys[3]] = (Math.random() * 150).toString();
	jsonStruct_countrys.push(new_country);
	
	res.status(201).send("Added country "+ req.params.name + " to list！");
	fs.writeFile('world_data.json', JSON.stringify(jsonStruct_countrys), 'utf-8');
});

//DELETE last country
app.delete('/items', function (req, res) {
	var index_last = jsonStruct_countrys.length - 1;
    if (index_last > -1) {
		jsonStruct_countrys.splice(index_last, 1);
		res.status(204).send("Deleted last country "+ jsonStruct_countrys.length - 1);
	}
	fs.writeFile('world_data.json', JSON.stringify(jsonStruct_countrys), 'utf-8');
});

//DELETE selected country
app.delete('/items/:id', function (req, res) {
	var index = req.params.id - 1;
	jsonStruct_countrys.splice(index, 1);
	res.status(204).send("Item "+ req.params.name + " deleted successfully.");
	//res.status(400).send("No such id "+ req.params.name +" in database");
	fs.writeFile('world_data.json', JSON.stringify(jsonStruct_countrys), 'utf-8');
});

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});