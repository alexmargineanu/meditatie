  /* 
   * Functie    : Afiseaza
   * 
   * Descriere  : Functia colecteaza valorile introduse
   *              de utilizator si la transmite functiei convert. 
   */
  function afiseaza() {

      /* definim variabile care vor contine valorile 
       * inputurilor din HTML, daca acestea nu exista valorile
	   * vor fi setate cu null; */

      var valuta1 = document.getElementById("valuta1").value || null, 
		  valuta2 = document.getElementById("valuta2").value || null,
		  suma	  = document.getElementById("suma").value || null;


   /* cheama functia convert cu parametri formati
    * din valorile aflate mai sus si scrie valoarea returnata
	* in elementul #total; */

	  document.getElementById("total").value = convert(valuta1, valuta2, suma);
  }

