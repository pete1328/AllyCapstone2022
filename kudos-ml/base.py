from flask import Flask, request
from flask_cors import CORS, cross_origin
from MessagePositivity import *
from WordSuggestion import *

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
        "points": results[1],
    }

    return response_body


@app.route('/ml/api/validate')
def validate_message_ml():
    message = request.args.get('message')
    results = PositivityCheck(message)

    response_body = {
        "result": results[0],
        "points": results[1],
    }

    return response_body


@app.route('/api/wordSuggest')
def word_suggest():
    message = request.args.get('message')
    result = words_suggestion(message)

    response_body = {
        "result": result
    }

    return response_body


@app.route('/ml/api/wordSuggest')
def word_suggest_ml():
    message = request.args.get('message')
    result = words_suggestion(message)

    response_body = {
        "result": result
    }

    return response_body


if __name__ == '__main__':
    app.run(debug=True, port=5000)
