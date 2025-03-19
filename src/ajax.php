<?php
header('Content-Type: application/json');
$input_data = json_decode(file_get_contents('php://input'), true);
echo json_encode($input_data);
exit;
?>
