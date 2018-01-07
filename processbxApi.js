//https://api.coinmarketcap.com/v1/ticker/
//https://stackoverflow.com/questions/14208707/parsing-json-in-nodejs
//"https://bx.in.th/api/"
let request = require("request")
let getJsonStr = require("./getJsonStr")
require('bluebird');
const jsonfile = require('jsonfile');

let paringID

getBxInfo = (symbol) => {

    return new Promise(function (resolve, reject) {

        currencyList = jsonfile.readFileSync("./bxCurrency.json")
        currencyList.forEach(currency=> {
            if(currency["symbol"] == symbol.toUpperCase()+"THB"){
                paringID = currency["pairing_id"]
            }
            // else{
            //     paringID = -1
            // }
        })
        getJsonStr("https://bx.in.th/api/")
        .then((result) => {
            JsonObj = result[String(paringID)];
          //if (err) return reject(err) // rejects the promise with `err` as the reason
          resolve(JsonObj)               // fulfills the promise with `data` as the value
        })
        .catch(error => {
            // Handle errors of asyncFunc1() and asyncFunc2()
            return reject(error)
        });
      })          
    }


module.exports = getBxInfo;
// getBxInfo("xmr").then((text) => { 
//     console.log(text);
// })
// .catch(error => {
//     // Handle errors of asyncFunc1() and asyncFunc2()
//     console.log(error);
// });
