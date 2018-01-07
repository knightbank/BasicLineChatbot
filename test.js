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

let JsonObj

getJsonStr("https://api.coinmarketcap.com/v1/ticker/")
            .then((result) => {
                JsonObj = result;
                JsonObj.forEach(element => {
                  //console.log(element);
                  console.log(`"${element['symbol']}" : "${element['id']}",`);
                });
            })