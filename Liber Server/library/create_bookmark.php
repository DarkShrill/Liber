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
include_once '../config/ActivityController.php';
include_once '../models/Library.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!$data || empty($data->token)) {
    http_response_code(401);
    echo json_encode(array("outcome" => "missing token"));
    return;
}

$token_check = new ActivityController($db, false);
$token_check->token = $data->token;


if($token_check->check_token() === false) {
    http_response_code(401);
    echo json_encode(array("outcome" => "bad token"));
    return;
}

$library = new Library($db);

if(empty($data->IDUtente) || empty($data->ISBN)) {

    http_response_code(400);
    echo json_encode(array("outcome" => "missing user ID or ISBN"));
    return;
}

if(empty($data->Bookmark)) {
    http_response_code(400);
    echo json_encode(array("outcome" => "missing bookmark"));
    return;
}

$library->IDUtente = $data->IDUtente;
$library->ISBN = $data->ISBN;

if($library->set_bookmark($data->Bookmark)) {
    http_response_code(200);
    echo json_encode(array("outcome" => "success"));
} else {
    http_response_code(400);
    echo json_encode(array("outcome" => "error during bookmark insertion"));
}
?>