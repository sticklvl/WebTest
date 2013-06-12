<?php
	defined('_FIRESHIELD') or die('Restricted access');
	
	class db extends config {
		
		private $connection ;
		
		function __construct() {
			$this->open_connection() ;
			$this->select_database($this->DB_NAME) ;
		}
		
		// Подключение к MYSQL
		private function open_connection() {
			$this->connection = mysql_connect($this->DB_HOST,$this->DB_USER,$this->DB_PASS) ;
			if(!$this->connection) {
				die("Database connection failed:  ". mysql_error()) ;
			}
		}
		
		// Выбор базы данных
		public function select_database($DB_NAME) {
			$db_select = mysql_select_db($DB_NAME) ;
			if(!$db_select) {
				die("Database selection failed: ". mysql_error()) ;
			}
		}
		
		// Выполнение запроса к базе данных
		public function sql($query) {
			$result = mysql_query($query,$this->connection) ;
			if(!$result) {
				die("Database query failed: ". mysql_error()) ;
			}
			return $result ;
		}
		
	}
	$db = new db() ;
?>