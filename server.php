<?php
require "./src/word.php";
require "./src/search.php";

$word = $_GET['word'];

try {
    $res = Word::search($word);

//    $types = [];
//    foreach ($res->types as $type) {
//        $types[] = $type;
//    }
//
//    $res->types = $types;

    echo json_encode($res);

} catch (Exception $err) {
    echo json_encode($err);
}