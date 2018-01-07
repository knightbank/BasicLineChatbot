const express = require('express');
const line = require('@line/bot-sdk');
const jsonfile = require('jsonfile');
const Sync = require('sync');
const getCoinMarketCapInfo = require("./processCoinMarketCapApi");
const getBxInfo = require("./processbxApi");
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

// let handleJoinEvent = event => {
//   let msg
//   return client.replyMessage(event.replyToken, msg).then(() => {
      
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

let handleMessageEvent = event => {
    let msg
    client.getProfile(event.source.userId).then((profile) => {
      userProfile = profile
    });
    let clientText = event.message.text.toLowerCase()
    let splitStr = clientText.split(" ");
    let currencyList
    //msg = getStringMessage(clientText);
    
    if(splitStr.length<=1){
      switch(clientText){
        case "hi"||"hello"||'สวัสดี'||'หวัดดี' :
          msg = [{
            type: 'text',
            text: 'สวัสดีครัช '+ userProfile.displayName
          },
          {
            type: 'sticker',
            packageId: "1",
            stickerId: "12"
          }]
        break;
        default : msg = {
          type: 'text',
          text: new Date()
        }
      }//end switch
    }
    else{
      
      switch(splitStr[0]){
        case "price" || "ราคา" :
        let symbol = splitStr[1].toUpperCase()

        getCoinMarketCapInfo(symbol)
        .then((cmcInfo) => {
          getBxInfo(symbol)
          .then((bxInfo) => {
            let calcDiff = Number(bxInfo["last_price"]) - Number(cmcInfo[0]["price_thb"]) 
            let calDiffPct = calcDiff*100/Number(bxInfo["last_price"])
            let displayCalcDiff
            let displayCalDiffPct
            let usdRateBX = Number(bxInfo["last_price"])/Number(cmcInfo[0]["price_usd"])

            if(calcDiff>=0){
              displayCalcDiff = "+" + calcDiff.toLocaleString('en');
              displayCalDiffPct = "+" + calDiffPct.toLocaleString('en');
            }
            else{
              displayCalcDiff = calcDiff.toLocaleString('en');
              displayCalDiffPct = calDiffPct.toLocaleString('en');
            }
            msg = {
              type: 'text',
              text: 
`${symbol} (Rank:${cmcInfo[0]["rank"]})
Price(CoinMktCap) = $${Number(cmcInfo[0]["price_usd"]).toLocaleString('en') } (฿${Number(cmcInfo[0]["price_thb"]).toLocaleString('en')})
Price(BX) = ฿${Number(bxInfo["last_price"]).toLocaleString('en')} 
  USD Rate: ฿${usdRateBX.toLocaleString('en')}
  Diff: ${displayCalcDiff} (${displayCalDiffPct}%)
Percent Change
  1 Hr. ${cmcInfo[0]["percent_change_1h"]}%
  24 Hr. ${cmcInfo[0]["percent_change_24h"]}% (bx:${bxInfo["last_price"]}%)
  7 Days. ${cmcInfo[0]["percent_change_7d"]}%`
            }

            return client.replyMessage(event.replyToken, msg).then(() => {
        
            })
            .catch((err) => {
              console.log(err);
            });
          })
        })
        .catch(error => {
            // Handle errors of asyncFunc1() and asyncFunc2()
            msg = {
              type: 'text',
              text: error
            }
        });
        break;
      }
    }

    return client.replyMessage(event.replyToken, msg).then(() => {
      
    })
    .catch((err) => {
      console.log(err);
    });
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});