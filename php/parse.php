<?php 
	require('world_data_parser.php');
	$newParser = new WorldDataParser;
	$dataInArray = $newParser -> parseCSV("../Material/world_data_v1.csv");
	$num = count($dataInArray);
	echo <<<EOT
		<div>• Here are the data in .csv file:</div>
		<br />
EOT;
	for ($c=0; $c < $num; $c++) {
		$comma_separated = implode(",", $dataInArray[$c]);
		echo <<<EOT
		<pre>$comma_separated</pre>
EOT;
	}
?>
