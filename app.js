var express = require('express');
var app = express();
var hbs = require('express-hbs');
var index = require('./routes/index');
var bodyParser = require('body-parser');
var server = require('http').Server(app);

//为socket传入server参数
require('./routes/socket.js')(server);

//连入路由
require('./routes/index.js')(app);

//中间件 处理form表单提交的数据，封装在req.body中
app.use(bodyParser.urlencoded({
	extended: true
}));

//中间件 解析json数据，封装在req.body中
app.use(bodyParser.json());

//配置hbs
app.engine('hbs', hbs.express4({
	layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//指派为静态资源的目录
app.use(express.static(__dirname + '/public'));

//定制404页面
app.use(function(req, res, next) {
	res.status(404).send('Sorry cant find that!');
});

//定制500页面
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

server.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('node启动成功==》端口是：' + port);
});