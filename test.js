"use strict";
const getJsonStr = require("./getJsonStr");
const jsonfile = require('jsonfile');
const getCoinMarketCapInfo = require("./processCoinMarketCapApi");
const getBxInfo = require("./processbxApi");
const getCryptoCompareInfo = require("./processCoinMarketCapApi");
let JsonBXObj;
let splitStr = "price@ccp BTC"
let symbol = splitStr[1].toUpperCase()

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
              calcDiff = Number(bxInfo["last_price"]) - Number(ccpInfo[0]["price_thb"]) 
              calDiffPct = calcDiff*100/Number(bxInfo["last_price"])
              displayCalcDiff
              displayCalDiffPct
              usdRateBX = Number(bxInfo["last_price"])/Number(ccpInfo[0]["price_usd"])

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
  `${symbol} (${ccpInfo[0]["name"]}) (Rank:${ccpInfo[0]["rank"]})
Price(CoinMktCap) = $${Number(ccpInfo[0]["price_usd"]).toLocaleString('en') } (฿${Number(ccpInfo[0]["price_thb"]).toLocaleString('en')})
Price(BX) = ฿${Number(bxInfo["last_price"]).toLocaleString('en')} 
  USD Rate: ฿${usdRateBX.toLocaleString('en')}
  Diff: ${displayCalcDiff} (${displayCalDiffPct}%)
Percent Change
  1 Hr. ${ccpInfo[0]["percent_change_1h"]}%
  24 Hr. ${ccpInfo[0]["percent_change_24h"]}% (bx:${bxInfo["change"]}%)
  7 Days. ${ccpInfo[0]["percent_change_7d"]}%`
              }
            }// if have bx info
            else{
              
            }
            
            return client.replyMessage(event.replyToken, msg).then(() => {
        
            })
            .catch((err) => {
              console.log(err);
            });
          })
        })