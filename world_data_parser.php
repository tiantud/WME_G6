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
		
		//Shouldn't be used when the html file is too long.
		$htmlStr = file_get_contents("index.html");
		$tableStartPos = strpos($htmlStr, '<table id = "tbl">');
		$tableEndPos = strpos($htmlStr, '</table>') + 7;
		
		$htmlBeforeTable = substr($htmlStr,0,$tableStartPos - 1);
		$htmlAfterTable = substr($htmlStr,$tableEndPos + 1);
		
		echo $htmlBeforeTable;
        echo $proc->transformToXML($xmldoc);
		echo $htmlAfterTable;
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
