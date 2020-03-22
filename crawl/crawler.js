let utility = require('./../utility/strings'),
    parser = require('./../utility/parser'),
    Xray = require('x-ray'),
    x = Xray();

// crawl function takes url in parameter and return values of attribute
// 'href' from all anchor tags
exports.crawl = function (url) {
    return new Promise((resolve, reject) => {
        x(url, {
            href: ['a@href'],
        })
            .then((links) => {

                resolve(links.href.filter(link => {
                    if (link !== null && link !== undefined) {
                        return true;
                    }
                    else {
                        return false;
                    }

                }));
            })
            .catch((err) => {
                reject(err)
            })
    });
}

/*
 getLinks() function takes html in parameter and return Array of Object
    {
        href : '',
        text : '',
        rel : '',
    }
*/
exports.getLinks = function (html) {
    return new Promise((resolve, reject) => {
        
        x(html, {
            href: ['a@href'],
            rel: ['a@rel'],
            text: ['a']
        })
        .then(linksObj => {
            // Converting to above object links described in getLinks function
            resolve(parser.objectWithValueArrayToArray(linksObj));
        })
        .catch(err => {
            reject(err)
        })
    })
}
