/* lista cu toate valutele */

var valute = getCurrencies();

/* lista cu valutele active */

var active_currencies = getActiveCurrencies();

/* lista cu descrierea valutelor */

var info_currencies = getInfoCurrencies();

/*
 * Functie    : getUpdateTime
 *
 * Descriere  : incarca fisierul XML cu valute si returneaza textul
 * 				continut de <PublishingDate></PublishingDate>
 *
 * Returneaza : date PublishingDate
 *
 */

function getUpdateTime() {

    var data = requestFile('data/currencies.xml');

    var PublishingDate = $(data).find('PublishingDate').text() || null;

    return PublishingDate;
}

/*
 * Functie    : getActiveCurrencies
 *
 * Descriere  : incarca fisierul XML cu valute active
 * 				si le pune in lista currencies
 *
 * Returneaza : array currencies
 *
 * Exemple de folosire: getActiveCurrencies('data/active.xml');
 */

function getActiveCurrencies() {

    var data = requestFile('data/active.xml'), currencies = [];

    $(data).find('Active').each(function() {
        currencies.push($(this).attr('currency'));
    });
    return currencies;
}

/*
 * Functie    : getCurrencies
 *
 * Descriere  : incarca fisierul XML cu valute si
 * 				pune valutele si ratele de schimb in obiectul currencies.
 *
 * Returneaza : array currencies
 *
 * Exemple de folosire: getCurrencies('data/currencies.xml');
 */

function getCurrencies() {

    /* variabila care va contine toate valutele,
     * initial setata doar cu RON */
    var currencies = {
        'RON' : 1
    };

    /* request ajax catre fisierul XML, stocheaza
     * continutul returnat in data */
    var data = requestFile('data/currencies.xml');

    /* pentru fiecare element <Rate currency="EUR">4.5757</Rate> din data */

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
 * Functie    : getInfoCurrencies
 *
 * Descriere  : adauga numele valutelor intr-o lista
 *
 */

function getInfoCurrencies() {

    /* deschide fisierul JSON si pentru fiecare valuta gasita,
     * adauga descrierea si simbolul in lista info_currencies */
    $.each(requestFile('data/currency.json', 'json'), function(index) {
        info_currencies[this.cc] = this.name;
    });
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
            console.log('error with ' + type + ' file: ' + file);
            return false;
        }
    });

    return response;
}
