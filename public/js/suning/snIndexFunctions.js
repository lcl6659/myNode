/*
 * 首页的方法函数都写在这里，封装在一个对象了，涉及到页面的dom操作
 * 基于jquery，所以要在juqery之后引入
 */
(function(window,myTools){
	/*
	 * 改变左侧页内导航的选择
	 */
	function leftFixedSelect(){
		var scrollTop = myTools.getScrollTop($(window));
		var windowHeight = myTools.getWindowHeight();//可视区域高度
		
		var generalGoodsScrollTop = myTools.getOffsetTop($('#generalGoods'))-windowHeight+200;
		var mobileScrollTop = myTools.getOffsetTop($('#mobile'))-windowHeight+200;
		var foodScrollTop = myTools.getOffsetTop($('#food'))-windowHeight+200;
		var homeElectricalScrollTop = myTools.getOffsetTop($('#homeElectrical'))-windowHeight+200;
		var lifeEletricalScrollTop = myTools.getOffsetTop($('#lifeEletrical'))-windowHeight+200;
		var computerScrollTop = myTools.getOffsetTop($('#computer'))-windowHeight+200;
		
		//左侧页内导航出现
		if(scrollTop>generalGoodsScrollTop){
			$('#leftFixedNav').fadeIn(500);
		}else{
			$('#leftFixedNav').fadeOut(500);
		}
		
		if(scrollTop>generalGoodsScrollTop && scrollTop<mobileScrollTop){
			$("#leftFixedNav").find('li').eq(0).addClass('select').siblings().removeClass('select');
		}else if(scrollTop>mobileScrollTop && scrollTop<foodScrollTop){
			$("#leftFixedNav").find('li').eq(1).addClass('select').siblings().removeClass('select');
		}else if(scrollTop>foodScrollTop && scrollTop<homeElectricalScrollTop){
			$("#leftFixedNav").find('li').eq(2).addClass('select').siblings().removeClass('select');
		}else if(scrollTop>homeElectricalScrollTop && scrollTop<lifeEletricalScrollTop){
			$("#leftFixedNav").find('li').eq(3).addClass('select').siblings().removeClass('select');
		}else if(scrollTop>lifeEletricalScrollTop && scrollTop<computerScrollTop){
			$("#leftFixedNav").find('li').eq(4).addClass('select').siblings().removeClass('select');
		}else if(scrollTop>computerScrollTop){
			$("#leftFixedNav").find('li').eq(5).addClass('select').siblings().removeClass('select');
		}
	}
	
	/*
	 * 轮播图替换下一张(fadeIn进入的),当前播放的额会被添加"bannerPlay"样式
	 * $_bannerObjects:轮播内容父标签的jquery对象
	 * $_numbers:数字标签的集体标签集合
	 * direction:方向 left,right
	 * speed:速度
	 * toNumber:要显示的次序(int) 1开始(重要)
	 */
	function bannerFadeInNextOrNumber($_bannerObjects,$_numbers,direction,speed,toNumber){
		if(toNumber){
			var $_playNow = $_bannerObjects.find('.bannerPlay');
			$_playNow.fadeOut(speed).removeClass('bannerPlay');
			$_playNow.parent().children().eq(toNumber-1).fadeIn(speed).addClass('bannerPlay');
			$_numbers.eq(toNumber-1).addClass('banner-show').siblings().removeClass('banner-show')
			return;
		}
		
		if(direction=='right'){
			var $_playNow = $_bannerObjects.find('.bannerPlay');
			var nowIndex = parseInt($_playNow.index());
			var siblingsLegth = $_playNow.siblings().length;
			var $_nextPlay = $_playNow.next();
			if(nowIndex<siblingsLegth){
				$_playNow.fadeOut(speed);
				$_playNow.removeClass('bannerPlay');
				$_nextPlay.fadeIn(speed);
				$_nextPlay.addClass('bannerPlay');
				
				$_numbers.eq(nowIndex+1).addClass('banner-show').siblings().removeClass('banner-show')
			}else{
				$_playNow.fadeOut(speed);
				$_playNow.removeClass('bannerPlay');
				$_playNow.siblings().eq(0).fadeIn(speed);
				$_playNow.siblings().eq(0).addClass('bannerPlay');
				
				$_numbers.eq(0).addClass('banner-show').siblings().removeClass('banner-show')
			}
		}else{
			var $_playNow = $_bannerObjects.find('.bannerPlay');
			var nowIndex = parseInt($_playNow.index());
			var siblingsLegth = $_playNow.siblings().length;
			var $_nextPlay = $_playNow.prev();
			if(nowIndex!=0){
				$_playNow.fadeOut(speed);
				$_playNow.removeClass('bannerPlay');
				$_nextPlay.fadeIn(speed);
				$_nextPlay.addClass('bannerPlay');
				
				$_numbers.eq(nowIndex-1).addClass('banner-show').siblings().removeClass('banner-show')
			}else{
				$_playNow.fadeOut(speed);
				$_playNow.removeClass('bannerPlay');
				$_playNow.siblings().eq(siblingsLegth-1).fadeIn(speed);
				$_playNow.siblings().eq(siblingsLegth-1).addClass('bannerPlay');
				
				$_numbers.eq(siblingsLegth).addClass('banner-show').siblings().removeClass('banner-show')
			}
		}
	}
	
	
	/*
	 * 轮播图，下一波（slide方式交替循环播放）
	 * p={
	 *     $_slideBox:滑动的主体
	 *     slideBoxTotalWidth:滑动主体的总宽度(判断有没有到边)包含隐藏部分
	 *     slideBoxShowWidth:滑动容器展示的外框宽度(显示区域的宽度)
	 * 	   slideChildWidth：滑动体内一个子元素的宽度
	 *     slideChildNumber:每次滑动几个子元素
	 *     direction:方向 left,right
	 *     speed:滑动速度（耗时）毫秒
	 *     easing:动画速度变化（速度曲线）
	 * }
	 */
	function bannerSlideNext(p,cb){
		var left = parseInt(-p.$_slideBox.position().left);
		var childCount = p.$_slideBox.children().length;//子元素数量
		
		if(p.direction=='right'){
			if((left+p.slideBoxShowWidth)>=p.slideBoxTotalWidth){
				
				//复制前几个放到后面
				p.$_slideBox.children().each(function(index,$_li){
					if(index<p.slideChildNumber){
						p.$_slideBox.append($(this).clone());
					}
				});
				p.$_slideBox.animate({left:"-="+p.slideChildWidth*p.slideChildNumber+'px'},p.speed,p.easing,function(){
					//删除前面之前的复制体
					p.$_slideBox.children().each(function(index,$_li){
						if(index<p.slideChildNumber){
							$(this).remove();
							
							//修改left值，不然删除会让后面的顶上
							var leftNow = parseInt(p.$_slideBox.position().left);
							p.$_slideBox.css('left',leftNow+p.slideChildWidth+'px');
						}
					});
					
					cb && cb();//执行回调
				});
			}else{
				p.$_slideBox.animate({left:"-="+p.slideChildWidth*p.slideChildNumber+'px'},p.speed,p.easing,function(){
					cb && cb();//执行回调
				});
			}
			
		}else{
			if(left==0){
				//复制前几个放到后面
				/*p.$_slideBox.children().reverse().each(function(index,$_li){
					if(index<p.slideChildNumber){
						console.log("1111index:"+index);
						p.$_slideBox.prepend($(this).clone());
						
						//修改left值，不然删除会让后面的顶上
						var leftNow = parseInt(p.$_slideBox.position().left);
						p.$_slideBox.css('left',leftNow-p.slideChildWidth+'px');
					}
				});*/
				for(var i=0;i<p.slideChildNumber;i++){
					
					var $_Child = p.$_slideBox.children().eq(childCount-1);
					
					//前置
					p.$_slideBox.prepend($_Child.clone());
						
					//修改left值，不然删除会让后面的顶上
					var leftNow = parseInt(p.$_slideBox.position().left);
					p.$_slideBox.css('left',leftNow-p.slideChildWidth+'px');
					
					//删除原来的
					$_Child.remove();
				}
				p.$_slideBox.animate({left:"+="+p.slideChildWidth*p.slideChildNumber+'px'},p.speed,p.easing,function(){
					cb && cb();//执行回调
				});
			}else{
				p.$_slideBox.animate({left:"+="+p.slideChildWidth*p.slideChildNumber+'px'},p.speed,p.easing,function(){
					cb && cb();//执行回调
				});
			}
		}
		
	}
	
	
	
	
	/*
	 * 计算购物车内，已选商品的总价
	 * shoppingObject={
	 *    	//存放商品的id为键，单价为值得键值对集合
	 * 		id:price
	 * }
	 * 
	 */
	function calculatedTotalPrice(shoppingObject){
		var $_allCheckedShoppings = $(".one-shopping input:checked");
		var totalPrice = 0;
		$_allCheckedShoppings.each(function(){
			var thisId = $(this).parents('.one-shopping').attr('shopping-id');//id
			var thisCount = parseInt($(this).siblings('.shopping-detail').find('.one-shopping-count').val());//数量
			var thisPrice = myTools.multiply(thisCount,shoppingObject[thisId]);//商品价格
			totalPrice = myTools.plus(totalPrice,thisPrice);
		});
		$('#chooseCount .count').text($_allCheckedShoppings.length);
		$('#totlePrice .price').text(totalPrice);
		$('.has-choose-count').text($_allCheckedShoppings.length);
	}
	
	
	window.snIndexFunctions = {
		leftFixedSelect:leftFixedSelect,
		bannerFadeInNextOrNumber:bannerFadeInNextOrNumber,
		bannerSlideNext:bannerSlideNext,
		calculatedTotalPrice:calculatedTotalPrice
	}
})(window,myTools);