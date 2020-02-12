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
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!$data) {
    http_response_code(401);
    echo json_encode(array("outcome" => "missing data"));
    return;
}

$user = new User($db);

if(!empty($data->Nome) && !empty($data->Cognome) && !empty($data->Email) && !empty($data->Password)) {

    $user->name = $data->Nome;
    $user->surname = $data->Cognome;
    $user->email = $data->Email;
    $user->password = $data->Password;

    if($user->insert_user()) {
        http_response_code(200);
        echo json_encode(array("outcome" => "succes"));
    } else {
        http_response_code(400);
        echo json_encode(array("outcome" => "error during insertion"));
    }

} else {

    http_response_code(400);
    echo json_encode(array("outcome" => "invalid user data"));
}

?>