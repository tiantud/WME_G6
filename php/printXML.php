<?php
require ('world_data_parser.php');
$newParser = new WorldDataParser();
$dataInArray = $newParser->parseCSV("../Material/world_data_v1.csv");
$newParser->saveXML($dataInArray);

$xmlPath = "../Material/world_data.xml";
$xslPath = "../stylesheet/printXML.xsl";
$newParser->printXML($xmlPath, $xslPath);
?>