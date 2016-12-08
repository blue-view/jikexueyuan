<?php
require_once ('db.php');
if (!$con) {
	die('Could not connect: ' . mysql_error());
} else {
	$newsid = $_POST['newsid'];
	$sql = "select * from news where id={$newsid}";
	mysql_select_db("baidunews", $con);
	mysql_query("set names 'utf8'");
	$result = mysql_query($sql, $con);
	$sendData = array();
	while ($row = mysql_fetch_array($result)) {
		array_push($sendData, array('id' => $row['id'], 'newstype' => $row['newstype'], 'newstitle' => $row['newstitle'], 'newsimg' => $row['newsimg'], 'newstime' => $row['newstime'], 'newssrc' => $row['newssrc']));
	}
	echo json_encode($sendData);
}
mysql_close($con);
?>