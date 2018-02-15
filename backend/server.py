from src import app
from flask import jsonify, request
from flask_restplus import Api, Resource, fields
import requests
import json
api = Api(app)

@api.route('/webhook')
class Todo(Resource):
    def post(self):
        data = api.payload
        if data is None:
            return {}
        result = data["result"]
        action = result["action"]
        if action != "Action":
            return {}
        parameters = result["parameters"]
        currency_from = parameters["currency-from"]
        currency_to = parameters["currency-to"]
        amount = float(parameters["amount"])
        req = requests.get("https://api.fixer.io/latest?base=" + currency_from)
        abc = req.json()
        rate = float(abc["rates"][currency_to])
        converted_amount = str(amount * rate)
        speech = "The converted amount is : " + converted_amount + " " + currency_to
        response = {
            "speech": speech,
            "displayText": speech,
            "source": "Conversion.py"
        }
        return response


