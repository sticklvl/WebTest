<?php
	define( '_FIRESHIELD', 1 ) ;

	require_once dirname(__FILE__).'/inc/config.php' ;
	require_once dirname(__FILE__).'/inc/db.php' ;

	$query = "select name from tests";
	
	$arr = $db->sql($query);
	
	echo '<select>';
	
	while($test = mysql_fetch_array($arr, MYSQL_NUM))
	{
		echo "<option>$test[0]</option>";
	}
	
	echo '</select>'

?>