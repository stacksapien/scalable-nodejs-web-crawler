const url = require('url');
const utility = require('./url')
const NORMALIZE_RE = /\s{2,}(?![^<>]*<\/(pre|code|textarea)>)/g;

module.exports.isHashbang = function (url) {
    var hashbangRegex = /^#/i;
    if (hashbangRegex.exec(url) !== null) return true;
    else return false;
};
module.exports.isSpecialLink = function (url) {
    var specialLink = /^(mailto:)|(tel:)|(sms:)|(skype:)|(whatsapp:\/\/)|(market:\/\/)|(gtalk:)|(callto:)|(geopoint:)|(javascript:)|(\?)/i;
    if (specialLink.exec(url) !== null) return true;
    else return false;
};
module.exports.isExternalLink = function (hostname, url) {

    try {
        const urlObj = new URL(url);
        const hostUrlObj = new URL(hostname);

        if(utility.getHostName(hostUrlObj.host) == utility.getHostName(urlObj.host)){
            return false
        }
        else{
            return true;
        }
    } catch (e) {
        return null
    }

};
module.exports.isLinkNoFollow = function (rel) {
    var nofollowRegex = /(nofollow)/i;
    if (nofollowRegex.exec(rel) !== null) return true;
    else return false;
};


module.exports.round = function (value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
