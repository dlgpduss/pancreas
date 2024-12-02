(function($){
	$.fn.extend({
		// 시작 - 2014.07.11 topVisualBanner : 수정
		topVisualBanner:function(){
			var banner = {
				initialize : function(_options){
					if( ! $("#topBannerWrap").length ){
						return;
					}
					
					this.ui.button.on("click", $.proxy(this.toggle, this));
					this.ui.button_close.on("click", $.proxy(this.close, this));
					
					var noToday = ui_getCookie("topVisualBanner");
					if( !noToday ){
						this.ui.wrap.show();
						this.ui.button.show();
						
						this.open();
						this.ui.button_noTodayInput.prop("checked", false);
						
						this.ui.banner.bnnrRolling({
							auto : true,
							speed : 4000,
							shown : $.proxy(function($ele){
								var $item     = $ele.closest("li.item");
								var nameMatch = $item.length && $item[0].className.match(/skin(\d+)/);
								var skinNum;
								
								if( nameMatch && nameMatch.length > 1 ){
									skinNum = nameMatch[1];
								}else{
									skinNum = 1;
								}
								
								this.ui.wrap.removeClass("skin1 skin2 skin3 skin4 skin5").addClass("skin"+skinNum);
							}, this)
						});
					}
					
					if(_options.initOpen === false){
						this.ui.wrap.hide();
						this.close();
					}
				},
				
				ui : {
					wrap      : $("#topBannerWrap"),
					banner    : $("#topBnr"),
					button    : $("#topBnrOpen"),
					buttonImg : $("#topBnrOpen img:first"),
					button_close        : $("#topBnrClose"),
					button_noToday      : $("#topBnrClose-notoday"),
					button_noTodayInput : $("#topBnrClose-notoday-checkbox")
				},
				
				toggle : function(e){
					var $ctg   = $(e.currentTarget);
					var isClose = this.ui.buttonImg && this.ui.buttonImg.length &&  this.ui.buttonImg[0].src.indexOf("btn_topOpen") !== -1; 

					isClose ? this.open() : this.close();
					e.preventDefault();
				},
				
				open : function(e){
					var buttonImage = this.ui.buttonImg && this.ui.buttonImg.length && this.ui.buttonImg[0];
					
					if( buttonImage ){
						buttonImage.src = buttonImage.src.replace("btn_topOpen","btn_topClose");
						buttonImage.alt = "CLOSE";
					}
					this.ui.wrap.slideDown();
					e && e.preventDefault();
				},
				
				close : function(e){
					var buttonImage = this.ui.buttonImg && this.ui.buttonImg.length && this.ui.buttonImg[0];
					
					if( buttonImage ){
						buttonImage.src = buttonImage.src.replace("btn_topClose","btn_topOpen");
						buttonImage.alt = "OPEN";
					}
					
					if(this.ui.button_noTodayInput.prop("checked")){
						ui_setCookie('topVisualBanner', 'true', 1, '/', '');
					}
					
					this.ui.wrap.slideUp($.proxy(function(){
						if(this.ui.button_noTodayInput.prop("checked")){
							this.ui.wrap.hide();
							this.ui.button.hide();
						}
					}, this));
					e && e.preventDefault();
				}
			}
			$("body").on("topBanner.init", function(e, falg){
				banner.initialize({ initOpen : falg });
			});
			
			$("body").trigger("topBanner.init", $("#asanMain").length ? true : false );
		},
		// 끝 - 2014.07.11 topVisualBanner : 수정
		
		// GNB
		gnbController:function(opt){
			$("#gnb>ul>li>a").each(function(i,item){
				this.idx = i;
			});

			$("#gnb>ul>li>a").on("mouseover focusin",function(){
				$("#gnb .depth2").hide().eq(this.idx).show();
				// $(".depth2").eq(this.idx).show();
			});

			$("#gnb a").eq($("#gnb a").length-1).on("focusout",function(){
				$("#gnb .depth2").hide();
			});

			$("#headerWrap").on("mouseleave",function(){
				$("#gnb .depth2").hide();
			})
		},
		healthtvSNB:function(){
			var timer;
			
			$("#tvSNB>li>a").on("mouseover focusin",function(e){
				clearTimeout(timer); 
				
				$("#tvSNB .tvCate").hide();
				$(e.currentTarget).next(".tvCate").show();
				$("#tvSNB>li").removeClass().addClass("off");
				$("#tvSNB .tvCateList a").removeClass("on");
				$(e.currentTarget).parent().removeClass().addClass("on");
			});
			$("#tvSNB .tvCateList a").on("mouseover focusin",function(){
				clearTimeout(timer);
				$("#tvSNB .tvCateList a").removeClass("on");
				$(this).addClass("on");
			});
			$("#tvSNB").on("mouseleave focusout",function(){
				timer = setTimeout(function(){
					$("#tvSNB .tvCate").hide();
					$("#tvSNB>li").removeClass();
				}, 30);
			});
		},
		lnbController:function(dep1,dep2){

			var o = {dep1:dep1,dep2:dep2,mOver:false};

			// 珥덇린�ㅼ젙
			$("#lnb .depth1>li>a").each(function(i){ // ���몃뜳���ｊ린(李얠븘)
				this.idx = i;
			});

			// �⑥닔�ㅼ젙

			var lnbUiOn = function(Aobj){
				var Aobj = Aobj;
				$("#lnb .depth1>li").removeClass("current");
				$(Aobj).parent().addClass("current");
				$("#lnb .depth2").hide();
				if( $(Aobj).next(".depth2").length ){
					$(Aobj).next(".depth2").show();
				};
			}

			var resetUiOn = function(){
				//$("#lnb li").removeClass("current");
				$("#lnb .depth2").hide();

				$("#lnb .depth1>li").eq(o.dep1).addClass("current");
				if( $("#lnb .depth1>li").eq(o.dep1).find(".depth2").length ){
					$("#lnb .depth1>li").eq(o.dep1).find(".depth2").show();
					$("#lnb .depth1>li").eq(o.dep1).find(".depth2 li").eq(o.dep2).addClass("current");
				};
			};


			// �대깽��異붽�.
			$("#lnb .depth1>li>a").each(function(){
				if( $(this).next(".depth2").length ){ // 留뚯빟 ���놁뿉 depth2媛��덈떎硫�
					this.onclick = function(){return false;} // ��留곹겕��臾댁떆�쒕떎.
				};
			});

			$("#lnb .depth1>li>a").on("click",function(){
				lnbUiOn(this);
			});

			/*$("#lnb .depth2 a").on("mouseover focusin",function(){
				$("#lnb .depth2 li").removeClass("current");
				$(this).parent().addClass("current");
			});

			$("#lnb .depth2 a").on("mouseout focusout",function(){
				$("#lnb .depth2 li").removeClass("current");
			});*/

			$("#innerContent>div").on("mouseleave",function(){
				o.mOver = false;
				setTimeout(function(){
					if(!o.mOver){
						resetUiOn();
					};
				},1000);
			});
			$("#content").on("mouseenter",function(){
				o.mOver = false;
				setTimeout(function(){
					if(!o.mOver){
						resetUiOn();
					};
				},1000);
			});
			$("#lnb").on("mouseenter",function(){
				o.mOver = true;
			});


			resetUiOn();
		},

		/* edit 20140612 :: �⑥닔媛��꾩쟾��諛붾��덉뒿�덈떎. �щ컲���꾩슂�⑸땲�� :: START */
		docInfoPhotoWrapCarousel:function(){ // �섎즺吏��뚭컻�곸뿭 Carousel
			if($(".photoWrap").length){
				var photoList = $(".photoWrap .area_con ul");
				var listItem = photoList.find("li");
				var listWidth = listItem.width();
				var listLen = listItem.size();
				var listIndex = 1;
				var current = 1;
				var movement = true;

				var indCtrl = $(".photoWrap .ban_ctrl>span");
					indCtrl.find(">button").remove();

					listItem.each(function() {
						indCtrl.append("<button type='button'><img alt='on' src='/asan/images/btn/btn_indicator_off.png' alt=''></button>")
					});

				/* edit 20140613 :: �ㅻ쪟 �섏젙�섏뿀�듬땲�� :: START */
				var ctrlBtn = indCtrl.find(">button");

					ctrlBtn.each(function(k) {

						ctrlBtn.eq(k).on("mouseenter focusin",function() {
							movement = false;
							listIndex = current;
						});

						ctrlBtn.eq(k).on("mouseleave focusout",function() {
							movement = true;
							current = listIndex;
						});

						ctrlBtn.eq(k).on("click",function() {

							//btn on,off
							var allBtnImg = ctrlBtn.find(">img");
							var allBtnImgSrc = allBtnImg.attr("src").replace("_on.png","_off.png");
								allBtnImg.attr("src",allBtnImgSrc);

							var thisBtnImg = $(this).find(">img");
							var thisBtnImgSrc = thisBtnImg.attr("src").replace("_off.png","_on.png");
								thisBtnImg.attr("src",thisBtnImgSrc);

							//animate
							listIndex = $(this).index();
							photoList.stop().animate({
								"marginLeft" : "-"+listWidth*listIndex+"px"
							},500,"easeInQuart");
						});
					})
					/* edit 20140613 :: �ㅻ쪟 �섏젙�섏뿀�듬땲�� :: END */

					ctrlBtn.first().click();


				var btnStop = $(".photoWrap .ban_ctrl span + button");
					btnStop.on("click",function() {
						movement = false;
					});
				var btnPlay = $(".photoWrap .ban_ctrl span + button + button");
					btnPlay.on("click",function() {
						movement = true;
					});


				var autoMove = setInterval(
									function() {

										if(movement == true) {

											if(current == listLen) {
												current = 1;
											} else {
												current++;
											}

											ctrlBtn.eq(current-1).click();
										};

									}
								,5000)

			}
		},
		
		footerBannerCarousel:function(){
			$("#footerBannerCarouselCase").carousel({
				create:function(){
					footerBannerCarouselImg();
				},
				viewitem:5,
				moveitem:1,
				interval:false,
				moveEnd:function(){
					footerBannerCarouselImg();
				},
				prevBtn:$("#footerCarouselPrevCr"),
				nextBtn:$("#footerCarouselNextCr"),
			});
			
			var $wrap    = $("#footerBannerCarouselCase"),
				$auto    = $("#footerCarouselPlayCr"),
				$stop    = $("#footerCarouselStopCr"),
				$nextBnt = $("#footerCarouselNextCr"),
				auto = false,
				timer;
			
			$auto.on("click", function(e){ auto = true; });
			$stop.on("click", function(e){ auto = false; });
			
			timer = setInterval(function(){
				auto && $nextBnt.trigger('click');
			}, 1000);
			
			function footerBannerCarouselImg(){
				$("#footerBannerCarouselCase img").each(function(){ $(this).attr("offsrc",this.src); });
				$("#footerBannerCarouselCase a").on("mouseenter focus",function(){
					var img = $(this).find("img").get(0);
					img.src = $(img).attr("oversrc");
				});
				$("#footerBannerCarouselCase a").on("mouseleave blur",function(){
					var img = $(this).find("img").get(0);
					img.src = $(img).attr("offsrc");
				});
			}
		},
		
		facilitiesInfo:function(){
			function somBoxUi(obj){
				var obj = obj;
				$("#somBoxImg").attr("src",$(obj).find("img").attr("src"));
				$("#somBoxUl li").removeClass("on");
				$(obj).parent().addClass("on");
			};
			$("#somBoxUl a").on("mouseover focusin",function(){
				somBoxUi(this);
			});
			somBoxUi($("#somBoxUl a").eq(0));
		},
		docMetierList:function(){
			$("li.lineLast a.whiteMdBtn,.rightBtn a.whiteMdBtn2, li.lineLast a.greenMdBtn").each(function(){
				var wBtn = $(this);
				$(wBtn).on("mouseover focusin",function(){
					$(wBtn).next(".list_wrap").show();
				});
				$(wBtn).parent().on("mouseleave",function(){
					$(wBtn).next(".list_wrap").hide();
				});
			});
			$("li.lineLast .list_wrap").each(function(){
				var list_wrap = $(this);
				$(this).find("a").last().on("focusout",function(){
					list_wrap.hide();
				});
			});
			$("li.lineLast .list_wrap").on("mouseleave",function(){
				$(this).hide();
			});
		},
		/* add 20140612 :: �⑥닔媛�異붽��섏뿀�듬땲�� 諛섏쁺 �꾩슂�⑸땲�� :: START */
		restListWalkCourse:function() {
			if($(".inforVisualWrap").length){

				//�ы넗媛ㅻ윭由��⑤━癒쇳듃 蹂�닔
				var photoList = $(".inforVisualWrap ul.inforVUL");
				var photoItem = photoList.find("li");
				var photoWidth = $(".inforVisualWrap").width();

				//�띿뒪���⑤━癒쇳듃 蹂�닔
				var textList = $(".inforVisualWrap .visualTextBox ul");
				var textItem = textList.find("li");
					textItem.hide();
					textItem.first().show();

				//�щ씪�대뵫 諛�Show&Hide瑜��꾪븳 蹂�닔 �좎뼵
				var listLen = photoItem.size();
				var listIndex = 1;
				var current = 1;
				var movement = true;

				//�ъ쭊媛�닔���곕Ⅸ �볦씠 蹂�꼍
				photoList.css({"width":photoWidth*listLen+"px"})

				//Indicator �명똿
				var indCtrl = $(".inforVisualWrap .visualBtnWrap ul.visualBtnBox");
					indCtrl.find(">li").remove();

					photoItem.each(function() {
						indCtrl.append("<li><a href='javascript:void(0)'><img alt='' src='/asan/images/infor/rest_btnOff.png'></a></li>")
					});


				/* edit 20140613 :: �ㅻ쪟 �섏젙�섏뿀�듬땲�� :: START */
				var ctrlBtn = indCtrl.find(">li");

					ctrlBtn.each(function(k) {

						ctrlBtn.eq(k).find(">a").on("mouseenter focusin",function() {
							movement = false;
							listIndex = current;
						});

						ctrlBtn.eq(k).find(">a").on("mouseleave focusout",function() {
							movement = true;
							current = listIndex;
						});

						ctrlBtn.eq(k).find(">a").on("click",function() {

							//btn on,off
							var allBtnImg = ctrlBtn.find(">a").find(">img");
							var allBtnImgSrc = allBtnImg.attr("src").replace("On.png","Off.png");
								allBtnImg.attr("src",allBtnImgSrc);

							var thisBtnImg = $(this).find(">img");
							var thisBtnImgSrc = thisBtnImg.attr("src").replace("Off.png","On.png");
								thisBtnImg.attr("src",thisBtnImgSrc);

							//photo animate
							listIndex = $(this).parent().index();
							photoList.stop().animate({
								"marginLeft" : "-"+photoWidth*listIndex+"px"
							},400,"easeInQuart");

							//txt show&hide
							textItem.hide();
							textItem.eq(listIndex).show();
						})
					})
					/* edit 20140613 :: �ㅻ쪟 �섏젙�섏뿀�듬땲�� :: END */

					ctrlBtn.find(">a").first().click();

				//Play&Stop 踰꾪듉
				var btnStop = $(".inforVisualWrap a.pause");
					btnStop.on("click",function() {
						movement = false;
					});
				var btnPlay = $(".inforVisualWrap a.play");
					btnPlay.on("click",function() {
						movement = true;
					});

				//�먮룞濡ㅻ쭅 �명똿
				var autoMove = setInterval(
									function() {

										if(movement == true) {

											if(current == listLen) {
												current = 1;
											} else {
												current++;
											}

											ctrlBtn.eq(current-1).find(">a").click();
										};

									}
								,4000)

			}
		},
		restListShowroom:function() {
			if($(".restIndWrap").length){
				var photoList = $(".restIndWrap ul.restInd");
				var listItem = photoList.find("li");
				var listWidth = $(".restIndWrap").width();
				var listLen = listItem.size();
				var listIndex = 1;
				var current = 1;
				var movement = true;

					photoList.css({"width": 1000 })

				var indCtrl = $(".restIndWrap span.indicator");
					indCtrl.find(">a").remove();

					listItem.each(function() {
						indCtrl.append("<a href='javascript:void(0)'><img alt='' src='/asan/images/infor/rest_btnOff.png'></a>")
					});

				/* edit 20140613 :: �ㅻ쪟 �섏젙�섏뿀�듬땲�� :: START */
				var ctrlBtn = indCtrl.find(">a");

					ctrlBtn.each(function(k) {
						ctrlBtn.eq(k).on("mouseenter focusin",function() {
							movement = false;
							listIndex = current;
						});

						ctrlBtn.eq(k).on("mouseleave focusout",function() {
							movement = true;
							current = listIndex;
						});

						ctrlBtn.eq(k).on("click",function() {

							//btn on,off
							var allBtnImg = ctrlBtn.find(">img");
							var allBtnImgSrc = allBtnImg.attr("src").replace("On.png","Off.png");
								allBtnImg.attr("src",allBtnImgSrc);

							var thisBtnImg = $(this).find(">img");
							var thisBtnImgSrc = thisBtnImg.attr("src").replace("Off.png","On.png");
								thisBtnImg.attr("src",thisBtnImgSrc);

							//animate
							listIndex = $(this).index();
							photoList.stop().animate({
								"marginLeft" : "-"+listWidth*listIndex+"px"
							},400,"easeInQuart");
						})
					})
					/* edit 20140613 :: �ㅻ쪟 �섏젙�섏뿀�듬땲�� :: END */

					ctrlBtn.first().click();


				var btnStop = $(".restIndWrap .restBgBar a.pause");
					btnStop.on("click",function() {
						movement = false;
					});
				var btnPlay = $(".restIndWrap .restBgBar a.play");
					btnPlay.on("click",function() {
						movement = true;
					});


				var autoMove = setInterval(
									function() {

										if(movement == true) {

											if(current == listLen) {
												current = 1;
											} else {
												current++;
											}

											ctrlBtn.eq(current-1).click();
										};

									}
								,4000)

			}
		},
		/* add 20140612 :: �⑥닔媛�異붽��섏뿀�듬땲�� 諛섏쁺 �꾩슂�⑸땲�� :: END */

		listTypeSec1_thumail : function(){
			$("div.listTypeSec1.sumYes").each(function(){
				var $list = $(this).find(".leftArea>ul>li");
				
				$list.on("click", "a", function(e){
					var $ctg = $(e.currentTarget);
					
					$list.find(">img:first-child").hide();
					$list.find("span:first-child").removeClass("show");
					
					$ctg.prev("img").show();
					$ctg.find("span:first").addClass("show");
					
					e.preventDefault();
					e.stopPropagation();
				});
				
				$list.eq(0).find("a").trigger("click");
			});
		},

		/* add 20140613 :: �⑥닔媛�異붽��섏뿀�듬땲�� 諛섏쁺 �꾩슂�⑸땲�� :: START */
		mainRolling:function() {
			if($(".mainBannerCarouselWrap").length){
				var photoList = $(".mainBannerCarousel ul");
				var listItem = photoList.find("li");
				var listWidth = listItem.width();
				var listLen = listItem.size();
				var listIndex = 1;
				var current = 1;
				var movement = true;

					photoList.css({"width":listWidth*listLen+"px"})

				var indCtrl = $(".mainBannerCarouselWrap .mainBannerIndiWrap");
					indCtrl.find(">a").remove();

					listItem.each(function() {
						indCtrl.append("<a href='javascript:void(0)'><img alt='' src='/asan/images/index/indiBnrOff.png'></a>&nbsp;")
					});

				var ctrlBtn = indCtrl.find(">a");

					ctrlBtn.each(function(k) {
						ctrlBtn.eq(k).on("mouseenter focusin",function() {
							movement = false;
							listIndex = current;
						});

						ctrlBtn.eq(k).on("mouseleave focusout",function() {
							movement = true;
							current = listIndex;
						});

						ctrlBtn.eq(k).on("click",function() {

							//btn on,off
							var allBtnImg = ctrlBtn.find(">img");
							var allBtnImgSrc = allBtnImg.attr("src").replace("On.png","Off.png");
								allBtnImg.attr("src",allBtnImgSrc);

							var thisBtnImg = $(this).find(">img");
							var thisBtnImgSrc = thisBtnImg.attr("src").replace("Off.png","On.png");
								thisBtnImg.attr("src",thisBtnImgSrc);

							//animate
							listIndex = $(this).index();
							photoList.stop().animate({
								"marginLeft" : "-"+listWidth*listIndex+"px"
							},400,"easeInQuart");
						})
					})

					ctrlBtn.first().click();


				var btnStop = $(".mainBannerCarouselWrap button.stopBtn");
					btnStop.on("click",function() {
						movement = false;
					});
				var btnPlay = $(".mainBannerCarouselWrap button.playBtn");
					btnPlay.on("click",function() {
						movement = true;
					});


				var autoMove = setInterval(
									function() {

										if(movement == true) {

											if(current == listLen) {
												current = 1;
											} else {
												current++;
											}

											ctrlBtn.eq(current-1).click();
										};

									}
								,4000)
			}
		}
		/* add 20140613 :: �⑥닔媛�異붽��섏뿀�듬땲�� 諛섏쁺 �꾩슂�⑸땲�� :: END */

	});



})(jQuery);

