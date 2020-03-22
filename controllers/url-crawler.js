var linkScraper = require('./../scraper/url-scraper');

module.exports = function( urls ){
    return new Promise((resolve, reject) => {
        var count = 0 ;
        var links = []
        
        for( var i = 0 ; i < urls.length ; i++ ){
            let _url = urls[i];
            linkScraper( _url )
            .then(link => {

                count++;
                links.push(link)

                if(count === urls.length){
                    resolve(links)
                }
            })
            .catch(err => {
                count = urls.length;
                i = urls.length;

                reject(err)
            })
        }
    })
}
