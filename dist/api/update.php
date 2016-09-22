<?php

require_once "secrets.php";

$myArray = array();

// Create connection
$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

if ($_POST['name'] == 'update_group_name'){
	$oldvalue = $_POST['pk'];
	$newvalue = $_POST['value'];
	$sql = 'UPDATE api SET api_group = "' . $newvalue . '" WHERE api_group = "'. $oldvalue . '";';
}
$result = $conn->query($sql);
?>
