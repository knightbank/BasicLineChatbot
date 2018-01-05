const express = require('express');
const line = require('@line/bot-sdk');
const getJsonStr = require("./processApi");

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
    // channelAccessToken : "s0FohKZ92RQ/5iPlFAuy9H5kDhW22LDd/kgEddllK/0YebKYBJygtfe7LhTE4k063Xvrdzbz4tvij/p7BmBD1agA9E93HmcH8/k2aq1egRzsa4iFlbHI2Z3R8zRgY96R8wbNOX7jKumFT3BzzTwtBwdB04t89/1O/w1cDnyilFU=",
    // channelSecret : "549586180de361d0cbf31b02ec343d06"
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

let handleMessageEvent = event => {
    let msg
    client.getProfile(event.source.userId).then((profile) => {
      userProfile = profile
    });
    let clientText = event.message.text.toLowerCase()
    msg = getStringMessage(clientText);
    

    return client.replyMessage(event.replyToken, msg).then(() => {
      
    })
    .catch((err) => {
      console.log(err);
    });
}

let getStringMessage = clientText => {
  let msg;
  if(clientText === "hi" || clientText === "hello" || clientText === 'สวัสดี' || clientText === 'หวัดดี'){
    msg = [{
        type: 'text',
        text: 'สวัสดีครับ '+ userProfile.displayName
      },
      {
        type: 'sticker',
        packageId: "1",
        stickerId: "12"
      }
    ]
  }
  else{
    msg = new Date().getDate();
  }

  return msg;
}


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});