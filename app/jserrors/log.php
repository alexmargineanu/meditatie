<?php
$link = mysql_connect('localhost', 'root', '')
    or die('Could not connect: ' . mysql_error());
echo 'Connected successfully';
mysql_select_db('devtools') or die('Could not select database');

$query = "INSERT INTO jserrors (id, msg, url, num) VALUES ('', '".addslashes($_GET['msg'])."', '".addslashes($_GET['url'])."', '".$_GET['num']."')";
$result = mysql_query($query) or die('Query failed: ' . mysql_error());

mysql_free_result($result);
mysql_close($link);
?>