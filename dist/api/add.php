<?php

require_once "Spyc.php";
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

$file_parts = pathinfo($_POST['url']);
if ($file_parts['extension'] != "yaml" and $file_parts['extension'] != "json"){ 
	echo 1;
	exit();
}

$curl = curl_init();
curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => $_POST['url']
			));

$result = spyc_load_file(curl_exec($curl));
if (sizeof($result) == 0){
	echo 2;
	exit();
}

$sql = 'INSERT INTO api (url, name) VALUES ("' . $_POST['url'] . '","someapi")';
echo $sql;
if ($conn->query($sql) === TRUE) {
	echo "New record created successfully";
} else {
	echo "Error: " . $sql . "<br>" . $conn->error;
}

?>
