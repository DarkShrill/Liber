<?php

    class ActivityController {

        private $database;
        private $timer;

        public function __construct($database, $is_timer = false) {

            $this->database = $database;
            
            if ($is_timer) {

                $this->timer = 60;

            }
        }

        private function check_expired_token() {

            $query_1 = "SELECT Token FROM Tokens WHERE Scadenza <= '";

            while (true) {

                $time_expire = date("Y-d-m h:i:s");
                
                $stmt = $this->database->prepare($query_1.$time_expire."'");
                $stmt->execute();


            }
        }
    }

?>