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
    res.send( jsonStruct_countrys[parseInt(req.params.id) - 1]);
});

// GET all countries between id1 and id2, id1 and id2 are actral ID
app.get('/items/:id1/:id2', function (req, res) {
	var id1 = parseInt(req.params.id1) - 1;
	var id2 = parseInt(req.params.id2) - 1;
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

/*
//POST country with given name and two random variables
app.post('/items', function (req, res) {
	var newCountry = new Map(jsonStruct_countrys[0]);
	var keys = Object.keys(jsonStruct_countrys[0]);
	for (var prop in keys){
		newCountry[prop] = 0;
	}
	newCountry[keys[0]] = jsonStruct_countrys.length + 1;
	newCountry[keys[1]] = req.params.name;
	newCountry[keys[2]] = Math.random() * 25;
	newCountry[keys[3]] = Math.random() * 150;
    jsonStruct_countrys.push(newCountry);
	fs.writeFile('world_data.json', JSON.stringify(jsonStruct_countrys), 'utf-8');
});
*/

//DELETE last country
app.delete('/items', function (req, res) {
	var index_last = jsonStruct_countrys.length - 1;
    if (index_last > -1) {
		jsonStruct_countrys.splice(index_last, 1);
	}
	fs.writeFile('world_data.json', JSON.stringify(jsonStruct_countrys), 'utf-8');
});

//DELETE selected country
app.delete('/items/:id', function (req, res) {
	var index = req.params.id - 1;
	jsonStruct_countrys.splice(index, 1);
	fs.writeFile('world_data.json', JSON.stringify(jsonStruct_countrys), 'utf-8');
});

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});