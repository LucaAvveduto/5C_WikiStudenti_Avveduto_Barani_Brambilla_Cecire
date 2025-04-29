<?php
    require("databaseAccess.php");

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $input = json_decode(file_get_contents("php://input"), true);

    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            //return docs
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
                    case "deleteUser":
                        $mail = $input["id"];
                        $response = deleteUser($mail);
                        echo json_encode(["response" => $response]);
                    break;
                    case "addArticle":
                        
                    break;
                    case "modifyUserData":
                        //
                    break;
                    case "modifyRoles":
                        //
                    break;
                    case "modifyUserData":
                        //
                    break;
                    case "approveDraft":
                        //
                    break;
                    case "resetDoc":
                        //
                    break;
                    case "addVersion":
                        //
                    break;
                }
            }
            break;
        default:
        break;
    }
    exit;
?>