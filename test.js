"use strict";
const getJsonStr = require("./processApi");
//let jsonPhraser = require("./jsonPhraser");

let JsonObj;
getJsonStr("https://api.coinmarketcap.com/v1/ticker/?limit=1")
.then((result) => { // (B)
    JsonObj = result;
    console.log('Json Object = ',JsonObj);
    console.log(JsonObj[0]["id"]);    
})
.catch(error => {
    // Handle errors of asyncFunc1() and asyncFunc2()
    console.log(error);
});