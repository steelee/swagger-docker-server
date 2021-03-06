<?php
session_start();
require_once "Spyc.php";
require_once "secrets.php";
$myArray = array();
try {

	// Create connection
	$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);

	// Check connection
	if ($conn->connect_error) {
		throw new RuntimeException('Database connection error');
	}

	$file_parts = pathinfo($_POST['url']);
	if ($file_parts['extension'] != "yaml" and $file_parts['extension'] != "json"){ 
		throw new RuntimeException('Invalid URL');
	}
	$curl = curl_init();
	curl_setopt_array($curl, array(
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_URL => $_POST['url']
				));

	$result = spyc_load_file(curl_exec($curl));
	if (sizeof($result) == 0){
		throw new RuntimeException('Failed to open remote URL');
	}

	if (sizeof($result) > 1000000) {
		throw new RuntimeException('File size exceeded.');
	}

	$name = rtrim(basename($_POST['url'], $file_parts['extension']),'.');

	if ($_POST['new_group']!=""){
		$group = $_POST['new_group'];
	}else{
		$group = $_POST['dropdown'];
	} 
	if($_POST['new_owner_name']!=''){
		$owner[0] = $_POST['new_owner_email'];
		$owner[1] = $_POST['new_owner_name'];
	}else{
		$owner = explode(":",$_POST['dropdown_owner']);
	}
	$sql = 'INSERT INTO api (url, name, api_group, contact, owner) VALUES ("' . $_POST['url'] . '", "' . $name . '", "' . $group . '", "' . $owner[0] . '", "' . $owner[1] . '");'; 
	if ($conn->query($sql) === TRUE) {
		$_SESSION['status'] = "File successfully added";
	} else {
		throw new RuntimeException('Database write error');
	}

} catch (RuntimeException $e) {
	$_SESSION['status'] = $e->getMessage();
	header('Location: /');
	exit();
}
header('Location: /');
?>
