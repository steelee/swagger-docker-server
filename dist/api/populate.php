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
	$sql = "SELECT name,api_group,url FROM api ORDER BY name ASC";
}else if ($_POST['cmd'] == 'unique_group'){
	$sql = "SELECT DISTINCT api_group FROM api";
}else if ($_POST['cmd'] == 'group_members'){
	$sql ='SELECT name FROM api WHERE api_group = "'.$_POST['name']. '"';
}else if ($_POST['cmd'] == 'owners'){
	$sql ='SELECT DISTINCT owner, contact FROM api';
}
$result = $conn->query($sql);
while($row = $result->fetch_array(MYSQL_ASSOC)) {
	$myArray[] = $row;
}
echo json_encode($myArray);
?>
