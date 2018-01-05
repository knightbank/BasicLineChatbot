"use strict";
const getJsonStr = require("./processApi");
const jsonQuery = require('json-query')
//let jsonPhraser = require("./jsonPhraser");

let JsonObj;
getJsonStr("https://api.coinmarketcap.com/v1/ticker/")
.then((result) => { // (B)
    JsonObj = result;
    console.log('Json Object = ',JsonObj);
    console.log(JsonObj[0]["id"]);
    JsonObj.forEach(element => {
        console.log(element["name"]);
    });
})
.catch(error => {
    // Handle errors of asyncFunc1() and asyncFunc2()
    console.log(error);
});