let rp = require('request-promise');
let getJsonStr = urlStr => {
    let url = urlStr

    let options = {
        url: url,
        json: true // Automatically parses the JSON string in the response
    };
    
    return rp(options)
        .then((jsonStr) => {
            //console.log(jsonStr);
            let string = JSON.stringify(jsonStr);
            return JSON.parse(string);
        }) // Process html...
        .catch((err) => console.error(err)); // Crawling failed...
    //console.log('url : ',url);
    
}

module.exports = getJsonStr