from flask import Flask, request
from flask_cors import CORS, cross_origin
from MessagePositivity import *
from PointSuggestion import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def health_check():
    response_body = {
        "health_check": True
    }

    return response_body


@app.route('/ml/')
def health_check_ml():
    response_body = {
        "health_check": True
    }

    return response_body


@app.route('/api/validate')
def validate_message():
    message = request.args.get('message')
    results = PositivityCheck(message)

    response_body = {
        "result": results[0],
        "positive": float(results[1]["positive"]),
        "neutral": float(results[1]["neutral"]),
        "negative": float(results[1]["negative"]),
    }

    return response_body


@app.route('/ml/api/validate')
def validate_message_ml():
    message = request.args.get('message')
    results = PositivityCheck(message)

    response_body = {
        "result": results[0],
        "positive": float(results[1]["positive"]),
        "neutral": float(results[1]["neutral"]),
        "negative": float(results[1]["negative"]),
    }

    return response_body


@app.route('/api/pointSuggest')
def point_suggest():
    message = request.args.get('message')
    result = kudos_predict(message)

    response_body = {
        "result": result
    }

    return response_body


@app.route('/ml/api/pointSuggest')
def point_suggest_ml():
    message = request.args.get('message')
    result = kudos_predict(message)

    response_body = {
        "result": result
    }

    return response_body


if __name__ == '__main__':
    app.run(debug=True, port=5000)
