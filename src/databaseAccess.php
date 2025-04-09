<?php 

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

function connect() {
  $servername = "localhost";
  $username = "root";
  $password = "";
  $DB = "wiki";
  $conn = new mysqli($servername, $username, $password, $DB);
  return $conn;
}

function checkLogin($username,$password) {
    $conn = connect();
    $stmt = $conn->prepare("SELECT * FROM User WHERE Email=? AND Password=?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    $conn->close();
    return $result->num_rows === 1 ? true : false;
}

?>