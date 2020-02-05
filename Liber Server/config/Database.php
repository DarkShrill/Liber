<?php

    class Database {

        public $conn;

        public function getConnection() {
        
            $this->conn = null;
        
            try {
                
			$this->conn = new PDO("mysql:host=localhost;dbname=liber", "root", "");
            $this->conn->exec("set names utf8");
            
            }
            
		    catch(PDOException $exception) {
            
                echo "Errore di connessione: " . $exception->getMessage();

			}
        
            return $this->conn;
		}
    }
