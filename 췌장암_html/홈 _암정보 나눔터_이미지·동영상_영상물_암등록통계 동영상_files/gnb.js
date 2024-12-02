

jQuery(document).ready(function(){
	
	
//	var lnb = $("#lnb").offset().top;
	var lnb = $("#lnb").offset();
	$(window).scroll(function() {
	  	var window = $(this).scrollTop();

	    if(lnb <= window) {
	      $("header").addClass("fixed");
	    } else {
	      $("header").removeClass("fixed");
	    }
	})

	
	$(".menu > li > a").attr("href","javascript:void(0)");
	
	$(".menu > li").on("click",function(){
		var inner_menu = $(this).find(".inner-menu");
		$(".menu > li > .inner-menu").each(function(index, item) {
			if (inner_menu[0] != item) {
				$(item).hide();
				$(item).attr("data-display-block-yn", "N");	
			}
		});
		var lnb_bg = $(".lnb_bg");
		var lnb_bg_ht = inner_menu.height();
		lnb_bg.css({"height":lnb_bg_ht+60});
		$(this).siblings().removeClass();
		$(this).removeClass();
		lnb_bg.hide();
		var inner_menu_display = inner_menu.attr("data-display-block-yn");
		if (inner_menu_display == "Y") {
			inner_menu.hide();
			inner_menu.attr("data-display-block-yn", "N");
		} else {
			lnb_bg.show();
			$(this).addClass("active");
			inner_menu.show();
			inner_menu.attr("data-display-block-yn", "Y");
		}
	});
	$(".container").on("click", function() {
		var lnb_bg = $(".lnb_bg");
		lnb_bg.hide();
		$(".menu > li").removeClass();
		$(".menu > li > .inner-menu").each(function(index, item) {
			$(item).hide();
			$(item).attr("data-display-block-yn", "N");	
		});
	});
	$(".menu > li > a").on("focusin",function(){
		var lnb_bg = "<div class='lnb_bg'></div>";
		var lnb_bg_ht = $(this).siblings(".inner-menu").height();
		$(".lnb_bg").remove();
		$("header").prepend(lnb_bg);
		$(".lnb_bg").css({"height":lnb_bg_ht+60});
		$(".menu > li").children(".inner-menu").hide();
		$(this).parent("active");
		$(this).siblings(".inner-menu").css("display","block");
	});
	
		
	//관련사이트
	$(".family_site").on("click",function () {
		$(this).toggleClass("open");
		$(this).children(".family_list").toggleClass('open').slideToggle(300);
        $(this).css("z-index","60").siblings().css("z-index","50").children(".family_list").css("display","none");
    });

	//4개국 언어 소리책
	$(".language_book").on("click",function () {
		$(this).toggleClass("open");
		$(this).children(".book_list").toggleClass('open').slideToggle(300);
		$(this).css("z-index","60").siblings().css("z-index","50").children(".book_list").css("display","none");
	});
	
	//포커스 아웃
	$("#lnb .inner > ul > li:last-child .inner-menu ul:last-child li:last-child a").focusout(function(){
		$(".lnb_bg").removeAttr("style");
		$("#lnb .inner > ul > li").removeClass("active");
		$("#lnb .inner > ul > li:last-child > .inner-menu").attr("data-display-block-yn", "N").removeAttr("style");	
	});
	
	$("#whole-menu #wmb_close").click(function(){
		$(".menu.whole-menu-button").focus();
	});
	
});

