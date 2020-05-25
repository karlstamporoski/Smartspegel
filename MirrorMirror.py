from gevent import monkey
monkey.patch_all()
from bottle import route, run, template, static_file, response
import calendar
import json
from datetime import date
from ics import Calendar
import requests


@route("/")
def home_page():
    return template("index")


@route("/static/<filename:path>")
def static_files(filename):
    return static_file(filename, root="static")


def format_cal(cal_html):
    """ Replaces 3 char with 2 char for weekday names. There seems to be
    different output of Mån-Fre/mån-fre depending on platform. """

    cal_html = cal_html.replace("Mån", "Må")
    cal_html = cal_html.replace("Tis", "Ti")
    cal_html = cal_html.replace("Ons", "On")
    cal_html = cal_html.replace("Tor", "To")
    cal_html = cal_html.replace("Fre", "Fr")
    cal_html = cal_html.replace("Lör", "Lö")
    cal_html = cal_html.replace("Sön", "Sö")
    cal_html = cal_html.replace("mån", "Må")
    cal_html = cal_html.replace("tis", "Ti")
    cal_html = cal_html.replace("ons", "On")
    cal_html = cal_html.replace("tor", "To")
    cal_html = cal_html.replace("fre", "Fr")
    cal_html = cal_html.replace("lör", "Lö")
    cal_html = cal_html.replace("sön", "Sö")

    return cal_html


def en_to_swe(english):
    """ Translates english to swedish for calendar
    entries. Swedish is available when using humanize
    but doesn't support swedish vecka, veckor.
    Pull request made to Arrow repository on GitHub
    https://github.com/crsmithdev/arrow/pull/780 """

    english = english.replace(" a ", " en ")
    english = english.replace("a ", "En ")
    english = english.replace("in", "Om")
    english = english.replace("month", "månad")
    english = english.replace("weeks", "veckor")
    english = english.replace("week", "vecka")
    english = english.replace("days", "dagar")
    english = english.replace("day", "dag")
    english = english.replace("ago", "sedan")
    english = english.replace("hours", "timmar")

    return english


def month_to_str(mid):
    """ Converts month number to month name
    Return: Str """

    if mid == 1:
        return "JAN"
    elif mid == 2:
        return "FEB"
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


def monthly_cal():
    """ Creates a monthly calendar with current date and local weekday names
    Reference: https://docs.python.org/3/library/calendar.html """

    today = date.today()
    day = int(today.strftime("%d"))
    year = int(today.strftime("%Y"))
    month = int(today.strftime("%m"))

    c = calendar.LocaleHTMLCalendar(calendar.MONDAY, "sv_SE")
    cal_html = format_cal(c.formatmonth(year, month))
    cal_html = cal_html.replace(f">{day}<", f"><div class='Current'>{day}</div><")  # Marks the current day

    return cal_html


def cal_events():
    """ Provides calendar data from a public Google Calendar .ics file
       with the help of ics.py
       Reference: https://icspy.readthedocs.io/en/stable/ """

    url = "https://calendar.google.com/calendar/ical/bsmmlfhb8fmfepu2cjdfucbq08%40group." \
          "calendar.google.com/public/basic.ics"
    gc = Calendar(requests.get(url).text)

    entries = []    # Create list for calendar events

    for event in gc.events:
        event_begin = event.begin.to('local')   # UTC to local time zone
        event_end = event.end.to('local')
        start = event_begin.format("HH:mm")
        end = event_end.format("HH:mm")
        if event.all_day:   # "Heldag" if all day activity else print out start and end time of event
            time = "Heldag"
        else:
            time = f"{start} - {end}"

        entries.append({    # Picks out event information from the ics file and adds it to the entries list
            "title": event.name[:20],
            "when": en_to_swe(event_end.humanize()),
            "time": time,
            "month": month_to_str(event.begin.datetime.month),
            "day": event_end.datetime.day,
            "timestamp": event_end.timestamp
        })

    entries.sort(key=lambda item: item.get("timestamp"))    # Sorts calendar events chronological

    return entries


@route("/api/calendar")
def cal():
    """ Sends monthly calendar and calendar events to calendar.js
    with JSON """

    cal_html = monthly_cal()
    entries = cal_events()

    cal_content = {
        "calendarHTML": cal_html,
        "entries": entries[0:5]
    }
    response.content_type = 'application/json'
    return json.dumps(cal_content)



run(server='gevent', reloader=True, host="localhost", port=8080, certfile='server.crt', keyfile='server.key')
