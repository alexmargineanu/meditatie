/*
 * Functie    : getActiveCurrencies
 *
 * Descriere  : incarca un fisier XML si il transforma in variable
 *              care sa poate fi folosite in javascript.
 *
 * Parametri  : string file
 *
 * Returneaza : array currencies
 *
 * Exemple de folosire: getActiveCurrencies('data/active.xml');
 */

function getActiveCurrencies(file) {

	var currencies  = [],
		data 		= requestXML(file);
	
	$(data).find('Active').each(function() {
		currencies.push ($(this).attr('currency'));
	});
	return currencies;
}

/*
 * Functie    : getAllCurrencies
 *
 * Descriere  : incarca un fisier XML si il transforma in variable
 *              care sa poate fi folosite in javascript.
 *
 * Parametri  : string file
 *
 * Returneaza : array currencies
 * 	  [
 *	 	'RON': 1,
 *	 	'EUR': 4.5642,
 *	 	'USD': 3.5272,
 *	 	'GBP': 5.6474
 *	 ];
 *
 * Exemple de folosire: getAllCurrencies('data/currencies.xml');
 */

function getAllCurrencies(file) {

	/* variabila care va contine toate valutele,
	 * initial setata doar cu RON */
	var currencies = {'RON':1};

	/* request ajax catre fisierul XML */
	var data = requestXML(file);

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



function requestXML(file){
	
	var response = null;

	$.ajax({
		type : 'GET',
		url : file,
		dataType : 'xml',
		async : false,
		success : function(r) {
		 	response = r;
		},
		error : function(e){
			console.log('error with XML file ' + file);
			return false;
		}
	});
	
	return response;
}
