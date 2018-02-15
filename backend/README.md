# Backend for Currency Conversion
## Overview 
This URL gives a response with the converted values of the desired currency
## Making the request
- URL: https://api.dialogflow.com/v1/query?v=20150910
- headers: ` {
            "Authorization":  "Bearer " + ACCESS_TOKEN",
            "Content-Type": "application/json"
        }`
- data: ` {
         "lang": "en",
         "query": "Users_Query",
         "sessionId": "ed49f385-decb-4859-bebd-1dd6b842ac1c",
         "timezone": "America/Los_Angeles"
         }`
## Response
- Lets say the Users_Query = `Convert 50 inr to usd`
- The response would look like this:
- `{
    "id": "33e87a23-afc2-4a45-91d7-b213f7910ec1",
    "timestamp": "2018-02-15T12:15:03.656Z",
    "lang": "en",
    "result": {
        "source": "agent",
        "resolvedQuery": "Convert 50 inr to usd",
        "action": "Action",
        "actionIncomplete": false,
        "parameters": {
            "currency-to": "USD",
            "currency-from": "INR",
            "amount": "50"
        },
        "contexts": [],
        "metadata": {
            "intentId": "bd6b4684-106d-4009-a5e0-d26d932d9f41",
            "webhookUsed": "true",
            "webhookForSlotFillingUsed": "false",
            "webhookResponseTime": 3698,
            "intentName": "Intent"
        },
        "fulfillment": {
            "speech": "The converted amount is : 0.78035 USD",
            "source": "Conversion.py",
            "displayText": "The converted amount is : 0.78035 USD",
            "messages": [
                {
                    "type": 0,
                    "speech": "The converted amount is : 0.78035 USD"
                }
            ]
        },
        "score": 1
    },
    "status": {
        "code": 200,
        "errorType": "success",
        "webhookTimedOut": false
    },
    "sessionId": "ed49f385-decb-4859-bebd-1dd6b842ac1c"
}`
- The desired output will be `displayText` which is under `fulfillment`
