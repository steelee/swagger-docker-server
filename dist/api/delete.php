<?php

require_once "secrets.php";

$myArray = array();

// Create connection
$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

if ($_POST['cmd'] == 'del_by_group'){
	$sql = 'DELETE FROM api WHERE api_group = "' . $_POST['api_group'] . '";';
}

$result = $conn->query($sql);
echo json_encode($result);
?>
