<?php
	class WorldDataParser{
		
		function parseCSV($csvPath){
			$row = 0;
			$dataInArray;
			if (($handle = fopen($csvPath, "r")) !== FALSE) {
				while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
					$dataInArray[$row] = $data;
					$row++;
				}
				fclose($handle);
			}
			return $dataInArray;
		}
		
		function saveXML($csvPath){
			# Save for tomorrow...
		}
		
		function printXML($csvPath){
			# Save for the day after tomorrow...
		}
	}
?>