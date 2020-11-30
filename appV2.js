const line = require('@line/bot-sdk');
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const express = require('express')
const bodyParser = require('body-parser')

// create LINE SDK config from env variables
const config = {
    channelAccessToken: 'zEwOqu/LGEjlKz6dB42ZMqDSx20jPtr3KkYhSSKcizArux039zncRsYFZYrVkgenNWLNcQXSxjtZkQY6upZ416KvyVAEfVmjxvvt53x0NlEqcOD28sda7xmI9sgWH3J/1XbOUuXLvu4g+y8AS63I2gdB04t89/1O/w1cDnyilFU=',
    channelSecret: '5a6cfcc6e1a11e8565a56a46159edf79',
  };

  // create LINE SDK client
const client = new line.Client(config);

const app = express()
const port = process.env.PORT || 4000

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then(result =>
      res.json(result)
    );
  });

  function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }
  
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text,
    });
  }

app.use((err, req, res, next) => {
    if (err instanceof SignatureValidationFailed) {
      res.status(401).send(err.signature)
      return
    } else if (err instanceof JSONParseError) {
      res.status(400).send(err.raw)
      return
    }
    next(err) // will throw default 500
  })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port)