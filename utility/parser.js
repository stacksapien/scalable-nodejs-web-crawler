exports.objectWithValueArrayToArray = function (obj) {

    /*
     NOTE : We are assuming we are getting same number of object in all keys
     INPUT
     {
         key1 : [a,b,c]
         key2 : [d,e,f]
     }
     OUTPUT
     [  {
         key1 : a ,
         key2 : d
         } , ..
     ]
    */

    // Empty Object
    let linksArray = [];

    // iterate over the objects of first key
    let keys = Object.keys(obj)

    // Getting length of Object in first Key
    let length = obj[keys[0]].length;
    for (let i = 0; i < length; i++) {
        let tempObject = {};

        // Adding Key : Value corresponding to index in a temporary object
        for (let j = 0; j < keys.length; j++) {
            tempObject[keys[j]] = obj[keys[j]][i];
        }
        linksArray.push(tempObject);
    }
    return linksArray;
}
