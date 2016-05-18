/**
 * Created by Administrator on 2016/5/5.
 */
var express = require('express');
var router = express.Router();
var http=require('http');
var request=require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    // request(url,function(error,response,body){
    //   console.log(error);
    // });
    var tableData=[
        {"appName":"TouchC","appUsers":5},
        {"appName":"长虹BBS","appUsers":105},
        {"appName":"大数据","appUsers":20},
        {"appName":"CHiQ电视","appUsers":100},
        {"appName":"CHiQ冰箱","appUsers":60}
    ];
    res.render('table',{'tableData':tableData});
});
module.exports = router;
