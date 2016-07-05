<?php

require_once "Spyc.php";
require_once "secrets.php";

$myArray = array();

// Create connection
$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

$file_parts = pathinfo($_POST['url']);
if ($file_parts['extension'] != "yaml" and $file_parts['extension'] != "json"){ 
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
