from flask_restplus import Api, Resource
from decimal import Decimal
import requests
import json

from src import app

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
        converted_amount = str(round(Decimal(amount * rate),2))
        speech = "The converted amount is : " + converted_amount + " " + currency_to
        response_post = {
            "speech": speech,
            "displayText": speech,
            "source": "Conversion.py"
        }
        return response_post





