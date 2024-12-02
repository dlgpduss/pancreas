$(document).ready(function () {

	//select box
	$box = $(".b-sel-title");
	$box.click(function () {
		$(this).next().toggleClass('on');
	});

	faqListToggle01(); //slideDown FAQ(아코디언 형식 아님)
	function faqListToggle01() {
		$(".bn-list-faq01 .b-title-box").find("a").click(function () {
			if ($(this).parents("li").find(".b-ans-box").is(":hidden")) {
				$(this).parents("li").find(".b-ans-box").slideDown(100);
				$(this).parents(".b-quest-box").addClass("faq-close");
			} else if ($(this).parents("li").find(".b-ans-box").is(":visible")) {
				$(this).parents("li").find(".b-ans-box").slideUp(100);
				$(this).parents(".b-quest-box").removeClass("faq-close");
			}
		});

	}

	faqListToggle02(); //show, hide FAQ(아코디언 형식)
	function faqListToggle02() {
		$(".bn-list-faq02 .b-title-box").find("a").click(function () {
			if ($(this).parents(".b-quest-box").next(".b-ans-box").is(":hidden")) {
				$(".bn-list-faq02").find(".b-ans-box").hide();
				$(this).parents(".b-quest-box").next(".b-ans-box").show();
				$(".b-quest-box").removeClass("active");
				$(this).parents(".b-quest-box").addClass("active");
			} else if ($(this).parents(".b-quest-box").next(".b-ans-box").is(":visible")) {
				$(this).parents(".b-quest-box").next(".b-ans-box").hide();
				$(this).parents(".b-quest-box").removeClass("active");
			}

		});
	}

	//메인 비주얼01-01
	if ($(document).find('.main-visual-box01').length > 0) {
		var mainVi = new App.CarouselModule();
		mainVi.init({
			name: '.main-visual-box01',
			carouselOption: {
				nav: false,
				dots: true,
				loop: true,
				items: 1
			}
		});
	}

	//========================
	//실행 오브젝트 목록
	//========================
	App.BoardCommon.init();
	App.BoardSelectBox.init();
	App.SelectBoxMenu.init();
	App.CampusMap.init();
	App.LnbSlide.init();
	App.TabMenu.init();

	//카드형 이미지 게시판(img01 type02) object-fit : IE대응
	var bnImg01Type01 = new App.ObjectFit();
	bnImg01Type01.init(".bn-list-img01.type01 .b-box01 .b-img-box a");
	
	//카드형 이미지 게시판(img01 type02) object-fit : IE대응
	var bnImg01Type02 = new App.ObjectFit();
	bnImg01Type02.init(".bn-list-img01.type02 .b-box01 .b-img-box a");

	//카드형 이미지 게시판(img01 type02) object-fit : IE대응
	var bnImg01Type03 = new App.ObjectFit();
	bnImg01Type03.init(".bn-list-img01.type03 .b-box01 .b-img-box a");
	
	//인물소개 리스트01(type01, type02, type03) object-fit : IE대응
	var bnPerson01Type01 = new App.ObjectFit();
	bnPerson01Type01.init(".bn-list-person01.type01 .b-wrap > div > div .b-img-box");

	var bnPerson01Type02 = new App.ObjectFit();
	bnPerson01Type02.init(".bn-list-person01.type02 .b-wrap > div > div .b-img-box");

	var bnPerson01Type03 = new App.ObjectFit();
	bnPerson01Type03.init(".bn-list-person01.type03 .b-wrap > div > div .b-img-box");

	//인물소개 리스트02(type01, type02, type03) object-fit : IE대응
	var bnPerson02Type01 = new App.ObjectFit();
	bnPerson02Type01.init(".bn-list-person02.type01 .b-wrap > div > div .b-person-box .b-img-box");

	var bnPerson02Type02 = new App.ObjectFit();
	bnPerson02Type02.init(".bn-list-person02.type02 .b-wrap > div > div .b-person-box .b-img-box");

	var bnPerson02Type03 = new App.ObjectFit();
	bnPerson02Type03.init(".bn-list-person02.type03 .b-wrap > div > div .b-person-box .b-img-box");

	//메인 비주얼(type01, type02, type03) object-fit : IE대응
	if($(document).find('.main-visual-img-box').length > 0){	
		var mainViImg = new App.ObjectFit();
		mainViImg.init(".main-visual-img-box");
	}

});