jQuery(function(){
$.fn.bnnrRolling = function( _options ){
	return this.each(function(i, n){
		var options = $.extend({}, {
				lists :".list li .thum",
				anchors : ".anchor",
				btnL : ".left", btnR : ".right",
				
				btnStop : ".stop",
				btnAuto : ".auto",
				
				speed : 3000,
				auto : false
			}, _options)

			, $wrap = $(this)
			, $anchors = $wrap.find( options.anchors )
			, $btnL = $wrap.find( options.btnL )
			, $btnR = $wrap.find( options.btnR )
			, $btnStop = $wrap.find( options.btnStop )
			, $btnAuto = $wrap.find( options.btnAuto )
			, $lists = $wrap.find( options.lists )
		
			, active = 0
			, timer
			, auto = ( options.auto ) ? true : false
			, pause = false
			, speed = options.speed;
			
		// event
		$anchors.each(function(i){
			$(this).bind("focus mouseover", function(){
				wrapMouseEnter();
				activeMenu(i);
				return false;
			});
		});

		$btnL.bind("click", btnLClick );
		$btnR.bind("click", btnRClick);
		
		$btnStop.bind("click", btnStopClick );
		$btnAuto.bind("click", btnAutoClick );
		
		// initialize
		$lists.hide();
		show(active);
		
		if( auto ){
			$wrap.bind("mouseenter focusin", wrapMouseEnter );
			$wrap.bind("mouseleave focusout", wrapMouseLeave );
			timerStart();
		}
		
		// function
		function btnLClick(){
			activeMenu("left");
			return false;
		}
		
		function btnRClick(){
			activeMenu("right");
			return false;
		}
		
		function btnStopClick(){ pause = true; }
		function btnAutoClick(){ pause = false;  }
		
		function activeMenu(n){
			if( active === n ) return;
			
			hide( active );

			 if( n == "left" ){			
				active--;
				if( active < 0 ) active = $lists.length - 1;
				
			}else if( n == "right" ){
				active++;
				if( active == $lists.length ) active = 0;
				
			}else if( typeof n === "number" ){
				active = n;
			}
			
			show( active );
		}
		
		// 배너 보이기/감추기 2014.07.11 show함수 수정
		function show( num ){
			$anchors.eq( num ).parent().addClass("current");
			$lists.eq( num ).show();
			
			if( options.shown ){
				options.shown($lists.eq(num));
			}
		}
		
		function hide( num ){
			$lists.eq( num ).hide();
			$anchors.eq( num ).parent().removeClass("current");
		}

		// 자동롤링관련함수
		function timerStart(){
			clearInterval( timer );
			timer = setInterval(function(){
				if( ! pause ) btnRClick();
			}, speed);
		}		
		function wrapMouseEnter(){
			clearInterval( timer );
		}
		function wrapMouseLeave(){
			timerStart();
		}
		
	});
}
});

