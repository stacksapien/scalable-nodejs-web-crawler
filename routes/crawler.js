var express = require('express');
var router = express.Router();
var getUrls = require('./../controllers/url-crawler')

/* GET home page. */
router.post('/getLinks', function(req, res) {
    try {
        const { urls } = req.body;
        getUrls(urls)
        .then((urlList) => {
            
            res.send({
                message : "success",
                data : urlList
            })
        })
        .catch(err => {
            res.send({
                message : "failure",
                error : err
            })
        })
    } catch (e) {
        res.send({
            message : "failure",
            error : e
        })
    }
});
router.get('/getLinks', function(req, res) {
    res.send("HELLO")
})

module.exports = router;
