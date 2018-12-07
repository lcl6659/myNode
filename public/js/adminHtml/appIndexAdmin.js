var jRollAppIndex,bannerSwiper,sortable;
$(function(){
	appIndexFuncs.initPage();
	
	$(".banner-box,.special-box").hover(
		function(){
			$(this).find(".edit-box").fadeIn(200);
		},
		function(){
			$(this).find(".edit-box").fadeOut(200);
		}
	);
	
});

/*
 * 方法库
 */
(function(){
	/*
	 * 页面初始化
	 */
	function initPage(){
		initSortTable();
		initJroll();
		initSwipe();
	}
	
	/*
	 * 初始化拖拉排序
	 */
	function initSortTable(){
		var el = document.getElementById('index-menu');
		sortable = new Sortable(el, {
			animation:150,//animation speed moving items when sorting, `0` — without animation
			ghostClass: "sortable-ghost", // Class name for the drop placeholder
			chosenClass: "sortable-chosen", // Class name for the chosen item
			dragClass: "sortable-drag", // Class name for the dragging item
			onChoose: function (/**Event*/evt) {// Element is chosen
		        console.log("选中");
		        jRollAppIndex.destroy();
		        $("#index-menu li").off("mouseup").on("mouseup",function(){
		        	console.log("放下");
					initJroll();
				});
		    },
			onStart:function(){// Element dragging started
				console.log("开始拖动");
			},
			onEnd: function (/**Event*/evt) {// Element dragging ended
		    	console.log("排序结束");   
		    	initJroll();
		  	},
		  	onDrop:function(){
		  		console.log("放下"); 
		  	}
		});
	}
	
	/*
	 * 初始化jRollAppIndex
	 */
	function initJroll(){
		jRollAppIndex = new JRoll("#preview-box",{
			bounce:false
		});
	}
	
	/*
	 * 初始化banner
	 */
	function initSwipe(){
		bannerSwiper = new Swiper ('.banner-box', {
		    direction: 'horizontal',
		    loop: true,
		    autoplay:4000,
		    pagination: '.swiper-pagination'
		});
	}
	
	
	window.appIndexFuncs = {
		initPage:initPage
	}
})();

/*
 * ajax库
 */
(function(){
	
	/*
	 * 获取banner
	 */
	function ajaxGetBanners(){
		
	}
	
	/*
	 * 获取菜单
	 */
	function ajaxGetMenu(){
		
	}
	
	/*
	 * 修改菜单顺序
	 */
	function ajaxUpdateMenuSort(){
		
	}
	
	/*
	 * 获取推荐专题
	 */
	function ajaxGetSpecial(){
		
	}
	
	
	
	window.appIndexAjax = {
		ajaxGetBanners:ajaxGetBanners,
		ajaxGetMenu:ajaxGetMenu,
		ajaxUpdateMenuSort:ajaxUpdateMenuSort,
		ajaxGetSpecial:ajaxGetSpecial
	}
})();
