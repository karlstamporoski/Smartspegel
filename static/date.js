window.addEventListener("load", startDate) // Loads function to html


function startDate() {
    var today = new Date();
    var month = today.getUTCMonth();
    var day = today.getDay();
    var date = today.getDate();
    month = checkMonth(month);
    day = checkDay(day);
    document.getElementById('CurrentDate').innerHTML = day + " " + date + " " + month; // Connects to html, displays formatting
    }


function checkMonth(i) {
    switch(i) {
        case 0:
          return "jan";
        case 1:
            return "Feb";
        case 2:
            return "Mars";
        case 3:
            return "April";
        case 4:
            return "Maj";
        case 5:
            return "Juni";
        case 6:
            return "Juli";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Okt";
        case 10:
            return "Nov";
        case 11:
            return "Dec"; 
      }
}


function checkDay(d) {
    switch(d){
        case 0:
            return "sön"
        case 1:
            return "Mån"
        case 2:
            return "Tis"
        case 3:
            return "Ons"
        case 4:
            return "Tor"
        case 5:
            return "Fre"
        case 6:
            return "lör"
    }

}