$(document).ready(function() {
	
	var fontSize = 1.0;
	
    function resizeWholeMenu() {
        // PC에서만 수행
        if ($(document).width() < 1200)
            return;
                
        var windowHeight = $(window).height();
        var topSpace = $("#lnb").height();

        // 전체 메뉴 크기 설정
        $(".whole-menu").height(windowHeight - topSpace - 1);

        // 서브 메뉴 크기 설정
       // if(isBrowserCheck() != "IE 8"){
       // 	var subMenuWidth = parseFloat(getComputedStyle($(".whole-menu .section-menu").get(0)).width);
       // }else{
       // 	var subMenuWidth = parseFloat($(".whole-menu .section-menu").get(0).currentStyle.width);
       // }
        
       // subMenuWidth /= $(".whole-menu .section-menu .sub-menu").length;
       // subMenuWidth -= 1;
       // $(".whole-menu .section-menu .sub-menu").width(subMenuWidth);
        
       // $(".whole-menu .section-menu .sub-menu").css("height", "");
       // var subMenuHeight = $("header .whole-menu .container").get(0).scrollHeight;
       // if (subMenuHeight > 0)
       //     $(".whole-menu .section-menu .sub-menu").height(subMenuHeight);  
    }

    function toggleWholeMenuSubMenu() {
        // Mobile & Tablet에서만 수행
        if ($(document).width() >= 1200)
            return;

        $(this).parent().toggleClass("actived");
        var status = $(this).parent().hasClass("actived");
        console.log(status);
        if (status) {
        	$(this).children("button").text("하위메뉴가 닫힙니다.");
        } else {
        	$(this).children("button").text("하위메뉴가 열립니다.");
        }
    }

    function toggleWholeMenu() {
        var $whole_menu = $(".whole-menu");

        if ($whole_menu.is(":target")) {
            location.hash = "";
        } else {
            location.hash = "whole-menu";
            resizeWholeMenu();
        }
    }

    function onMenuEnter() {
        // PC에서만 수행
        if ($(document).width() < 1200)
            return;

        // .inner-menu 마크업
        var $inner_menu = $(this).find(".inner-menu");
        if ($inner_menu.length !== 0) {
            $inner_menu.css("display", "block");

            var whole_width = -1;
            var menu_height;

            // 크기 설정
            $inner_menu.find("ul").each(function() {
                this.style.height = "";
                whole_width += 191;
            });
            $inner_menu.width(whole_width);
            whole_width += 2;
            $inner_menu.find("ul").each(function() {
            	this.style.height = $inner_menu.innerHeight() + "px";
            });

            var $pivot = $(".whole-menu .container");
            var translateX = (-whole_width + $inner_menu.parent().width()) / 2;
            
            $inner_menu.get(0).style.left = "";
            
            var left = $inner_menu.offset().left + translateX;
            var leftMin = $pivot.offset().left;
            var right = left + whole_width;
            var rightMax = leftMin + $pivot.width();
            
            // 위치 설정
            if (left < leftMin) {
                $inner_menu.css("left", leftMin);
            } else if (right > rightMax) {
                $inner_menu.css("left", rightMax - whole_width);
            } else {
                $inner_menu.css("left", left);
            }
        }

        // .arrow 마크업
        var $arrow = $(this).find(".header .whole-menu .section-menu .sub-menu .title");
        if ($arrow.length !== 0) {
            $arrow.css("display", "block");

            var translateX = ($(this).width() - $arrow.outerWidth()) / 2;
            $arrow.css("margin-left", translateX);
        }

        // .background 마크업
        var $background = $(".menu-background");
        if ($background.length !== 0) {
            $background.css("display", "block");

            var top = $("header").height();
            var height = $("html").height() - top;
            
            $background.height(height);
        }
    }

    function onMenuLeave() {
        // PC에서만 수행
        if ($(document).width() < 1200)
            return;

        var $inner_menu = $(this).find(".inner-menu");
        if ($inner_menu.length === 0)
        	$inner_menu = $(this).parents(".inner-menu");
        if ($inner_menu.length !== 0) {
            $inner_menu.css("display", "none");
            $inner_menu.css("left", "");
            $inner_menu.css("margin-left", "");
        }

        var $arrow = $inner_menu.siblings(".header .whole-menu .section-menu .sub-menu .title");
        if ($arrow.length !== 0)
            $arrow.css("display", "none");

        var $background = $(".menu-background");
        if ($background.length !== 0)
            $background.css("display", "none");
    }
    
    function openSearchForm() {
    	$(".header .search-form").toggleClass("active");
    }
    
    function restoreFontSize() {
    	fontSize = 1;
    	$("body").css("font-size", "");
    }
    
    function expandFontSize() {
    	fontSize += .1;
    	$("body").css("font-size", fontSize + "em");
    }
    
    function reduceFontSize() {
    	fontSize -= .1;
    	$("body").css("font-size", fontSize + "em");
    }

    function expandInnerMenu() {
    	$(".whole-menu .section-menu .sub-menu .inner-menu ul:nth-child(even)").each(function() {
    		var $even = $(this);
    		var $pair = $(this).prev("ul");
    		var $dest = $even;
    		var size = $pair.children("li").length - $even.children("li").length;
    		
    		if (size < 0) {
    			$dest = $pair;
    			size = -size;
    		}
    		
    		for (var i = 0; i < size; i++)
    			$("<li>")
    				.addClass("show-for-mobile")
    				.addClass("show-for-tablet")
    				.appendTo($dest);
    	});
    }
    
    function goBack() {
    	history.back();
    }
    
    function goSearchCancer(){
    	var keyword = $(this).siblings(".input-search").val();

    	if (keyword.length === 0)
    		return;
    	location.replace("/lay1/program/S1T211C223/cancer/list.do?main_cancer_name=" + encodeURI(keyword));
    }
    
    function onSearchFormKeyPressed(e) {
    	var $button = $(this).siblings(".button-search");
    	
    	if ($button.length === 0)
    		return;
    	if (e.which === 13)
    		$button.get(0).click();
    }
    
    expandInnerMenu();
    resizeWholeMenu();
    $(window).resize(resizeWholeMenu);
    $("header .whole-menu .section-menu .sub-menu .title").click(toggleWholeMenuSubMenu);
    $(".whole-menu-button").click(toggleWholeMenu);
    $(".whole-menu .background").click(toggleWholeMenu);
    $(".header .header-bottom .menu > li").hover(onMenuEnter, onMenuLeave).focusin(onMenuEnter);
    $(".header .header-bottom .menu > li .inner-menu ul:last-child > li:last-child").focusout(onMenuLeave);
    $(".header .header-bottom .searchButton").click(openSearchForm)
    $(".restore-font-size").click(restoreFontSize);
    $(".expand-font-size").click(expandFontSize);
    $(".reduce-font-size").click(reduceFontSize);
    $(".back-button").click(goBack);
    $(".button-search").click(goSearchCancer);
    $(".input-search").keypress(onSearchFormKeyPressed);
});

function isBrowserCheck(){ 
	var agt = navigator.userAgent.toLowerCase(); 
	if (agt.indexOf("chrome") != -1) 
		return 'Chrome'; 
	if (agt.indexOf("opera") != -1) 
		return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) 
		return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) 
		return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) 
		return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) 
		return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) 
		return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) 
		return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) 
		return 'Firefox'; 
	if (agt.indexOf("safari") != -1) 
		return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) 
		return 'SkipStone'; 
	if (agt.indexOf("netscape") != -1) 
		return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) 
		return 'Mozilla'; 
	if (agt.indexOf("msie") != -1) 
	{ 
		// 익스플로러 일 경우 
		var rv = -1; 
		if (navigator.appName == 'Microsoft Internet Explorer') 
		{ 
			var ua = navigator.userAgent; 
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); 
			if (re.exec(ua) != null) 
				rv = parseFloat(RegExp.$1); 
		} 
		return 'IE '+rv; 
	} 
}