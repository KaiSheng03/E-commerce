from flask import Flask

app1 = Flask(__name__)

app1.route('/market')
def market():
    return {"market": "market1"}

if __name__ == "__main__":
    app1.run(debug=True)