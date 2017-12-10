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
app.get('/items/:actralId', function (req, res) {
	var indexId = actralToIndex(req.params.actralId);
	if (idIsValid(indexId))
		res.send( jsonStruct_countrys[indexId]);
	else
		res.status(400).send("No such id {" + req.params.actralId + "} in databese.");
    
});

// GET all countries between actralId1 and actralId1, which are actral ID
// actralId is the actual ID of country, indexID is the index in jsonStruct_countrys
app.get('/items/:actralId1/:actralId2', function (req, res) {
	var indexId1 = actralToIndex(req.params.actralId1);
	var indexId2 = actralToIndex(req.params.actralId2);
	if (idIsValid(indexId1) && idIsValid(indexId2) && indexId1<=indexId2){
		var result = new Array();
		for(var i = id1 ;i <= id2; i++){
			result.push(jsonStruct_countrys[i]);
		}
		res.send( result );
	} else {
		res.status(400).send("Range not possible.");
	}
});

// GET all properties
app.get('/properties', function (req, res) {
    res.send( Object.keys(jsonStruct_countrys[0]) );
});

//GET selected propertiy
app.get('/properties/:num', function (req, res) {
	var keys = Object.keys(jsonStruct_countrys[0]);
	
	if (parseInt(num) <= jsonStruct_countrys.length() || parseInt(num) > 0)    
		res.send( keys[req.params.num] );
	else
		res.status(400).send("wrong input.");
});


//POST country with given name and two random variables
app.post('/item', function (req, res){
	var keys = Object.keys(jsonStruct_countrys[0]);
	var new_country = {};
	new_country[keys[0]] = (jsonStruct_countrys.length + 1).toString();
	new_country[keys[1]] = req.params.name;
	new_country[keys[2]] = (Math.random() * 25).toString();         //"beliebigen Properties"?
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
	res.status(400);
	fs.writeFile('world_data.json', JSON.stringify(jsonStruct_countrys), 'utf-8');
});

//DELETE selected country
app.delete('/items/:id', function (req, res) {
	var index = req.params.id - 1;
	if (idIsValid(req.params.id)){
		jsonStruct_countrys.splice(index, 1);
		res.status(204).send("Item "+ req.params.name + " deleted successfully.");
	}
	else
		res.status(400).send("No such id "+ req.params.name +" in database");
	fs.writeFile('world_data.json', JSON.stringify(jsonStruct_countrys), 'utf-8');
});

function actralToIndex(actralId){
	return actralId - 1;
}

function idIsValid(indexId){
	if(indexId > -1 && indexId < jsonStruct_countrys.length){
		return true;
	} else {
		return false;
	}
}

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});