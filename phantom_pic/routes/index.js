var express = require('express');
var router = express.Router();
var http=require('http');
var request=require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var barData={
    "xData":["4/24","4/25","4/26","4/27","4/28","4/29"],
    "yData":[300,250,400,410,480,510]
  };
  res.render('index', { 'xData':barData.xData,'yData':barData.yData });
});
router.get('/bar',function(req,res,next){
  // request(url,function(error,response,body){
  //   console.log(error);
  // });
  var barData={
    "xData":["4/24","4/25","4/26","4/27","4/28","4/29"],
    "yData":[300,250,400,410,480,510]
  };
  res.send(barData);
});
module.exports = router;
