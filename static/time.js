window.addEventListener("load", startTime) // Loads function to html

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	m = checkTime(m);
	document.getElementById('CurrentTime').innerHTML = // Connects to html, displays formatting
		h + ":" + m;
	var t = setTimeout(startTime, 60000); //Updates clock once every 60 second
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}; // add zero in front of numbers < 10
	return i;
}