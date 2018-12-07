var sortable;
var clipImgBase64;
var inputFocusState = 0;
$(function() {
	menuEditFuns.initPage();

	setTimeout(function() {
		$(".nav-text").each(function(index, navText) {
			var text = $(navText).find("span").attr("nav-text");
			$(navText).find("input").val(text);
		});
	}, 200);

	//隐藏输入框
	$("#menuBox").on("blur", "input[type=text]", function(event) {
		inputFocusState = 0;
		var oldVal = $(this).prev().attr("nav-text");
		$(this).css("border", "0px solid #E2E2E2");
		var changeVal = $(this).val();
		if(changeVal.length < 2 || changeVal.length > 4) {
			$(this).val(oldVal);
			return;
		} else {
			$(this).prev().attr("nav-text", changeVal);
		}
	});

	$("#menuBox .img-wrap").hover(
		function() {
			$(this).find(".upload-img-box").fadeIn(200);
		},
		function() {
			$(this).find(".upload-img-box").fadeOut(200);
		}
	);

	$("#menuBox").on("change", "input[type=file]", function(event) {
		$("#clip-box").show();
		var fileId = $(this).attr("id");
		$("#clip-box").attr("file-id", fileId);
	});

	//取消剪裁
	$("#cancleClip").on("click", function() {
		menuEditFuns.hideClipBox();
	});

	//完成剪裁
	$("#finishClip").on("click", function() {
		if(clipImgBase64) {
			menuEditAjax.uploadBase64(clipImgBase64, function(imgUrl) {
				var fileId = $("#clip-box").attr("file-id");
				var $_fileImg = $("#" + fileId).parents(".img-wrap").find("img");
				$_fileImg.attr("src", imgUrl);
				menuEditFuns.hideClipBox();
			});
		} else {
			menuEditFuns.hideClipBox();
		}
	});

	$(".banner-box,.special-box").hover(
		function() {
			$(this).find(".edit-box").fadeIn(200);
		},
		function() {
			$(this).find(".edit-box").fadeOut(200);
		}
	);

	//预览
	$("#preview-edit").on("click", function() {
		
		var $_liList = $("#menuBox").clone();
		
		$_liList.find("li").each(function(index,li){
			$_span = $(li).find(".nav-text span");
			$_span.text($_span.attr("nav-text"));
		});
		
		$("#index-menu").html($_liList.html());
		
		
		
		
	});

	//保存并发布
	$("#saveAndSubmit").on("click", function() {
		var menuData = {};
		$("#menuBox li").each(function(index, li) {
			var $_li = $(li);
			var menuObj = {
				imgUrl: $_li.find("img").attr("src"),
				text: $_li.find(".nav-text span").attr("nav-text"),
				displayOrder: index + 1
			}
			menuData[$_li.attr("menu-type")] = menuObj;
		});
		console.log(JSON.stringify(menuData));
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
		initSortTable();
		initPhotoClip();
	}

	/*
	 * 初始化拖拉排序
	 */
	function initSortTable() {
		var el = document.getElementById('menuBox');
		sortable = new Sortable(el, {
			animation: 150, //animation speed moving items when sorting, `0` — without animation
			ghostClass: "sortable-ghost", // Class name for the drop placeholder
			chosenClass: "sortable-chosen", // Class name for the chosen item
			dragClass: "sortable-drag", // Class name for the dragging item
			filter: ".nav-text,.file",
			onFilter: function(evt) {
				var item = evt.item,
					ctrl = evt.target;

				//点击显示输入框
				if(Sortable.utils.is(ctrl, ".nav-text")) { // Click on remove button
					if(inputFocusState==0){
						inputFocusState = 1;
						
						$("input[type=text]").blur();
						
						var text = $(ctrl).find("span").attr("nav-text");
						$(ctrl).find("input").css("border", "1px solid #E2E2E2").val(text);
						$(ctrl).find("input").focus();
						setCaretPosition($(ctrl).find("input")[0], text.length);
					}
				}

			},
			onChoose: function( /**Event*/ evt) { // Element is chosen
				console.log("选中");
			},
			onStart: function() { // Element dragging started
				console.log("开始拖动");
			},
			onEnd: function( /**Event*/ evt) { // Element dragging ended
				console.log("排序结束");
			},
			onDrop: function() {
				console.log("放下");
			}
		});
	}
	
	//设置光标位置
	function setCaretPosition(ctrl, pos) {
		if(ctrl.setSelectionRange) {
			ctrl.focus();
			ctrl.setSelectionRange(pos, pos);
		} else if(ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}

	function initPhotoClip() {
		$("#clipView").photoClip({
			width: 200,
			height: 200,
			file: ".fileClip",
			view: "#previewBox",
			ok: "#clipBtn",
			loadStart: function() {
				console.log("照片读取中");
			},
			loadComplete: function() {
				console.log("照片读取完成");
			},
			clipFinish: function(dataURL) {
				clipImgBase64 = dataURL;
			}
		});
	}

	/*
	 * 隐藏剪切区域
	 */
	function hideClipBox() {
		$("#clip-box").hide();
		$("#clip-box").attr("file-id", "");
		$("#previewBox").css("background-image", "");
		clipImgBase64 = "";
	}

	window.menuEditFuns = {
		initPage: initPage,
		hideClipBox: hideClipBox
	}
})();

/*
 * ajax库
 */
(function() {

	/*
	 * 上传图片base64
	 */
	function uploadBase64(base64, callback) {
		/*$.ajax({
            async: true,
            type:  'POST',
            url: "",
            dataType:'json',
            contentType: "application/json",
            data: {
            	imgBase64:base64
            },
            success: function (json) {
                if(json.status==0){
                	callback && callback(json.url);
                }
            },
            timeout: 0,
            error: function (xhr, errorType, error) {
            	console.log("ajaxErrorType:"+errorType);
            	alert("接口异常");
            }
        });*/

		var json = {
			status: 0,
			url: base64
		}
		if(json.status == 0) {
			callback && callback(json.url);
		}
	}

	window.menuEditAjax = {
		uploadBase64: uploadBase64
	}
})();