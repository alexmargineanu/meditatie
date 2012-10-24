/* obiectul valute incarcat din XML,
 * returnat in formatul:
 * 	  [
 *	 	'RON': 1,
 *	 	'EUR': 4.5642,
 *	 	'USD': 3.5272,
 *	 	'GBP': 5.6474
 *	 ];
 */
var valute = getAllCurrencies('data/currencies.xml');

/*
 * Functie    : Convert
 *
 * Descriere  : Functia convert simuleaza un convertor valutar,
 *              transformand o suma din valuta1 in valuta2.
 *
 * Parametri  : int valuta1
 *			  	int valuta2
 *			  	int suma
 *
 * Returneaza : string total
 *
 * Exemple de folosire: convert('GBP', 'RON', 100);
 */
function convert(valuta1, valuta2, suma) {

	/* variabila care va contine suma calculata,
	 * initial setata cu valoarea null; */

	var total = null;

	/* verificarea sumei primite daca este un numar pozitiv; */

	if (isNumber(suma) && suma > 0) {

		/* verificarea valutelor primite daca exista in obiectul valute; */

		if (valute[valuta1] && valute[valuta2]) {

			/* atunci cand valuta in care se schimba este RON,
			 * folosim formula (valuta1 * suma);
			 * pentru alte valute transformam valuta1 in RON
			 * apoi o impartim la echivalentul in RON al valutei2 */

			if (valuta2 == 'RON') {
				total = valute[valuta1] * suma;
			} else {

				/* ex: 10 EUR->USD = (10 * 4.5642) / 3.5272 */
				total = (valute[valuta1] * suma) / valute[valuta2];
			}

			/* formateaza suma */
			total = total.format();

			/* e posibil ca suma sa nu fi fost corecta si elementul #suma
			 * sa poarte inca clasa warning, asa ca
			 * resetam clasele css care erau pe elementul #suma */
			document.getElementById("suma").className = '';

		} else {

			/* valutele nu exista in obiectul valute; */
			console.warn('valuta nu exista');

		}

	} else {

		/* suma nu este un numar pozitiv; */
		console.warn('suma nu este corecta');

		/* adauga clasa warning pe elementul #suma pentru a alerta utilizatorul */
		document.getElementById("suma").className = 'warning';
	}

	/* returneaza valoarea stocata in total. daca conditiile de mai sus
	 * au fost adevarate, total va contine suma calculata.
	 * daca conditiile nu au fost adevarate, total va ramane setat
	 * cu valoarea initiala null; */

	return total;
}