// import the url module
const url = require('url');

exports.getDomain = function(passedUrl){
    const { href, host, pathname, protocol } = new URL(passedUrl);
    let parsedDomain = '';
    if(protocol.length > 0){
        parsedDomain += protocol + '//';
    }
    parsedDomain += host;
    return parsedDomain;
}
exports.getHostName = function(host){

    var hostSplit = host.split(".");

    if(hostSplit.length == 1){

        return hostSplit[0]
    }
    else if( hostSplit.length == 2){

        return hostSplit[0]
    }
    else {
        
        return hostSplit[1]
    }
}
