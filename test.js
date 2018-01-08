"use strict";
const getJsonStr = require("./getJsonStr");
const jsonfile = require('jsonfile');
const getCoinMarketCapInfo = require("./processCoinMarketCapApi");
const getBxInfo = require("./processbxApi");
const getCryptoCompareInfo = require("./processCoinMarketCapApi");
let JsonBXObj;
let msg;
let splitStr = "price@ccp BTC"
let symbol = splitStr[1].toUpperCase()

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
จะนำข้อมูลล่าสุดมาแสดงด้วย
ปล.symbol จะอ้างอิงกับ CoinMktCap`
      }
    break;
    default : 
  }//end switch
}
else{
  
  switch(splitStr[0]){
    case "price@cmc" :
    symbol = splitStr[1].toUpperCase()

    getCoinMarketCapInfo(symbol)
    .then((cmcInfo) => {
      getBxInfo(symbol)
      .then((bxInfo) => {
        let calcDiff
        let calDiffPct
        let displayCalcDiff
        let displayCalDiffPct
        let usdRateBX
        if (bxInfo != undefined){
          calcDiff = Number(bxInfo["last_price"]) - Number(cmcInfo[0]["price_thb"]) 
          calDiffPct = calcDiff*100/Number(bxInfo["last_price"])
          displayCalcDiff
          displayCalDiffPct
          usdRateBX = Number(bxInfo["last_price"])/Number(cmcInfo[0]["price_usd"])

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
`${symbol} (${cmcInfo[0]["name"]}) (Rank:${cmcInfo[0]["rank"]})
Price(CoinMktCap) = $${Number(cmcInfo[0]["price_usd"]).toLocaleString('en') } (฿${Number(cmcInfo[0]["price_thb"]).toLocaleString('en')})
Price(BX) = ฿${Number(bxInfo["last_price"]).toLocaleString('en')} 
USD Rate: ฿${usdRateBX.toLocaleString('en')}
Diff: ${displayCalcDiff} (${displayCalDiffPct}%)
Percent Change
1 Hr. ${cmcInfo[0]["percent_change_1h"]}%
24 Hr. ${cmcInfo[0]["percent_change_24h"]}% (bx:${bxInfo["change"]}%)
7 Days. ${cmcInfo[0]["percent_change_7d"]}%`
          }
        }// if have bx info
        else{
          usdRateBX = Number(cmcInfo[0]["price_thb"])/Number(cmcInfo[0]["price_usd"])
          msg = {
            type: 'text',
            text: 
`${symbol} (${cmcInfo[0]["name"]}) (Rank:${cmcInfo[0]["rank"]})
Price(CoinMktCap) = $${Number(cmcInfo[0]["price_usd"]).toLocaleString('en') } (฿${Number(cmcInfo[0]["price_thb"]).toLocaleString('en')})
Price(BX) = N/A 
USD Rate: ฿${usdRateBX.toLocaleString('en')}
Percent Change
1 Hr. ${cmcInfo[0]["percent_change_1h"]}%
24 Hr. ${cmcInfo[0]["percent_change_24h"]}%
7 Days. ${cmcInfo[0]["percent_change_7d"]}%`
          }
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
        return client.replyMessage(event.replyToken, msg).then(() => {
    
        })
        .catch((err) => {
          console.log(err);
        });
    });
    break;
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
    case "price@ccp" :
    symbol = splitStr[1].toUpperCase()

    getCryptoCompareInfo(symbol)
    .then((ccpInfo) => {
      getBxInfo(symbol)
      .then((bxInfo) => {
        let calcDiff
        let calDiffPct
        let displayCalcDiff
        let displayCalDiffPct
        let usdRateBX
        if (bxInfo != undefined){
          calcDiff = Number(bxInfo["last_price"]) - Number(ccpInfo[0]["THB"]) 
          calDiffPct = calcDiff*100/Number(bxInfo["last_price"])
          displayCalcDiff
          displayCalDiffPct
          usdRateBX = Number(bxInfo["last_price"])/Number(ccpInfo[0]["USD"])

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
`${symbol} 
Price(CryptoCompare) = $${Number(ccpInfo[0]["USD"]).toLocaleString('en') } (฿${Number(ccpInfo[0]["THB"]).toLocaleString('en')})
Price(BX) = ฿${Number(bxInfo["last_price"]).toLocaleString('en')} 
USD Rate: ฿${usdRateBX.toLocaleString('en')}
Diff: ${displayCalcDiff} (${displayCalDiffPct}%)`
          }
        }// if have bx info
        else{
          usdRateBX = Number(ccpInfo[0]["THB"])/Number(ccpInfo[0]["USD"])
          msg = {
            type: 'text',
            text: 
`${symbol}
Price(CryptoCompare) = $${Number(ccpInfo[0]["USD"]).toLocaleString('en') } (฿${Number(ccpInfo[0]["THB"]).toLocaleString('en')})
Price(BX) = N/A 
USD Rate: ฿${usdRateBX.toLocaleString('en')}`
          }
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
        return client.replyMessage(event.replyToken, msg).then(() => {
    
        })
        .catch((err) => {
          console.log(err);
        });
    });
    break;
  }
}