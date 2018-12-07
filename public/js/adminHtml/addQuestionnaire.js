var questionnaireData;
var researchId = 1;
var API_URL = document.location.origin + '/jz-rjs-web/v1';
$(function() {

	quesFuncs.pageInit();

	//添加单选题
	$(".single-choice").on("click", function() {
		//其他题目完成编辑
		quesFuncs.batchFinishEdit($("#questionnaires .one-ques"));
		
		var $_quesTypeClone = $("#ques-clone").find(".single-choice-type").clone();

		var timeNumber = (new Date()).getTime();
		$_quesTypeClone.find(":radio").attr("name", timeNumber);

		quesFuncs.windowScrollTopTo($(document).height(), 10);
		$("#questionnaires").append($_quesTypeClone);
		quesFuncs.resetQuesNumber();
	});

	//添加多选题
	$(".multiple-choice").on("click", function() {
		//其他题目完成编辑
		quesFuncs.batchFinishEdit($("#questionnaires .one-ques"));
		
		var $_quesTypeClone = $("#ques-clone").find(".multiple-choice-type").clone();

		var timeNumber = (new Date()).getTime();
		$_quesTypeClone.find(":checkbox").attr("name", timeNumber);

		quesFuncs.windowScrollTopTo($(document).height(), 10);
		$("#questionnaires").append($_quesTypeClone);
		quesFuncs.resetQuesNumber();
	});

	//添加问答
	$(".essay").on("click", function() {
		//其他题目完成编辑
		quesFuncs.batchFinishEdit($("#questionnaires .one-ques"));
		
		var $_quesTypeClone = $("#ques-clone").find(".essay-type").clone();
		quesFuncs.windowScrollTopTo($(document).height(), 10);
		$("#questionnaires").append($_quesTypeClone);
		quesFuncs.resetQuesNumber();
	});

	//鼠标移入、移出问卷题目，出现操作按钮
	$("#questionnaires").on("mouseover", ".one-ques", function() {
		$(this).find(".action-box").show();
	});

	$("#questionnaires").on("mouseleave", ".one-ques", function() {
		$(this).find(".action-box").hide();
	});

	//题目操作-- 完成
	$("#questionnaires").on("click", ".complete-ques", function() {
		var $_thisQues = $(this).parents(".one-ques");
		
		if(quesFuncs.checkQuesFinish($_thisQues)){
			$_thisQues.find(".ques-edit-body").hide()
			$(this).addClass("yingcang");
			$(this).siblings(".edit-ques").removeClass("yingcang");
		}
		
	});

	//题目操作-- 编辑
	$("#questionnaires").on("click", ".edit-ques", function() {
		var $_thisQues = $(this).parents(".one-ques");
		
		//其他题目完成编辑
		quesFuncs.batchFinishEdit($_thisQues.siblings(".one-ques"));
		
		$_thisQues.find(".ques-edit-body").show();
		$(this).addClass("yingcang");
		$(this).siblings(".complete-ques").removeClass("yingcang");
	});

	//题目操作-- 复制
	$("#questionnaires").on("click", ".copy-ques", function() {
		var $_thisQues = $(this).parents(".one-ques");
		var $_thisQuesClone = $(this).parents(".one-ques").clone();
		
		//其他题目完成编辑
		quesFuncs.batchFinishEdit($("#questionnaires .one-ques"));
		
		
		$_thisQues.after($_thisQuesClone);
		quesFuncs.resetQuesNumber();
	});

	//题目操作-- 删除
	$("#questionnaires").on("click", ".remove-ques", function() {
		var $_thisQues = $(this).parents(".one-ques");
		$_thisQues.attr("class", "one-ques").addClass("remove-animate");
		setTimeout(function() {
			$_thisQues.remove();
			quesFuncs.resetQuesNumber();
		}, 250)
	});

	//题目操作-- 上移
	$("#questionnaires").on("click", ".up-ques", function() {
		var $_thisQues = $(this).parents(".one-ques");
		$_thisQues.attr("class", "one-ques").addClass("up-animate");
		$_thisQues.prev().before($_thisQues);
		quesFuncs.resetQuesNumber();
	});

	//题目操作-- 下移
	$("#questionnaires").on("click", ".down-ques", function() {
		var $_thisQues = $(this).parents(".one-ques");
		$_thisQues.attr("class", "one-ques").addClass("down-animate");
		$_thisQues.next().after($_thisQues);
		quesFuncs.resetQuesNumber();
	});

	//题目操作-- 最前
	$("#questionnaires").on("click", ".first-ques", function() {
		var $_thisQues = $(this).parents(".one-ques");
		quesFuncs.windowScrollTopTo(0, 10);
		$_thisQues.attr("class", "one-ques").addClass("up-animate");
		$("#questionnaires").prepend($_thisQues);
		quesFuncs.resetQuesNumber();
	});

	//题目操作-- 最后
	$("#questionnaires").on("click", ".last-ques", function() {
		var $_thisQues = $(this).parents(".one-ques");
		quesFuncs.windowScrollTopTo($(document).height(), 10);
		$_thisQues.attr("class", "one-ques").addClass("down-animate");
		$("#questionnaires").append($_thisQues);
		quesFuncs.resetQuesNumber();
	});

	//选项操作 - 添加选项
	$("#questionnaires").on("click", ".add-option", function() {
		var $_thisQues = $(this).parents(".one-ques");
		if($_thisQues.find(".options-items li").length >= 10) {
			alert("最多10个选项");
		} else {
			var $_thisOption = $(this).parents("li");
			var thisIndex = $_thisOption.index();

			var $_editOptionClone = $("#items-clone").find(".select-option-edit").clone();
			$_thisOption.after($_editOptionClone);

			var quesType = $_thisQues.attr("ques-type");
			var $_optionClone;
			if(quesType == "single") {
				$_optionClone = $("#items-clone").find(".single-type-option").clone();
			} else if(quesType == "multiple") {
				$_optionClone = $("#items-clone").find(".multiple-type-option").clone();
			}

			var thisName = $_thisQues.find(".ques-options li").eq(thisIndex).find("input").attr("name");
			$_optionClone.find("input").attr("name", thisName);

			$_thisQues.find(".ques-options li").eq(thisIndex).after($_optionClone);
		}
	});

	//选项操作 - 删除选项
	$("#questionnaires").on("click", ".remove-option", function() {
		var $_thisQues = $(this).parents(".one-ques");
		if($_thisQues.find(".options-items li").length <= 2) {
			alert("最少2个选项");
		} else {
			var $_thisOption = $(this).parents("li");
			var thisIndex = $_thisOption.index();
			$_thisOption.remove();
			$_thisQues.find(".ques-options li").eq(thisIndex).remove();
		}
	});

	//选项操作 - 上移选项
	$("#questionnaires").on("click", ".up-option", function() {
		var $_thisQues = $(this).parents(".one-ques");
		var $_thisEditOption = $(this).parents("li");
		if($_thisEditOption.prev()) {
			var thisIndex = $_thisEditOption.index();
			var $_thisOption = $_thisQues.find(".ques-options li").eq(thisIndex);

			$_thisEditOption.prev().before($_thisEditOption);
			$_thisOption.prev().before($_thisOption);
		}
	});

	//选项操作 - 下移选项
	$("#questionnaires").on("click", ".down-option", function() {
		var $_thisQues = $(this).parents(".one-ques");
		var $_thisEditOption = $(this).parents("li");
		if($_thisEditOption.next()) {
			var thisIndex = $_thisEditOption.index();
			var $_thisOption = $_thisQues.find(".ques-options li").eq(thisIndex);

			$_thisEditOption.next().after($_thisEditOption);
			$_thisOption.next().after($_thisOption);
		}
	});

	//标题修改
	$("#questionnaires").on("input", "textarea.title-edit", function() {
		var inputText = $(this).val();
		var $_titleSpan = $(this).parents(".one-ques").find(".title-text");
		if(inputText.length > 200) {
			inputText = inputText.substr(0, 200);
			$(this).val(inputText);
		}
		$_titleSpan.text(inputText);
	});

	//选项文字修改
	$("#questionnaires").on("input", "textarea.option-edit-textarea", function() {
		var inputText = $(this).val();
		var optionIndex = $(this).parents("li").index();
		var $_thisOptionSpan = $(this).parents(".one-ques").find(".ques-options li").eq(optionIndex).find("span");
		$_thisOptionSpan.text(inputText);
	});

	//修改或添加图片 - 标题图片
	$("#questionnaires").on("change", "input.upload-img-file", function() {
		var _this = this;
		var $_oneQues = $(this).parents(".one-ques");
		var $_editImg = $(this).prev();//编辑区图片对象
		if(quesFuncs.fileCheck(this)){
			quesFuncs.uploadImg(this,function(imgUrl){
				//编辑区标题图片
				$_editImg.attr("src",imgUrl);
				$_editImg.parent().next().show();//显示删除叉叉
				
				//显示区标题图片
				if($_oneQues.find(".quesTitle-img-wrap").length>0){
					$_oneQues.find(".quesTitle-img-wrap img").attr("src",imgUrl);
				}else{
					var $_titleImgClone = $("#items-clone").find(".quesTitle-img-wrap").clone();
					$_titleImgClone.find("img").attr("src",imgUrl);
					$_oneQues.find(".ques-title").append($_titleImgClone);
				}
			});
		}
	});
	
	//修改或添加图片 - 选项图片
	$("#questionnaires").on("change", "input.option-upload-img-file", function() {
		var _this = this;
		var thisIndex = $(this).parents("li").index();//顺序 索引
		
		var $_oneQues = $(this).parents(".one-ques");
		var $_editImg = $(this).prev();//编辑区图片对象
		if(quesFuncs.fileCheck(this)){
			quesFuncs.uploadImg(this,function(imgUrl){
				//编辑区选项图片
				$_editImg.attr("src",imgUrl);
				$_editImg.parent().next().show();//显示删除叉叉
				//显示区选项图片
				var $_showLi = $_oneQues.find(".ques-options li").eq(thisIndex);//显示区对应的选项li
				if($_showLi.find(".option-img-wrap").length>0){
					$_showLi.find(".option-img-wrap img").attr("src",imgUrl);
				}else{
					var $_optionImgClone = $("#items-clone").find(".option-img-wrap").clone();
					$_optionImgClone.find("img").attr("src",imgUrl);
					$_showLi.append($_optionImgClone);
				}
			});
		}
	});
	
	
	//删除图片 - 标题图片
	$("#questionnaires").on("click",".remove-title-img",function(){
		var $_oneQues = $(this).parents(".one-ques");
		var $_editImg = $(this).prev().find("img");//编辑区图片对象
		
		$_editImg.attr("src","../images/add-img3.png");
		$_oneQues.find(".quesTitle-img-wrap").remove();
		$(this).hide();
		
	});
	
	//删除图片 - 选项图片
	$("#questionnaires").on("click",".remove-option-img",function(){
		var thisIndex = $(this).parents("li").index();//顺序 索引
		
		var $_oneQues = $(this).parents(".one-ques");
		var $_editImg = $(this).prev().find("img");//编辑区图片对象
		var $_showLi = $_oneQues.find(".ques-options li").eq(thisIndex);//显示区对应的选项li
		
		$_editImg.attr("src","../images/add-img3.png");
		$_showLi.find(".option-img-wrap").remove();
		$(this).hide();
		
	});

	//预览
	$("#preview-ques").on("click", function() {
		console.log("预览");
		quesFuncs.getQuestionnaireData(function() {
			quesFuncs.createPreview();
		});
	});

	//保存
	$("#save-ques").on("click", function() {
		if(quesFuncs.checkAllQuesHasFinishEdit()){
			quesFuncs.getQuestionnaireData(function() {
				//console.log("保存QuestionnaireData:" + JSON.stringify(questionnaireData));
				//调用保存接口
				quesAjax.ajaxSaveQuestionnaires(questionnaireData,function(){
					alert("保存成功");
				})
			});
		}
	});

});

