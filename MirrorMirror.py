
from bottle import route, run, template, static_file, response
import calendar
import json
from datetime import date


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

    cal = {
        "calendarHTML": c.formatmonth(year, month),
        "entries": [
            {
                "title": "Klippa mig",
                "when": "Idag",
                "time": "13:50-14:20",
                "day": "8"
            },
            {
                "title": "Klippa hunden",
                "when": "Imorgon",
                "time": "13:50-14:20",
                "day": "9"
            },
            {
                "title": "Klippa min kompis",
                "when": "I övermorgon",
                "time": "13:50-14:20",
                "day": "10"
            },
            {
                "title": "Klippa någon annan",
                "when": "I övermorgon",
                "time": "14:50-15:20",
                "day": "15"
            }
        ]
    }
    response.content_type = 'application/json'
    return json.dumps(cal)


run(reloader=True, host="localhost", port=8080)
