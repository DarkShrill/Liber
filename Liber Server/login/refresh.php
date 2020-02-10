<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../config/ActivityController.php';
include_once '../models/Login.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!$data || empty($data->token)) {
    http_response_code(401);
    echo json_encode(array("outcome" => "missing token"));
    return;
}

$login = new Login($db);
$login->token = $data->token;

if($login->refresh()) {
    http_response_code(200);
    echo json_encode(array("outcome" => "success"));
} else {
    http_response_code(400);
    echo json_encode(array("outcome" => "error during login refresh"));
}

?>