(function() {
	/*
	 * 页面初始化
	 */
	function pageInit() {
		initQuestionnare(researchId);
	}

	/*
	 * 初始化问卷
	 */
	function initQuestionnare(researchId) {
		quesAjax.getInitData(researchId, function(jsonData) {

			//初始化标题
			$("#ques-title01").text(jsonData.researchName);
			$("#ques-title02").text(jsonData.researchName);

			//初始化题目
			if(jsonData.titleList.length > 0) {

				var $_questionnaires = $("#questionnaires");

				//按照displayOrder 升序排序
				jsonData.titleList.sort(function(a, b) {
					return a.displayOrder - b.displayOrder
				})

				jsonData.titleList.forEach(function(oneQues, index) {
					var titleName = oneQues.titleName;
					var titleType = oneQues.titleType;
					var imgUrl = oneQues.imgUrl;
					if(titleType == 0) {
						//单选题
						var $_oneQuesBoxClone = $("#ques-clone").find(".single-choice-type").clone();
						$_oneQuesBoxClone.removeClass("copy-animate");
						$_oneQuesBoxClone.find(".ques-number").text("Q" + (index + 1)); //题号
						$_oneQuesBoxClone.find(".title-text").text(titleName); //题目标题
						$_oneQuesBoxClone.find(".ques-title-edit textarea").val(titleName); //编辑 - 题目标题

						if(imgUrl) {
							//标题图片
							var $_titleImgClone = $("#items-clone").find(".quesTitle-img-wrap").clone();
							$_titleImgClone.find("img").attr("src", imgUrl);
							$_oneQuesBoxClone.find(".ques-title").append($_titleImgClone);
							//编辑 - 标题图片
							$_oneQuesBoxClone.find(".quesTitle-img-edit img").attr("src", imgUrl);
							$_oneQuesBoxClone.find(".img-wrap-box .remove-img").show();
						}

						//选项
						var optionList = oneQues.optionList;
						//选项按照displayOrder升序排序
						optionList.sort(function(a, b) {
							return a.displayOrder - b.displayOrder
						});
						$_oneQuesBoxClone.find(".ques-options").empty(); //清空选项
						$_oneQuesBoxClone.find(".ques-options-edit ul").empty(); //清空选项 - 编辑的
						var liName = (new Date()).getTime();
						optionList.forEach(function(oneOption, index2) {
							var $_optionLiClone = $("#items-clone").find(".single-type-option").clone(); //选项
							$_optionLiClone.find("input").attr("name", liName); //选项name
							$_optionLiClone.find("span").text(oneOption.optionName); //选项文字

							var $_editOptionLiClone = $("#items-clone").find(".select-option-edit").clone(); //选项 - 编辑
							$_editOptionLiClone.find("textarea").val(oneOption.optionName);

							//选项图片
							if(oneOption.imgUrl) {
								var $_optionImgClone = $("#items-clone").find(".option-img-wrap").clone();
								$_optionImgClone.find("img").attr("src", oneOption.imgUrl);
								$_optionLiClone.append($_optionImgClone);
								
								$_editOptionLiClone.find("img").attr("src", oneOption.imgUrl);
								$_editOptionLiClone.find(".remove-img").show();
							}

							$_oneQuesBoxClone.find(".ques-options").append($_optionLiClone);
							$_oneQuesBoxClone.find(".ques-options-edit ul").append($_editOptionLiClone);
						});

						//隐藏编辑区
						$_oneQuesBoxClone.find(".ques-edit-body").hide();
						$_oneQuesBoxClone.find(".action-box .complete-ques").addClass("yingcang").siblings("span").removeClass("yingcang");

						$_questionnaires.append($_oneQuesBoxClone);
					} else if(titleType == 1) {
						//多选题
						var $_oneQuesBoxClone = $("#ques-clone").find(".multiple-choice-type").clone();
						$_oneQuesBoxClone.removeClass("copy-animate");
						$_oneQuesBoxClone.find(".ques-number").text("Q" + (index + 1)); //题号
						$_oneQuesBoxClone.find(".title-text").text(titleName); //题目标题
						$_oneQuesBoxClone.find(".ques-title-edit textarea").val(titleName); //编辑 - 题目标题

						if(imgUrl) {
							//标题图片
							var $_titleImgClone = $("#items-clone").find(".quesTitle-img-wrap").clone();
							$_titleImgClone.find("img").attr("src", imgUrl);
							$_oneQuesBoxClone.find(".ques-title").append($_titleImgClone);

							//编辑 - 标题图片
							$_oneQuesBoxClone.find(".quesTitle-img-edit img").attr("src", imgUrl);
							$_oneQuesBoxClone.find(".img-wrap-box .remove-img").show();
						}

						//选项
						var optionList = oneQues.optionList;
						//选项按照displayOrder升序排序
						optionList.sort(function(a, b) {
							return a.displayOrder - b.displayOrder
						});
						$_oneQuesBoxClone.find(".ques-options").empty(); //清空选项
						$_oneQuesBoxClone.find(".ques-options-edit ul").empty(); //清空选项 - 编辑的
						var liName = (new Date()).getTime();
						optionList.forEach(function(oneOption, index2) {
							var $_optionLiClone = $("#items-clone").find(".multiple-type-option").clone(); //选项
							$_optionLiClone.find("input").attr("name", liName); //选项name
							$_optionLiClone.find("span").text(oneOption.optionName); //选项文字

							var $_editOptionLiClone = $("#items-clone").find(".select-option-edit").clone(); //选项 - 编辑
							$_editOptionLiClone.find("textarea").val(oneOption.optionName);

							//选项图片
							if(oneOption.imgUrl) {
								var $_optionImgClone = $("#items-clone").find(".option-img-wrap").clone();
								$_optionImgClone.find("img").attr("src", oneOption.imgUrl);
								$_optionLiClone.append($_optionImgClone);

								$_editOptionLiClone.find("img").attr("src", oneOption.imgUrl);
								$_editOptionLiClone.find(".remove-img").show();
							}

							$_oneQuesBoxClone.find(".ques-options").append($_optionLiClone);
							$_oneQuesBoxClone.find(".ques-options-edit ul").append($_editOptionLiClone);
						});

						//隐藏编辑区
						$_oneQuesBoxClone.find(".ques-edit-body").hide();
						$_oneQuesBoxClone.find(".action-box .complete-ques").addClass("yingcang").siblings("span").removeClass("yingcang");

						$_questionnaires.append($_oneQuesBoxClone);
					} else {
						//问答题
						var $_oneQuesBoxClone = $("#ques-clone").find(".essay-type").clone();
						$_oneQuesBoxClone.removeClass("copy-animate");
						$_oneQuesBoxClone.find(".ques-number").text("Q" + (index + 1)); //题号
						$_oneQuesBoxClone.find(".title-text").text(titleName); //题目标题
						$_oneQuesBoxClone.find(".ques-title-edit textarea").val(titleName); //编辑 - 题目标题

						if(imgUrl) {
							//标题图片
							var $_titleImgClone = $("#items-clone").find(".quesTitle-img-wrap").clone();
							$_titleImgClone.find("img").attr("src", imgUrl);
							$_oneQuesBoxClone.find(".ques-title").append($_titleImgClone);

							//编辑 - 标题图片
							$_oneQuesBoxClone.find(".quesTitle-img-edit img").attr("src", imgUrl);
							$_oneQuesBoxClone.find(".img-wrap-box .remove-img").show();
						}

						//隐藏编辑区
						$_oneQuesBoxClone.find(".ques-edit-body").hide();
						$_oneQuesBoxClone.find(".action-box .complete-ques").addClass("yingcang").siblings("span").removeClass("yingcang");

						$_questionnaires.append($_oneQuesBoxClone);
					}
				});
			}

		});
	}

	/*
	 * 生成预览
	 */
	function createPreview() {
		var $_previewBox = $("#preview-box");
		$_previewBox.empty(); //先清空了
		questionnaireData.titleList.forEach(function(oneQues, index) {
			var titleName = oneQues.titleName;
			var titleType = oneQues.titleType;
			var imgUrl = oneQues.imgUrl;
			var optionList = oneQues.optionList;

			if(titleType == 0) {
				//单选
				var $_onePreviewClone = $("#ques-clone").find(".p-single-choice-type").clone();
				$_onePreviewClone.find(".p-ques-number").text("Q" + (index + 1) + ":");
				$_onePreviewClone.find(".p-ques-title").text(titleName);
				if(imgUrl) {
					$_onePreviewClone.find(".p-title-img").show();
					$_onePreviewClone.find(".p-title-img img").attr("src", imgUrl);
				}

				var timeN = (new Date()).getTime();
				optionList.forEach(function(oneOption) {
					var $_liClone = $("#items-clone").find(".p-single-option").clone();
					$_liClone.find("input").attr("name", timeN);
					$_liClone.find("span").text(oneOption.optionName);
					if(oneOption.imgUrl) {
						$_liClone.find(".p-option-img-wrap").show();
						$_liClone.find(".p-option-img-wrap img").attr("src", oneOption.imgUrl);
					}
					$_onePreviewClone.find("ul").append($_liClone);
				});

				$_previewBox.append($_onePreviewClone);
			} else if(titleType == 1) {
				//多选
				var $_onePreviewClone = $("#ques-clone").find(".p-multiple-choice-type").clone();
				$_onePreviewClone.find(".p-ques-number").text("Q" + (index + 1) + ":");
				$_onePreviewClone.find(".p-ques-title").text(titleName);
				if(imgUrl) {
					$_onePreviewClone.find(".p-title-img").show();
					$_onePreviewClone.find(".p-title-img img").attr("src", imgUrl);
				}

				var timeN = (new Date()).getTime();
				optionList.forEach(function(oneOption) {
					var $_liClone = $("#items-clone").find(".p-multiple-option").clone();
					$_liClone.find("input").attr("name", timeN);
					$_liClone.find("span").text(oneOption.optionName);
					if(oneOption.imgUrl) {
						$_liClone.find(".p-option-img-wrap").show();
						$_liClone.find(".p-option-img-wrap img").attr("src", oneOption.imgUrl);
					}
					$_onePreviewClone.find("ul").append($_liClone);
				});

				$_previewBox.append($_onePreviewClone);

			} else {
				//问答
				var $_onePreviewClone = $("#ques-clone").find(".p-essay-choice-type").clone();
				$_onePreviewClone.find(".p-ques-number").text("Q" + (index + 1) + ":");
				$_onePreviewClone.find(".p-ques-title").text(titleName);
				if(imgUrl) {
					$_onePreviewClone.find(".p-title-img").show();
					$_onePreviewClone.find(".p-title-img img").attr("src", imgUrl);
				}

				$_previewBox.append($_onePreviewClone);

			}

		});
	}

	/*
	 * 重置题号
	 */
	function resetQuesNumber() {
		$("#questionnaires").find(".ques-number").each(function(index, number) {
			$(number).text("Q" + (index + 1));
		});
	}

	/*
	 * 生成问卷数据对象
	 * callback 回调
	 */
	function getQuestionnaireData(callback) {
		questionnaireData = {
			researchId: researchId,
			researchName: $("#ques-title01").text(),
			titleList: []
		}
		$("#questionnaires").find(".one-ques").each(function(index, oneQuesElement) {
			var $_oneQues = $(oneQuesElement).find(".ques-body");
			var quesType = $(oneQuesElement).attr("ques-type");
			if(quesType == "single") {
				//单选题
				var oneQuesObj = {
					titleName: $_oneQues.find(".title-text").text(), //题目标题
					titleType: 0, //题目类型
					displayOrder: index + 1, //题目顺序
					imgUrl: "",
					optionList: []
				}

				//标题图片
				if($_oneQues.find(".quesTitle-img-wrap").length > 0) {
					oneQuesObj.imgUrl = $_oneQues.find(".quesTitle-img-wrap img").attr("src");
				} else {
					oneQuesObj.imgUrl = "";
				}

				//选项
				var optionList = [];
				$_oneQues.find(".ques-options li").each(function(option_index, optionElement) {
					var $_option = $(optionElement);
					var optionObj = {
						optionName: $_option.find("span").text(), //选项文字
						displayOrder: option_index + 1 //选项顺序
					}

					//选项图片
					if($_option.find("img").length > 0) {
						optionObj.imgUrl = $_option.find("img").attr("src");
					} else {
						optionObj.imgUrl = "";
					}

					optionList.push(optionObj); //增加选项
				});
				oneQuesObj.optionList = optionList;

				questionnaireData.titleList.push(oneQuesObj); //增加题目
			} else if(quesType == "multiple") {
				//多选
				var oneQuesObj = {
					titleName: $_oneQues.find(".title-text").text(), //题目标题
					titleType: 1, //题目类型
					displayOrder: index + 1, //题目顺序
					imgUrl: "",
					optionList: []
				}

				//标题图片
				if($_oneQues.find(".quesTitle-img-wrap").length > 0) {
					oneQuesObj.imgUrl = $_oneQues.find(".quesTitle-img-wrap img").attr("src");
				} else {
					oneQuesObj.imgUrl = "";
				}

				//选项
				var optionList = [];
				$_oneQues.find(".ques-options li").each(function(option_index, optionElement) {
					var $_option = $(optionElement);
					var optionObj = {
						optionName: $_option.find("span").text(), //选项文字
						displayOrder: option_index + 1 //选项顺序
					}

					//选项图片
					if($_option.find("img").length > 0) {
						optionObj.imgUrl = $_option.find("img").attr("src");
					} else {
						optionObj.imgUrl = "";
					}

					optionList.push(optionObj); //增加选项
				});
				oneQuesObj.optionList = optionList;

				questionnaireData.titleList.push(oneQuesObj); //增加题目
			} else {
				//问答
				var oneQuesObj = {
					titleName: $_oneQues.find(".title-text").text(), //题目标题
					titleType: 2, //题目类型
					displayOrder: index + 1, //题目顺序
					imgUrl: "",
					optionList: []
				}

				//标题图片
				if($_oneQues.find(".quesTitle-img-wrap").length > 0) {
					oneQuesObj.imgUrl = $_oneQues.find(".quesTitle-img-wrap img").attr("src");
				} else {
					oneQuesObj.imgUrl = "";
				}
				questionnaireData.titleList.push(oneQuesObj); //增加题目
			}
		});
		callback && callback();
	}

	/*
	 * 上传图片，返回图片地址
	 * obj:file对象
	 */
	function uploadImg(obj, callback) {
		//TODO  暂时接口
		var files = obj.files;
		var formData = new FormData();
		formData.append("imgFile", files[0]);
		formData.append("degree", 0);
		$.ajax({
			url: API_URL + "/system/uploadImg",
			headers: {
				"rjstoken": "ZjQxZDE0ODYtODdlMy00YzZiLWFhYTQtZGMxNTIzZjNjMzlhXzE0ODA5MDQzMDE3MjY=",
				"uid": "f41d1486-87e3-4c6b-aaa4-dc1523f3c39a"
			},
			type: 'POST',
			dataType: 'json',
			data: formData,
			async: true,
			cache: false,
			processData: false,
			contentType: false,
			global: true,
			success: function(responseStr) {
				if(responseStr.status==0){
//					console.log("上传图片返回：" + JSON.stringify(responseStr));
					callback && callback(responseStr.url);
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
	 * 检查上传图片的大小和格式
	 * target:file对象
	 */
	function fileCheck(target) {
		var fileSize = 0;
		fileSize = target.files[0].size;
		var size = fileSize / 1024;
		if(size > 2000) {
			alert("图片不能大于2M");
			target.value = "";
			return false;
		}
		var name = target.value;
		var fileName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName != "jpg" && fileName != "jpeg" && fileName != "png" && fileName != "gif") {
			alert("请选择图片格式文件上传(jpg,jpeg,png,gif)！");
			target.value = "";
			return false;
		}
		return true;
	}
	
	/*
	 * 判断某个题目完成编辑是否合格
	 * $_oneQues:要判断的问题jquery对象
	 */
	function checkQuesFinish($_oneQues){
		
		//检查标题
		var titleText = $_oneQues.find(".title-text").text();
		console.log("题目长度:"+titleText.trim().length);
		if(titleText.trim().length==0 && $_oneQues.find(".quesTitle-img-wrap").length==0){
			alert("标题没有设置文字或图片内容");
			return false;
		}
		
		//检查选项
		for(var i=0;i<$_oneQues.find(".ques-options li").length;i++){
			var $_thisOptionLi = $_oneQues.find(".ques-options li").eq(i);
			var optionText = $_thisOptionLi.find("span").text();
			if(optionText.trim().length==0 && $_thisOptionLi.find(".option-img-wrap").length==0){
				alert("第"+(i+1)+"个选项没有设置文字或图片内容");
				return false;
			}
		}
		
		return true;
	}
	
	/*
	 * 预览或保存前，判断是否所有题目是否都完成编辑
	 */
	function checkAllQuesHasFinishEdit(){
		//循环遍历每个题目，判断是否完成编辑
		for(var i=0;i<$("#questionnaires .one-ques").length;i++){
			var $_oneQues = $("#questionnaires .one-ques").eq(i);
			if(!$_oneQues.find(".complete-ques").hasClass("yingcang")){
				alert("第"+(i+1)+"道题目没有完成编辑");
				return false;
			}
		}
		
		return true;
		
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
	
	/*
	 * 批量隐藏编辑区，进入编辑状态
	 * $_quesArr:问题的jquery对象数组
	 */
	function batchFinishEdit($_quesArr){
		//TODO
		$_quesArr.each(function(index,oneQues){
			$(oneQues).find(".ques-edit-body").hide();
			var $_completeBtn = $(oneQues).find(".action-box .complete-ques");
			var $_editBtn = $(oneQues).find(".action-box .edit-ques");
			
			$_completeBtn.addClass("yingcang");
			$_editBtn.removeClass("yingcang");
		});
	}

	
	window.quesFuncs = {
		pageInit: pageInit,
		windowScrollTopTo: windowScrollTopTo,
		resetQuesNumber: resetQuesNumber,
		getQuestionnaireData: getQuestionnaireData,
		createPreview: createPreview,
		uploadImg: uploadImg,
		fileCheck:fileCheck,
		checkQuesFinish:checkQuesFinish,
		checkAllQuesHasFinishEdit:checkAllQuesHasFinishEdit,
		batchFinishEdit:batchFinishEdit
	}
})();

//ajax
(function() {
	/*
	 * 获取问卷初始数据
	 * researchId:问卷id
	 */
	function getInitData(researchId, callback) {
		//TODO 接口预留
		/*$.ajax({
            async: true,
            type:  'POST',
            url: "",
            dataType:'json',
            contentType: "application/json",
            data: {
            	researchId:researchId
            },
            success: function (json) {
                
            },
            timeout: 0,
            error: function (xhr, errorType, error) {
            	console.log("ajaxErrorType:"+errorType);
            	alert("接口异常");
            }
        });*/

		var json = {
			"researchId": 111, //调研ID
			"researchName": "记录卡坚实的刻录机奥克兰的骄傲是开了机读卡数据库倒计时", //调研名称
			"titleList": [{
					"titleName": "安徽省去忘记带哦我去减掉我家穷到今晚兄弟", //题目名称
					"titleType": 0, //题目类型 0-单选 1-多选 2-问答
					"imgUrl": "http://desk.fd.zol-img.com.cn/t_s960x600c5/g4/M00/0D/01/Cg-4y1ULoXCII6fEAAeQFx3fsKgAAXCmAPjugYAB5Av166.jpg", //题目图片地址
					"displayOrder": 1, //显示顺序
					"optionList": [{
							"optionName": "偶去我uequoeuqwioueiowque", //选项名称
							"imgUrl": "", //题目图片地址
							"displayOrder": 1 //显示顺序
						}, {
							"optionName": "莫看了没出现了快速的每次开连锁店名称", //选项名称
							"imgUrl": "", //题目图片地址
							"displayOrder": 1 //显示顺序
						}] //选项列表
				}, {
					"titleName": "题目1", //题目名称
					"titleType": 1, //题目类型 0-单选 1-多选 2-问答
					"imgUrl": "", //题目图片地址
					"displayOrder": 3, //显示顺序
					"optionList": [{
							"optionName": "抽点时间课程考试的内存空间的", //选项名称
							"imgUrl": "http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJ1bKxpWIIp3vAAimMffVdTgAALHnQMKJY0ACKZJ164.jpg", //题目图片地址
							"displayOrder": 1 //显示顺序
						}, {
							"optionName": "成都市没开车没事的考虑从", //选项名称
							"imgUrl": "http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/03/ChMkJ1bKxpWIIp3vAAimMffVdTgAALHnQMKJY0ACKZJ164.jpg", //题目图片地址
							"displayOrder": 1 //显示顺序
						}] //选项列表
				}, {
					"titleName": "题目1", //题目名称
					"titleType": 2, //题目类型 0-单选 1-多选 2-问答
					"imgUrl": "http://desk.fd.zol-img.com.cn/t_s960x600c5/g4/M09/02/03/Cg-4zFT9B2-IPgJQAB4zZAOCOtcAAWXKQJS5OsAHjN8414.jpg", //题目图片地址
					"displayOrder": 0, //显示顺序
					"optionList": ""
				}] //题目列表
		}; //问卷对象

		callback && callback(json);

	};
	
	
	/*
	 * 保存接口
	 */
	function ajaxSaveQuestionnaires(dataParam,callback){
		//TODO 预留接口
		/*$.ajax({
            async: true,
            type:  'POST',
            url: "",
            dataType:'json',
            contentType: "application/json",
            data: dataParam,
            success: function (json) {
                if(json.status==0){
                	callback && callback(json);
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
       		"status": "0",
  			"message": "成功"
       }
       if(json.status==0){
        	callback && callback(json);
        }else{
        	alert(json.message);
        }
       
	}
	

	window.quesAjax = {
		getInitData: getInitData,
		ajaxSaveQuestionnaires:ajaxSaveQuestionnaires
	}
})();