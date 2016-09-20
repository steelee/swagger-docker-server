<?php
session_start();

require_once "secrets.php";

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
	$sql = 'INSERT INTO feedback (api_id, name, email, comments, rating, date, time)
	        VALUES ("' . $app_id . '", "' . $name . '", "' . $email . '", "' . $comments . '", "' . $rating . '", "' . $date . '", "' . $time . '");'; 
	if ($conn->query($sql) === TRUE) {
		$_SESSION['status'] = "Feedback data successfully added";
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