<?php

    class ActivityController {

        private $database;
        private $timer;
        public $token;

        public function __construct($database, $is_timer = false) {

            $this->database = $database;
            
            if ($is_timer) {
                $this->timer = 60;
                $this->check_expired_token();
            }
        }

        private function check_expired_token() {

            $query = "SELECT Token FROM tokens WHERE Scadenza <= '";
            $query_2 = "DELETE FROM tokens WHERE Token IN (";

            while (true) {

                $time_expire = date("Y-m-d h:i:s");
                echo $query.$time_expire."')";
                $stmt = $this->database->prepare($query.$time_expire."'");
                $stmt->execute();

                while($row = $stmt->fetchColumn()) {
                   $query_2 .= "'$row',"; 
                }

                $query_2 = substr($query_2, 0, -1);
                $stmt = $this->database->prepare($query_2.")");
                $stmt->execute();

                sleep($this->timer);
            }
        }

        public function check_token() {
            $query = "SELECT Token FROM tokens WHERE Token = '$this->token'";

            $stmt = $this->database->prepare($query);
            $stmt->execute();

            return $stmt->fetchColumn() !== false ? true : false;
        }
    }

?>