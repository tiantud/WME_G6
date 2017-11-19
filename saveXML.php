<?php
require ('world_data_parser.php');
$newParser = new WorldDataParser();
$dataInArray = $newParser->parseCSV("world_data_v1.csv");
$num = count($dataInArray);
$result = $newParser->saveXML($dataInArray);
if($result){
    echo <<<EOT
        <br />
		<div>• A .xml file has been successfully created/updated near the .csv file.</div>
EOT;
}
?>
