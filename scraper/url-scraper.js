const webCrawler = require('../crawl/crawler.js'),
htmlScraper = require('./html-scraper'),
utility = require('./../utility/strings'),
helpers = require('./../utility/helpers')
url = 'https://www.softwaresuggest.com/sfa-sales-force-automation-software';


function searchLinksFromHtml(html, host){

    return new Promise((resolve, reject) => {
        const scrape_url = new URL(host);
                    const hostname = scrape_url.hostname;
                   const protocolUrl = scrape_url.protocol+'//'+hostname;
        webCrawler.getLinks(html)
        .then(links => {

            let external_links_dofollow = [];
            let external_links_nofollow = [];
            let internal_links = [];
            links.forEach(function(_link) {
                
                if (_link.href !== undefined && _link.href !== null && _link.href !== "" && !helpers.isSpecialLink(_link.href)) {
                var c = helpers.isExternalLink(host, _link.href);

                if (c === true) {

                    if (_link.rel === undefined) {
                        // link is dofollow
                        var anchor = {
                            type: 'external',
                            rel: 'dofollow',
                            href: _link.href,
                            text: _link.text.replace(/(\n+|\r+|\t+)/gm, " ").replace(/\s+/g, ' ').trim()
                        }
                        external_links_dofollow.push(anchor);
                    } else if (helpers.isLinkNoFollow(_link.rel)) {
                        // link is nofollow
                        var anchor = {
                            type: 'external',
                            rel: 'nofollow',
                            href: _link.href,
                            text: _link.text.replace(/(\n+|\r+|\t+)/gm, " ").replace(/\s+/g, ' ').trim()
                        }
                        external_links_nofollow.push(anchor);
                    } else {
                        // link is dofollow
                        var anchor = {
                            type: 'external',
                            rel: _link.rel,
                            href: _link.href,
                            text: _link.text.replace(/(\n+|\r+|\t+)/gm, " ").replace(/\s+/g, ' ').trim()
                        }
                        external_links_dofollow.push(anchor);
                    }

                }
                else if (c === null) {
                    // what if c is null it mean url start with '/' or normal words
                    var internalLinkUrl;
                    if( _link.href.indexOf(scrape_url.protocol) !== -1  ){
                        internalLinkUrl = _link.href
                    }else{
                        // if a route doesn't contain any '/' in it then we add it
                        if( _link.href.indexOf('/') == -1){
                            internalLinkUrl = protocolUrl + '/' + _link.href
                        }
                        else{
                            internalLinkUrl = protocolUrl + _link.href
                        }

                    }
                    var reltype = _link.rel;
                    if (typeof (_link.rel) == undefined) reltype = 'dofollow'
                    var anchor = {
                        type: 'internal',
                        rel: reltype,
                        href: _link.href,
                        text: _link.text.replace(/(\n+|\r+|\t+)/gm, " ").replace(/\s+/g, ' ').trim(),
                        fullLink: internalLinkUrl
                    }
                    internal_links.push(anchor);
                } else {
                    // internal links
                    var internalLinkUrl;
                    if( _link.href.indexOf(scrape_url.protocol) !== -1  ){ internalLinkUrl = _link.href }else{ internalLinkUrl = protocolUrl + _link.href }
                    var reltype = _link.rel;
                    if (typeof (_link.rel) == undefined) reltype = 'dofollow'
                    var anchor = {
                        type: 'internal',
                        rel: reltype,
                        href: _link.href,
                        text: _link.text.replace(/(\n+|\r+|\t+)/gm, " ").replace(/\s+/g, ' ').trim(),
                        fullLink: internalLinkUrl
                    }
                    internal_links.push(anchor);
                }
            }
            })
            resolve( {
                url : host,
                links : {
                    internal : {
                        count : internal_links.length ,
                        links : internal_links
                    },
                    external : {
                        count : external_links_dofollow.length + external_links_nofollow.length,
                        nofollow : {
                            count : external_links_nofollow.length ,
                            links : external_links_nofollow
                        },
                        dofollow : {
                            count : external_links_dofollow.length ,
                            links : external_links_dofollow
                        }
                    }
                }
            } )
        })
        .catch(err => {
            reject(err)
        })

    })
}

module.exports = function(url){
    return new Promise((resolve, reject) => {
        htmlScraper(url)
        .then(response => {
            return searchLinksFromHtml(response.html.data, url);
        })
        .then(links => {
            resolve(links)
        })
        .catch(err => {
            reject(err)
        })
    })
}
