/**
 * Created by Administrator on 2016/5/5.
 */
var urls=["http://localhost:3000/","http://localhost:3000/table","http://www.baidu.com"];
var count=0;
var max=urls.length;
if(urls.length!=0){
    capture(urls[0]);
}
//生成随机字符串作为图片名称;
function createRandomName(len){
    len = len || 32;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
//开始执行截图命令;
function capture(url){
    var randomPicName='test'+createRandomName(Math.random()*8);
    console.log("获取的随机名称="+randomPicName);
    var spawn=require('child_process').spawn;
    var process=spawn('phantomjs',['capture.js',url,randomPicName,count,max],{cwd:'./routes/'});
    process.stdout.setEncoding('utf8');

    process.stdout.on("data",function(data){
        console.log(data);
        console.log("spawnSTDOUT:"+JSON.stringify(data));
        var code=data.replace(/[\r\n]/g,"");
        console.log(code);
        if(code=='success'){
            var execFile=require('child_process').execFile;
            var filePath='./pictures/'+randomPicName+'.png';
            var execProcess=execFile('node',['upload.js',filePath,randomPicName,count,JSON.stringify(urls)],{cwd:'./routes/'},function(err,stdout,stderr){
                console.log("execFileSTDOUT:", stdout);
                console.log("execFileSTDERR:", stderr);
            });
        }
    });
    process.stderr.on('data',function(data){
        console.log("stderr"+data);
    });
    process.on('close',function(code){
        if (code == 1) {
            console.log('child process异常结束。目标：' + url);
        }
    });
    process.on('exit',function(code){
        console.log('child process exited with code ' + code);
        count++;
        if(count!=urls.length){
            capture(urls[count]);
        }
    });
}








