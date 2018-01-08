const getJsonStr = require("./getJsonStr");
const jsonfile = require('jsonfile');
const getCoinMarketCapInfo = require("./processCoinMarketCapApi");
const getBxInfo = require("./processbxApi");
const getCryptoCompareInfo = require("./processCryptoCompareApi");

let name,rank
let cmcPriceUSD,ccpPriceUSD
let cmcPriceTHB,ccpPriceTHB,bxPriceTHB
let cmcPctChange1H,cmcPctChange24H,cmcPctChange7D
let bxPctChange

getCoinInfo = (symbol) => {
return new Promise(function (resolve, reject) {
    getCoinMarketCapInfo(symbol)
    .then((cmcInfo) => {
        getCryptoCompareInfo(symbol)
        .then((ccpInfo) => {
            getBxInfo(symbol)
            .then((bxInfo) => {
                let obj = {} // empty Object
                let key = "Currency"
                obj[key] = []; // empty Array, which you can push() values into
                name = cmcInfo[0]["name"]
                rank = cmcInfo[0]["rank"]
                cmcPriceUSD = cmcInfo[0]["price_usd"]
                ccpPriceUSD = ccpInfo[symbol]["USD"]
                cmcPriceTHB = cmcInfo[0]["price_thb"]
                ccpPriceTHB = ccpInfo[symbol]["THB"]
                if (bxInfo != undefined)
                { 
                    bxPriceTHB = bxInfo["last_price"] 
                    bxPctChange = bxInfo["change"]
                } 
                else{ 
                    bxPriceTHB = "N/A" 
                    bxPctChange = "N/A"
                }
                cmcPctChange1H = cmcInfo[0]["percent_change_1h"]
                cmcPctChange24H = cmcInfo[0]["percent_change_24h"]
                cmcPctChange7D = cmcInfo[0]["percent_change_7d"]
                
                
                let data =
                {
                    "symbol" : symbol,
                    "name" : name,
                    "rank" : rank,
                    "cmcPriceUSD" : cmcPriceUSD,
                    "ccpPriceUSD" : ccpPriceUSD,
                    "cmcPriceTHB" : cmcPriceTHB,
                    "ccpPriceTHB" : ccpPriceTHB,
                    "bxPriceTHB" : bxPriceTHB,
                    "cmcPctChange1H" : cmcPctChange1H,
                    "cmcPctChange24H" : cmcPctChange24H,
                    "cmcPctChange7D" : cmcPctChange7D,
                    "bxPctChange" : bxPctChange
                }
                obj[key].push(data);
                resolve(obj) 
            })
        })
    })
})
}
module.exports = getCoinInfo;
// getCoinInfo("XMR")
// .then((result) => {
//     console.log(result);
// })