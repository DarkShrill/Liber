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
include_once '../models/Book.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

// if(!$data || empty($data->token)) {
//     http_response_code(401);
//     echo json_encode(array("outcome" => "missing token"));
//     return;
// }

$token_check = new ActivityController($db, false);
$token_check->token = $data->token;


if($token_check->check_token() === false) {
    http_response_code(401);
    echo json_encode(array("outcome" => "bad token"));
    return;
}

$book = new Book($db);
$book->ISBN = empty($data->ISBN) ? false : $data->ISBN;
$book->Titolo = empty($data->Titolo) ? false : $data->Titolo;
$book->Autore = empty($data->Autore) ? false : $data->Autore;
$book->CasaEditrice = empty($data->CasaEditrice) ? false : $data->CasaEditrice;
$book->Genere = empty($data->Genere) ? false : $data->Genere;

$book_list = $book->get_books();

if($book_list) {

    http_response_code(200);
    echo json_encode($book_list);

} else {
    http_response_code(400);
    echo json_encode(array("outcome" => "no book found"));

}


?>