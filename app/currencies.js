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

/* lista cu valutele active */

var active_currencies = getActiveCurrencies('data/active.xml');

/* lista cu descrierea valutelor, initial setata cu un obiect gol */

var currencies_descriptions = {};

/* deschide fisierul JSON si pentru fiecare valuta gasita,
 * adauga descrierea si simbolul in lista currencies_descriptions */

$.each(requestFile('data/currency.json', 'json'), function(index) {
	currencies_descriptions[this.cc] = this.name;
});

/*
 * Functie    : getUpdateTime
 *
 * Descriere  : incarca fisierul XML cu valute si returneaza textul 
 * 				continut de <PublishingDate></PublishingDate> 
 *
 * Parametri  : string file
 *
 * Returneaza : date PublishingDate
 *
 */

function getUpdateTime(file) {

	var data = requestFile(file);

	var PublishingDate = $(data).find('PublishingDate').text() || null;

	return PublishingDate;
}

/*
 * Functie    : getActiveCurrencies
 *
 * Descriere  : incarca fisierul XML cu valute active
 * 				si le pune in lista currencies
 *
 * Parametri  : string file
 *
 * Returneaza : array currencies
 *
 * Exemple de folosire: getActiveCurrencies('data/active.xml');
 */

function getActiveCurrencies(file) {

	var currencies = [], data = requestFile(file);

	$(data).find('Active').each(function() {
		currencies.push($(this).attr('currency'));
	});
	return currencies;
}

/*
 * Functie    : getAllCurrencies
 *
 * Descriere  : incarca fisierul XML cu valute si
 * 				pune valutele si ratele de schimb in obiectul currencies.
 *
 * Parametri  : string file
 *
 * Returneaza : array currencies
 *
 * Exemple de folosire: getAllCurrencies('data/currencies.xml');
 */

function getAllCurrencies(file) {

	/* variabila care va contine toate valutele,
	 * initial setata doar cu RON */
	var currencies = {
		'RON' : 1
	};

	/* request ajax catre fisierul XML */
	var data = requestFile(file);

	/* pentru fiecare element <Rate currency="EUR">4.5757</Rate> */

	$(data).find('Rate').each(function() {

		/* stocheaza simbolul si rata de conversie*/

		var sym = $(this).attr('currency');
		var rate = $(this).text();

		/* adauga valuta curenta in obiectul currencies */
		currencies[sym] = rate * 1;

	});

	/* returneaza obiectul currencies care va fi folosit in convert.js */
	return currencies;
}

/*
 * Functie    : requestFile
 *
 * Descriere  : returneaza continutul unui fisier XML sau JSON
 *
 * Parametri  : string file
 * 				string type
 *
 * Returneaza : json/xml response
 *
 * Exemple de folosire: requestFile('data/currency.json', 'json');
 */
function requestFile(file, type) {

	var response = null, fileType = type || 'xml';

	$.ajax({
		type : 'GET',
		url : file,
		dataType : type,
		async : false,
		success : function(r) {
			response = r;
		},
		error : function(e) {
			console.log('error with JSON file ' + file);
			return false;
		}
	});

	return response;
}
