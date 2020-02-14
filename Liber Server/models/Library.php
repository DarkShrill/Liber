<?php

class Library {

    public $ISBN;	
    public $Titolo;
    public $Autore;
    public $Trama;
    public $NumeroPagine;
    public $Prezzo;
    public $CasaEditrice;
    public $AnnoPubblicazione;
    public $Genere;
    public $IDUtente;
    public $conn;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function get_user_books(){

            $query = 'SELECT * FROM libri JOIN utenti JOIN librerie ';
            $query .= 'WHERE utenti.ID = librerie.IDUtente AND libri.ISBN = librerie.ISBNLibro ';
            $query .= "AND librerie.IDUtente = $this->IDUtente";

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

        public function search_filter($filter) {

            $query = "SELECT DISTINCT $filter FROM libri jOIN utenti JOIN librerie ";
            $query .= 'WHERE utenti.ID = librerie.IDUtente AND libri.ISBN = librerie.ISBNLibro ';
            $query .= "AND librerie.IDUtente = $this->IDUtente";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            if($stmt->rowCount() > 0) {

                $books_arr = array();

                while ($row = $stmt->fetchColumn()){
                    
                    array_push($books_arr, $row);
                }

                return $books_arr;

            } else {
                return null;
            }
        }

        public function set_bookmark($page) {

            $query = "UPDATE librerie SET Segnalibro = $page ";
            $query .= "WHERE IDUtente = $this->IDUtente AND ISBNLibro = $this->ISBN ";

            $stmt = $this->conn->prepare($query);
            
            if($stmt->execute()) {
                return true;
            } else {
                return false;
            }

        }

        public function get_bookmark() {

            $query = "SELECT Segnalibro FROM librerie ";
            $query .= "WHERE IDUtente = $this->IDUtente AND ISBNLibro = '$this->ISBN' ";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $books_arr = array();

            while (($row = $stmt->fetchColumn()) !== false){
                
                array_push($books_arr, $row);
            }

            return $books_arr;
        }

        public function get_suggested_books($clause){

            $query_1 = "SELECT Genere, COUNT(Genere) AS Frequenza FROM librerie JOIN libri ";
            $query_1 .= "ON librerie.ISBNLibro = libri.ISBN ";
            $query_1 .= "WHERE librerie.IDUtente = $this->IDUtente " . ($clause ? " AND librerie.ISBNLibro NOT IN " . $clause : "");
            $query_1 .= "GROUP BY Genere ORDER BY Frequenza DESC LIMIT 0,3";

            $query_2 = "SELECT Genere FROM (" . $query_1 .") AS Generi";

            $query_3 = "SELECT * FROM Libri WHERE Genere IN (" . $query_2 . ") ORDER BY Genere";

            echo $query_3;

        }
    }

?>