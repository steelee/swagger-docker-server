<?php
$servername = "172.17.0.2";
$username = "root";
$password = "123";
$database = "api";

$myArray = array();

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT name,url FROM api";
$result = $conn->query($sql);
while($row = $result->fetch_array(MYSQL_ASSOC)) {
	$myArray[] = $row;
}
echo json_encode($myArray);
?>
