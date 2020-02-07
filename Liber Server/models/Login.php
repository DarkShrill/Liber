<?php

class Login {

    private $conn;
    public $username;
    public $password;
    public $token;

    public function __construct($database) {

        $this->conn = $database;
        
    }

    public function login() {

        $hashed_pwd = hash("sha256", $this->password);

        $query = "SELECT ID FROM utenti WHERE Email = '$this->username' AND Password = '$hashed_pwd'";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $id = $stmt->fetchColumn();
        if($id != false) {
            return $this->generate_token($id);    
        } else {
            return false;
        }
    }

    private function generate_token($id) {
        $good_token = true;
        $tmp_token = "";

        do {
            $tmp_token = md5(uniqid(rand(), true));

            $query = "SELECT Token FROM tokens WHERE Token = '$tmp_token'";

            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $good_token = $stmt->fetchColumn();
        } while($good_token !== false);
        
        $time_expire = date("Y-d-m h:i:s", strtotime("+ 22 minutes"));
        $query = "INSERT INTO tokens ('Token', 'ID_utente', 'Scadenza') VALUES ('$tmp_token', $id, '$time_expire')";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $tmp_token;
    }

    public function logout() {
        $query = "DELETE FROM tokens WHERE Token = '$this->token'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $res = $stmt->rowCount();
        if($res == 0) {
            return true;
        } else {
            return false;
        }
    }

    public function refresh() {
        $time_expire = date("Y-d-m h:i:s", strtotime("+ 22 minutes"));

        $query = "UPDATE tokens SET 'Scadenza' = '$time_expire' WHERE Token = '$this->token'";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $res = $stmt->rowCount();
        if($res == 0) {
            return true;
        } else {
            return false;
        }
    }
}

?>