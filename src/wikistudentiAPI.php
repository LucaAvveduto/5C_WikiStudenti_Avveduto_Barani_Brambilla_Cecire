<?php
    require("databaseAccess.php");

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $input = json_decode(file_get_contents("php://input"), true);

    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            $response = getDocs();
            echo json_encode(["response"=>$response]);
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
                        $article = $input["article"];
                        $response = addArticle($article);
                        echo json_encode(["response" => $response]);
                    break;
                    case "modifyUserData":
                        $user = $input["user"];
                        $response = modifyUserData($user);
                        echo json_encode(["response" => $response]);
                    break;
                    case "modifyRoles":
                        $user = $input["user"];
                        $role = $input["role"];
                        $response = modifyRoles($user);
                        echo json_encode(["response" => $response]);
                    break;
                    case "approveDraft":
                        $article = $input["article"];
                        $response = approveDraft($article);
                        echo json_encode(["response" => $response]);
                    break;
                    case "resetDoc":
                        $doc = $input["doc"];
                        $version = $input["version"];
                        $response = resetDoc($article, $version);
                        echo json_encode(["response" => $response]);
                    break;
                    case "addVersion":
                        $doc = $input["doc"];
                        $version = $input["version"];
                        $response = addVersion($article, $version);
                        echo json_encode(["response" => $response]);
                    break;
                }
            }
            break;
        default:
        break;
    }
    exit;
?>