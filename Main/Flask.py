from flask import Flask,jsonify,render_template

app = Flask(__name__)

@app.route("/apod-epic")
def apod():
    return render_template("nasa_index.html")

@app.route("/")
def home():
    return render_template("spin_index.html")

@app.route("/stats")
def stats():
    return render_template(".html")

@app.route("/asteroid")
def asteroid():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug = True)
