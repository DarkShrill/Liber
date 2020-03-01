<?php

    set_time_limit(0);

    include_once 'Database.php';
    include_once 'ActivityController.php';

    $database = new Database();
    $db = $database->getConnection();

    $token_check = new ActivityController($db, true);
?>