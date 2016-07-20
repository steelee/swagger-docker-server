<?php

require_once "secrets.php";

$myArray = array();

// Create connection
$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

if ($_POST['cmd'] == 'list'){
	$sql = "SELECT name,url FROM api";
}else if ($_POST['cmd'] == 'group'){
	$sql = "SELECT name,api_group FROM api ORDER BY api_group";
}else if ($_POST['cmd'] == 'unique_group'){
	$sql = "SELECT DISTINCT api_group FROM api";
}
$result = $conn->query($sql);
while($row = $result->fetch_array(MYSQL_ASSOC)) {
	$myArray[] = $row;
}
echo json_encode($myArray);
?>
