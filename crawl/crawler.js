var utility = require('../utility/strings')
var Xray = require('x-ray')
var x = Xray()


// valid-url set
// external-url set
// invalid-url set
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

