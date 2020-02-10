<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../config/ActivityController.php';
include_once '../models/Book.php';

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

if(empty($data->ISBN)) {

    http_response_code(400);
    echo json_encode(array("outcome" => "missing ISBN"));
    return; 

} 

$book = new Book($db);

$book->ISBN = $data->ISBN;

if($book->delete_book()) {

    http_response_code(200);
    echo json_encode(array("outcome" => "succes"));

    } else {

        http_response_code(400);
        echo json_encode(array("outcome" => "error during elimination"));
}

?>