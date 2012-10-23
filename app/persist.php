<?php

$remote_file = "http://www.bnr.ro/nbrfxrates.xml";

/* preia cursul valutar de pe site-ul brn.ro */

$content = file_get_contents($remote_file);

/* salveza fisierul pe server in folderul data
 * permisiunile fisierului pe server trebuie sa fie 0666 */

if(file_put_contents("../data/currencies.xml", $content)) {
	echo 'succes';
} else {
	echo 'error with ' . $remote_file;
}


?>