jQuery(function(){
$.fn.bnnrRolling3 = function( _options ){
	return this.each(function(i, n){
		var  options = jQuery.extend({}, {
				listWrap : ".listWrap", list : ".list",  lis :".list li" , btnL : ".left", btnR : ".right", 
				btnAuto : ".auto", btnPause : ".auto",
				anchors : ".anchors button",
				
				speed : 3000, auto : true, motionSpeed : 300,
				callback : function(){}
			}, _options)
		
			, $wrap = $(this)
			, $btnL = $wrap.find( options.btnL )
			, $btnR = $wrap.find( options.btnR )
			, $btnAuto = $wrap.find( options.btnAuto )
			, $btnPause = $wrap.find( options.btnPause )
			, $anchors = $wrap.find( options.anchors )
			, $listWrap = $wrap.find( options.listWrap )
			, $list = $wrap.find( options.list )
			, $lis = $wrap.find( options.lis )
			
			, listsWidth = $lis.eq(0).width() + (parseFloat( $lis.eq(0).css("marginRight") ) || 0)
			, visibleLisCnt = Math.ceil( $listWrap.width() / listsWidth )
			, doing = false
			
			, auto = ( options.auto ) ? true : false
			, pause = false
			, speed = options.speed

			, dir = "right"
			, oldActive = visibleLisCnt
			, timer
			
			, callback = options.callback;
		
		// 롤링갯수가 부족하면 멈춤
		if( $lis.length <= visibleLisCnt ) return false;

		// 리스트 앞뒤로 목록 붙여넣기
		$list.append( $lis.filter(":lt("+visibleLisCnt+")").clone() );
		$list.prepend( $lis.filter(":gt("+($lis.length-1-visibleLisCnt)+")").clone() );
		$lis = $wrap.find( options.lis );

		// 초기 위치 잡기
		$list.css("left", -listsWidth * visibleLisCnt);

		// event
		$btnL.bind("click", onBtnLClick );
		$btnR.bind("click", onBtnRClick);
		$btnAuto.bind("click", onBtnAutoClick );
		$btnPause.bind("click", onBtnPauseClick );
		$anchors.bind("click", onAnchorsClick ).eq(0).addClass("current");
					
		if( auto ){
			$wrap.bind("mouseenter focusin", onWrapMouseEnter );
			$wrap.bind("mouseleave focusout", onWrapMouseLeave );
			onStart();
		}
		
		function onBtnAutoClick(e){
			pause = false;
			e.preventDefault();
		}
		
		function onBtnPauseClick(e){
			pause = true;
			e.preventDefault();
		}

		function onBtnRClick(){
			if( doing ) return false;
			dir = "right";
			unActiveAnchor( oldActive );
			oldActive++; onChange();
			return false;
		}
		function onBtnLClick(){
			if( doing ) return false;
			dir = "left";
			unActiveAnchor( oldActive );
			oldActive--; onChange();
			return false;
		}
		function onAnchorsClick(e){
			unActiveAnchor( oldActive );
			var n = $anchors.index( this ) + visibleLisCnt;
			onChange( n );
			
			e && e.preventDefault();
		}

		function onWrapMouseEnter(){ onStop(); }
		function onWrapMouseLeave(){ onStart(); }

		function onChange( n ){
			if( n ) oldActive = n;
			
			ActiveAnchor( oldActive );

			doing = true;
			
			$listWrap.scrollTop(0);
			$listWrap.scrollLeft(0);
			$list.stop(true).animate({"left" : -oldActive * listsWidth}, options.motionSpeed, function(){
				if( oldActive >= $lis.length - visibleLisCnt ){
					$list.css("left", -listsWidth * visibleLisCnt);
					oldActive = visibleLisCnt;
					
				}else if( oldActive <= 0 ){
					$list.css("left", ($lis.length - visibleLisCnt*2) * -listsWidth);
					oldActive = $lis.length - visibleLisCnt*2;
				}
				doing = false;
				callback.apply( $wrap[0], [$lis.eq(oldActive), oldActive] );
			});
		}

		function onStart(){
			clearInterval( timer );
			timer = setInterval(function(){
				if( ! pause ){
					( dir == "right") ? onBtnRClick() : onBtnLClick();
				}
			}, speed);
		}
		function onStop(){ clearInterval( timer ); }
		
		function ActiveAnchor(index){
			index = index - visibleLisCnt;
			if( index >= $anchors.length ) index = 0;
			$anchors.eq(index).addClass("current");
		}
		function unActiveAnchor(index){
			index = index - visibleLisCnt;
			if( index >= $anchors.length ) index = 0;
			$anchors.eq(index).removeClass("current");
		}
	});
}
});

