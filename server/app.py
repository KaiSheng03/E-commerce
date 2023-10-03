from flask import Flask

app = Flask(__name__)

@app.route('/market')
def market():
    return {"market": "market1"}

if __name__ == "__main__":
    app.run(debug=True)