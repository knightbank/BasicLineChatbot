//https://api.coinmarketcap.com/v1/ticker/
//https://stackoverflow.com/questions/14208707/parsing-json-in-nodejs

let request = require("request")
let getJsonStr = require("./getJsonStr")

require('bluebird');
const jsonfile = require('jsonfile');
let getCoinMarketCapInfo
let text

getCoinMarketCapInfo = (symbol) => {

    return new Promise(function (resolve, reject) {
        currencyList = jsonfile.readFileSync("./currencyList.json")
        let coinId = symbol.toUpperCase();
        getJsonStr("https://api.coinmarketcap.com/v1/ticker/"+currencyList[coinId]+"?convert=THB")
            .then((result) => {
                JsonObj = result;
          //if (err) return reject(err) // rejects the promise with `err` as the reason
        resolve(JsonObj)               // fulfills the promise with `data` as the value
            })
      })          
    }
module.exports = getCoinMarketCapInfo;
//getCoinMarketCapInfo("btc");
