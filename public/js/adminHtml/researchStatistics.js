var researchId = 1212;//初始化问卷id
var abcArr = ["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q"];
var colorArr = ["#0099FF","#00CC99","#FF3300","#996633","#9900FF","#FF3399","#9966FF","#00CC66","#3399FF","#669966","#FFCC66","#666600"];
var API_URL = document.location.origin + '/jz-rjs-web';

var canvasLength = 0;//canvas个数
var canvasUploadCount = 0;//canvas上传计数
var exportObj = {
	researchId:researchId,
	pieList:[]
};//导出要上传的对象
$(function() {
	
	//初始化页面
	statisticsFunns.initPage();
	
	//点击饼状图
	$("#statixticsBox").on("click", ".pie-chart-btn", function() {
		var showState = $(this).attr("show-state");
		var $_thisQues = $(this).parents(".one-question");
		if(showState == 0) {
			$_thisQues.find(".pie-Chart").slideDown(150);
			$(this).attr("show-state", 1).addClass("btn-warning");
		} else {
			$_thisQues.find(".pie-Chart").slideUp(150);
			$(this).attr("show-state", 0).removeClass("btn-warning");
		}
	});
	
	//图片点击预览
	$("#statixticsBox").on("click","img",function(){
		var thisImgUrl = $(this).attr("src");
		var $_imgModal = $("#img-modal");
		$_imgModal.find("img").attr("src",thisImgUrl);
		$_imgModal.modal("show");
	});

	//问答题，查看更多
	$("#statixticsBox").on("click", ".get-more", function() {
		var titleId = $(this).parents(".one-question").attr("titleId");//问题id
		
		
	});
	
	//点击导出
	$("#export").on("click",function(){
		//TODO
		exportObj.pieList.length = 0;
		statisticsFunns.batchUploadCanvas(function(){
			//上传导出对象
			console.log("上传导出对象:"+JSON.stringify(exportObj));
		});
	});

});

/*
 * 方法库
 */
