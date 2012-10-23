Number.prototype.format = function() {
    var n = this,
    decPlaces = 2,
    decSeparator = ".",
    thouSeparator = ",",
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

window.onerror = function (msg, url, num) {
	 var xhReq = new XMLHttpRequest();
	 xhReq.open("GET", "app/jserrors/log.php?msg="+msg+"&url="+url+"&num="+num, false);
	 xhReq.send(null);
	 console.log(msg, url, num);
	 return false;
}


var dayNames = new Array("Duminica","Luni","Marti","Miercuri","Joi","Vineri","Sambata");
var monthNames = new Array("Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octobmrie","Noiembrie","Decembrie");
var now = new Date();

function getDate(){
	if(document.getElementById('data')) {
		document.getElementById('data').innerHTML = dayNames[now.getDay()] + ", " + now.getDate() + " " + monthNames[now.getMonth()] + " " + now.getFullYear();	
	}
}
