"use strict";
const getJsonStr = require("./processApi");
const jsonfile = require('jsonfile');
const jsonQuery = require('json-query')
//let jsonPhraser = require("./jsonPhraser");

let JsonBXObj;
getJsonStr("https://bx.in.th/api/")
.then((result) => {
    let bxCurrencyList = jsonfile.readFileSync("./bxCurrency.json")
    JsonBXObj = result;
    //console.log(JsonBXObj["30"]);
    console.log(bxCurrencyList);
})
.catch(error => {
    // Handle errors of asyncFunc1() and asyncFunc2()
    console.log(error);
});