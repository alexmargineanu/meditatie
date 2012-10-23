<?php

require_once 'db/meekrodb.2.1.class.php';
DB::$user = 'root';
DB::$password = '';
DB::$dbName = 'convert';

$x = DB::query("SELECT * FROM valute");
print_r($x);
?>