"use strict";
const getJsonStr = require("./getJsonStr");
const jsonfile = require('jsonfile');
const getCoinMarketCapInfo = require("./processCoinMarketCapApi");
const getBxInfo = require("./processbxApi");
const getCryptoCompareInfo = require("./processCryptoCompareApi");
let JsonBXObj;
let msg;
let splitStr = String("price@ccp BTC").split(" ");
let symbol = splitStr[1].toUpperCase()
console.log(symbol);
getCryptoCompareInfo(symbol)
        .then((ccpInfo) => {
          console.log(ccpInfo[symbol]["THB"]);
          getBxInfo(symbol)
          .then((bxInfo) => {
            let calcDiff
            let calDiffPct
            let displayCalcDiff
            let displayCalDiffPct
            let usdRateBX
            if (bxInfo != undefined){
              
              calcDiff = Number(bxInfo["last_price"]) - Number(ccpInfo[symbol]["THB"]) 
              calDiffPct = calcDiff*100/Number(bxInfo["last_price"])
              displayCalcDiff
              displayCalDiffPct
              usdRateBX = Number(bxInfo["last_price"])/Number(ccpInfo[symbol]["USD"])

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
Price(CryptoCompare) = $${Number(ccpInfo[symbol]["USD"]).toLocaleString('en') } (฿${Number(ccpInfo[symbol]["THB"]).toLocaleString('en')})
Price(BX) = ฿${Number(bxInfo["last_price"]).toLocaleString('en')} 
  USD Rate: ฿${usdRateBX.toLocaleString('en')}
  Diff: ${displayCalcDiff} (${displayCalDiffPct}%)`
              }
            }// if have bx info
            else{
              usdRateBX = Number(ccpInfo[symbol]["THB"])/Number(ccpInfo[symbol]["USD"])
              msg = {
                type: 'text',
                text: 
`${symbol}
Price(CryptoCompare) = $${Number(ccpInfo[symbol]["USD"]).toLocaleString('en') } (฿${Number(ccpInfo[symbol]["THB"]).toLocaleString('en')})
Price(BX) = N/A 
  USD Rate: ฿${usdRateBX.toLocaleString('en')}`
              }
            }
            
            
            return client.replyMessage(event.replyToken, msg).then(() => {
        
            })
          })
        })