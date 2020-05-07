/** Fetches monthly calendar and calendar data från MirrorMirror.py with JSON.
Calendar data output is sorted by day, title, when and time.*/ 
fetch("/api/calendar")
    .then(response => response.json())
    .then((json) => {
        var output = json.calendarHTML;
        json.entries.forEach(elem => {
            output += `
            <div class="Event">
                <div class="EventSummary">
                    <div class="EventMonth">${elem.month}</div>
                    <div class="EventDay">${elem.day}</div>
                </div>
                <div class="EventDetails">
                    <div class="EventTitle">${elem.title}</div>
                    <div class="EventWhenTime">${elem.time} &nbsp; &nbsp;${elem.when}</div>
                </div>
            </div>
            `;
        })
        var calcontent = document.querySelector('.CalendarWidget');
        calcontent.innerHTML = output
    });