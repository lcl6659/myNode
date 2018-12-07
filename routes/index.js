/*引入其他路由*/
var liveVideoRoute = require('./liveVideo');
var worksRoute = require('./works');
var suningRoute = require('./suning');
var adminHtml = require('./adminHtml');
var cheShengHuo = require('./cheShengHuo.js');

module.exports = function(app) {
	app.all("*", function(req, res, next) {
		//设置允许跨域的域名，*代表允许任意域名跨域
		res.header("Access-Control-Allow-Origin", "*");
		//允许的header类型
		res.header("Access-Control-Allow-Headers", "x-requested-with,Authorization,content-type");
		//跨域允许的请求方式 
		res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET");
		if(req.method.toLowerCase() == 'options') {
			res.status(200).send('ok');
		} else {
			next();
		}
	});
	app.get('/', function(req, res) {
		res.send('Hello World!');
	});

	app.get('/index', function(req, res) {
		res.render('index', {
			title: 'Express'
		});
	});

	liveVideoRoute(app); //配置直播路由
	worksRoute(app); //配置作品入口路由
	suningRoute(app); //配置苏宁路由
	adminHtml(app);
	cheShengHuo(app);
};