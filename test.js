"use strict";
//const getJsonStr = require("./processCoinMarketCapApi");
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query')
const getJsonStr = require("./getJsonStr");

let JsonBXObj;

let splitStr = String("price bch").split(" ");
let symbol = "";
let currencyList
//symbol = splitStr[1].replace(" ","-").toLowerCase();
        console.log(symbol);
        currencyList = jsonfile.readFileSync("./currencyList.json")
        console.log(currencyList);
        console.log("https://api.coinmarketcap.com/v1/ticker/"+String(currencyList[splitStr[1]]).replace(" ","-").toLowerCase()+"?convert=THB");
        getJsonStr("https://api.coinmarketcap.com/v1/ticker/"+String(currencyList[splitStr[1]]).replace(" ","-").toLowerCase()+"?convert=THB")
          .then((result) => {
            JsonObj = result;
console.log(JsonObj);
        })