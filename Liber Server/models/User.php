<?php

class User {

    public $name;
    public $surname;
    public $email;
    public $password;
    public $payment_card;
    public $conn;

    function __construct($conn) {

        $this->conn = $conn;
        
    }

    public function registration() {

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
}

?>