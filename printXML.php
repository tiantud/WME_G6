<?php
require ('world_data_parser.php');
$newParser = new WorldDataParser();
$dataInArray = $newParser->parseCSV("world_data_v1.csv");
$newParser->saveXML($dataInArray);

$xmlPath = "world_data.xml";
$xslPath = "printXML.xsl";
$newParser->printXML($xmlPath, $xslPath);
?>