<?php

class WorldDataParser
{

    // Read data from file: $csvPath.
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

    // Save array as a xml file.
    function saveXML($dataInArray)
    {
        $xml = new XMLWriter();
        
        // XMLWriter on windows 10 can not parse relative path.
        $preUri = dirname(dirname(__FILE__));
        
        $xml->openUri($preUri . "/Material/world_data.xml");
        $xml->setIndentString('  ');
        $xml->setIndent(true);
        $xml->startDocument('1.0', 'utf-8');
        $xml->startElement('Contries');
        
        // With this .csv file, length = 26.
        $inputLength = count($dataInArray);
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
        $result = $xml->endDocument();
        $xml->flush();
        return $result;
    }

    function printXML($csvPath)
    {
        // Save for the day after tomorrow...
    }
}

// Get the first word from a sentense.
// Input: "Just like this."
// Return: "Just"
function mySubStr($str)
{
    $arr = explode(" ", $str);
    return $arr[0];
}

?>
