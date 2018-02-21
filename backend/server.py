from flask_restplus import Api, Resource
import requests
import json

from src import app

api = Api(app)
ACCESS_TOKEN = "4698f4c543d948d0f351984b084acacc5e574514ce98ab50"


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





