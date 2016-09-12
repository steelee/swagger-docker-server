<?php
require_once "secrets.php";
$myArray = array();
// Create connection
$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
if ($_POST['cmd'] == "rating"){
	$sql = "SELECT name,rating FROM api";
}
$result = $conn->query($sql);
while($row = $result->fetch_array(MYSQL_ASSOC)) {
	$myArray[] = $row;
}
echo json_encode($myArray);
?>
