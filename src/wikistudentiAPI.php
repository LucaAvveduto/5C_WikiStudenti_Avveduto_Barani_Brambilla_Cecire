<?php
    include "databaseAccess.php";

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $input = json_decode(file_get_contents("php://input"), true);

    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            if (isset($_GET["id"])) {
                $output = array("aaa" => $_GET["id"]);
                echo json_encode($output);
            }
            break;
        case "POST":
            if($input["action"]) {
                switch ($input["action"]) {
                    case "login":
                        echo json_encode(["hola"=>$input]);
                        break;
                    case "register":
                        echo json_encode(["ds"=>$input]);
                        break;
                }
            } else {
                //Chiamate post
            }
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
    }
    exit;
?>
