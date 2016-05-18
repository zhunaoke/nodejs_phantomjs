## 项目说明：
> 本工程旨在利用phantomjs对多个url进行截图操作并将所截取的图片上传到七牛服务器，将多个url对应的下载地址存储在名为downloadUrl.txt的文件中；

## 执行步骤:

## 一、安装配置
### 1、确认是否安装nodejs
> 下载地址：官网[http://www.nodejs.org/download/](http://www.nodejs.org/download/)

### 2、 确认是否安装phantomjs:
> 具体安装方法为：
1. 在官网上下载phantomjs压缩包并解压至本机某个具体位置（位置用户可自选）；
2. 配置环境变量：在 计算机>属性>高级系统设置>环境变量>系统变量 中，然后在变量值后将phantomjs的bin目录路径添加至Path变量中，例如我的是";D:\Program files\phantomjs-2.1.1\bin"。
3. 在cmd下输入命令 `phantomjs --version`，如果出现版本号，则说明安装成功

## 二、运行项目
1. `$ npm install`
> 安装所需要的包

2. `$ node routes/phantom.js`
> 运行phantom.js文件，开始执行命令进行截图

**
  说明：本工程中被截图的http://localhost:3000/ 与 http://localhost:3000/table 两个url是需要将 另外一个工程 "phantom_pic" 运行之后，才能开始截图，
  因为，"phantom_pic"工程是通过ajax请求获取数据并生成echarts 图表及表格，如果该工程没启动，在运行上面第2步时会报fail 失败。
**

** 工程运行之后，可以看到 "routes/pictures 文件夹下多了很多张图片，这些就是通过phantomjs所截取的图片 **
** 此外：在downloadUrl.txt文件中，可以看到文件上传到七牛后的下载地址，可以通过这些地址下载相应的图片 **



