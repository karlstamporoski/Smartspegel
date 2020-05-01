// Fetches monthly calendar and calendar data från MirrorMirror.py with JSON.
// Calendar data output is sorted by day, title, when and time.
fetch("/api/calendar")
    .then(response => response.json())
    .then((json) => {
        var output = json.calendarHTML;
        json.entries.forEach(elem => {
            output += `
            <div class="event">
                <div class="eventSummary">
                    <div class="eventMonth">${elem.month}</div>
                    <div class="eventDay">${elem.day}</div>
                </div>
                <div class="eventDetails">
                    <div class="eventTitle">${elem.title}</div>
                    <div class="eventWhenTime">${elem.when}  ${elem.time}</div>
                </div>
            </div>
            `;
        })
        var calcontent = document.querySelector('.CalendarWidget');
        calcontent.innerHTML = output
    });