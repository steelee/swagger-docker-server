<?php

require_once "secrets.php";

$myArray = array();

// Create connection
$conn = new mysqli($DB_SERVER, $DB_NAME, $DB_PASS, $DB_SELECT);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

if ($_POST['cmd'] == 'list'){
	$sql = "SELECT name,url FROM api";
}else if ($_POST['cmd'] == 'group'){
	$sql = "SELECT name,api_group,url FROM api ORDER BY name ASC";
}else if ($_POST['cmd'] == 'unique_group'){
	$sql = "SELECT DISTINCT api_group FROM api";
}else if ($_POST['cmd'] == 'group_members'){
	$sql ='SELECT name FROM api WHERE api_group = "'.$_POST['name']. '"';
}else if ($_POST['cmd'] == 'owners'){
	$sql ='SELECT DISTINCT owner, contact FROM api';
}else if ($_POST['cmd'] == 'duplicate'){
	$name = pathinfo($_POST['api'])['filename'];
	$sql = 'SELECT name FROM api WHERE name LIKE "' . $name . '"';
}else if ($_POST['cmd'] == 'metadata'){
	$sql = "SELECT rating, status, owner, contact FROM api WHERE name LIKE '".$_POST['api']."'";
	$count =  "SELECT rating FROM api WHERE name like '" . $_POST['api'] . "' UNION ALL SELECT count(*) AS sum FROM feedback WHERE api LIKE '" . $_POST['api'] . "'";
}

$result = $conn->query($sql);
while($row = $result->fetch_array(MYSQL_ASSOC)) {
	$myArray[] = $row;
}

if(isset($count)){
	$result = $conn->query($count);
	while($row = $result->fetch_array(MYSQL_ASSOC)) {
		$myArray[] = $row;
	}

}
echo json_encode($myArray);
?>
