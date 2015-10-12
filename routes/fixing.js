var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('fixing', {
        title: '上门维修' ,
        controllerName:'fixing'
    });
});

module.exports = router;
