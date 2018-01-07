//https://api.coinmarketcap.com/v1/ticker/
//https://stackoverflow.com/questions/14208707/parsing-json-in-nodejs
//"https://bx.in.th/api/"
let request = require("request")
let getJsonStr = require("./getJsonStr")
let text

require('bluebird');
const jsonfile = require('jsonfile');

getCoinMarketCapInfo = (symbol) => {

    return new Promise(function (resolve, reject) {

        currencyList = jsonfile.readFileSync("./currencyList.json")
                getJsonStr("https://bx.in.th/api/")
                .then((result) => {
                    JsonObj = result;
        
        //             text= `${symbol.toUpperCase()} on CoinmarketCap (Rank:${JsonObj[0]["rank"]})
        // Price = $${Number(JsonObj[0]["price_usd"]).toLocaleString('en') } (฿${Number(JsonObj[0]["price_thb"]).toLocaleString('en')})
        // Percent Change
        //   1 Hr. ${JsonObj[0]["percent_change_1h"]}%
        //   24 Hr. ${JsonObj[0]["percent_change_24h"]}%
        //   7 Days. ${JsonObj[0]["percent_change_7d"]}%`;
          //if (err) return reject(err) // rejects the promise with `err` as the reason
          resolve(JsonObj)               // fulfills the promise with `data` as the value
                })
      })          
    }


//module.exports = getCoinMarketCapInfo;
getCoinMarketCapInfo("btc").then((text) => { console.log(text);})
