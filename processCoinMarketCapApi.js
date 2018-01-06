//https://api.coinmarketcap.com/v1/ticker/
//https://stackoverflow.com/questions/14208707/parsing-json-in-nodejs

let request = require("request")
let getJsonStr = require("./json-promise")
let Sync = require('sync')

require('bluebird');
const jsonfile = require('jsonfile');
let getCoinMarketCapInfo

Sync(function() {
getCoinMarketCapInfo = (symbol) => {
    
        console.log("ABCHSD");
            //return new Promise = () => {
                currencyList = jsonfile.readFileSync("./currencyList.json")
                getJsonStr("https://api.coinmarketcap.com/v1/ticker/"+currencyList[symbol.toUpperCase()]+"?convert=THB")
                .then((result) => {
                    JsonObj = result;
        
        console.log( `${symbol.toUpperCase()} on CoinmarketCap (Rank:${JsonObj[0]["rank"]})
        Price = $${Number(JsonObj[0]["price_usd"]).toLocaleString('en') } (฿${Number(JsonObj[0]["price_thb"]).toLocaleString('en')})
        Percent Change
          1 Hr. ${JsonObj[0]["percent_change_1h"]}%
          24 Hr. ${JsonObj[0]["percent_change_24h"]}%
          7 Days. ${JsonObj[0]["percent_change_7d"]}%`
        );
                })
    }
})


//module.exports = getCoinMarketCapInfo;
getCoinMarketCapInfo("btc");
