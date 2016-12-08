<?php
require_once ('db.php');
if (!$con) {
	die('Could not connect: ' . mysql_error());
} else {
	$newsid = $_POST['newsid'];
	$sql = "delete from news where id={$newsid}";
	mysql_select_db("baidunews", $con);
	mysql_query("set names 'utf8'");
	$result = mysql_query($sql, $con);

	echo json_encode(array('success' => 'ok'));
}
mysql_close($con);
?>