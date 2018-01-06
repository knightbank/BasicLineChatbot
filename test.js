"use strict";
const getJsonStr = require("./getJsonStr");
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query')
const getCoinMarketCapInfo = require("./processCoinMarketCapApi");
const sync = require("sync");

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
let splitStr = String("Price BTC").split(" ");

console.log(String(splitStr[1]).toUpperCase());
let strResult 

    strResult = getCoinMarketCapInfo(String(splitStr[1]).toUpperCase())
    .then((result) =>{
        console.log(result);
    })
    .catch(error => {
        // Handle errors of asyncFunc1() and asyncFunc2()
        console.log(error);
    });