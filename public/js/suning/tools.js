/*
 * 封装了一些比较通用的方法，不涉及具体dom对象
 * 基于jquery，所以要在juqery之后引入
 */
(function(window) {
	/*
	 * 浏览器当前窗口可视区域高度
	 */
	function getWindowHeight() {
		return $(window).height();
	}

	/*
	 * 浏览器当前窗口可视区域宽度 
	 */
	function getWindowWidth() {
		return $(window).width();
	}

	/*
	 * 滚动条距离顶端高度高度
	 */
	function getScrollTop() {
		return $(window).scrollTop();
	}

	/*
	 * 获取元素距离页面顶端的距离
	 * $Element:要查看的元素（jquery对象）
	 */
	function getOffsetTop($Element) {
		return $Element.offset().top;
	}

	/*
	 * 滚动条滚动到制定位置
	 * topNumber:垂直滚动条的要滚动到的制定位置
	 * speed:耗时，即速度
	 */
	function windowScrollTopTo(topNumber, speed, easing) {
		$('html,body').stop().animate({
			scrollTop: topNumber
		}, speed, easing);
	}

	//加法函数  
	function plus(arg1, arg2) {
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		return(arg1 * m + arg2 * m) / m;
	}

	//减法函数  
	function minus(arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		//last modify by deeka  
		//动态控制精度长度  
		n = (r1 >= r2) ? r1 : r2;
		return((arg1 * m - arg2 * m) / m).toFixed(n);
	}


	//乘法函数  
	function multiply(arg1, arg2) {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch(e) {}
		try {
			m += s2.split(".")[1].length;
		} catch(e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}

	//除法函数  
	function divided(arg1, arg2) {
		var t1 = 0,
			t2 = 0,
			r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		} catch(e) {}
		try {
			t2 = arg2.toString().split(".")[1].length;
		} catch(e) {}
		with(Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return(r1 / r2) * pow(10, t2 - t1);
		}
	}

	window.myTools = {
		getWindowHeight: getWindowHeight, //浏览器当前窗口可视区域高度
		getWindowWidth: getWindowWidth, //浏览器当前窗口可视区域宽度 
		getScrollTop: getScrollTop, //滚动条距离顶端高度高度
		getOffsetTop: getOffsetTop, //获取元素距离页面顶端的距离
		windowScrollTopTo: windowScrollTopTo, //滚动条滚动到制定位置
		plus:plus,//加法
		minus:minus,//减法
		multiply:multiply,//乘法
		divided:divided//除法
	}
})(window);