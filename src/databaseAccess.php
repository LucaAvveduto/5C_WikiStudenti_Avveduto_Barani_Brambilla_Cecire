<?php

use LDAP\Result;

function connect() {
  $servername = "localhost";
  $username = "root";
  $password = "";
  $DB = "wiki";
  $conn = new mysqli($servername, $username, $password, $DB);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  return $conn;
}

function checkLogin($username, $password) {
  $conn = connect();
  $stmt = $conn->prepare("SELECT * FROM User WHERE Email=? AND Password=?");
  $stmt->bind_param("ss", $username, $password);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();
  $conn->close();
  return $result->num_rows === 1 ? true : false;
}

function addUser($params) {
  try {
    $conn = connect();
    $stmt = $conn->prepare(
      "INSERT INTO User (Email, Name, Surname, Class, Password, isEditor, isModerator, isAdministrator) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $email = $params["email"];
    $name = $params["nome"];
    $surname = $params["cognome"];
    $classe = $params["classe"];
    $password = $params["password"];
    $isEditor = intval($params["radio0"]);
    $isModerator = intval($params["radio1"]);
    $isAdministrator = 0;

    $stmt->bind_param(
      'sssssiii',
      $email,
      $name,
      $surname,
      $classe,
      $password,
      $isEditor,
      $isModerator,
      $isAdministrator
    );

    $stmt->execute();
    $stmt->close();
    $conn->close();
    return true;
  } catch (Exception $e) {
    return 'Message: ' . $e->getMessage();
  }
}

function deleteUser($mail) 
{  
  try {
    $conn = connect();
    $stmt = $conn->prepare("DELETE * FROM User WHERE Email=?");
    $stmt->bind_param("s", $mail);
    $stmt->execute();
    return true;
  } catch (Exception $e) {
    return false;
  }
}

function addArticle($params) {
  try {
    $conn = connect();
    $conn -> query("INSERT INTO Article VALUES()");
    $id_res = $conn -> query("SELECT * FROM Article ORDER BY id DESC LIMIT 1");
    $id = $id_res->fetch_assoc();

    $stmt = $conn -> prepare(
      "INSERT INTO Image(path, caption) VALUES (?, ?)"
    );
    $niente = "";
    $stmt->bind_param("ss", $params["mainImageLink"], $niente);
    $stmt->execute();

    $stmt = $conn -> prepare(
      "select Id from Image where Path = ?"
    );
    $stmt->bind_param("s", $params["mainImageLink"]);
    $stmt->execute();
    $imageId = $stmt->get_result()->fetch_assoc()["Id"];

    $stmt = $conn -> prepare(
      "INSERT INTO Version(article, Title, Text, Abstract, Approved, MainImage) VALUES (?, ?, ?, ?, ?, ?)"
    );
    
    $article = intval($id["Id"]);
    $title = $params["title"];
    $text = $params["text"];
    $abstract = $params["abstract"];
    $approved = 0;
    $mainImg = $imageId;

    $stmt->bind_param(
      'isssis',
      $article,
      $title,
      $text,
      $abstract,
      $approved,
      $mainImg,
    );

    $stmt->execute();
    $stmt->get_result();

    $stmt->close();
    $conn->close();
    return true;
  } catch (Exception $e) {
    return 'Message: ' . $e->getMessage();
  }
}

function modifyUserData($user) {
  try {
    $conn = connect();
    $stmt = $conn->prepare(
      "UPDATE User
        SET Email=?, Name=?, Surname=?, Class=?, Password=?, isEditor=?, isModerator=?, isAdministrator=?
        WHERE id = ?;"
    );
    $email = $user["email"];
    $name = $user["nome"];
    $surname = $user["cognome"];
    $classe = $user["classe"];
    $password = $user["password"];
    $isEditor = intval($user["isEditor"]);
    $isModerator = intval($user["isModerator"]);
    $isAdministrator = intval($user["isAdministrator"]);
    $id = intval($user["id"]);
    
    $stmt->bind_param(
      'sssssiiii',
      $email,
      $name,
      $surname,
      $classe,
      $password,
      $isEditor,
      $isModerator,
      $isAdministrator,
      $id
    );
    $stmt->execute();
    $stmt->close();
    $conn->close();
    return true;
  } catch (Exception $e) {
    return false;
  }
}

function modifyRoles($roles) {
  try {
    $conn = connect();
    $stmt = $conn->prepare(
      "UPDATE User
        SET isEditor=?, isModerator=?, isAdministrator=?
        WHERE id = ?;"
    );
  
    $isEditor = intval($roles["isEditor"]);
    $isModerator = intval($roles["isModerator"]);
    $isAdministrator = intval($roles["isAdministrator"]);
    $id = intval($roles["id"]);
    
    $stmt->bind_param(
      'iiii',
      $isEditor,
      $isModerator,
      $isAdministrator,
      $id
    );
    $stmt->execute();
    $stmt->close();
    $conn->close();
    return true;
  } catch (Exception $e) {
    return false;
  }
}

function approveDraft($article) {
  try {
    $conn = connect();
    $stmt = $conn->prepare(
      "UPDATE Version
        SET Approved=?
        WHERE id = ?;"
    );
  
    $id = intval($article["id"]);
    
    $stmt->bind_param(
      'ii',
      1,
      $id
    );
    $stmt->execute();
    $stmt->close();
    $conn->close();
    return true;
  } catch (Exception $e) {
    return false;
  }
}

function discardDraft($article) {
  try {
    $conn = connect();
    $stmt = $conn->prepare(
      "DELETE FROM Version WHERE id = ?;"
    );
  
    $id = intval($article["id"]);
    
    $stmt->bind_param(
      'i',
      $id
    );
    $stmt->execute();
    $stmt->close();
    $conn->close();
    return true;
  } catch (Exception $e) {
    return false;
  }
}

function resetDoc($article, $version) {
  try {
    $conn = connect();
    $stmt = $conn->prepare(
      "UPDATE Version
        SET isLast=?
        WHERE article=? and Id=?;"
    );
      
    $stmt->bind_param(
      'iii',
      1,
      $article,
      $version
    );
    $stmt->execute();
    $stmt->close();
    $conn->close();
    return true;
  } catch (Exception $e) {
    return false;
  }
}

function addVersion($author, $article, $version) {
  try {
    $conn = connect();

    $stmt = $conn->prepare(
      "INSERT INTO Image(Path,Caption) VALUES (?, ?)"
    );

    $path = $version["path"];
    $caption = $version["caption"];

    $stmt->bind_param("ss", $path, $caption);
    $stmt->execute();

    $stmt = $conn->prepare(
      "INSERT INTO Version(article, Title, Text, Abstract, Approved, MainImage) VALUES (?, ?, ?, ?, ?, ?)"
    );
      
    $title = $version["title"];
    $text = $version["text"];
    $abstract = $version["abstract"];
    $approved = 0;
    $mainImg = $version["MainImage"];

    $stmt->bind_param(
      'isssii',
      $article,
      $title,
      $text,
      $abstract,
      $approved,
      $mainImg,
    );
    $stmt->execute();

    $stmt = $conn->prepare(
      "INSERT INTO userinteractsversion VALUES(?, ?)"
    );

    $stmt -> bind_param("ss", $author, $version);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    return true;
  } catch (Exception $e) {
    return false;
  }
}

function getDocs() {
  $conn = connect();
  $sql = $conn -> query("SELECT * FROM version WHERE approved=1");
  $res = array();

  while ($row = $sql->fetch_assoc()) {
    $res[] = $row;
  }

  $conn->close();
  return $res;
}

function getDoc($title) {
  $conn = connect();
  $stmt = $conn->prepare("SELECT * FROM version WHERE Title=? AND approved=1");
  $stmt->bind_param("s", $title);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result;
}

function getDrafts() {
  $conn = connect();
  $sql = $conn -> query("SELECT * FROM version WHERE approved=0");
  $res = array();

  while ($row = $sql->fetch_assoc()) {
    $res[] = $row;
  }

  $conn->close();
  return $res;
}

function getDraft($title) {
  $conn = connect();
  $stmt = $conn->prepare("SELECT * FROM version WHERE Title=? and approved=0");
  $stmt->bind_param("s", $title);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result;
}