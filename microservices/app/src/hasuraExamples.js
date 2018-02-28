var express = require('express');
var router = express.Router();
var config = require('./config');
var request = require('request');

router.route("/").get(function (req, res) {
  res.send("Hello world")
});

router.route("/get_articles").get(function (req, res) {
  console.log("Get articles");
  //Fetch all rows from table - articles
  var selectOptions = {
    url: config.projectConfig.url.data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-User-Id': 0,
      'X-Hasura-Role': 'anonymous'
    },
    body: JSON.stringify({
      'type': 'select',
      'args': {
        'table': 'article',
        'columns': [
          '*'
        ]
      }
    })
  };
  request(selectOptions, function(error, response, body) {
    if (error) {
        console.log('Error from select request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'Select request failed'
        });
    }
    res.json(JSON.parse(body))
  })
});

router.route("/whoami").get(function (req, res) {
  console.log("Get currently logged in user information");
  //Fetch all rows from table - articles
  var userInfoOptions = {
    url: config.projectConfig.url.auth.getUserInfo,
    method: 'GET',
  };
  request(userInfoOptions, function(error, response, body) {
    if (error) {
        console.log('Error from auth api request: ');
        console.log(error)
        res.status(500).json({
          'error': error,
          'message': 'User info request failed'
        });
    }
    res.json(JSON.parse(body))
  })
})

module.exports = router;
