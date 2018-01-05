"use strict";
const getJsonStr = require("./processApi");
const jsonfile = require('jsonfile');
//let jsonPhraser = require("./jsonPhraser");

let JsonObj;
getJsonStr("https://api.coinmarketcap.com/v1/ticker/")
.then((result) => { // (B)
    JsonObj = result;
    //console.log('Json Object = ',JsonObj);
    console.log(JsonObj[0]["id"]);

    let sss = "help"
    let ssss = "price btc"
    let splitStr = sss.split(" ");
    let splitStr2 = ssss.split(" ");
    //console.log(splitStr);
    // console.log(splitStr.length);
    // console.log(splitStr2);
    console.log(splitStr2.length);
    if(splitStr2.length>1){
        let currencyList = jsonfile.readFileSync("./currencyList.json")
        //console.dir(jsonfile.readFileSync("./currencyList.json"))
        console.log(splitStr2[1]);
        console.log(currencyList["BTC"]);
        //let currencySymbol = currencyList[splitStr2[1]]
        //console.log(currencySymbol);
    }
    // JsonObj.forEach(element => {
    //     console.log(`"${element["symbol"]}" : "${element["name"]}",`);
    // });
})
.catch(error => {
    // Handle errors of asyncFunc1() and asyncFunc2()
    console.log(error);
});