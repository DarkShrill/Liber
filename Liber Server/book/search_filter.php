<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");   
    header("Access-Control-Allow-Headers: *");
    http_response_code(200);
    exit;
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/Book.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!$data || empty($data->Filtro)) {
    http_response_code(401);
    echo json_encode(array("outcome" => "missing filter"));
    return;
}

if(in_array($data->Filtro, array("Autore", "CasaEditrice", "Genere"))) {

    $book = new Book($db);
    $filter_list = $book->search_filter($data->Filtro);

    if($filter_list) {

        http_response_code(200);
        echo json_encode($filter_list);

    } else {
    
        http_response_code(400);
        echo json_encode(array("outcome" => "no filter found"));

    }

} else {

    http_response_code(401);
    echo json_encode(array("outcome" => "filter can only be one of the following: \"Autore\", \"CasaEditrice\", \"Genere\""));

}

?>