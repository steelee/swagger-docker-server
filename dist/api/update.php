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
	$status = "Update complete!";
}else if ($_POST['name'] == 'delete_group'){
	$group = $_POST['group'];
	$sql = 'UPDATE api SET api_group = "No_Group" WHERE api_group = "' . $group . '";';
	$status = $group; 
}else if ($_POST['name'] == 'update_group_member'){
	$group = $_POST['group'];
	$api = $_POST['api'];
	$sql = 'UPDATE api SET api_group = "' . $group . '" WHERE name = "' . $api . '";';
	$status = $api . " reassigned to " . $group; 
}
$result = $conn->query($sql);
echo json_encode($status);
?>
