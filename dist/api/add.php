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
$sql = '"INSERT INTO api (url, name) VALUES ("' . $_POST['url'] . '","someapi")"';
echo $sql;
if ($conn->query($sql) === TRUE) {
	echo "New record created successfully";
} else {
	echo "Error: " . $sql . "<br>" . $conn->error;
}  
?>
