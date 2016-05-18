/**
 * Created by Administrator on 2016/5/6.
 */
    var qiniu = require("qiniu");
    var config=require('./config');
    var argvs=process.argv.splice(2);
    var fs=require("fs");
    console.log(argvs);

filePath=argvs[0];
key=argvs[1]+'.png';
//count;
var count=parseInt(argvs[2]);
//urls;
var urls=JSON.parse(argvs[3]);
var max=urls.length;
console.log("get the arguments:"+filePath+"---"+key+"--"+count+"---"+max);
    /**
     * 第一步：初始化
     * @type {string}
     */
//需要填写你的 Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
    qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;
//要上传的空间
    bucket = config.qiniu.Bucket_Name;

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
    //生成上传 Token
    token = uptoken(bucket, key);
    /**
     * 第三步：上传图片
     * @type {string}
     */

//构造上传函数
    function uploadFile(uptoken, key, localFile,count,max) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                console.log("上传成功-------------------");
                // 上传成功， 处理返回值
                // console.log(ret.hash, ret.key, ret.persistentId);
                //构建私有空间的链接
                url = config.qiniu.Domain+ret.key;
                var policy = new qiniu.rs.GetPolicy();
                //生成下载链接url
                var downloadUrl = policy.makeRequest(url);
                //打印下载的url
                console.log("downloadUrl= "+downloadUrl);
                var date=new Date();
                var dateString=date.toLocaleDateString();//日期;
                var timeString=date.toLocaleTimeString();//时间;
                var time=date.toLocaleDateString()+" "+date.toLocaleTimeString();
                console.log(time);
                var signalArray={
                    "编号":count+1,
                    "被截屏的路径地址":urls[count],
                    "上传七牛后的图片名称":key,
                    "下载地址":downloadUrl,
                    "截图时间":time
                };
                if(count==0){
                    // fs.appendFile(__dirname+'/downloadUrl.txt',"\r\n-----------------"+dateString+" "+timeString+"------------操作开始----------------------\r\n",function(err){
                    //     if(err){console.log('fail')}
                    // });
                    fs.appendFileSync(__dirname+'/downloadUrl.txt',"\r\n-----------------"+dateString+" "+timeString+"------------操作开始----------------------\r\n",{encoding:'utf8'});
                }
                fs.appendFile(__dirname+'/downloadUrl.txt',JSON.stringify(signalArray)+'\r\n',function(err){
                    if(err){console.log("fail")}
                });
                // fs.appendFileSync(__dirname+'/downloadUrl.txt',JSON.stringify(signalArray)+'\r\n',{encoding:'utf8'});

                if((count+1)==max){
                    fs.appendFile(__dirname+'/downloadUrl.txt',"\r\n-----------------"+dateString+" "+timeString+"------------操作结束----------------------\r\n",function(err){
                        if(err){console.log('fail')}
                    });
                    // fs.appendFileSync(__dirname+'/downloadUrl.txt',"\r-----------------"+dateString+" "+timeString+"------------操作结束----------------------\r\n\n",{encoding:'utf8'});

                }
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }
    //调用uploadFile上传,并返回下载地址；
    uploadFile(token, key, filePath,count,max);





















