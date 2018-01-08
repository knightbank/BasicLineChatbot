"use strict";
const getJsonStr = require("./getJsonStr");
const jsonfile = require('jsonfile');
const getCoinInfo = require("./processAllApi");
let JsonBXObj;
let msg;
let splitStr = String("price Xmr").split(" ");
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
            bxPriceTHB = coinInfo["Currency"][0]["bxPriceTHB"]
            cmcDisplayCalcDiff = "N/A"
            cmcDisplayCalDiffPct = "N/A"
            ccpDisplayCalcDiff = "N/A"
            ccpDisplayCalDiffPct = "N/A"
            cmcUsdRateBX = "N/A"
            ccpUsdRateBX = "N/A"
          }

          textMsg = 
`${symbol} (${coinInfo["Currency"][0]["name"]}) (Rank:${coinInfo["Currency"][0]["rank"]})
Price(CoinMktCap) = $${Number(coinInfo["Currency"][0]["cmcPriceUSD"]).toLocaleString('en') } 
  (฿${Number(coinInfo["Currency"][0]["cmcPriceTHB"]).toLocaleString('en')})
  USD Rate = ${cmcUsdRate.toLocaleString('en')}
Price(CryptoCompare) = $${Number(coinInfo["Currency"][0]["ccpPriceUSD"]).toLocaleString('en') } 
  (฿${Number(coinInfo["Currency"][0]["ccpPriceTHB"]).toLocaleString('en')})
  USD Rate = ${ccpUsdRate.toLocaleString('en')}
Price(bx) = ฿${bxPriceTHB} 
  USD Rate(CMC) :฿${cmcUsdRateBX.toLocaleString('en')}
  Diff(CMC): ${cmcDisplayCalcDiff} (${cmcDisplayCalDiffPct}%)
  USD Rate(CCP) :฿${ccpUsdRateBX.toLocaleString('en')}
  Diff(CCP): ${ccpDisplayCalcDiff} (${ccpDisplayCalDiffPct}%)
Percent Change
  1 Hr. ${coinInfo["Currency"][0]["cmcPctChange1H"]}%
  24 Hr. ${coinInfo["Currency"][0]["cmcPctChange24H"]}% (bx:${coinInfo["Currency"][0]["bxPctChange"]}%)
  7 Days. ${coinInfo["Currency"][0]["cmcPctChange7D"]}%`
            
  console.log(textMsg);
        })