//==================================================
//Board Common
//==================================================
App.BoardCommon = function () {
	var self;
	return {
		init: function () {
			self = this;

			//게시판 view 모바일 옵션버튼
			$(".b-opt-btn").click(function () {
				$(this).next(".b-opt-box").toggle();
			});

			//인물소개 팝업
			$(".bn-list-person02 .b-person-box").click(function () {
				$(".bn-list-person02 .b-pop-wrap").fadeIn();
				$(".bn-list-person02 .b-pop-bg").fadeIn();
				$("body").css({overflow: "hidden"});
				$(".bn-list-person02 .b-pop-wrap > div > div > div:nth-of-type(2), .bn-list-person02 .b-pop-wrap > div > div").scrollTop("0");
			});

			$(".bn-list-person02 .b-pop-wrap .b-close").click(function () {
				$(".bn-list-person02 .b-pop-wrap").fadeOut();
				$(".bn-list-person02 .b-pop-bg").fadeOut();
				$("body").css({overflow: "auto"});
			});

			$(".bn-list-person02 .b-modify").click(function(e){
				e.stopPropagation();
			});

			// lnb type03 하위 메뉴(depth03)가 있는 lnb에 open 아이콘 추가
			$('.lnb-menu > li').each(function () {
				if ($(this).find('.lnb-depth03').length > 0) {
					$(this).addClass('depth02');
				}
			});
		}
	}
}();

//===================================================
//Board SelectBox
//===================================================
App.BoardSelectBox = function () {
	var self;
	var $box;
	return {
		init: function () {
			self = this;
			$box = $(".b-sel-box");

			$box.each(function () {
				var $thisBox = $(this);
				$thisBox.click(self.onClick);

				$(document).mouseup(function (e) {
					if ($thisBox.has(e.target).length === 0) {
						$thisBox.removeClass("close");
					}
				});
			});

		},
		onClick: function () {
			if ($(this).find("ul").is(":hidden")) {
				$(this).addClass("close");
			} else if ($(this).find("ul").is(":visible")) {
				$(this).removeClass("close");
			}

			$(this).mouseleave(function () {
				$(this).removeClass("close");
			});
		}
	}
}();

//------------------------------------------------------
//Board select box
//------------------------------------------------------
App.SelectBoxMenu = function () {
	var self;
	var $tabSel, $mTab;
	return {
		init: function () {
			self = this;
			$tabSel = $('.sel-category');
			$mTab = $(".b-category01-m");

			var select_name = $('.sel-category').children('option:selected').text();
			$('.sel-category').siblings('label').text(select_name);

			$tabSel.on('change', function () {
				var url = $(this).val();
				if (url) {
					window.location = url; // redirect
				}

				return false;
			});

			$mTab.click(self.onClick);
		},
		onClick: function(){
			$mTab.toggleClass("active");
			$(".sel-category").blur(function(){
				$mTab.removeClass("active");
			});
		}
	}
}();

//------------------------------------------------------
//object-fit(IE)
//------------------------------------------------------  
App.ObjectFit = function(){
	var self;
	return {
		init: function(param){
			if('objectFit' in document.documentElement.style === false) {
				var container = document.querySelectorAll(param);
				for(var i = 0; i < container.length; i++) {
					var imageSource = container[i].querySelector('img').src;
					container[i].querySelector('img').style.display = 'none';
					container[i].style.backgroundSize = 'cover';
					container[i].style.backgroundImage = 'url(' + imageSource + ')';
					container[i].style.backgroundPosition = '50% 0';
				}
			}
		}
	}
};

