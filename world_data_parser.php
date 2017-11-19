<?php

class WorldDataParser
{

    // Read data from file: $csvPath.
    function parseCSV($csvPath)
    {
        $row = 0;
        $dataInArray;
        $headInArray;
        if (($handle = fopen($csvPath, "r")) !== FALSE) {
            $header = fgetcsv($handle);
            while ($row = fgetcsv($handle)) {
                $dataInArray[] = array_combine($header, $row);
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
        $preUri = dirname(__FILE__);
        $xml->openUri($preUri . "/world_data.xml");
        
        $xml->setIndentString('  ');
        $xml->setIndent(true);
        $xml->startDocument('1.0', 'utf-8');
        $xml->startElement('Contries');
        
        // With this .csv file, length = 25.
        $inputLength = count($dataInArray);
        for ($cp = 0; $cp < $inputLength; $cp ++) {
            // cp ------ Country Pointer
            $data = $dataInArray[$cp];
            $xml->startElement('Contry');
            $dataLength = count($dataInArray[0]);
            if (is_array($data)) {
                foreach ($data as $key => $value) {
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

    function printXML($xmlPath, $xslPath)
    {
        $xmldoc = new DOMDocument();
        $xmldoc->load($xmlPath);
        
        $xsldoc = new DOMDocument();
        $xsldoc->load($xslPath);
        
        $proc = new XSLTProcessor();
        $proc->registerPHPFunctions();
        $proc->importStyleSheet($xsldoc);
        echo $proc->transformToXML($xmldoc);
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
