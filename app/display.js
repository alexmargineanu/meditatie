/*
 * Functie    : populateInterface
 *
 * Descriere  : Populeza dropdown-urile valuta1 si valuta2
 *              cu valutele active.
 */

function populateInterface() {

	/* adauga toate valutele active in dropdown-urile de valute */

	for ( i = 0; i < active_currencies.length; i++) {
		$('#valuta1').append($("<option></option>").attr("value", active_currencies[i]).text(active_currencies[i]));
		$('#valuta2').append($("<option></option>").attr("value", active_currencies[i]).text(active_currencies[i]));
	}

	/* adauga valuta implicita RON in dropdown-urile de valute */

	$('#valuta1').append($("<option></option>").attr("value", 'RON').text('RON'));
	$('#valuta2').prepend($("<option></option>").attr("value", 'RON').text('RON'));

	/* adauga data ultimei actualizari obtinuta din XML in elementul #data */

	if (document.getElementById('data')) {
		document.getElementById('data').innerHTML = 'actualizat pe ' + getUpdateTime();
	}

}

/*
 * Functie    : triggerConvert
 *
 * Descriere  : Functia colecteaza valorile introduse
 *              de utilizator si le transmite functiei convert.
 */
function triggerConvert() {

	/* definim variabile care vor contine valorile
	 * inputurilor din HTML, daca acestea nu exista valorile
	 * vor fi setate cu null; */

	var valuta1 = document.getElementById("valuta1").value || null, valuta2 = document.getElementById("valuta2").value || null, suma = document.getElementById("suma").value || null;

	/* cheama functia convert cu parametri formati
	 * din valorile aflate mai sus si scrie valoarea returnata
	 * in elementul #total; */

	document.getElementById("total").value = convert(valuta1, valuta2, suma);
}

