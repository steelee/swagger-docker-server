<?php
$datagram = $_POST['data'];
$signature = sha1($datagram);

$file = fopen('uploads/' . $signature, "w");

fwrite($file,$datagram);

echo 'uploads/' . $signature;
?>
