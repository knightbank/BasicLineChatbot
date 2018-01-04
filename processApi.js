//https://api.coinmarketcap.com/v1/ticker/
//https://stackoverflow.com/questions/14208707/parsing-json-in-nodejs

let request = require("request")
let rp = require('request-promise');

let getCoinMarketCapTicker = () => {
    let url = "https://api.coinmarketcap.com/v1/ticker/"
    let strBody = ""

    let options = {
        uri: url,
        json: true // Automatically parses the JSON string in the response
    };
    
    rp(options)
        .then(function (repos) {
            console.log('User has %d repos', repos.length);
            return respos
        })
        .catch(function (err) {
            // API call failed...
        });
    //console.log('url : ',url);
    //console.log(strBody);
}

module.exports = getCoinMarketCapTicker;
