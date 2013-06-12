<?php
	define( '_FIRESHIELD', 1 ) ;

	require_once dirname(__FILE__).'/inc/config.php' ;
	require_once dirname(__FILE__).'/inc/db.php' ;

	$points = 0;
	
	foreach($_POST['qst'] as $id => $question)
	{
		$answer = $_POST['ans'][$id];
		
		$query = "select count(*) from questions where name = '$question' AND answer='$answer';";
		
		$arr = $db->sql($query);
		
		$result = mysql_fetch_array($arr, MYSQL_NUM);
		
		if($result[0] > 0) $points++;
	}
	
	echo $points;
?>