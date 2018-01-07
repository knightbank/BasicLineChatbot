"use strict";
const getJsonStr = require("./getJsonStr");
const jsonfile = require('jsonfile');
const getCoinMarketCapInfo = require("./processCoinMarketCapApi");
const getBxInfo = require("./processbxApi");
let JsonBXObj;
// getJsonStr("https://bx.in.th/api/")
// .then((result) => {
//     let bxCurrencyList = jsonfile.readFileSync("./bxCurrency.json")
//     JsonBXObj = result;
//     //console.log(JsonBXObj["30"]);
//     console.log(bxCurrencyList);
// })
// .catch(error => {
//     // Handle errors of asyncFunc1() and asyncFunc2()
//     console.log(error);
// });
let splitStr = String("Price XMR").split(" ");
let msg

console.log(String(splitStr[1]).toUpperCase());
let calcDiff
let calDiffPct
let displayCalcDiff
let displayCalDiffPct
let usdRateBX
let symbol = splitStr[1].toUpperCase()

getCoinMarketCapInfo(symbol)
        .then((cmcInfo) => {
          getBxInfo(symbol)
          .then((bxInfo) => {
            console.log(bxInfo);
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
  `${symbol} Name:${cmcInfo[0]["name"]} (Rank:${cmcInfo[0]["rank"]})
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
              console.log("cannot get bx Info");
              usdRateBX = Number(cmcInfo[0]["price_thb"])/Number(cmcInfo[0]["price_usd"])
              msg = {
                type: 'text',
                text: 
`${symbol} (Rank:${cmcInfo[0]["rank"]})
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
          .catch((err) => {
            
          });
        })