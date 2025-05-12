<?php
    require("databaseAccess.php");
    require("mailer.php");

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $input = json_decode(file_get_contents("php://input"), true);

    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            if (!isset($_GET["act"])) return;
            if ($_GET["act"]) switch (trim(htmlspecialchars($_GET["act"]))) {
                case "docs":
                    if(isset($_GET["doc"])) {
                        $response = trim(htmlspecialchars(getDoc($_GET["doc"])));
                        echo json_encode(["response"=>$response]);
                    }else {
                        $response = getDocs();
                        echo json_encode(["response"=>$response]);
                    }
                break;
                case "drafts":
                    if(isset($_GET["draft"])) {
                        $response = trim(htmlspecialchars(getDraft($_GET["draft"])));
                        echo json_encode(["response"=>$response]);
                    }else {
                        $response = getDrafts();
                        echo json_encode(["response"=>$response]);
                    }
                break;
            }
            break;
        case "POST":
            if($input["action"]) {
                switch ($input["action"]) {
                    case "login":
                        $body = $input["user"];
                        $response = checkLogin(trim(htmlspecialchars($body["email"])),trim(htmlspecialchars($body["password"])));
                        echo json_encode(["response"=>$response]);
                        break;
                    case "register":
                        $body = $input["user"];
                        $res = addUser($body);
                        echo json_encode(["response" => $res]);
                        break;
                    case "deleteUser":
                        $mail = trim(htmlspecialchars($input["id"]));
                        $response = deleteUser($mail);
                        echo json_encode(["response" => $response]);
                    break;
                    case "addArticle":
                        $article = $input["article"];
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
                        $response = resetDoc($author ,$article, $version);
                        echo json_encode(["response" => $response]);
                    break;
                    case "addVersion":
                        $doc = trim(htmlspecialchars($input["doc"]));
                        $version = trim(htmlspecialchars($input["version"]));
                        $author = trim(htmlspecialchars($input["author"]));
                        $response = addVersion($author, $article, $version);
                        echo json_encode(["response" => $response]);
                    break;
                    case "discardDraft":
                        $id = trim(htmlspecialchars($input["id"]));
                        $response = discardDraft($id);
                        echo json_encode(["response" => $response]);
                    break;
                    case "registration":
                        $email = $input["email"];
                        sendRegistrationEmail($email);
                        sendCandidatureEmail("avvedutoluca@itis-molinari.eu");
                        echo json_encode(["response" => true]);
                    break;
                    case "draftApproval":
                        $email = $input("email");
                        sendDraftApprovalEmail($email);
                        echo json_encode(["response" => true]);
                    break;
                }
            }
            break;
        default:
        break;
    }
    exit;
?>