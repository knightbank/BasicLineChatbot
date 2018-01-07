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
let splitStr = String("Price BTC").split(" ");
let msg

console.log(String(splitStr[1]).toUpperCase());
getCoinMarketCapInfo(String(splitStr[1]).toUpperCase())
        .then((cmcInfo) => {
          getBxInfo(String(splitStr[1]).toUpperCase())
          .then((bxInfo) => {
            let calcDiff = Number(cmcInfo[0]["price_thb"]) - Number(bxInfo[0]["last_price"])
            let calDiffPct = calcDiff*100/Number(cmcInfo[0]["price_thb"])
            msg = {
              type: 'text',
              text: 
`${symbol.toUpperCase()} (Rank:${cmcInfo[0]["rank"]})
Price on CoinMktCap = $${Number(cmcInfo[0]["price_usd"]).toLocaleString('en') } (฿${Number(cmcInfo[0]["price_thb"]).toLocaleString('en')})
Price on bx.in.th = ฿${Number(bxInfo[0]["last_price"]).toLocaleString('en')} diff:${calcDiff} (${calDiffPct}%)
Percent Change
  1 Hr. ${cmcInfo[0]["percent_change_1h"]}%
  24 Hr. ${cmcInfo[0]["percent_change_24h"]}%
  7 Days. ${cmcInfo[0]["percent_change_7d"]}%`
            }
          })
        })
console.log(msg);