//======================================================================
//CampusMap
//======================================================================
App.CampusMap = function(){
	var self;

	return {
		init: function(){
			self = this;

			// 인포 영역 열기/닫기
			$('.btn-info').on('click', function() {
				$('.map-info-wrap, .map-view-wrap').toggleClass('close');
			});

			// 팝업 스크롤바
			if($('.map-view-box').length > 0) {
				$('.map-view-box .scrollert').scrollert({
					axes: ['y'], 
					'preventOuterScroll': true
				});             
				$(window).resize(function() {
					$('.map-view-box .scrollert').scrollert('update');  
				});
			}

			// 건물/공간정보 팝업 열기
			$('.map-info-list > ul > li > a').on('click', function() {
				$(this).parent().siblings().removeClass('active');
				$(this).parent().addClass('active');
				self.closePopup01();
				$('.cm-popup-wrap.type01').show();
				$('.map-view-box .scrollert').scrollert('update');
			});

			// 건물/공간정보 팝업 닫기
			$('.cm-popup-wrap.type01 .btn-close').on('click', function() {
				$('.map-info-list > ul > li').removeClass('active');
				self.closePopup01();
			});

			// 건물/공간정보 팝업 내 리스트 열기/닫기
			$('.floor-box > ul > li > a').on('click', function() {
				$(this).parent().toggleClass('active');
				$('.map-view-box .scrollert').scrollert('update');
			});

			// 버스 인포영역 아코디언 열기/닫기
			$('.map-bus-list > ul > li > a').on('click', function() {
				$(this).parent().siblings().removeClass('active');
				$(this).parent().addClass('active');
			});
			$('.map-bus-list > ul > li > ul > li > a').on('click', function() {
				$(this).parent().siblings().removeClass('active');
				$(this).parent().addClass('active');
			});

			// 버스 팝업 열기 : 셔틀 버스
			$('.map-bus-list .route02 li a').on('click', function() {
				self.closePopup02();
				$(this).parent().siblings().removeClass('active');
				$(this).parent().addClass('active');
				$('.cm-popup-wrap.type02').show();
			});

			// 버스 팝업 닫기 : 셔틀 버스
			$('.cm-popup-wrap.type02 .btn-close').on('click', function() {
				self.closePopup02();
			});

			// 버스 팝업 열기 : 주변 정류장
			$('.map-view-box .marker-list').on('click', function() {
				$('.cm-popup-wrap.type03').show();
			});

			// 버스 팝업 닫기 : 주변 정류장
			$('.cm-popup-wrap.type03 .btn-close').on('click', function(e) {
				e.stopPropagation();
				$('.cm-popup-wrap.type03').hide();
			});

			$('.map-bus-list button').on('click', function(e) {
				e.stopPropagation();
			});


		},
		closePopup01: function() {
			$('.cm-popup-wrap.type01').hide();
			$('.floor-box > ul > li').removeClass('active');
		},
		closePopup02: function() {
			$('.cm-popup-wrap.type02').hide();
			$('.map-bus-list .route02 li').removeClass('active');
		}
	}
}();

//-----------------------------------------------------------------------------------------
//Lnb Slide
//-----------------------------------------------------------------------------------------  
App.LnbSlide = function(){
	var self;
	var $lnbDep02;
	return {
		init: function(){
			self = this;
			$lnbDep02 = $(".lnb-menu > li > a");

			$(".lnb-menu > li.active").find(".lnb-depth03").show();

			$lnbDep02.click(self.onClick);        

		},
		onClick: function(){
			if($(this).attr("href") == "#none"){        
				if($(this).parents("li").find(".lnb-depth03").is(":visible")){
					$(this).parents("li").find(".lnb-depth03").slideUp();
					$(this).parent("li").removeClass("active");
					$(this).removeClass("active");
				}else if($(this).parents("li").find(".lnb-depth03").is(":hidden")){
					$(this).parents("li").find(".lnb-depth03").slideDown();
					$(this).parent("li").addClass("active");
					$(this).addClass("active");
				}


				return false;
			}
		}
	}
}();

//------------------------------------------------------
//메뉴 연동 tab 모바일 select box
//------------------------------------------------------
App.TabMenu = function () {
	var self;
	var $tabSel, $mTab;
	return {
		init: function () {
			self = this;
			$tabSel = $('.tab-sel');
			$mTab = $(".m-tab-box");

			var select_name = $tabSel.children('option:selected').text();
			$tabSel.siblings('label').text(select_name);

			$tabSel.on('change', function () {
				var url = $(this).val();
				if (url) {
					window.location = url; // redirect
				}

				return false;
			});

			$mTab.click(self.onClick);
		},
		onClick: function(){
			$mTab.toggleClass("active");
			$tabSel.blur(function(){
				$mTab.removeClass("active");
			});
		}
	}
}();