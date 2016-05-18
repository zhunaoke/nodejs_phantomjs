/**
 * Created by Administrator on 2016/5/6.
 */

var express = require('express');
var router = express.Router();
var qiniu = require("qiniu");
var config=require('./config');
/**
 * 第一步：初始化
 * @type {string}
 */
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;
//要上传的空间
bucket = config.qiniu.Bucket_Name;
//上传到七牛后保存的文件名
key = 'testDk.png';
/**
 * 第二步：获取上传的token
 * @param bucket
 * @param key
 */
//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    console.log("token= "+putPolicy.token());
    return putPolicy.token();
}

/**
 * 第三步：上传图片
 * @type {string}
 */

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            console.log("上传成功-------------------");
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
            //构建私有空间的链接
            url = config.qiniu.Domain+ret.key;
            var policy = new qiniu.rs.GetPolicy();
            //生成下载链接url
            var downloadUrl = policy.makeRequest(url);
            //打印下载的url
            console.log(downloadUrl);
            return downloadUrl;
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
            return err;
        }
    });
}





/* GET home page. */
router.get('/downloadUrl', function(req, res, next) {
    var qiniuData={'downloadUrl':''};
    var fileName=req.query.fileName;

    //上传到七牛后保存的文件名即文件名
    key = fileName;//'testDk.png';
    //生成上传 Token
    token = uptoken(bucket, key);
    //要上传文件的本地路径
    filePath = './pictures/'+key;
    //调用uploadFile上传,并返回下载地址；
    qiniuData.downloadUrl=uploadFile(token, key, filePath);
    res.send(qiniuData);
});

module.exports = router;




