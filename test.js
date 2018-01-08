"use strict";
const getJsonStr = require("./getJsonStr");
const jsonfile = require('jsonfile');
const getCoinInfo = require("./processAllApi");
let JsonBXObj;
let msg;
let splitStr = String("price BTC").split(" ");
let symbol = splitStr[1].toUpperCase()
console.log(symbol);

        let cmcCalcDiff,ccpCalcDiff
        let cmcCalDiffPct,ccpCalcDiffPct
        let cmcDisplayCalcDiff,ccpDisplayCalcDiff
        let cmcDisplayCalDiffPct,ccpDisplayCalDiffPct
        let cmcUsdRateBX,ccpUsdRateBX,cmcUsdRate,ccpUsdRate
        let bxPriceTHB,bxPctChange
        let textMsg
        symbol = splitStr[1].toUpperCase()
        getCoinInfo(symbol)
        .then((coinInfo) => {
          if(coinInfo[0]["bxPriceTHB"] != "N/A"){
            bxPriceTHB = Number(coinInfo[0]["bxPriceTHB"]).toLocaleString('en')
            cmcCalcDiff = Number(coinInfo[0]["bxPriceTHB"]) - Number(coinInfo[0]["cmcPriceTHB"])
            cmcCalDiffPct = cmcCalcDiff*100/Number(coinInfo[0]["bxPriceTHB"])
            ccpCalcDiff = Number(coinInfo[0]["bxPriceTHB"]) - Number(coinInfo[0]["ccpPriceTHB"])
            ccpCalDiffPct = ccpCalcDiff*100/Number(coinInfo[0]["bxPriceTHB"])
            cmcUsdRateBX = Number(coinInfo[0]["bxPriceTHB"]) / Number(coinInfo[0]["cmcPriceUSD"])
            ccpUsdRateBX = Number(coinInfo[0]["bxPriceTHB"]) / Number(coinInfo[0]["ccpPriceUSD"])
            cmcUsdRate = Number(coinInfo[0]["cmcPriceTHB"]) / Number(coinInfo[0]["cmcPriceUSD"])
            ccpUsdRate = Number(coinInfo[0]["ccpPriceTHB"]) / Number(coinInfo[0]["ccpPriceUSD"])

            if(cmcCalcDiff>=0){
              cmcDisplayCalcDiff = "+" + cmcCalcDiff.toLocaleString('en');
              cmcDisplayCalDiffPct = "+" + cmcCalcDiff.toLocaleString('en');
            }
            else{
              cmcDisplayCalcDiff = cmcCalcDiff.toLocaleString('en');
              cmcDisplayCalDiffPct = cmcCalcDiff.toLocaleString('en');
            }

            if(ccpCalcDiff>=0){
              ccpDisplayCalcDiff = "+" + ccpCalcDiff.toLocaleString('en');
              ccpDisplayCalDiffPct = "+" + ccpCalcDiff.toLocaleString('en');
            }
            else{
              ccpDisplayCalcDiff = ccpCalcDiff.toLocaleString('en');
              ccpDisplayCalDiffPct = ccpCalcDiff.toLocaleString('en');
            }
          }
          else{
            bxPriceTHB = coinInfo[0]["bxPriceTHB"]
            cmcDisplayCalcDiff = "N/A"
            cmcDisplayCalDiffPct = "N/A"
            ccpDisplayCalcDiff = "N/A"
            ccpDisplayCalDiffPct = "N/A"
            cmcUsdRateBX = "N/A"
            ccpUsdRateBX = "N/A"
          }

          textMsg = 
`${symbol} (${coinInfo[0]["name"]}) (Rank:${coinInfo[0]["rank"]})
Price(CoinMktCap) = $${Number(coinInfo[0]["cmcPriceUSD"]).toLocaleString('en') } 
  (฿${Number(coinInfo[0]["cmcPriceTHB"]).toLocaleString('en')})
  USD Rate = ${cmcUsdRate}
Price(CryptoCompare) = $${Number(coinInfo[0]["ccpPriceUSD"]).toLocaleString('en') } 
  (฿${Number(coinInfo[0]["ccpPriceTHB"]).toLocaleString('en')})
  USD Rate = ${ccpUsdRate}
Price(bx) = ฿${bxPriceTHB} 
  USD Rate(CMC) :฿${cmcUsdRateBX.toLocaleString('en')}
  Diff(CMC): ${cmcDisplayCalcDiff} (${cmcDisplayCalDiffPct}%)
  USD Rate(CCP) :฿${ccpUsdRateBX.toLocaleString('en')}
  Diff(CCP): ${ccpDisplayCalcDiff} (${ccpDisplayCalDiffPct}%)
Percent Change
  1 Hr. ${coinInfo[0]["cmcPctChange1H"]}%
  24 Hr. ${coinInfo[0]["cmcPctChange24H"]}% (bx:${coinInfo[0]["bxPctChange"]}%)
  7 Days. ${coinInfo[0]["cmcPctChange7D"]}%`
            
          return client.replyMessage(event.replyToken, msg).then(() => {
        
          })
          .catch((err) => {
            console.log(err);
          });
        })