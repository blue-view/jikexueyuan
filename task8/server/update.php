<?php
require_once ('db.php');
if (!$con) {
	die('Could not connect: ' . mysql_error());
} else {
	$newstitle = $_POST['newstitle'];
	$newstype = $_POST['newstype'];
	$newsimg = $_POST['newsimg'];
	$newstime = $_POST['newstime'];
	$newssrc = $_POST['newssrc'];
	$newsid = $_POST['id'];
	$sql = "UPDATE `news` SET `newstitle`='{$newstitle}', `newstype`='{$newstype}',`newsimg`='{$newsimg}',`newstime`='{$newstime}',`newssrc`='{$newssrc}' WHERE `id`={$newsid}";
	mysql_select_db("baidunews", $con);
	mysql_query("set names 'utf8'");
	$result = mysql_query($sql, $con) or die(mysql_error());

	echo json_encode(array('success' => $sql));
}
mysql_close($con);
?>