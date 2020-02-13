<?php

class Payment {

    public $conn;
    public $user_ID;
    public $book_ID;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function pay() {

        if($this->add_to_payment()) {

            return $this->add_to_library();

        } else {
             return false; 
        }

    }

    private function add_to_library() {

        $query = "INSERT INTO librerie(`IDUtente`, `ISBNLibro`, `Segnalibro`) VALUES (";
        $query .= ''.$this->user_ID.',"'.$this->book_ID.'", 1)';

        $stmt = $this->conn->prepare($query);
            
        if($stmt->execute()) {
            return true;
        } else {
            return false;
        }

    }

    private function add_to_payment() {

        $date = date("Y-d-m h:i:s");

        $query_1 = "SELECT NumeroCarta FROM utenti WHERE ID = $this->user_ID ";

        $stmt = $this->conn->prepare($query_1);
        $stmt->execute();

        $NumeroCarta = $stmt->fetchColumn();

        if(!$NumeroCarta) {
            return false;
        }

        $query_2 = "SELECT Prezzo FROM libri WHERE ISBN = '$this->book_ID' ";

        $stmt = $this->conn->prepare($query_2);
        $stmt->execute();

        $Prezzo = $stmt->fetchColumn();

        if(!$Prezzo) {
            return false;
        }

        $query_3 = "INSERT INTO pagamenti(`IDUtente`, `ISBNLibro`, `Data`, `Importo`, `NumeroCarta`) VALUES (";
        $query_3 .= ''.$this->user_ID.', "'.$this->book_ID.'", "'.$date.'", '.$Prezzo.', "'.$NumeroCarta.'")';

        $stmt = $this->conn->prepare($query_3);
            
        if($stmt->execute()) {
            return true;
        } else {
            return false;
        }

    }

}

?>