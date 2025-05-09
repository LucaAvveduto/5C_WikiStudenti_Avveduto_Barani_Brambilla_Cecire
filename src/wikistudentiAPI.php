<?php
    require("databaseAccess.php");

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $input = json_decode(file_get_contents("php://input"), true);

    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            if([$_GET["id"]]) {
                $id = $_GET["id"];
                $response = trim(htmlspecialchars(getDoc($id)));
                echo json_encode(["response"=>$response]);
            } else {
                $response = getDocs();
                echo json_encode(["response"=>$response]);
            }
            break;
        case "POST":
            if($input["action"]) {
                switch ($input["action"]) {
                    case "login":
                        $body = trim(htmlspecialchars($input["user"]));
                        $response = checkLogin($body["email"],$body["password"]);
                        echo json_encode(["response"=>$response]);
                        break;
                    case "register":
                        $body = trim(htmlspecialchars($input["user"]));
                        $res = addUser($body);
                        echo json_encode(["response" => $res]);
                        break;
                    case "deleteUser":
                        $mail = trim(htmlspecialchars($input["id"]));
                        $response = deleteUser($mail);
                        echo json_encode(["response" => $response]);
                    break;
                    case "addArticle":
                        $article = trim(htmlspecialchars($input["article"]));
                        $response = addArticle($article);
                        echo json_encode(["response" => $response]);
                    break;
                    case "modifyUserData":
                        $user = trim(htmlspecialchars($input["user"]));
                        $response = modifyUserData($user);
                        echo json_encode(["response" => $response]);
                    break;
                    case "modifyRoles":
                        $user = trim(htmlspecialchars($input["user"]));
                        $role = trim(htmlspecialchars($input["role"]));
                        $response = modifyRoles($user);
                        echo json_encode(["response" => $response]);
                    break;
                    case "approveDraft":
                        $article = trim(htmlspecialchars($input["article"]));
                        $response = approveDraft($article);
                        echo json_encode(["response" => $response]);
                    break;
                    case "resetDoc":
                        $doc = trim(htmlspecialchars($input["doc"]));
                        $version = trim(htmlspecialchars($input["version"]));
                        $response = resetDoc($article, $version);
                        echo json_encode(["response" => $response]);
                    break;
                    case "addVersion":
                        $doc = trim(htmlspecialchars($input["doc"]));
                        $version = trim(htmlspecialchars($input["version"]));
                        $response = addVersion($article, $version);
                        echo json_encode(["response" => $response]);
                    break;
                    case "discardDraft":
                        $id = trim(htmlspecialchars($input["id"]));
                        $response = discardDraft($id);
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