from bottle import route, run, template, static_file
import psycopg2


@route("/")
def Home_page():
    return template("index")


@route("/static/<filename>")
def static_files(filename):
    return static_file(filename, root="static")

 
run(host='localhost', port=8080)