<?php
require ('world_data_parser.php');
$newParser = new WorldDataParser();
$dataInArray = $newParser->parseCSV("../Material/world_data_v1.csv");
$num = count($dataInArray);
echo "<pre>";print_r($dataInArray);echo "<pre>";
?>
