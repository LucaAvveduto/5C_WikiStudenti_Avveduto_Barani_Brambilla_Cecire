<?php

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

function connect()
{
  $servername = "localhost";
  $username = "root";
  $password = "";
  $DB = "wiki";
  $conn = new mysqli($servername, $username, $password, $DB);
  return $conn;
}

function checkLogin($username, $password)
{
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
    $nome = $params["nome"];
    $cognome = $params["cognome"];
    $classe = $params["classe"];
    $password = $params["password"];
    $isEditor = intval($params["radio0"]);
    $isModerator = intval($params["radio1"]);
    $isAdministrator = 0;

    $stmt->bind_param(
      'sssssiii',
      $email,
      $nome,
      $cognome,
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
