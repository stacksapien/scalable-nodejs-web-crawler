const axios = require('axios');

// JS RENDERER TO LOAD DATA IN PUPEETER IF IT FAILS FOR AXIOS
var jsrender = require('./../utility/jsrender');

// Fetch HTML Data from URL
module.exports = function (url) {
    return new Promise((resolve, reject) => {
        var config = {
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
            }
        };
        console.log("URL BEING SCRAPPED => ",url);
        axios.get(url, config)
        .then(response => {

            resolve({ message : "success",
            html : response })
        })
        .catch(async function(error){
            if(error.response && error.response.status === 503){
                resolve({ message : "success", html : await jsrender.load(url)} )
            }
            else{
                reject({
                    message : "failiure",
                    error : error.code
                })
            }
        });
    })
}
