const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

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

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    let msg
    client.getProfile(event.source.userId).then((profile) => {
      userProfile = profile
    });

    // let msg = {
    //     type: 'text',
    //     text: 'สวัสดีครัช'+ userProfile.displayName + ' ' + userProfile.pictureUrl
    // };

    let clientText = event.message.text.toLowerCase()
    if(clientText === "hi" || clientText === "hello"){
      msg = [{
        type: 'text',
        text: 'สวัสดีครัช'+ userProfile.displayName
      },
      {
        type: 'image',
        originalContentUrl: userProfile.pictureUrl,
        previewImageUrl: userProfile.pictureUrl
      }]
    }

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});