$.fn.tabList = function( opts ){
	return this.each(function(){
		
		var options = $.extend({}, $.fn.tabList.defaults, opts)
			, $btns = $(".tab", this)
			, oldActive = null;

		$btns.filter(function(i, n){			
			$(this.hash).hide();
			$(this).bind("click", onChange);
			$(this).bind("mouseover", onChange);
		});

		// tab initialize
		$btns.eq( options.active ).trigger("click");
		
		function onChange(){
			var isAnchor = /^#/.test( $(this).attr("href") );	
					
			if( isAnchor ){	
				hide( oldActive );
				show( this );
				oldActive = this;
				
				return false;	
			}
		}
		
		function show( ele ){
			$(ele.hash).show();
			$(ele).parent().addClass("current");
			imgOn( ele.getElementsByTagName("img")[0] );	
		}
		
		function hide( ele ){
			if( ! ele ) return false;
			$(ele.hash).hide();
			$(ele).parent().removeClass("current");
			imgOff( ele.getElementsByTagName("img")[0] );
		}
		
		function imgOn(img){ if( img ) img.src = img.src.replace("_off", "_on"); }
		function imgOff(img){ if( img ) img.src = img.src.replace("_on", "_off"); }
		
	});
};
$.fn.tabList.defaults = {
	active : 0
}

