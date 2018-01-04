let getCoinMarketCapTicker = require("./processApi");

let json = getCoinMarketCapTicker()
.then(result2 => { // (B)
    console.log(result2);
})
.catch(error => {
    // Handle errors of asyncFunc1() and asyncFunc2()
});
