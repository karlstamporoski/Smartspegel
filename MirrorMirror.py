from bottle import route, run, template, static_file, response
import calendar
import json
from datetime import date
from ics import Calendar
import requests
import arrow


@route("/")
def home_page():
    return template("index")


@route("/static/<filename>")
def static_files(filename):
    return static_file(filename, root="static")


@route("/api/calendar")
def cal():
    # Creates a monthly calendar with current date and local weekday names
    # Provides calendar data with the help of JSON
    # Reference: https://docs.python.org/3/library/calendar.html

    today = date.today()
    year = int(today.strftime("%Y"))
    month = int(today.strftime("%m"))

    c = calendar.LocaleHTMLCalendar(calendar.MONDAY, "sv_SE")

    url = "https://calendar.google.com/calendar/ical/bsmmlfhb8fmfepu2cjdfucbq08%40group.calendar.google.com/public/basic.ics"
    gc = Calendar(requests.get(url).text)

    entries = []

    for event in gc.events:
        entries.append({
            "title": event.name,
            "when": "Idag",
            "time": "14:30-15:00",
            "day": "8"
        })

    cal = {
        "calendarHTML": c.formatmonth(year, month),
        "entries": entries
    }
    response.content_type = 'application/json'
    return json.dumps(cal)



run(reloader=True, host="localhost", port=8080)
