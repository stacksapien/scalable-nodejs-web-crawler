var expect  = require('chai').expect;

var getUrls = require('./../controllers/url-crawler')

it(`# TESTING URL SCRAPPING:`, function(done) {

        const  urls  = ["http://thedemosite.co.uk/"];
        getUrls(urls)
        .then((urlList) => {
            console.log(urlList);
            expect(urlList[0].links.internal.count).to.equal(8);
            done();
        })
        .catch(err => {
            console.log(err);
            done();
        })
});