(function() {
	/*
	 * 页面初始化
	 */
	function initPage() {
		initResearchList(researchId);
	}
	
	/*
	 * 拿到统计数据，初始化问卷列表
	 */
	function initResearchList(researchId){
		statisticsAjax.ajaxGetStatisticData(researchId,function(researchData){
			var researchName = researchData.researchName;
			var dataList = researchData.titleList;
			
			//按照displayOrder 升序排序
			dataList.sort(function(a, b) {
				return a.displayOrder - b.displayOrder
			});
			
			//遍历问题
			dataList.forEach(function(oneQues,index){
				var titleId = oneQues.titleId;//题目id
				var titleName = oneQues.titleName;//题目名称
				var titleType = oneQues.titleType;//题目类型 0-单选 1-多选 2-问答
				var titleImgUrl = oneQues.imgUrl;//标题图片
				if(titleType==0 || titleType==1){
					//单选或多选
					var $_quesBoxClone = $("#clone-box").find(".select-type").clone();
					$_quesBoxClone.attr("title-id",titleId);
					$_quesBoxClone.find(".question-number").text("Q"+(index+1)+":");
					$_quesBoxClone.find(".question-name").text(titleName);
					var typeName = titleType==0?"[单选题]":"[多选题]";
					$_quesBoxClone.find(".ques-type").text(typeName);
					if(titleImgUrl){
						$_quesBoxClone.find(".title-img-box").show();
						$_quesBoxClone.find(".title-img-box img").attr("src",titleImgUrl);
					}
					
					var allAnswerNumber = 0;
					var optionList = oneQues.optionList;
					//选项按照displayOrder升序排序
					optionList.sort(function(a, b) {
						return a.displayOrder - b.displayOrder
					});
					//统计总次数
					optionList.forEach(function(oneOption){
						allAnswerNumber = allAnswerNumber+parseInt(oneOption.answerNumber);
					});
					
					$_quesBoxClone.find(".all-statistics-number").text(allAnswerNumber);
					
					var pieData= [];//饼图使用数据
					
					//添加选项
					optionList.forEach(function(oneOption,index){
						var $_optionBoxClone = $("#clone-box").find(".select-option-item").clone();
						$_optionBoxClone.attr("option-id",oneOption.optionId);
						$_optionBoxClone.find(".option-display").text(abcArr[index]+".");
						if(oneOption.optionName){
							$_optionBoxClone.find(".option-text").text(oneOption.optionName);
							$_optionBoxClone.find(".option-text").show();
						}
						if(oneOption.imgUrl){
							$_optionBoxClone.find(".option-img-box img").attr("src",oneOption.imgUrl);
							$_optionBoxClone.find(".option-img-box").show();
						}
						var answerNumber = parseInt(oneOption.answerNumber);
						$_optionBoxClone.find(".option-answer-number").text(answerNumber);
						
						var precess = ((answerNumber/allAnswerNumber)*100).toFixed(2);//比例
						
						$_optionBoxClone.find(".precess-show").css("width",precess*4+"px");//设置进度条
						$_optionBoxClone.find(".precess-text").text(precess+"%");
						
						var optionName=oneOption.optionName.length>20?abcArr[index]+"."+oneOption.optionName.substr(0,18)+"...":abcArr[index]+"."+oneOption.optionName;
						var pieDataItem = {
							value: answerNumber,
							name: optionName,
							itemStyle: {
						        normal: {
						            color: colorArr[index]
						        }
						    }
						}
						pieData.push(pieDataItem);
						$_quesBoxClone.find(".option-list").append($_optionBoxClone);						
					});
					
					$("#statixticsBox").append($_quesBoxClone);
					
					//生成图表
					createPie($_quesBoxClone,pieData);
				}else{
					//问答题
					var $_quesBoxClone = $("#clone-box").find(".essay-type").clone();
					$_quesBoxClone.attr("title-id",titleId);
					$_quesBoxClone.find(".question-number").text("Q"+(index+1)+":");
					$_quesBoxClone.find(".question-name").text(titleName);
					$_quesBoxClone.find(".ques-type").text("[问答题]");
					if(titleImgUrl){
						$_quesBoxClone.find(".title-img-box").show();
						$_quesBoxClone.find(".title-img-box img").attr("src",titleImgUrl);
					}
					$("#statixticsBox").append($_quesBoxClone);
				}
			});
		});
	}
	
	
	/*
	 * 生成饼图
	 */
	function createPie($_oneQues,pieData){
		var myChart = echarts.init($_oneQues.find(".pie-Chart")[0]);

		// 指定图表的配置项和数据
		var option = {
			title: {
				show: false
			},
//			tooltip: {
//				trigger: 'item',
//				formatter: "{a} <br/>{b} : {c} ({d}%)"
//			},
			series: [{
				name: '调研统计',
				type: 'pie',
				radius: '75%',
				center: ['50%', '50%'],
				data: pieData,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					},
					normal: {
						label: {
							show: true,
							formatter: '{b} : {c} ({d}%)'
						},
						labelLine: {
							show: true
						}
					}
				}
			}]
		};

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	}
	
	
	/*
	 * canvas获取base64地址
	 */
	function canvasGetBase64(canvas){
		return canvas.toDataURL("image/png");
	}
	
	/*
	 * 遍历canvas，上传后生成一个对象，存放id和图标url
	 */
	function batchUploadCanvas(callback){
		//TODO
		canvasLength = $("#statixticsBox").find("canvas").length;
		canvasUploadCount = 0;
		if(canvasLength>0){
			$("#statixticsBox").find("canvas").each(function(index,canvas){
				var canvasBase64 = canvasGetBase64(canvas);
				var $_thisOneQuestion = $(canvas).parents(".one-question");
				var titleId = $_thisOneQuestion.attr("title-id");
				statisticsAjax.uploadBase64(canvasBase64,function(data){
					canvasUploadCount= canvasUploadCount+1;
					
					var obj = {
						titleId:titleId,
						pieUrl:data.url
					}
					
					exportObj.pieList.push(obj);
					
					if(canvasUploadCount>=canvasLength){
						callback && callback();
					}
				});
			});
		}
	}
	
	

	window.statisticsFunns = {
		initPage: initPage,
		batchUploadCanvas:batchUploadCanvas
	}
})();

