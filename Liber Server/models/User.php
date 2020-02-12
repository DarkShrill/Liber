<?php

class User {

    public $name;
    public $surname;
    public $email;
    public $password;
    public $payment_card = null;
    public $conn;
    public $ID;

    function __construct($conn) {

        $this->conn = $conn;
        
    }

    public function insert_user() {

        $hashed_pwd = hash("sha256", $this->password);

        $query = "INSERT INTO utenti (`Nome`, `Cognome`, `Email`, `Password`) VALUES ('$this->name', '$this->surname', '$this->email', '$hashed_pwd') ";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $res = $stmt->rowCount();

        if($res > 0) {
            return true;
        } else {
            return false;
        }


    }

    public function delete_user() {

        $query = "DELETE FROM utenti WHERE ID = '$this->ID' ";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $res = $stmt->rowCount();

        if($res > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function update_user() {

        $hashed_pwd = hash("sha256", $this->password);

        $query = "UPDATE utenti ";
        $query .= 'SET Nome = "'.$this->name.'", Cognome = "'.$this->surname.'", ';
        $query .= 'Email = "'.$this->email.'", Password = "'.$hashed_pwd.'" ';
        $query .= 'WHERE ID = '.$this->ID.'';

        $stmt = $this->conn->prepare($query);
            
        if($stmt->execute()) {
            return true;
        } else {
            return false;
        }
        
    }

    public function create_credit_card() {

        $query = 'UPDATE utenti SET NumeroCarta = "'.$this->payment_card.'" WHERE ID = '.$this->ID;
        
        $stmt = $this->conn->prepare($query);
            
        if($stmt->execute()) {
            return true;
        } else {
            return false;
        }

    }
}

?>