//https://api.coinmarketcap.com/v1/ticker/
//https://stackoverflow.com/questions/14208707/parsing-json-in-nodejs

let request = require("request")
let getJsonStr = require("./getJsonStr")
let Sync = require('sync')

require('bluebird');
const jsonfile = require('jsonfile');
let getCoinMarketCapInfo
let text

getCoinMarketCapInfo = (symbol) => {

    return new Promise(function (resolve, reject) {
        currencyList = jsonfile.readFileSync("./currencyList.json")
        let coinId = symbol.toUpperCase();
        getJsonStr("https://api.coinmarketcap.com/v1/ticker/"+String(currencyList[coinId]).replace(" ","-").toLowerCase()+"?convert=THB")
                .then((result) => {
                    JsonObj = result;
        
                    text= `${symbol.toUpperCase()} on CoinmarketCap (Rank:${JsonObj[0]["rank"]})
        Price = $${Number(JsonObj[0]["price_usd"]).toLocaleString('en') } (฿${Number(JsonObj[0]["price_thb"]).toLocaleString('en')})
        Percent Change
          1 Hr. ${JsonObj[0]["percent_change_1h"]}%
          24 Hr. ${JsonObj[0]["percent_change_24h"]}%
          7 Days. ${JsonObj[0]["percent_change_7d"]}%`;
          //if (err) return reject(err) // rejects the promise with `err` as the reason
          resolve(text)               // fulfills the promise with `data` as the value
                })
      })          
    }
module.exports = getCoinMarketCapInfo;
//getCoinMarketCapInfo("btc");
