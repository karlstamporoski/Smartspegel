// Fetches monthly calendar and calendar data från MirrorMirror.py with JSON.
// Calendar data output is sorted by day, title, when and time.
fetch("/api/calendar")
    .then(response => response.json())
    .then((json) => {
        var output = json.calendarHTML;
        json.entries.forEach(elem => {
            output += `<div class="day">${elem.day}</div>
            <div class="title">${elem.title}</div>
            <div class="when">${elem.when}</div>
            <div class="time">${elem.time}</div>`;
        })
        var cal = document.querySelector('.CalendarWidget');
        cal.innerHTML = output
    });