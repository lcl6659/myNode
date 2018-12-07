$(function(){


	//当前用户的基础信息
	var userData = {
		headimg:"",
		username:"我是不倒翁",
		mobile:'',
		sex:''
	};

	//直播视频信息
	var liveVideoData = {
		group:'12345'//分组
	};


	var host = location.host;//域名+端口

	//初始化一个socket连接
	var socket =io.connect('http://'+host);

	socket.emit('joinGroup',liveVideoData);//加入分组

	//初始化视屏容器高度
	/*setVideoContainerHeight();*/
	
	var myVideo = document.getElementById("myVideo");
	
	
	/*
	 * 弹幕功能区----------------------------------------------------------------------------
	 * */
	//弹幕的内容池子 - 使用的池子，即屏幕的弹幕内容从这里取得
	var barrageContentUse = [
		{content:'那就拿成绩单能接触到'},
		{content:'vfdfvfdvfd'},
		{content:'报告发布发布官方吧'},
		{content:'反而发热分'},
		{content:'vfdv地方'},
		{content:'还不用退回已退回'},
		{content:'给大哥发的广泛地'},
		{content:'的风格的方式'}
	];
	//开启弹幕
	var barrageInterval,barrageTimeout;
	$('#barrageOpen').on('click',function(){
		$(this).hide();
		$('#barrageClose').show();
		
		//显示之前没有走完的
		//var lastOneBarrage = $('#barrageContent :last-child');
		//if(lastOneBarrage){
		//	lastOneBarrage.show().addClass('startAnimation');
		//	lastOneBarrage.prev().show().addClass('startAnimation');
		//}
		
		//添加弹幕数据
		barrageOpen();
		barrageInterval = setInterval(barrageOpen,2000);
		
	});
	
	//关闭弹幕
	$('#barrageClose').on('click',function(){
		$(this).hide();
		$('#barrageOpen').show();
		//clearTimeout(barrageTimeout);
		clearInterval(barrageInterval);
		$('#barrageContent div').hide().addClass('stopAnimation');
	});
	
	
	
	
	
	
	
	
	
	
	
	
	//发送消息，弹幕展示
	$('#sendBarrage').on('click',function(){
		var $_msgValue = $('#msgValue');

		var msgValue =$_msgValue.val();
		if(msgValue==''){
			return;
		}

		//封装要发送到后台的信息
		var sendData = {
			userData:userData,
			liveVideoData:liveVideoData,
			data:{barrageMsgValue:msgValue}
		};

		//socket把弹幕信息发送到服务器
		socket.emit('sendBarrage', sendData);

		//在弹幕池子前置消息
		barrageContentUse.unshift({content:msgValue});

		$_msgValue.val("");
		
	});

	//socket监听，接受最新的弹幕消息
	socket.on('clientGetNewBarrageData',function(data){
		console.log("客户端接受弹幕："+JSON.stringify(data));
		var barrageData = data.barrageData;
		barrageContentUse.push({content:barrageData.barrageMsgValue});
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//开启弹幕
	function barrageOpen(){
		var $_barrageContent = $('#barrageContent');
		if(barrageContentUse.length==0){
			return;
		}
		for(var i=0;i<3;i++){
			if(barrageContentUse.length>0){
				var firstContent = barrageContentUse.shift();
				var $_barrageContentClone = $('#cloneContainer').find('.oneBarrage').clone();
				$_barrageContentClone.text(firstContent.content);
				if(i==0){
					$_barrageContentClone.addClass('top');
				}else if(i==1){
					$_barrageContentClone.addClass('middle');
				}else{
					$_barrageContentClone.addClass('bottom');
				}
				$_barrageContent.append($_barrageContentClone);
			}
		}
	}
	
	/*
	 * 送礼功能区-----------------------------------------------------------
	 */
	
	//初始化礼物轮播
	var mySwiper = new Swiper ('.swiper-container', {
	    pagination: '.swiper-pagination',  // 如果需要分页器
	    paginationClickable :true //点击分页器的指示点分页器会控制Swiper切换。
	}); 
	$('#sendGiftContainer').css('display','none');//隐藏礼物盘
	
	
	//送的多个礼物，左侧跳出区域使用的数据池子
	var moreGiftsContent = [
		{username:'打老虎1',gift:'樱花',count:4},
		{username:'打老虎2',gift:'香蕉',count:43},
		{username:'打老虎3',gift:'玫瑰',count:6},
		{username:'打老虎4',gift:'西瓜',count:8},
		{username:'打老虎5',gift:'山楂',count:123}
	];
	
	//#gifts收到的礼物池子，礼物列表数据显示数据从这里取，礼物数1个的池子
	var oneGiftContent = [
		{username:'打老虎',gift:'西瓜',count:1},
		{username:'打老虎',gift:'西瓜',count:1},
		{username:'打老虎',gift:'西瓜',count:1},
		{username:'打老虎',gift:'西瓜',count:1},
		{username:'西边的太阳',gift:'锤子',count:1},
		{username:'西边的太阳',gift:'锤子',count:1},
		{username:'西边的太阳',gift:'锤子',count:1},
		{username:'西边的太阳',gift:'锤子',count:1}
	];
	
	
	var giftSendState = false;//记录礼物是否可发送
	
	//点击具体礼物，增加数量
	$('.oneGift').on('click',function(){
		var $_giftName = $(this).find('.giftName');
		var $_number = $(this).find('.number');
		var oldNumber = $_number.text() || 0;//点击之前的数量
		$_number.text(parseInt(oldNumber)+1);//设置礼物数量
		
		//改这个礼物加上一个样式，已做标识，该礼物会被发送，发送时按此遍历要发送的礼物
		if(!$(this).hasClass('wantSend')){
			$(this).addClass('wantSend');
		}
		
		//发送按钮变为可发送颜色、并修改可发送状态
		if($("#actionContent .giftGo").hasClass('giftcannotGo')){
			$("#actionContent .giftGo").removeClass('giftcannotGo');
			giftSendState = true;
		}
		return false;
	});
	
	//礼物发送按钮点击
	$('#actionContent').on('click','.giftGo',function(){
		if(!giftSendState){
			return;
		}
		var giftsData = [];//发送给后台的礼物数据
		$('#giftsContent .wantSend').each(function(){
			var gift = $(this).find('.giftName').text();
			var count = parseInt($(this).find('.number').text());
			var oneTypeGift = {
				gift:gift,
				count:count
			};
			giftsData.push(oneTypeGift);
			//根据count,放入不同池子，前置，这样自己发的信息，在自己这边会快点显示出来
			oneTypeGift.username = userData.username;
			if(count>1){
				moreGiftsContent.unshift(oneTypeGift);
			}else if(count==1){
				oneGiftContent.unshift(oneTypeGift);
			}

		});
		//封装要发送到后台的信息
		var sendData = {
			userData:userData,
			liveVideoData:liveVideoData,
			data:giftsData
		};
		socket.emit('sendGifts',sendData);
		giftsContentBack();//恢复初始化
	});

	//socket监听，获取新的礼物数据
	socket.on('clientGetNewGiftsData',function(data){
		console.log('礼物数据：'+JSON.stringify(data));
		var sendGidtUserData = data.userData;//送礼人数据
		var newGiftsData = data.giftsData;//新的礼物数据

		//遍历，加入到对应的礼物池子中
		newGiftsData.forEach(function(oneGift){
			oneGift.username = sendGidtUserData.username;
			if(oneGift.count>1){
				moreGiftsContent.unshift(oneGift);
			}else if(oneGift.count==1){
				oneGiftContent.unshift(oneGift);
			}
		});
	});

	
	
	//循环取礼物数据数据  单个礼物展示区
	var giftInterval = setInterval(function(){
		if(oneGiftContent.length>0){
			showGiftsAndAnimation(20);
		}
	},3000);
	
	getMoreGiftsShow();
	//多个礼物展示区
	var moreGiftInterval = setInterval(function(){
		getMoreGiftsShow();
	},6*1000);
	
	//dom操作，插入礼物，并执行动画
	//numner一次添加进的数量
	function showGiftsAndAnimation(numner){
		var giftContentLenght = oneGiftContent.length;
		var spliceGifts;
		if(giftContentLenght>numner){
			spliceGifts= oneGiftContent.splice(0,numner);
		}else{
			spliceGifts = oneGiftContent.splice(0,oneGiftContent.length);
		}
		spliceGifts.forEach(function(oneGift){
			var $_oneGiftClone = $('#cloneContainer').find('.oneGift').clone();
			$_oneGiftClone.find('.username').text(oneGift.username);
			$_oneGiftClone.find('.gift').text("送你一个"+oneGift.gift);
			$('#gifts').append($_oneGiftClone);
		});
		giftUpAnimation(spliceGifts.length);
	}
	
	//礼物区域向上动画
	function giftUpAnimation(giftNUmber){
		$('#gifts').animate({top:"-="+giftNUmber*30+"px"},giftNUmber*1000);
	}
	
	
	//dom多个礼物区域 礼物添加展示
	function getMoreGiftsShow(){
		var $_getMoreGifts = $('#getMoreGifts');
		if(moreGiftsContent.length==0){
			return;
		}
		for(var i=0;i<3;i++){
			if(moreGiftsContent.length>0){
				var firstContent = moreGiftsContent.shift();
				var $_oneTypeGiftsClone = $('#cloneContainer').find('.oneTypeGifts').clone();
				$_oneTypeGiftsClone.find('.username').text(firstContent.username);
				$_oneTypeGiftsClone.find('.gifttype').text("送你"+firstContent.gift);
				$_oneTypeGiftsClone.find('.giftcount').text("×"+firstContent.count);
				if(i==0){
					$_oneTypeGiftsClone.addClass('topGift');
				}else if(i==1){
					$_oneTypeGiftsClone.addClass('middleGift');
				}else{
					$_oneTypeGiftsClone.addClass('bottomGift');
				}
				$_getMoreGifts.append($_oneTypeGiftsClone);
			}
		}
	}
	
	/*
	 * 工具功能区-----------------------------------------------------------------------
	 */
	//点击视频区域，恢复工具区域
	$('#cover,#back,#tools').on('click',function(){
		goBackStyle();
	});
	$('#barrageContent').on('click',function(){
		goBackStyle();
	});
	$('#getGifts').on('click',function(){
		goBackStyle();
	});
	
	//点击工具 - 评论
	/*$('#showSengMsg').on('click',function(){
		$('#tools').fadeOut();
		$('#sendMsg').show();
		$('#sendMsg input').focus();
	});*/
	
	
	//点击工具 - 送礼
	$('#sendGift').on('click',function(){
		$('#sendGiftContainer').slideToggle(300,function(){
			giftsContentBack();
		});
		return false;
	});
	

	//恢复
	function goBackStyle(){
		$('#tools').fadeIn();//工具栏出现
		//$('#sendMsg').hide();//发送消息面板影藏
		$('#sendGiftContainer').slideUp();//礼物发送面板隐藏
		
		giftsContentBack();//发送礼物区域恢复初始化
		
	}
	
	//发送礼物区域恢复初始化
	function giftsContentBack(){
		$('#sendGiftContainer').find('.number').text('');//礼物number清空
		$('#sendGiftContainer').find('.wantSend').removeClass('wantSend');
		giftSendState = false;
		//发送按钮变灰
		if(!$("#actionContent .giftGo").hasClass('giftcannotGo')){
			$("#actionContent .giftGo").addClass('giftcannotGo');
		}
	}
	
	//设置高度
	function setVideoContainerHeight(){
		var screenHeight = window.screen.height-20-61;
		$('.video_container').css('height',screenHeight+'px');
	}
});