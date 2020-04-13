from bottle import route, run, template, static_file



@route("/")
def Home_page():
    return template("index")


@route("/static/<filename>")
def static_files(filename):
    return static_file(filename, root="static")

 
run(reloader=True, host='localhost', port=8080)