/*
 * Functie    : getCurrenciesFromXML
 *
 * Descriere  : incarca un fisier XML si il transforma in variable
 *              care sa poate fi folosite in javascript.
 *
 * Parametri  : string file
 *
 * Returneaza : array data
 *
 * Exemple de folosire: getCurrenciesFromXML('data/currencies.xml');
 */

function getCurrenciesFromXML(file) {

	var currencies = {};

	$.ajax({
		type : 'GET',
		url : file,
		dataType : 'xml',
		async : false,
		success : function(data) {

			/* variabila de tip obiect, fiecare cheie a obiectului
			 * simbolizeaza valuta,
			 * iar valoarea contine echivalentul valutei in RON; */

			currencies['RON'] = 1;
			/*
			 var currencies = {
			 'RON': 1,
			 'EUR': 4.5642,
			 'USD': 3.5272,
			 'GBP': 5.6474
			 };
			 */

			$(data).find('Rate').each(function() {
				var sym = $(this).attr('currency');
				var rate = $(this).text();
				currencies[sym] = rate * 1;

				$('#valuta1').append($("<option></option>").attr("value", sym).text(sym));
				$('#valuta2').append($("<option></option>").attr("value", sym).text(sym));
			});
		}
	});

	return currencies;
}
