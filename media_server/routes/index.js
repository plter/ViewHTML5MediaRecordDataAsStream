var express = require('express');
var router = express.Router();
const StreamAdapter = require("../source/StreamAdapter");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/media.webm', function (req, res, next) {
    res.set('Content-Type', 'video/webm');
    StreamAdapter.emiter.on("media_stream", data => {
        res.write(data);
    });
});

module.exports = router;
