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

if(empty($data->IDUtente)) {

    http_response_code(400);
    echo json_encode(array("outcome" => "missing user ID"));
    return;
} 

if(!empty($data->previous_ISBN_list)) {

    try {

        $ISBN_array = json_decode($data->previous_ISBN_list);
        $clause = "(";

        for($i = 0; $i < count($ISBN_array); $i++) {

            $clause .= "'" .$ISBN_array[$i]. "'";

            if($i != count($ISBN_array)) {

                $clause .= ",";

            }

        } 

        $clause .= ") ";

    } catch (\Throwable $th) {
        
        $clause = null;

    }

} else {

    $clause = null;

}

$library->IDUtente = $data->IDUtente;
$book_user_list = $library->get_suggested_books($clause);

if($book_user_list) {

    http_response_code(200);
    echo json_encode($book_user_list);

} else {
    
    http_response_code(400);
    echo json_encode(array("outcome" => "no book found"));

}

?>