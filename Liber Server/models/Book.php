<?php

    class Book {

        public $ISBN;	
        public $Titolo;
        public $Autore;
        public $Trama;
        public $NumeroPagine;
        public $Prezzo;
        public $CasaEditrice;
        public $AnnoPubblicazione;
        public $Genere;
        public $conn;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function get_books() {

            $query = 'SELECT * FROM libri ';

            $found = false;

            if($this->ISBN) {
                $query .= 'WHERE ISBN LIKE "%'.$this->ISBN.'%"';
                $found = true;
            }

            if($this->Titolo) {
                $query .= ($found ? 'AND ' : 'WHERE ') + 'Titolo LIKE "%'.$this->Titolo.'%"';
                $found = true;
            }

            if($this->Autore) {
                $query .= ($found ? 'AND ' : 'WHERE ') + 'Autore LIKE "%'.$this->Autore.'%"';
                $found = true;
            }

            if($this->CasaEditrice) {
                $query .= ($found ? 'AND ' : 'WHERE ') + 'CasaEditrice LIKE "%'.$this->CasaEditrice.'%" ';
                $found = true;
            }

            if($this->Genere) {
                $query .= ($found ? 'AND ' : 'WHERE ') + 'Genere LIKE "%'.$this->Genere.'%" ';
                $found = true;
            }

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            if($stmt->rowCount() > 0) {
                $books_arr = array();
                $books_arr["libri"] = array();
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $item = array(
                        "ISBN" => $ISBN,
                        "Titolo" => $Titolo,
                        "Autore" => $Autore,
                        "Trama" => $Trama,
                        "NumeroPagine" => $NumeroPagine,
                        "Prezzo" => $Prezzo,
                        "CasaEditrice" => $CasaEditrice,
                        "AnnoPubblicazione" => $AnnoPubblicazione,
                        "Genere" => $Genere
                    );
                    array_push($books_arr["libri"], $item);
                }

                return $books_arr;
            } else {
                return false;
            }
        }

        public function insert_book() {

            $query = 'INSERT INTO libri(`ISBN`, `Titolo`, `Autore`, `Trama`, `NumeroPagine`, `Prezzo`, `CasaEditrice`, `AnnoPubblicazione`, `Genere`) VALUES (';
            $query .= '"'.$this->ISBN.'","'.$this->Titolo.'","'.$this->Autore.'","'.$this->Trama.'",'.$this->NumeroPagine.','.$this->Prezzo.',"'.$this->CasaEditrice.'",';
            $query .= '"'.$this->AnnoPubblicazione.'","'.$this->Genere.'")';
            
            $stmt = $this->conn->prepare($query);
            
            if($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function delete_book() {
            
            $query = "DELETE FROM libri WHERE ISBN = '$this->ISBN'";

            $stmt = $this->conn->prepare($query);
            
            if($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function update_book() {
            $query = "UPDATE libri ";
            $query .= 'SET Titolo = "'.$this->Titolo.'", Autore = "'.$this->Autore.'", Trama = "'.$this->Trama.'", NumeroPagine = '.$this->NumeroPagine.', ';
            $query .= 'Prezzo = '.$this->Prezzo.', CasaEditrice = "'.$this->CasaEditrice.'", AnnoPubblicazione = "'.$this->AnnoPubblicazione.'", Genere = "'.$this->Genere.'"';
            $query .= 'WHERE ISBN = "'.$this->ISBN.'"';

            $stmt = $this->conn->prepare($query);
            
            if($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

    }
