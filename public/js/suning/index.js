$(function(){
	var mainBanners;//初始化主banner
	var mainInterval;//主banner的定时器，定时换播放的banner
	var goodsBannerIntervalArr = [];//存放商品楼里的循环定时句柄
	var shoppingData = {};//存放商品的id为键，单价为值得键值对集合
	
	//初始化页面
	initIndex();
	function initIndex(){
		/*初始化右侧边栏高度*/
		var windowHight = myTools.getWindowHeight();
		$('#rightSlideBar').css('height',windowHight+'px');
		$('.shopping-cart-slide').css('height',windowHight+'px');
		//初始化侧边栏购物车列表高度
		$('.shopping-list').css('height',windowHight-49-57+'px');
		
		/*初始化主banner  初始化后执行回调 */
		initMainBanner(function(){
			/*初始化主banner的定时器，定时换播放的banner*/
			mainInterval = setInterval(function(){
				snIndexFunctions.bannerFadeInNextOrNumber($('#mainBanner'),$('#mainBannerCount .numbers').find('.banner-count'),'right',600);
			},3000);
		});
		
		/*初始化商品楼里的banner循环*/
		initGoodsBannerInterval();
		
	}
	
	/*
	 * ******************************************************************
	 */
	
	//监听页面滚动条变换
	$(window).scroll(function(event){
		snIndexFunctions.leftFixedSelect();//左侧页内导航的选择
    });
    
    //监听左边页内导航的点击事件
	$('#leftFixedNav').on('click','li',function(){
		$(this).addClass('select').siblings().removeClass('select');
		var scrollTargetId = $(this).attr('scrollTarget');//滚动目标的id
		
		//滚动目标滚动条距离顶部的距离
		var scrollTargetTopNumber = myTools.getOffsetTop($('#'+scrollTargetId));
		
		//开始滚动到制定位置
		myTools.windowScrollTopTo(scrollTargetTopNumber,300,'swing');
	});
	
	/*
	 * 顶部活动******************************************
	 */
	
	//隐藏顶部的活动
	$('#hideTopEvent').on('click',function(){
		$(this).prev().hide();
		$(this).hide();
		$(this).next().show();
	});
	//显现顶部的活动
	$('#showTopEvent').on('click',function(){
		$(this).prev().show().prev().show();
		$(this).hide();
	});
	
	/*
	 * 顶部导航*****************************************************
	 */
	//顶部导航，鼠标放上出现子导航
	$('#topNav').on('mouseenter','.one-top-nav-body',function(){
		var $_panel = $(this).find('.down-panel');
		if($_panel){
			$_panel.slideDown(100);
			$(this).find('.one-top-nav').addClass('one-top-nav-select');
		}
	});
	//顶部导航，鼠标离开子导航消失
	$('#topNav').on('mouseleave','.one-top-nav-body',function(){
		var $_panel = $(this).find('.down-panel');
		if($_panel){
			$_panel.slideUp(100);
			$(this).find('.one-top-nav').removeClass('one-top-nav-select');
		}
	});
	
	/*
	 * 搜索栏************************************
	 */
	
	//搜索输入框获取焦点，显示下拉框
	$('.serach-form').on('focus','input',function(){
		var value = $.trim($(this).val());
		if(value){
			$(this).parents('.n-sreach').siblings('.match-searchWord').show();
		}
		$(this).parents('.n-sreach').siblings('.history-searchWord').show();
	});
	//搜索输入框输入内容，显示匹配下拉框
	$('.serach-form').on('keyup','input',function(e){
		//不是点空格
		if(e.which==32 || e.which==8){
			var value = $.trim($(this).val());
			if(value){
				$(this).parents('.n-sreach').siblings('.history-searchWord').hide();
				$(this).parents('.n-sreach').siblings('.match-searchWord').show();
			}else{
				$(this).parents('.n-sreach').siblings('.history-searchWord').show();
				$(this).parents('.n-sreach').siblings('.match-searchWord').hide();
			}
		}
	});
	//搜索输入框输失去焦点
	$('.serach-form').on('blur','input',function(e){
		$(this).parents('.n-sreach').siblings('.history-searchWord').hide();
		$(this).parents('.n-sreach').siblings('.match-searchWord').hide();
	});
	//点击搜索下拉框叉叉，关闭搜索下拉框，输入框失去焦点
	$('.hide-serach-panel').on('click',function(){
		$(this).parent().hide();
		$('.serach-form input').blur();
	});
	
	
	/*
	 * 主导航**************************************
	 */
	
	//鼠标移到左侧主导航上
	$('#mainNav').on('mouseenter','li',function(){
		$(this).find('.big-type').addClass('select');
		$(this).find('.iconfont').show();
		$(this).find('.detail-type-panel').show();
	});
	//鼠标移出左侧主导航上
	$('#mainNav').on('mouseleave','li',function(){
		$(this).find('.big-type').removeClass('select');
		$(this).find('.iconfont').hide();
		$(this).find('.detail-type-panel').hide();
	});
	
	
	/*
	 * 主banner********************************************
	 */
	
	
	function initMainBanner(cb){
		var $_oneBanners = $('#mainBanner').find('.one-banner');
		var bannerCount = $_oneBanners.length;
		$_oneBanners.each(function(index,oneBanner){
			$(this).attr('index',index);
		});
		//初始化banner下的数字标签
		for(var i=0;i<bannerCount;i++){
			var $_bannerCountClone = $('#bannerCountClone').find('.banner-count').clone();
			$_bannerCountClone.text(i+1);
			if(i==0){
				$_bannerCountClone.addClass('banner-show');
			}
			$('#mainBannerCount').find('.numbers').append($_bannerCountClone);
		}
		
		//显示第一张图片
		$_oneBanners.eq(0).fadeIn(300).addClass('bannerPlay');
		
		mainBanners ={
			bannerCount:bannerCount
		};
		
		cb & cb();
	}
	
	$('#mainBanner').hover(function(){
		clearInterval(mainInterval);
		$('#mainArrow').fadeIn(300);
	},function(){
		$('#mainArrow').fadeOut(300);
		mainInterval = setInterval(function(){
			snIndexFunctions.bannerFadeInNextOrNumber($('#mainBanner'),$('#mainBannerCount .numbers').find('.banner-count'),'right',600);
		},3000);
	});
	
	//右箭头点击
	$('#mainArrow').on('click','.banner-right-arrow',function(){
		snIndexFunctions.bannerFadeInNextOrNumber($('#mainBanner'),$('#mainBannerCount .numbers').find('.banner-count'),'right',400);
	});
	//左箭头点击
	$('#mainArrow').on('click','.banner-left-arrow',function(){
		snIndexFunctions.bannerFadeInNextOrNumber($('#mainBanner'),$('#mainBannerCount .numbers').find('.banner-count'),'left',400);
	});
	
	//banner数字标识点击
	$('#mainBannerCount').on('click','.banner-count',function(){
		var number = parseInt($(this).text());
		snIndexFunctions.bannerFadeInNextOrNumber($('#mainBanner'),$('#mainBannerCount .numbers').find('.banner-count'),'',400,number);
	});
	
	
	/*
	 * 信息公告***************************************************
	 */
	
	//tab转换
	$("#infoTools").on('mouseenter','.right-title',function(){
		$(this).addClass('notice-select').siblings().removeClass('notice-select');
		$("#infoTools").find('.one-notice').hide();
		$("#infoTools").find('.two-notice').show();
	});
	$("#infoTools").on('mouseenter','.left-title',function(){
		$(this).addClass('notice-select').siblings().removeClass('notice-select');
		$("#infoTools").find('.one-notice').show();
		$("#infoTools").find('.two-notice').hide();
	});
	
	//鼠标换到applogo上，出现二维码
	$('#infoTools').on('mouseenter','.app-icon',function(){
		$(this).next().show();
	});
	$('#infoTools').on('mouseleave','.app-icon',function(){
		$(this).next().hide();
	});
	
	
	/*
	 * 活动中心************************************************
	 */
	$('#activeCenter').hover(
		function(){
			$(this).find('.banner-arrow-icon').fadeIn(200);
		},
		function(){
			$(this).find('.banner-arrow-icon').fadeOut(200);
		}
	);
	
	//右箭头
	 $('#activeCenter').on('click','.active-arrow-right',function(){
	 	var $_slideBox = $('#activeCenterBox');
	 	var animationState = $_slideBox.attr('animationState');
	 	
	 	//保持动画结束，才能开始点击开始下一个动画
	 	if(animationState==1){
	 		return;
	 	}else{
	 		$_slideBox.attr('animationState',1);
	 	}
	 	
	 	var $_li_list = $_slideBox.children();
	 	var $_li_width =$_li_list.eq(0).outerWidth();
	 	var liNumber = $_li_list.length;
	 	var p = {
	 		$_slideBox:$_slideBox,
	 		slideBoxTotalWidth:$_li_width*liNumber,
	 		slideBoxShowWidth:$_li_width*4,
	 		slideChildWidth:$_li_width,
	 		slideChildNumber:4,
	 		direction:'right',
	 		speed:500,
	 		easing:'swing'
	 	}
	 	snIndexFunctions.bannerSlideNext(p,function(){
	 		$_slideBox.attr('animationState',0);
	 	});
	 });
	 
	 //左箭头
	 $('#activeCenter').on('click','.active-arrow-left',function(){
	 	var $_slideBox = $('#activeCenterBox');
	 	var animationState = $_slideBox.attr('animationState');
	 	
	 	//保持动画结束，才能开始点击开始下一个动画
	 	if(animationState==1){
	 		return;
	 	}else{
	 		$_slideBox.attr('animationState',1);
	 	}
	 	
	 	var $_li_list = $_slideBox.children();
	 	var $_li_width =$_li_list.eq(0).outerWidth();
	 	var liNumber = $_li_list.length;
	 	var p = {
	 		$_slideBox:$_slideBox,
	 		slideBoxTotalWidth:$_li_width*liNumber,
	 		slideBoxShowWidth:$_li_width*4,
	 		slideChildWidth:$_li_width,
	 		slideChildNumber:4,
	 		direction:'left',
	 		speed:500,
	 		easing:'swing'
	 	}
	 	snIndexFunctions.bannerSlideNext(p,function(){
	 		$_slideBox.attr('animationState',0);
	 	});
	 });
	 
	
	/*
	 * 商品楼层********************************************************
	 */
	
	//切换tab
	$('.goods-type-tabs-box').on('mouseenter','li',function(){
		var index = $(this).index();
		
		var thisLeft = $(this).position().left;
		var thisWidth = $(this).width();
		
		var uparrowleft = parseInt(thisLeft+(thisWidth/2))+10;
		$(this).parent().next().stop().animate({left:uparrowleft+'px'},200);
		
		$(this).addClass('select').siblings().removeClass('select');
		
		var $_tabBoxs = $(this).parents('.goods-type-tabs-box').next();
		$_tabBoxs.children().eq(index).addClass('tabShow');
		$_tabBoxs.children().eq(index).siblings().removeClass('tabShow');
	});
	
	
	//轮播图相关&&&&&&&&&&&&
	
	//右箭头点击
	$('.banner-img-goods-body').on('click','.banner-right-arrow',function(){
		var $_bannerBody = $(this).parents('.banner-img-goods-body');
		var $_bannerObjects = $_bannerBody.find('.banner-imgs');
		var $_numbers = $_bannerBody.find('.banner-count');
		snIndexFunctions.bannerFadeInNextOrNumber($_bannerObjects,$_numbers,'right',300);
	});
	//左箭头点击
	$('.banner-img-goods-body').on('click','.banner-left-arrow',function(){
		var $_bannerBody = $(this).parents('.banner-img-goods-body');
		var $_bannerObjects = $_bannerBody.find('.banner-imgs');
		var $_numbers = $_bannerBody.find('.banner-count');
		snIndexFunctions.bannerFadeInNextOrNumber($_bannerObjects,$_numbers,'left',300);
	});
	
	//banner数字标识点击
	$('.banner-img-goods-body').on('click','.banner-count',function(){
		var toNumber = parseInt($(this).index())+1;
		var $_bannerBody = $(this).parents('.banner-img-goods-body');
		var $_bannerObjects = $_bannerBody.find('.banner-imgs');
		var $_numbers = $_bannerBody.find('.banner-count');
		snIndexFunctions.bannerFadeInNextOrNumber($_bannerObjects,$_numbers,'',300,toNumber);
	});
	
	
	//设置定时器
	
	function initGoodsBannerInterval(){
		$('.banner-img-goods-body').each(function(index){
			var $_bannerBody = $(this);
			$(this).attr('intervalIndex',index);//定时句柄在数组里的位置
			goodsBannerIntervalArr[index] = setInterval(function(){
				var $_bannerObjects = $_bannerBody.find('.banner-imgs');
				var $_numbers = $_bannerBody.find('.banner-count');
				snIndexFunctions.bannerFadeInNextOrNumber($_bannerObjects,$_numbers,'right',300);
			},3000);
		});
	}
	
	//鼠标划入划出
	$('.banner-img-goods-body').hover(
		function(){
			$(this).find('.goods-banner-arrow-box').show();
			var intervalIndex = $(this).attr('intervalIndex');
			clearInterval(goodsBannerIntervalArr[intervalIndex]);
		},
		function(){
			$(this).find('.goods-banner-arrow-box').hide();
			var intervalIndex = $(this).attr('intervalIndex');
			var $_bannerBody = $(this);
			//重新设置定时器
			goodsBannerIntervalArr[intervalIndex] = setInterval(function(){
				var $_bannerObjects = $_bannerBody.find('.banner-imgs');
				var $_numbers = $_bannerBody.find('.banner-count');
				snIndexFunctions.bannerFadeInNextOrNumber($_bannerObjects,$_numbers,'right',300);
			},3000);
		}
	);
	
	
	
	/*
	 * 右边栏*****************************************************
	 */
	
	//点击头像图标，出现用户操作相关面板
	$('#rightSlideBarBox').on('click','.user-info',function(){
		var $_slidePanel = $(this).siblings('.user-info-slide');
		var width = $_slidePanel.width();
		var left = $_slidePanel.position().left;
		if(left==0){
			//其他出现的面板消失
			$(this).siblings('.select').removeClass('select');
			$(this).addClass('select');
			
			$_slidePanel.stop().animate({left:'-'+width+'px'},300,'swing');
			$_slidePanel.siblings('.slide-detail').stop().animate({left:0},200,'swing');
		}else{
			$(this).removeClass('select');
			$_slidePanel.stop().animate({left:'-'+0+'px'},300,'swing');
		}
		return false;//阻止冒泡
	});
	
	//点击购物车，出现购物车面板
	$('#rightSlideBarBox').on('click','.shopping-cart',function(){
		var $_slidePanel = $(this).siblings('.shopping-cart-slide');
		var width = $_slidePanel.width();
		var left = $_slidePanel.position().left;
		if(left==0){
			//其他出现的面板消失
			$(this).siblings('.select').removeClass('select');
			$(this).addClass('select');
			
			$_slidePanel.stop().animate({left:'-'+width+'px'},300,'swing');
			$_slidePanel.siblings('.slide-detail').stop().animate({left:0},200,'swing');
		}else{
			$(this).removeClass('select');
			$_slidePanel.stop().animate({left:'-'+0+'px'},300,'swing');
		}
		return false;//阻止冒泡
	});
	
	$(document).on('keyup',function(e){
		//G键是71
		if(e.which==71){
			var $_shoppingCart = $('#rightSlideBarBox .shopping-cart');
			var $_slidePanel = $_shoppingCart.siblings('.shopping-cart-slide');
			var width = $_slidePanel.width();
			var left = $_slidePanel.position().left;
			if(left==0){
				//其他出现的面板消失
				$_shoppingCart.siblings('.select').removeClass('select');
				$_shoppingCart.addClass('select');
				
				$_slidePanel.stop().animate({left:'-'+width+'px'},300,'swing');
				$_slidePanel.siblings('.slide-detail').stop().animate({left:0},200,'swing');
			}else{
				$_shoppingCart.removeClass('select');
				$_slidePanel.stop().animate({left:'-'+0+'px'},300,'swing');
			}
		}
	});
	
/*购物车面板内的操作&&&&&&&&&&&&&&&&&&&*/
	
	//初始化shoppingData
	shoppingData['1'] = 23.90;
	shoppingData['2'] = 9000.00;
	shoppingData['3'] = 9199.00;
	shoppingData['4'] = 2949.00;
	shoppingData['5'] = 6199.00;
	shoppingData['6'] = 1249.00;
	
	//鼠标滑到某个商品，显示数量加减、删除按钮
	$('#shoppingCartSlide .one-shopping').hover(
		function(){
			$(this).addClass('show-action');
		},
		function(){
			$(this).removeClass('show-action');
		}
	);
	
	//复选框改变选择事件
	$('#shoppingCartSlide').on("click","input[type='checkbox']",function(){
		var thisName = $(this).attr('name');
		if(thisName=='all'){//点击全选的复选
			//选中状态
			var checkedState = $(this).prop('checked');
			if(checkedState){
				$("#shoppingList input[type='checkbox']").prop("checked",true);
			}else{
				$("#shoppingList input[type='checkbox']").prop("checked",false);
			}
		}else if(thisName=='oneShop'){//点击店铺名字的复选
			//选中状态
			var checkedState = $(this).prop('checked');
			if(checkedState){
				$(this).parents('.one-shop').find("input[type='checkbox']").prop("checked",true);
			}else{
				$(this).parents('.one-shop').find("input[type='checkbox']").prop("checked",false);
			}
		}else{
			var $_thisShop = $(this).parents('.one-shop');
			
			//本商店为选中商品数量
			var notSelectCount = $_thisShop.find("input[name='shopping']").not("input:checked").length;
			if(notSelectCount==0){
				$_thisShop.find("input[name='oneShop']").prop('checked',true);
			}else{
				$_thisShop.find("input[name='oneShop']").prop('checked',false);		
			}
		}
		snIndexFunctions.calculatedTotalPrice(shoppingData);//计算总价
	})
	
	
	//删除购物车商品
	$('#shoppingCartSlide').on('click','.shopping-del',function(){
		var thisShopping =$(this).parents('.one-shopping');	
		var siblings = thisShopping.siblings('.one-shopping');
		if(siblings.length){
			if(siblings.length==1){
				if(siblings.hasClass('hasBorderBottom')){
					siblings.removeClass('hasBorderBottom');
				}
			}
			thisShopping.remove();
		}else{
			$(this).parents('.one-shop').remove();
		}
		
		//共多少件商品
		$(".all-count").text($(".one-shopping").length);
		snIndexFunctions.calculatedTotalPrice(shoppingData);//计算总价
	});
	
	
	//修改商品数量  加
	$('#shoppingCartSlide').on('click','.plus',function(){
		var shoppingId = $(this).parents('.one-shopping').attr('shopping-id');
		var unitPrice = shoppingData[shoppingId];
		var afterPlusCount = parseInt($(this).siblings('input').val())+1;
		$(this).siblings('input').val(afterPlusCount);//设置数量
		var newPrice = myTools.multiply(afterPlusCount,unitPrice);//新的价格
		$(this).parents('.price-box').find('.one-shopping-price').text('￥'+newPrice);
		
		$(this).siblings('.minus').removeClass('canNotUser');
		
		snIndexFunctions.calculatedTotalPrice(shoppingData);//计算总价
	});
	
	//修改商品数量 减
	$('#shoppingCartSlide').on('click','.minus',function(){
		if($(this).hasClass('canNotUser')){
			return;
		}
		var shoppingId = $(this).parents('.one-shopping').attr('shopping-id');
		var unitPrice = shoppingData[shoppingId];
		
		var afterCount = parseInt($(this).siblings('input').val())-1;
		$(this).siblings('input').val(afterCount);//设置数量
		var newPrice = myTools.multiply(afterCount,unitPrice);//新的价格
		$(this).parents('.price-box').find('.one-shopping-price').text('￥'+newPrice);
		
		if(afterCount==1){
			$(this).addClass('canNotUser');
		}
		
		snIndexFunctions.calculatedTotalPrice(shoppingData);//计算总价
	});
	
	//修改商品数量  直接输入数量
	var shoppingOldCount;//用来记录商品修改前数量，用户不填数据
	
	//获取焦点是，记录shoppingOldCount
	$('#shoppingCartSlide').on('focus','input.one-shopping-count',function(e){
		shoppingOldCount = $(this).val();
	});
	
	//失去焦点时，若是没有数据，就恢复老的数据
	$('#shoppingCartSlide').on('blur','input.one-shopping-count',function(e){
		var val = $(this).val();
		if(val=='' || val==0){
			$(this).val(shoppingOldCount);
			var shoppingId = $(this).parents('.one-shopping').attr('shopping-id');
			var unitPrice = shoppingData[shoppingId];
			
			var afterCount = shoppingOldCount;
			$(this).siblings('input').val(afterCount);//设置数量
			var newPrice = myTools.multiply(afterCount,unitPrice);//新的价格
			$(this).parents('.price-box').find('.one-shopping-price').text('￥'+newPrice);
			
			snIndexFunctions.calculatedTotalPrice(shoppingData);//计算总价
		}
	});
	
	$('#shoppingCartSlide').on('keyup','input.one-shopping-count',function(e){
		var val =$(this).val();
		if(val.length==0){
			val = '';
			$(this).val(val);
		}else{
			$(this).val(parseInt(val));
			if(parseInt(val)>1){
				$(this).siblings('.minus').removeClass('canNotUser');
			}
			var shoppingId = $(this).parents('.one-shopping').attr('shopping-id');
			var unitPrice = shoppingData[shoppingId];
			
			var afterCount = parseInt(val);
			$(this).siblings('input').val(afterCount);//设置数量
			var newPrice = myTools.multiply(afterCount,unitPrice);//新的价格
			$(this).parents('.price-box').find('.one-shopping-price').text('￥'+newPrice);
			snIndexFunctions.calculatedTotalPrice(shoppingData);//计算总价
		}
	});
	
/*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
	
	
	
	$(document).on('click',function(){
		//侧边栏用户信息面板隐藏
		$('#rightSlideBarBox .user-info').removeClass('select');
		$('#rightSlideBarBox .user-info-slide').stop().animate({left:'0px'},300,'swing');
		
		//侧边栏购物车面板隐藏
		$('#rightSlideBarBox .shopping-cart').removeClass('select');
		$('#rightSlideBarBox .shopping-cart-slide').stop().animate({left:'0px'},300,'swing');
	});
	$('#rightSlideBarBox .user-info-slide').on('click',function(e){
		e.stopPropagation();//阻止冒泡，防止冒泡到点击document让面板消失了
	});
	$('#rightSlideBarBox .shopping-cart-slide').on('click',function(e){
		e.stopPropagation();//阻止冒泡，防止冒泡到点击document让面板消失了
	});
	
	//小内容划入划出
	$('.side-bar-el').hover(
		function(){
			var $_newText = $(this).find('.new-text');
			if($_newText){
				var left = $_newText.width();
				$_newText.addClass('span-hover');
				$_newText.stop().animate({left:'-'+left+'px'},300,'swing');
			}
		},
		function(){
			var $_newText = $(this).find('.new-text');
			if($_newText){
				var left = $_newText.width();
				$_newText.removeClass('span-hover');
				$_newText.stop().animate({left:left+'px'},300,'swing');
			}
		}
	);
	
	//下方出现二维码
	$('.active-erweima').hover(
		function(){
			$(this).addClass('select');
			var $_activeErweimaSlide = $(this).siblings('.active-erweima-slide');
			var left = $_activeErweimaSlide.width();
			$_activeErweimaSlide.stop().animate({left:'-'+left+'px'},300);
		},
		function(){
			$(this).removeClass('select');
			var $_activeErweimaSlide = $(this).siblings('.active-erweima-slide');
			$_activeErweimaSlide.stop().animate({left:'-'+0+'px'},300);
		}
	);
	$('.active-erweima-slide').hover(
		function(){
			var $_activeErweima = $(this).siblings('.active-erweima').addClass('select');
			var left = $(this).width();
			$(this).stop().animate({left:'-'+left+'px'},300);
		},
		function(){
			var $_activeErweima = $(this).siblings('.active-erweima').removeClass('select');
			$(this).stop().animate({left:'-'+0+'px'},300);
		}
	);
	
	
	//回到顶部
	$('#rightSlideBarBox').on('click','.go-top',function(){
		myTools.windowScrollTopTo(0,500,'swing');
	});
	
	
	
	
});