/*
 * ajax库
 */
(function() {
	
	/*
	 * 上传base64，返回url
	 */
	function uploadBase64(base64String,callback){
		var formData = new FormData();
		formData.append("base64", base64String);
		$.ajax({
			url: API_URL + "/web/research/uploadImgBase",
			type: 'POST',
			dataType: 'json',
			data: formData,
			async: true,
			cache: false,
			processData: false,
			contentType: false,
			global: true,
			success: function(json) {
				console.log("上传base64返回："+JSON.stringify(json));
				if(json.status==0){
					callback && callback(json);
				}else{
					alert("上传图片出错");
				}
			},
			error: function(responseStr) {
				alert("上传图片，发生异常");
			}
		});
	}
	
	
	/*
	 * 获取统计数据
	 * researchId:问卷id
	 */
	function ajaxGetStatisticData(researchId, callback) {
		//TODO
		/*$.ajax({
            async: true,
            type:  'POST',
            url: "",
            dataType:'json',
            contentType: "application/json",
            data: dataParam,
            success: function (json) {
                if(json.status==0){
                	callback && callback(json.data);
                }else{
                	alert(json.message);
                }
            },
            timeout: 0,
            error: function (xhr, errorType, error) {
            	console.log("ajaxErrorType:"+errorType);
            	alert("接口异常");
            }
        });*/
		var json = {
			"status": 0,
			"message": "成功",
			"data": {
				"researchId": 121, //问卷id
				"researchName": "问卷标题", //调研名称
				"titleList": [{
					"titleId":321,//题目id
					"titleName": "加快了加快了加快了加快加快了借口借口借口了借口借口借口了借口借口借口就开了家", //题目名称
					"titleType": 2, //题目类型 0-单选 1-多选 2-问答
					"imgUrl": "http://pic1.win4000.com/wallpaper/4/582048fe5c14d.jpg", //题目图片地址
					"displayOrder": 4, //显示顺序
					"optionList": []
				},{
					"titleId":322,//题目id
					"titleName": "新疆考察能接受的可能参加考试的内存就考试的内存就考试的呢", //题目名称
					"titleType": 0, //题目类型 0-单选 1-多选 2-问答
					"imgUrl": "http://attach.bbs.miui.com/forum/201612/04/184654j5xf57vewnkkkq76.jpg", //题目图片地址
					"displayOrder": 1, //显示顺序
					"optionList": [{
						"optionId":11,//选项id
						"optionName": "才能到室内厕所的你每次看到没错", //选项名称
						"imgUrl": "", //题目图片地址
						"displayOrder": 1, //显示顺序
						"answerNumber": 123 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "惨叫声大脑残是哪些那时就开学就考试", //选项名称
						"imgUrl": "", //题目图片地址
						"displayOrder": 2, //显示顺序
						"answerNumber": 123 //这个选项选择次数
					}]
				},{
					"titleId":323,//题目id
					"titleName": "承诺的时刻才能送大家可能参加考试的内存就可能是的健康才能尽快十多年参加考试的南京考察你说的尽可能参加考试的", //题目名称
					"titleType": 1, //题目类型 0-单选 1-多选 2-问答
					"imgUrl": "http://img2.3lian.com/2014/c8/73/d/35.jpg", //题目图片地址
					"displayOrder": 2, //显示顺序
					"optionList": [{
						"optionId":11,//选项id
						"optionName": "层面上的开车门时到处都看了吗", //选项名称
						"imgUrl": "http://desk.fd.zol-img.com.cn/t_s960x600c5/g4/M09/02/03/Cg-4zFT9B2-IPgJQAB4zZAOCOtcAAWXKQJS5OsAHjN8414.jpg", //题目图片地址
						"displayOrder": 1, //显示顺序
						"answerNumber": 123 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "才拿到手就可能曾经看到是你曾经的你曾经的是你曾经看到", //选项名称
						"imgUrl": "http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1406/22/c1/35555706_1403446649983_800x800.jpg", //题目图片地址
						"displayOrder": 2, //显示顺序
						"answerNumber": 453 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "陈女士的今年参加考试的内存就看到你成绩肯定说你成绩肯定少吹牛的承诺", //选项名称
						"imgUrl": "http://pic1.win4000.com/mobile/7/58115e576ef41.jpg", //题目图片地址
						"displayOrder": 3, //显示顺序
						"answerNumber": 123 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "表现成金黄色的变成金黄色的保存很久都不会差不多就好差不多还", //选项名称
						"imgUrl": "http://img.51ztzj.com/upload/image/20161101/2016110204_670x419.jpg", //题目图片地址
						"displayOrder": 4, //显示顺序
						"answerNumber": 453 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "层面上的开车门时到处都看了吗", //选项名称
						"imgUrl": "http://desk.fd.zol-img.com.cn/t_s960x600c5/g4/M09/02/03/Cg-4zFT9B2-IPgJQAB4zZAOCOtcAAWXKQJS5OsAHjN8414.jpg", //题目图片地址
						"displayOrder": 1, //显示顺序
						"answerNumber": 123 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "才拿到手就可能曾经看到是你曾经的你曾经的是你曾经看到", //选项名称
						"imgUrl": "http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1406/22/c1/35555706_1403446649983_800x800.jpg", //题目图片地址
						"displayOrder": 2, //显示顺序
						"answerNumber": 453 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "陈女士的今年参加考试的内存就看到你成绩肯定说你成绩肯定少吹牛的承诺", //选项名称
						"imgUrl": "http://pic1.win4000.com/mobile/7/58115e576ef41.jpg", //题目图片地址
						"displayOrder": 3, //显示顺序
						"answerNumber": 123 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "表现成金黄色的变成金黄色的保存很久都不会差不多就好差不多还", //选项名称
						"imgUrl": "http://img.51ztzj.com/upload/image/20161101/2016110204_670x419.jpg", //题目图片地址
						"displayOrder": 4, //显示顺序
						"answerNumber": 453 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "陈女士的今年参加考试的内存就看到你成绩肯定说你成绩肯定少吹牛的承诺", //选项名称
						"imgUrl": "http://pic1.win4000.com/mobile/7/58115e576ef41.jpg", //题目图片地址
						"displayOrder": 3, //显示顺序
						"answerNumber": 123 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "表现成金黄色的变成金黄色的保存很久都不会差不多就好差不多还", //选项名称
						"imgUrl": "http://img.51ztzj.com/upload/image/20161101/2016110204_670x419.jpg", //题目图片地址
						"displayOrder": 4, //显示顺序
						"answerNumber": 453 //这个选项选择次数
					}]
				},{
					"titleId":324,//题目id
					"titleName": "加快了加快了加快了加快加快了借口借口借口了借口借口借口了借口借口借口就开了家", //题目名称
					"titleType": 1, //题目类型 0-单选 1-多选 2-问答
					"imgUrl": "", //题目图片地址
					"displayOrder": 3, //显示顺序
					"optionList": [{
						"optionId":11,//选项id
						"optionName": "", //选项名称
						"imgUrl": "http://www.dabaoku.com/sucaidatu/zhonghua/fengjingyouhua/09289.jpg", //题目图片地址
						"displayOrder": 1, //显示顺序
						"answerNumber": 12324 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "", //选项名称
						"imgUrl": "http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJlbKxo6ILnM-ABCgW7jzuYkAALHnAC815YAEKBz117.jpg", //题目图片地址
						"displayOrder": 2, //显示顺序
						"answerNumber": 453 //这个选项选择次数
					},{
						"optionId":11,//选项id
						"optionName": "", //选项名称
						"imgUrl": "http://www.pp3.cn/uploads/201511/2015111415.jpg", //题目图片地址
						"displayOrder": 3, //显示顺序
						"answerNumber": 123 //这个选项选择次数
					}]
				}]
			}

		}
		callback && callback(json.data);
		
		
		
	}

	window.statisticsAjax = {
		ajaxGetStatisticData: ajaxGetStatisticData,
		uploadBase64:uploadBase64
	}
})();