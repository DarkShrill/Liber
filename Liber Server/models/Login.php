<?php

class Login {

    private $conn;
    public $username;
    public $password;

    public function __construct($database) {

        $this->conn = $database;
        
    }

    public function login() {

        $query = "SELECT ID FROM utenti WHERE Email = '$this->username' AND Password = '$this->password'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        //if()
        
    }

}

?>