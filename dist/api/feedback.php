<?php

function process_feedback()
{

# what to do with the feedback we get....?

}
require_once "secrets.php";
$myArray = array();
// Create connection
$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
if ($_POST['cmd'] == "add_comment"){
	$sql = 'INSERT INTO feedback (name,api,email,comments,rating) VALUES ("' . $_POST['form'][0]['value'] . '", "' . $_POST['api'] . '", "' . $_POST['form'][1]['value'] . '", "' . $_POST['form'][2]['value'] . '", "' . $_POST['form'][3]['value'] . '");';
	$conn->query($sql);
	process_feedback($_POST);
	$sql = "UPDATE api SET rating = rating + " . $_POST['form'][3]['value'] . " WHERE name LIKE '%".$_POST['api']."%';";
}
$result = $conn->query($sql);
echo json_encode($result);
?>