//협력기관_add 20140729
$.fn.tabList2 = function( opts ){
	return this.each(function(){
		
		var options = $.extend({}, $.fn.tabList2.defaults, opts)
			, $btns = $(".tab", this)
			, oldActive = null;

		$btns.filter(function(i, n){			
			$(this.hash).hide();
			$(this).bind("click", onChange);
			//$(this).bind("mouseover", onChange);
		});

		// tab initialize
		$btns.eq( options.active ).trigger("click");
		
		function onChange(){
			var isAnchor = /^#/.test( $(this).attr("href") );	
					
			if( isAnchor ){	
				hide( oldActive );
				show( this );
				oldActive = this;
				
				return false;	
			}
		}
		
		function show( ele ){
			$(ele.hash).show();
			$(ele).parent().addClass("current");
			imgOn( ele.getElementsByTagName("img")[0] );	
		}
		
		function hide( ele ){
			if( ! ele ) return false;
			$(ele.hash).hide();
			$(ele).parent().removeClass("current");
			imgOff( ele.getElementsByTagName("img")[0] );
		}
		
		function imgOn(img){ if( img ) img.src = img.src.replace("_off", "_on"); }
		function imgOff(img){ if( img ) img.src = img.src.replace("_on", "_off"); }
		
	});
};
$.fn.tabList2.defaults = {
	active : 0
}

