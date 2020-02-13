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

$book = new Book($db);

if(!empty($data->ISBN) && !empty($data->Titolo) && !empty($data->Autore) && !empty($data->Trama) && !empty($data->NumeroPagine) && !empty($data->Prezzo)
    && !empty($data->CasaEditrice) && !empty($data->AnnoPubblicazione) && !empty($data->Genere)) {
    $book->ISBN = $data->ISBN;
    $book->Titolo = $data->Titolo;
    $book->Autore = $data->Autore;
    $book->Trama = $data->Trama;
    $book->NumeroPagine = $data->NumeroPagine;
    $book->Prezzo = $data->Prezzo;
    $book->CasaEditrice = $data->CasaEditrice;
    $book->AnnoPubblicazione = $data->AnnoPubblicazione;
    $book->Genere = $data->Genere;

    if($book->insert_book()) {
        http_response_code(200);
        echo json_encode(array("outcome" => "succes"));
    } else {
        http_response_code(400);
        echo json_encode(array("outcome" => "error during insertion"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("outcome" => "invalid book data"));
}

?>