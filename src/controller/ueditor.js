var UPYUN = require('upyun');

var Busboy = require('busboy');
var fs = require('fs-extra');
var formidable = require('formidable');
var upyun = new UPYUN('liclupyun', 'lichenglong', 'long6659..', 'v0', 'legacy');


exports.editerGet = function(req, res, next) {
    //进入页面是加载配置文件
    console.log("------------加载ueditor的上传配置文件配置文件-----------");
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
};

exports.editer = function(req, res, next) {
    console.log("@@@@@@@@@@@@@:"+JSON.stringify(req.body));
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        console.log("上传图片");
        var busboy = new Busboy({
            headers: req.headers
        });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

            upyun.uploadFile('test','C:/Users/95/Desktop/'+filename,mimetype,false,function(err, result) {
                console.log("@@@@@@:"+JSON.stringify(result));
            });
            console.log('################:'+fieldname);
        });
        req.pipe(busboy);

    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {

    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
};

exports.editerForm = function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';		//设置编辑
        //form.uploadDir = '/public/upload';	 //设置上传目录，文件会自动上传到该目录下
        form.keepExtensions = true;	 //保留后缀
        //form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        form.parse(req,function(error, fields, files){
            //console.log(JSON.stringify(files));
            var contentType = files.upfile.type;
            var extName = '';  //后缀名
            switch (contentType) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }
            var avatarName = Math.random() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            var localFile = files.upfile.path;
            console.log(localFile);
            //upyun.uploadFile('test',localFile,contentType,false,function(err, result) {
            //    console.log("@@@@@@:"+JSON.stringify(result));
            //});
            upyun.existsFile('test',function(err, result) {
                console.log("@@@@@@:"+JSON.stringify(result));
            });
        });

    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {

    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
};

