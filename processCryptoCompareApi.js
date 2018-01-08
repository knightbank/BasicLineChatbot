let request = require("request")
let getJsonStr = require("./getJsonStr")

require('bluebird');
const jsonfile = require('jsonfile');
let getCryptoCompareInfo
let text

getCryptoCompareInfo = (symbol) => {

    return new Promise(function (resolve, reject) {
        let coinId = symbol.toUpperCase();
        getJsonStr("https://min-api.cryptocompare.com/data/pricemulti?fsyms="+coinId+"&tsyms=BTC,USD,THB")
            .then((result) => {
                JsonObj = result;
          //if (err) return reject(err) // rejects the promise with `err` as the reason
        resolve(JsonObj)               // fulfills the promise with `data` as the value
            })
      })          
    }
//module.exports = getCryptoCompareInfo;
 getCryptoCompareInfo("btc")
 .then((text) => {
     console.log(text["BTC"]["USD"]);
    })
