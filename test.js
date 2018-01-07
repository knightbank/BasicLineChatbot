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
let symbol = splitStr[1].toUpperCase()
getCoinMarketCapInfo(symbol)
        .then((cmcInfo) => {
            console.log("1");
          getBxInfo(symbol)
          .then((bxInfo) => {
              console.log("2");
            let calcDiff = Number(bxInfo["last_price"]) - Number(cmcInfo[0]["price_thb"]) 
            let calDiffPct = calcDiff*100/Number(bxInfo["last_price"])
            let displayCalcDiff
            let displayCalDiffPct

            if(calcDiff>=0){
                displayCalcDiff = "+" + calcDiff.toLocaleString('en');
                displayCalDiffPct = "+" + calDiffPct.toLocaleString('en');
            }

            msg =  
`${symbol} (Rank:${cmcInfo[0]["rank"]})
Price on CoinMktCap = $${Number(cmcInfo[0]["price_usd"]).toLocaleString('en') } (฿${Number(cmcInfo[0]["price_thb"]).toLocaleString('en')})
Price on bx.in.th = ฿${Number(bxInfo["last_price"]).toLocaleString('en')} diff: ${displayCalcDiff} (${displayCalDiffPct}%)
Percent Change
  1 Hr. ${cmcInfo[0]["percent_change_1h"]}%
  24 Hr. ${cmcInfo[0]["percent_change_24h"]}%
  7 Days. ${cmcInfo[0]["percent_change_7d"]}%`
            
            console.log(msg);
          })
        })
        .catch(error => {
            // Handle errors of asyncFunc1() and asyncFunc2()
        });