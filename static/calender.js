// Fetches monthly calendar and calendar data från MirrorMirror.py with JSON.
// Calendar data output is sorted by day, title, when and time.
fetch("/api/calendar")
    .then(response => response.json())
    .then((json) => {
        var output = json.calendarHTML;
        json.entries.forEach(elem => {
            output += `${elem.day} ${elem.title} <br> ${elem.when} ${elem.time} <br>`;
        })
        var cal = document.querySelector('.CalenderWidget');
        cal.innerHTML = output
    });