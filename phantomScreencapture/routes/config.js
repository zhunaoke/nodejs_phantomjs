/**
 * 七牛的基本参数配置，用户可以注册七牛，并创建一个存储空间，注册成功后，自动会获得以下所需的key值及域名；
 */
(function() {
    var config;

    config = {
        qiniu: {
            'ACCESS_KEY': 'G2wX9u98rTcQVE6zgAKY3z8j95qU7ykBR_Kh6oTa',//AK,开发者可以换成自己的；
            'SECRET_KEY': '2nK910GnENtEM2O6tdhF4SCODv7wwDEYalXHmDWz',//SK，开发者可以换成自己的；;
            'Bucket_Name': 'yaoyao',//存储空间名称，开发者可以换成自己的
            'Uptoken_Url': '/uptoken',//上传的url，开发者可以换成自己的；
            'Domain': 'http://7xosrf.com1.z0.glb.clouddn.com/'//外连默认域名，开发者可以换成自己的;
        }
    };

    module.exports = config;

    module.exports.config = config;

}).call(this);