// �ㅽ뻾遺�텇
jQuery(function(){

	if($('#topBnr ul.list li').length > 0) {
		$({}).topVisualBanner();
	}

	// GNB 而⑦듃濡ㅻ윭 UI
	$("#gnb").gnbController();

	// Footer 踰좊꼫�곸뿭 罹먮씪��
	$.fn.footerBannerCarousel();

	// 嫄닿컯TV�꾩슜 �쒕툕UI
	if($("#tvSNB").length){
		$("#tvSNB").healthtvSNB();
	};

	// �섎즺吏��뚭컻 Carousel
	$.fn.docInfoPhotoWrapCarousel();

	// 蹂묒썝�뚭컻 > �쒖꽕�덈궡
	if($("#somBoxUl").length){
		$.fn.facilitiesInfo();
	};

	// �섎즺吏꾩냼媛��붾낫湲��덉씠��
	if($("li.lineLast .list_wrap,.rightBtn a.whiteMdBtn2").length){
		$.fn.docMetierList();
	}

	/* add 20140612 :: �⑥닔媛�異붽��섏뿀�듬땲�� 諛섏쁺 �꾩슂�⑸땲�� :: START */
	// �꾩궛蹂묒썝 �곗콉肄붿뒪 [異붽� 2014.06.12]
	$.fn.restListWalkCourse();

	// �꾩궛湲곕뀗�꾩떆���좉� 1痢� [異붽� 2014.06.12]
	$.fn.restListShowroom();
	/* add 20140612 :: �⑥닔媛�異붽��섏뿀�듬땲�� 諛섏쁺 �꾩슂�⑸땲�� :: END */

	/* add 20140612 :: �⑥닔媛�異붽��섏뿀�듬땲�� 諛섏쁺 �꾩슂�⑸땲�� :: START */
	// 硫붿씤 濡ㅻ쭅 [異붽� 2014.06.13]
	$.fn.mainRolling();
	/* add 20140612 :: �⑥닔媛�異붽��섏뿀�듬땲�� 諛섏쁺 �꾩슂�⑸땲�� :: END */
	
	if($("div.listTypeSec1.sumYes").length){
		$.fn.listTypeSec1_thumail();
	};
	$.fn.mainRolling();
});
