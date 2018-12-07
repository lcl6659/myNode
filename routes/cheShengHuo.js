module.exports = function(app) {
	//登录 
	app.post("/m/v1/user/login.json", function(req, res) {
		res.send({
			"status": 1, //1是成功，其他为异常
			"message": "成功",
			"data": {
				"sessionToken": "2705B0324F855DA842FCFCC1DBCA6E5A", //登录令牌
				"first": false, //是否首次登录,
				"userName": "好好的", //姓名
				"telephone": 15109877890, //电话
				"job": "前端开发" //职位
			}
		})
	});

	//登录时发送手机验证码
	app.post("/m/v1/user/sendSmsCode.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": null
		})
	});

	//新增反馈意见
	app.post("/m/v1/about/suggest.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": null
		})
	});

	//扫描车牌 
	app.post("/m/v1/car/scan.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"licenseNum": "沪AGH092" //识别图片返回的车牌号
			}
		})
	});

	//验证设备号是否存在
	app.post("/m/v1/equ/checkimeiexist.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"id": 54,
				"imei": "6600000083",
				"modelType": "1",
				"version": "LK310"
			}
		})
	});

	//根据设备号查询设备位置 
	app.post("/m/v1/equ/queryAddressbyimei.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"longitude": "114.027561549260", //经度
				"latitude": "22.537865278000", //纬度
			}
		})
	});

	//设备列表
	app.post("/m/v1/equ/queryEqptList.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"list": [{
						"id": 2,
						"imei": "22",
						"modelType": null,
						"lwVersion": null,
						"modelStr": null,
						"licenseNum": null,
						"currentStatus": null,
						"electricity": null,
						"bindTime": null,
						"bindTimeStr": null,
						"closeTime": null,
						"closeTimeStr": null
					},
					{

						"id": 1,
						"imei": "111", //设备号
						"modelType": "1",
						"lwVersion": "leiwei",
						"modelStr": "lewei(无线)", //型号
						"licenseNum": "苏E888888", //车牌号
						"currentStatus": null, //当前状态  
						"electricity": null, //剩余电量
						"bindTime": 1492588766000,
						"bindTimeStr": '2017-04-15', //绑定时间
						"closeTime": 1492588788000,
						"closeTimeStr": '2017-04-20', //服务到期时间
						"carId": "123", //车辆id
						"locationTimeStr": "2016-12-28 16:09:24", //定位时间
						"latitude": "22.538442169812257", //定位纬度
						"longitude": "114.02576720277565" //定位经度
					}
				],
				"total": 2, //总条数
				"page": 1,
				"size": 10
			}
		})
	});

	//关联设备
	app.post("/m/v1/equ/relate.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": null
		})
	});

	//设备绑定发送手机验证码
	app.post("/m/v1/equ/sendRelateSmsCode.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": null
		})
	});

	//实时监控首页 
	app.post("/m/v1/monitor/queryCar.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": [{
					"carId": 1,
					"licenseNum": "苏E888888",
					"currentEqpt": {
						"id": 1,
						"carId": "1",
						"imei": "111", //设备号
						"modelType": "1",
						"lwVersion": "leiwei",
						"modelStr": "leiwei(无线)", //型号
						"licenseNum": "苏E888888",
						"currentStatus": "停车", //当前状态
						"currentStatusStr": '停车时长： 0 天1时12分10秒', //当前状态具体值
						"electricity": null, //剩余电量（无线才显示）
						"bindTime": 1492588766000,
						"bindTimeStr": "2017-04-19", //绑定时间
						"closeTime": 1492588788000,
						"closeTimeStr": "2017-04-19", //服务到期时间
						"locationTimeStr": null, //定位时间
						"latitude": '22.538442169812257', //定位纬度
						"longitude": '114.02576720277565' //定位经度
					},
					"ownEqpts": true //如果为false表示未绑定设备，不需要再页面中展示
				},
				{
					"carId": 2,
					"licenseNum": "赣A12345",
					"currentEqpt": {
						"id": 2,
						"carId": "2",
						"imei": "YUJ784738289",
						"lwVersion": "leiwei",
						"modelStr": "leiwei(无线)", //型号
						"modelStr": "leiwei(无线)",
						"licenseNum": "赣A12345",
						"currentStatus": null,
						"electricity": null,
						"bindTime": 1492659408000,
						"bindTimeStr": "2017-04-20",
						"closeTime": 1524195408000,
						"closeTimeStr": "2018-04-20",
						"locationTimeStr": null,
						"latitude": '39.973792',
						"longitude": '116.435889'
					},
					"ownEqpts": true
				}
			]
		})
	});

	//查询该车下的所有设备（实时监控点击选择车辆）
	app.post("/m/v1/monitor/queryEqptsByCarId.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"total": 2, //条数
				"list": [{
						"id": null,
						"carId": "3", //车辆id
						"imei": "FGJH748382999", //设备号
						"modelType": null,
						"lwVersion": null,
						"modelStr": null,
						"licenseNum": null,
						"currentStatus": null,
						"currentStatusStr": null,
						"electricity": null,
						"bindTime": null,
						"bindTimeStr": null,
						"closeTime": null,
						"closeTimeStr": null,
						"locationTimeStr": null,
						"latitude": null,
						"longitude": null
					},
					{
						"id": null,
						"carId": "3",
						"imei": "RTY788427991991",
						"modelType": null,
						"lwVersion": null,
						"modelStr": null,
						"licenseNum": null,
						"currentStatus": null,
						"currentStatusStr": null,
						"electricity": null,
						"bindTime": null,
						"bindTimeStr": null,
						"closeTime": null,
						"closeTimeStr": null,
						"locationTimeStr": null,
						"latitude": null,
						"longitude": null
					}
				]
			}
		})
	});

	//根据设备号查询当前设备信息（实时监控点击车辆选择设备后）
	app.post("/m/v1/monitor/queryEqptByImei.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"list": [{
					"id": 1,
					"imei": "111", //设备号
					"modelType": "1",
					"lwVersion": "leiwei",
					"modelStr": "lewei(无线)", //型号
					"licenseNum": "苏E888888", //车牌号
					"currentStatus": "停车", //当前状态  
					"currentStatusStr": "停车时长：0天1时12分10秒", //当前状态具体信息
					"electricity": null, //剩余电量
					"bindTime": 1492588766000,
					"bindTimeStr": '2017-04-15', //绑定时间
					"closeTime": 1492588788000,
					"closeTimeStr": '2017-04-20', //服务到期时间
					"carId": "123", //车辆id
					"locationTimeStr": "2016-12-28 16:09:24", //定位时间
					"latitude": "22.538442169812257", //定位纬度
					"longitude": "114.02576720277565" //定位经度
				}],
				"total": 1, //总条数
				"page": 1,
				"size": 10
			}

		})
	});

	//查询车辆信息 最后定位 车辆状态
	app.post("/m/v1/monitor/querycarinfo.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"carId": 133, //车辆ID
				"licenseNum": "苏EA02F9", //车牌号
				"master": "邓补补", //车主姓名
				"brand": "", //车品牌
				"series": "", //车系列
				"masterPhone": "", //车主手机
				"carStatus": "停车", //上次车辆状态
				"createTime": "2016-07-05 20:08:13", //最后定位时间    
			}

		})
	});

	//按天查询轨迹点数量 
	app.post("/m/v1/playback/count.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": [975, 281, 295, 181, 277, 104] //分别对应4号到9号的点个数
		})
	});

	//按天查询轨迹点数据
	app.post("/m/v1/playback/daypoints.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": [{
					"et": "2016-09-04 11:35:58", //设备时间
					"lat": "31.383173407159", //纬度
					"lng": "120.486164428120", //经度
					"sp": 27, //速度
					"ds": "STOP", //数据状态WAIT(怠速)RUN（行驶）STOPPOINT（停车点）STOP（停车）OFFLINEPOINT（离线点）
					"lt": "GPS" //位置数据类型 ：STA：启动报警，GPS：GPS定位信息，NBR ：基站定位，STOP：停止报警
				},
				{
					"et": "2016-09-04 11:36:28",
					"lat": "31.383148126507",
					"lng": "120.485106230650",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
				{
					"et": "2016-09-04 11:39:09",
					"lat": "31.382174395142",
					"lng": "120.473213360180",
					"sp": 5,
					"ds": "WAIT",
					"lt": "GPS"
				},
				{
					"et": "2016-09-04 19:10:06",
					"lat": "31.380314627429",
					"lng": "120.537892210070",
					"sp": 5,
					"ds": "WAIT",
					"lt": "START"
				},
				{
					"et": "2016-09-04 20:36:28",
					"lat": "31.315782",
					"lng": "120.596293",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
				{
					"et": "2016-09-04 21:36:28",
					"lat": "31.306249",
					"lng": "120.615283",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
				{
					"et": "2016-09-04 23:36:28",
					"lat": "31.30591",
					"lng": "120.612049",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
				{
					"et": "2016-09-04 23:39:28",
					"lat": "31.305401",
					"lng": "120.607486",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
				{
					"et": "2016-09-04 23:45:28",
					"lat": "31.299924",
					"lng": "120.573242",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
				{
					"et": "2016-09-04 23:50:28",
					"lat": "31.298443",
					"lng": "120.557432",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
				{
					"et": "2016-09-04 23:52:28",
					"lat": "31.281779",
					"lng": "120.531345",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
				{
					"et": "2016-09-04 23:59:28",
					"lat": "31.277582",
					"lng": "120.513523",
					"sp": 27,
					"ds": "RUN",
					"lt": "START"
				},
			]
		})
	});

	//绑定客户端（消息推送用，需要在登录，无密码重新登录的接口调用）
	app.post("/m/v1/user/bindclient.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": null
		})
	});

	//解绑客户端(登出时调用无需TOKEN)
	app.post("/m/v1/user/unbindclient.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": null
		})
	});

	//登录时发送手机验证码
	app.post("/m/v1/user/sendSmsCode.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": null
		})
	});

	//公众号auth登录 
	app.post("/m/v1/wechat/authlogin.json", function(req, res) {
		res.send({
			"status": 1, //1是成功，其他为异常
			"message": "成功",
			"data": {
				"isBind": false, //是否已经绑定,
				"openid": "qwqssxaacaccvva", //openId
				"sessionToken": "2705B0324F855DA842FCFCC1DBCA6E5A" // 已绑定才有登录令牌
			}
		})
	});

	//登出 
	app.post("/m/v1/user/logout.json", function(req, res) {
		res.send({
			"status": 1, //1是成功，其他为异常
			"message": "成功",
			"data": null
		})
	});

	//注册时发送手机验证码
	app.post("/m/v1/user/registerSendMsg.json", function(req, res) {
		res.send({
			"status": 1, //1是成功，其他为异常
			"message": "成功",
			"data": null
		})
	});

	//注册用户
	app.post("/m/v1/user/registerUser.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"sessionToken": "5076F02631CD0AF5E7A9EB25B8BF5357",
				"first": true,
				"userName": "小三",
				"telephone": "15851876666",
				"job": null,
				"roleValue": null
			}
		})
	});

	//获取用户个人信息
	app.post("/m/v1/user/userInfo.json", function(req, res) {
		res.send({
			"status": 1,
			"message": "成功",
			"data": {
				"id": "2",
				"distributorId": null,
				"userAccount": "mlrc075",
				"userName": "mlrc075", //用户姓名
				"password": null,
				"salt": null,
				"telephone": "15851878125", //手机号码
				"job": null,
				"status": "0",
				"lastModTime": null,
				"statusValue": null,
				"isFirstLogin": "1",
				"createTime": null,
				"clientId": null,
				"registerIp": null,
				"wechat": null,
				"createTimeStr": null,
				"eqptImeiStr": null,
				"eqptList": null,
				"statusStr": "已禁用"
			}
		})
	});

};