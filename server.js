const express = require('express');
const line = require('@line/bot-sdk');
const jsonfile = require('jsonfile');
const getCoinInfo = require("./processAllApi");
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


let handleMessageEvent = event => {
    let msg
    //let userProfile
    client.getProfile(event.source.userId).then((profile) => {
      userProfile = profile
    });
    let clientText = event.message.text.toLowerCase()
    let splitStr = clientText.split(" ");
    let currencyList
    let symbol
    //msg = getStringMessage(clientText);
    
    if(splitStr.length<=1){
      switch(clientText){
        case "hi" :
        case "hello" : 
        case "สวัสดี" : 
        case "หวัดดี" :
          msg = [{
            type: 'text',
            text: 'สวัสดีครัช'
          },
          {
            type: 'sticker',
            packageId: "1",
            stickerId: "12"
          }]
        break;
        case "help" :
          msg = {
            type: 'text',
            text: 
`คำสั่งสำหรับเรียกดูข้อมูล ราคา Coin/Token
จะอยู่ในรูปแบบ "price{space}symbol"
ex. "price btc" 
หรือ "price evx" 
(ไม่รวม double quote)
หาก Coin/Token นั้นมีข้อมูลอยู่บน bx.in.th 
จะนำข้อมูลล่าสุดมาแสดงด้วย`
          }
        break;
        default : 
      }//end switch
    }
    else{
      switch(splitStr[0]){
        case "price" :
        let cmcCalcDiff,ccpCalcDiff
        let cmcCalDiffPct,ccpCalcDiffPct
        let cmcDisplayCalcDiff,ccpDisplayCalcDiff
        let cmcDisplayCalDiffPct,ccpDisplayCalDiffPct
        let cmcUsdRateBX,ccpUsdRateBX,cmcUsdRate,ccpUsdRate
        let bxPriceTHB,bxPctChange
        let textMsg,textMsgConiInfo,textMsgCmc,textMsgCcp,textMsgBx,textMsgPctChange
        symbol = splitStr[1].toUpperCase()
        getCoinInfo(symbol)
        .then((coinInfo) => {
          cmcUsdRate = Number(coinInfo["Currency"][0]["cmcPriceTHB"]) / Number(coinInfo["Currency"][0]["cmcPriceUSD"])
          ccpUsdRate = Number(coinInfo["Currency"][0]["ccpPriceTHB"]) / Number(coinInfo["Currency"][0]["ccpPriceUSD"])

          if(coinInfo["Currency"][0]["bxPriceTHB"] != "N/A"){
            bxPriceTHB = Number(coinInfo["Currency"][0]["bxPriceTHB"]).toLocaleString('en')

            cmcCalcDiff = Number(coinInfo["Currency"][0]["bxPriceTHB"]) - Number(coinInfo["Currency"][0]["cmcPriceTHB"])
            cmcCalDiffPct = cmcCalcDiff*100/Number(coinInfo["Currency"][0]["bxPriceTHB"])

            ccpCalcDiff = Number(coinInfo["Currency"][0]["bxPriceTHB"]) - Number(coinInfo["Currency"][0]["ccpPriceTHB"])
            ccpCalcDiffPct = ccpCalcDiff*100/Number(coinInfo["Currency"][0]["bxPriceTHB"])

            cmcUsdRateBX = Number(coinInfo["Currency"][0]["bxPriceTHB"]) / Number(coinInfo["Currency"][0]["cmcPriceUSD"])
            ccpUsdRateBX = Number(coinInfo["Currency"][0]["bxPriceTHB"]) / Number(coinInfo["Currency"][0]["ccpPriceUSD"])

            if(cmcCalcDiff>=0){
              cmcDisplayCalcDiff = "+" + cmcCalcDiff.toLocaleString('en');
              cmcDisplayCalDiffPct = "+" + cmcCalDiffPct.toLocaleString('en');
            }
            else{
              cmcDisplayCalcDiff = cmcCalcDiff.toLocaleString('en');
              cmcDisplayCalDiffPct = cmcCalDiffPct.toLocaleString('en');
            }

            if(ccpCalcDiff>=0){
              ccpDisplayCalcDiff = "+" + ccpCalcDiff.toLocaleString('en');
              ccpDisplayCalDiffPct = "+" + ccpCalcDiffPct.toLocaleString('en');
            }
            else{
              ccpDisplayCalcDiff = ccpCalcDiff.toLocaleString('en');
              ccpDisplayCalDiffPct = ccpCalcDiffPct.toLocaleString('en');
            }

            textMsgBx = `

Price(bx) = ฿${bxPriceTHB} 
  USD Rate(CMC) :฿${cmcUsdRateBX.toLocaleString('en')}
  Diff(CMC): ${cmcDisplayCalcDiff} (${cmcDisplayCalDiffPct}%)
  USD Rate(CCP) :฿${ccpUsdRateBX.toLocaleString('en')}
  Diff(CCP): ${ccpDisplayCalcDiff} (${ccpDisplayCalDiffPct}%)`
          }
          else{
            bxPriceTHB = coinInfo["Currency"][0]["bxPriceTHB"]
            cmcDisplayCalcDiff = "N/A"
            cmcDisplayCalDiffPct = "N/A"
            ccpDisplayCalcDiff = "N/A"
            ccpDisplayCalDiffPct = "N/A"
            cmcUsdRateBX = "N/A"
            ccpUsdRateBX = "N/A"
          }

          textMsgConiInfo = `${symbol} (${coinInfo["Currency"][0]["name"]}) (Rank:${coinInfo["Currency"][0]["rank"]})`
          
          textMsgCmc = `

Price(CMC) = $${Number(coinInfo["Currency"][0]["cmcPriceUSD"]).toLocaleString('en') } (฿${Number(coinInfo["Currency"][0]["cmcPriceTHB"]).toLocaleString('en')})
  USD Rate = ฿${cmcUsdRate.toLocaleString('en')}`

  textMsgCcp = `

Price(CCP) = $${Number(coinInfo["Currency"][0]["ccpPriceUSD"]).toLocaleString('en') } (฿${Number(coinInfo["Currency"][0]["ccpPriceTHB"]).toLocaleString('en')})
  USD Rate = ฿${ccpUsdRate.toLocaleString('en')}`

  textMsgPctChange = `

Percent Change
  1 Hr. ${coinInfo["Currency"][0]["cmcPctChange1H"]}%
  24 Hr. ${coinInfo["Currency"][0]["cmcPctChange24H"]}% (bx:${coinInfo["Currency"][0]["bxPctChange"]}%)
  7 Days. ${coinInfo["Currency"][0]["cmcPctChange7D"]}%`

          if(textMsgBx === undefined){
            textMsg = textMsgConiInfo + textMsgCcp + textMsgPctChange
          }
          else {
            textMsg = textMsgConiInfo + textMsgCcp + textMsgBx + textMsgPctChange
          }

          msg = {
            type: 'text',
            text: textMsg
          }
            
          return client.replyMessage(event.replyToken, msg).then(() => {
        
          })
          .catch((err) => {
            console.log(err);
          });
        })
        .catch(error => {
            // Handle errors of asyncFunc1() and asyncFunc2()
            msg = {
              type: 'text',
              text: error
            }
            return client.replyMessage(event.replyToken, msg).then(() => {
        
            })
            .catch((err) => {
              console.log(err);
            });
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