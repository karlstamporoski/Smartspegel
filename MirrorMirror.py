from bottle import route, run, template, static_file, response
import calendar
import json
from datetime import date
from ics import Calendar
import requests


@route("/")
def home_page():
    return template("index")


@route("/static/<filename>")
def static_files(filename):
    return static_file(filename, root="static")


def month_to_str(mid):
    # Converts monthly number to monthly name

    if mid == 1:
        return "Jan"
    elif mid == 2:
        return "Feb"
    elif mid == 3:
        return "MAR"
    elif mid == 4:
        return "APR"
    elif mid == 5:
        return "MAJ"
    elif mid == 6:
        return "JUN"
    elif mid == 7:
        return "JUL"
    elif mid == 8:
        return "AUG"
    elif mid == 9:
        return "SEP"
    elif mid == 10:
        return "OKT"
    elif mid == 11:
        return "NOV"
    elif mid == 12:
        return "DEC"
    else:
        return "0"


@route("/api/calendar")
def cal():
    # Creates a monthly calendar with current date and local weekday names
    # Reference: https://docs.python.org/3/library/calendar.html
    # Provides calendar data from a public Google Calendar .ics file
    # with the help of ics.py and JSON
    # Reference: https://icspy.readthedocs.io/en/stable/

    today = date.today()
    year = int(today.strftime("%Y"))
    month = int(today.strftime("%m"))

    c = calendar.LocaleHTMLCalendar(calendar.MONDAY, "sv_SE")
    cal_html = c.formatmonth(year, month)
    cal_html = cal_html.replace("Mån", "Må")
    cal_html = cal_html.replace("Tis", "Ti")
    cal_html = cal_html.replace("Ons", "On")
    cal_html = cal_html.replace("Tor", "To")
    cal_html = cal_html.replace("Fre", "Fr")
    cal_html = cal_html.replace("Lör", "Lö")
    cal_html = cal_html.replace("Sön", "Sö")

    url = "https://calendar.google.com/calendar/ical/bsmmlfhb8fmfepu2cjdfucbq08%40group." \
          "calendar.google.com/public/basic.ics"
    gc = Calendar(requests.get(url).text)

    entries = []

    for event in gc.events:
        start = event.begin.format("HH:mm")
        end = event.end.format("HH:mm")
        if event.all_day:
            start = "Hel"
            end = "Dag"

        entries.append({
            "title": event.name,
            "when": event.begin.humanize(),
            "time": f"{start} - {end}",
            "month": month_to_str(event.begin.datetime.month),
            "day": event.begin.datetime.day
        })

    cal_content = {
        "calendarHTML": cal_html,
        "entries": entries
    }
    response.content_type = 'application/json'
    return json.dumps(cal_content)


run(reloader=True, host="localhost", port=8080)
