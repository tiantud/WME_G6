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
****************************** csv2json *********************************
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
********************** handle HTTP METHODS ***********************
**************************************************************************/
// GET all properties
app.get('/properties', function (req, res) {
    var keys = Object.keys(jsonStruct_countrys[0]);
    res.send( keys );
});



// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});