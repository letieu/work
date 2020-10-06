<?php


function searchDirectoryIterator($path, $string){
    $dir = new DirectoryIterator($path);

    $result = array();

    foreach ($dir as $file){
        if (!$file->isDot()){
            $content = file_get_contents($file->getPathname());
            $types = searchContent($content, $string);

            array_push($result, ...$types);
        }
    }

    return $result;
}

// TIm kiem trong 1 file
function searchContent($content, $string)
{
    $stringLen = strlen($string);
    $types = [];
    $offset = 0;

    while ($pos = stripos($content, ' ' . $string . '/', $offset)) {
        $offset = $pos +1;
        $type = substr($content, $pos + $stringLen + 2, 4);
        $positionOfSpace = strpos($type,' ');
        if ($positionOfSpace) {
           $type = substr($type,0, $positionOfSpace);
        }

        $types[] = $type;

    }
    return $types;

}

