<?php
	defined('_FIRESHIELD') or die('Restricted access');
	
	class config {
		function __construct() {
			$this->APP_PATH = dirname(dirname(__FILE__)) ;
		}	
		
		var $APP_PATH ;
		
		var $BASE_URL	=	"test4.ru" ;
		
		var $DB_HOST	=	"localhost" ;
		var $DB_USER	=	"root" ;
		var	$DB_PASS	=	"" ;
		var	$DB_NAME	=	"rep" ;
	}
	$config = new config() ;
?>