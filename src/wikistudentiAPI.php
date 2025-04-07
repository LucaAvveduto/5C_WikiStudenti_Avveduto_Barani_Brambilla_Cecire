<?php
    include "databaseAccess.php";

    header("Content-Type: application/json");

    $input = json_decode(file_get_contents("php://input"), true);

    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            if (isset($_GET["id"])) {
                $output = array("aaa" => $_GET["id"]);
                echo json_encode($output);
            }
            break;
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
    }
    exit;
?>
