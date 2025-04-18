<?php
    require("databaseAccess.php");

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
                        $body = $input["user"];
                        $response = checkLogin($body["email"],$body["password"]);
                        echo json_encode(["response"=>$response]);
                        break;
                    case "register":
                        $body = $input["user"];
                        $res = addUser($body);
                        echo json_encode(["response" => $res]);
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
