<?php
$servername = "172.17.0.2";
$username = "root";
$password = "123";
$database = "api";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully!\n";
$sql = "SELECT * FROM api";
$result = $conn->query($sql);
$conn->close();
echo json_encode($result);
?>
