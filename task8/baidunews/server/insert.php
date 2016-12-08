<?php
require_once ('db.php');
if (!$con) {
	die('Could not connect: ' . mysql_error());
} else {
	$newstitle = htmlspecialchars($_POST['newstitle']);
	$newstype = htmlspecialchars($_POST['newstype']);
	$newsimg = htmlspecialchars($_POST['newsimg']);
	$newstime = htmlspecialchars($_POST['newstime']);
	$newssrc = htmlspecialchars($_POST['newssrc']);

	$sql = "INSERT INTO news(newstitle, newstype, newsimg, newstime,newssrc) VALUES ('{$newstitle}','{$newstype}','{$newsimg}','{$newstime}','{$newssrc}')";
	mysql_select_db("baidunews", $con);
	mysql_query("set names 'utf8'");
	$result = mysql_query($sql, $con);

	echo json_encode(array('success' => 'ok'));
}
mysql_close($con);
?>