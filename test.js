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
    let file = "./currencyList.json"
    if(splitStr2.length>1){
        let currencyList = jsonfile.readFileSync(file)
        //console.dir(jsonfile.readFileSync("./currencyList.json"))
        console.log(splitStr2[1]);
        console.log(currencyList["btc"]);
        switch(splitStr2[0]){
            case "price" || "ราคา" :
            currencyList = jsonfile.readFileSync("./currencyList.json")

              getJsonStr("https://api.coinmarketcap.com/v1/ticker/"+currencyList[splitStr2[1]]+"?convert=THB")
              .then((result) => {
                JsonObj = result;
                msg = {
                  type: 'text',
                  text: `${String(splitStr2[1]).toUpperCase()} on CoinmarketCap (Rank:${JsonObj[0]["rank"]})
    Price = $${Number(JsonObj[0]["price_usd"]).toLocaleString('en') } (฿${Number(JsonObj[0]["price_thb"]).toLocaleString('en')})
    Percent Change
      1 Hr. ${JsonObj[0]["percent_change_1h"]}%
      24 Hr. ${JsonObj[0]["percent_change_24h"]}%
      7 Days. ${JsonObj[0]["percent_change_7d"]}%`
                }
    console.log(msg);
                return client.replyMessage(event.replyToken, msg).then(() => {
            
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                })
                .catch(error => {
                    // Handle errors of asyncFunc1() and asyncFunc2()
                    msg = {
                    type: 'text',
                    text: error
                    }
                });
            break;
          }
    }

})
.catch(error => {
    // Handle errors of asyncFunc1() and asyncFunc2()
    console.log(error);
});