<?php

class WorldDataParser
{

    // read data from file: $csvPath.
    function parseCSV($csvPath)
    {
        $row = 0;
        $dataInArray;
        if (($handle = fopen($csvPath, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $dataInArray[$row] = $data;
                $row ++;
            }
            fclose($handle);
        }
        return $dataInArray;
    }

    // save array as a xml file.
    function saveXML($dataInArray)
    {
        $xml = new XMLWriter();
		
	//XMLWriter on windows 10 can not parse relative path
	$preUri = dirname(dirname(__FILE__));
		
        $xml->openUri($preUri . "/Material/world_data.xml");
        $xml->setIndentString('  ');
        $xml->setIndent(true);
        $xml->startDocument('1.0', 'utf-8');
        $xml->startElement('Contries');

        $inputLength = count($dataInArray); // With this .csv file, length = 26
        for ($cp = 1; $cp < $inputLength; $cp ++) {
            // cp ------ Country Pointer
            $data = $dataInArray[$cp];
            $xml->startElement('Contry');
            $dataLength = count($dataInArray[0]);
            if (is_array($data)) {
                $keys = $dataInArray[0];
                for ($vc = 0; $vc < $dataLength; $vc ++) {
                    // vc ------ Value Pointer
                    $key = $keys[$vc];
                    $value = $dataInArray[$cp][$vc];
                    $xml->startElement(mySubStr($key));
                    $xml->text(mySubStr($value));
                    $xml->endElement(); 
                }
            }
            $xml->endElement(); 
        }
        $xml->endElement(); 
        $xml->endDocument();
        $xml->flush();
    }

    function printXML($csvPath)
    {
        // Save for the day after tomorrow...
    }
}

function mySubStr($str)
{
    $arr = explode(" ", $str);
    return $arr[0];
}

?>
