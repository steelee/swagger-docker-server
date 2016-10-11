<?php
session_start();
$true_name = $_FILES['upfile']['name'];
try {
	// You should also check filesize here. 
	if ($_FILES['upfile']['size'] > 1000000) {
		throw new RuntimeException('Exceeded filesize limit.');
	}

	if ($_FILES['upfile']['size'] == 0) {
		throw new RuntimeException('File was empty.');
	}

	// Undefined | Multiple Files | $_FILES Corruption Attack
	// If this request falls under any of them, treat it invalid.
	if (
			!isset($_FILES['upfile']['error']) ||
			is_array($_FILES['upfile']['error'])
	   ) {
		throw new RuntimeException('Invalid parameters.');
	}

	// Check $_FILES['upfile']['error'] value.
	switch ($_FILES['upfile']['error']) {
		case UPLOAD_ERR_OK:
			break;
		case UPLOAD_ERR_NO_FILE:
			throw new RuntimeException('No file sent.');
		case UPLOAD_ERR_INI_SIZE:
		case UPLOAD_ERR_FORM_SIZE:
			throw new RuntimeException('Exceeded filesize limit.');
		default:
			throw new RuntimeException('Unknown errors.');
	}


	// You should name it uniquely.
	// DO NOT USE $_FILES['upfile']['name'] WITHOUT ANY VALIDATION !!
	// On this example, obtain safe unique name from its binary data.
	$signature = sha1_file($_FILES['upfile']['tmp_name']);
	if (!move_uploaded_file(
				$_FILES['upfile']['tmp_name'],
				sprintf('uploads/%s',
					sha1_file($_FILES['upfile']['tmp_name'])
				       )
			       )) {
		throw new RuntimeException('Failed to move uploaded file.');
	}

	$file_parts = pathinfo($_FILES['upfile']['name']);
	if ($file_parts['extension'] != "yaml" and $file_parts['extension'] != "json"){
		throw new RuntimeException('File type not JSON or YAML');
	}
} catch (RuntimeException $e) {

	$_SESSION['status'] = $e->getMessage();
	header('Location: /');
	exit();
}
$_SESSION['status'] = "File " . $true_name . " uploaded!";

require_once "secrets.php";

$myArray = array();

// Create connection
$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

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

$name = rtrim(basename($true_name, $file_parts['extension']),'.');
$location = "/api/uploads/".$signature;

if($_POST['new_owner_name']!=''){
	$owner[0] = $_POST['new_owner_email'];
	$owner[1] = $_POST['new_owner_name'];
}else{
	$owner = explode(":",$_POST['dropdown_owner']);
}

$sql = 'INSERT INTO api (url, name, api_group, contact, owner) VALUES ("' . $location . '", "' . $name . '", "' . $group . '", "' . $owner[0] . '", "' . $owner[1] . '");';
if ($conn->query($sql) === TRUE) {
	echo "New record created successfully";
} else {
	echo "Error: " . $sql . "<br>" . $conn->error;
}


header('Location: /');

?>
