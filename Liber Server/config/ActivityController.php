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

            $query = "DELETE FROM tokens WHERE Token IN ( SELECT Token FROM Tokens WHERE Scadenza <= '";

            while (true) {

                $time_expire = date("Y-d-m h:i:s");
                $stmt = $this->database->prepare($query.$time_expire."')");
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