  /* 
   * Functie    : populateInterface
   * 
   * Descriere  : Populeza dropdown-urile valuta1 si valuta2
   *              cu valutele active. 
   */
  
	function populateInterface(){
	  
	  	/* lista cu valutele active */

		var active_currencies = getActiveCurrencies('data/active.xml');

	  /* adauga toate valutele active in dropdown-urile de valute */
		
		for(i=0; i<active_currencies.length;i++){
			$('#valuta1').append($("<option></option>").attr("value", active_currencies[i]).text(active_currencies[i]));
			$('#valuta2').append($("<option></option>").attr("value", active_currencies[i]).text(active_currencies[i]));
		}
		
		/* adauga valuta implicita RON in dropdown-urile de valute */
	
		$('#valuta1').append($("<option></option>").attr("value", 'RON').text('RON'));
		$('#valuta2').prepend($("<option></option>").attr("value", 'RON').text('RON'));
		
		/* adauga #data ultimei actualizari obtinuta din XML */
		
		if(document.getElementById('data')) {
			document.getElementById('data').innerHTML = 'actualizat pe ' + getUpdateTime('data/currencies.xml');	
		}	
	} 



/*
 * Functie    : getUpdateTime
 *
 * Descriere  : incarca un fisier XML si cauta cheia PublishingDate
 * 				pentru a afla data ultimului update
 *
 * Parametri  : string file
 *
 * Returneaza : date date
 * 
 */

function getUpdateTime(file) {

	var data = requestXML(file);
	
	var PublishingDate = $(data).find('PublishingDate').text() || null;

	return PublishingDate;
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

      var valuta1 = document.getElementById("valuta1").value || null, 
		  valuta2 = document.getElementById("valuta2").value || null,
		  suma	  = document.getElementById("suma").value    || null;

	 /* cheama functia convert cu parametri formati
	 * din valorile aflate mai sus si scrie valoarea returnata
	 * in elementul #total; */

	  document.getElementById("total").value = convert(valuta1, valuta2, suma);
  }

