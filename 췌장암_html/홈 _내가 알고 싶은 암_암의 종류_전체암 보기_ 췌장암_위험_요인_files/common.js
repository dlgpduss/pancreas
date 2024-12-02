var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
$(document).ready(function(){
	
	/* 헤더 검색창 */
	if(!isMobile) {
		
	} else {
		$(".sch").on("click", function(){ /* focusin */  
			if($(".sch_popup").css("display") == "none"){
				$(".sch_popup").fadeIn(300);
			} else {
//				$(".sch_popup").fadeOut();
			}
			$(".sch_popup .s_wrap div input[type='text']").focus();
		});  
		
		$(".close").on("click", function(){  
			if($(".sch_popup").css("display") == "block"){
				$(".sch_popup").fadeOut();
				$(".sch").focus();
			}
		});
		
		$(".dim_layer").on("click", function(){  
			if($(".sch_popup").css("display") == "block"){
				$(".sch_popup").fadeOut();
			} 
		});
	}
	/* 모바일 퀵메뉴 */
	$(".m_quick").on("click", function(){ /* focusin */  
		if($(".quick_popup").css("display") == "none"){
			$(".quick_popup").fadeIn(300);
		} else {
			$(".quick_popup").fadeOut();
		} 
	});

	
	/** 암정보사전 레이어 팝업 외부영역 클릭시 닫히도록 추가  */
	$(".deemed").on("click", function() {
		if($(".layer_popup1").css("display") == "block") {
			$('.layer_popup1').fadeOut(400 , function() {
				$(".layer_popup1 .tit").html("");
				$(".layer_popup1 .desc").html("");        	
	        });
		}
		
		if($(".popup__2").css("display") == "block") {
			$('.popup__2').fadeOut(400 , function() {
				$(".popup__2 .tit").html("");
				$(".popup__2 .desc").html("");        	
	        });
		}
	});
	
	
	/*
	$(".sch").on("click", function(){  focusin 
		if($(".sch_popup").css("display") == "none"){
			$(".sch_popup").fadeIn(300);
		} else {
			$(".sch_popup").fadeOut();
		}
	});
	*/
	
	$(".close").on("click", function(){
		if($(".quick_popup").css("display") == "block"){
			$(".quick_popup").fadeOut();
		}
	});

	$(".dim_layer").on("click", function(){
		if($(".quick_popup").css("display") == "block"){
			$(".quick_popup").fadeOut();
		}
	});

	$(".close").on("click", function(){
		if($(".video_popup").css("display") == "block"){
			$(".video_popup").fadeOut();
			var val = $("#TempYouTubeLink").val();
			$("." + val).siblings("a").focus();
			$("#youtubePlayer").attr("src","");
		}
	});

	$(".dim_layer").on("click", function(){
		if($(".video_popup").css("display") == "block"){
			$(".video_popup").fadeOut();
			var val = $("#TempYouTubeLink").val();
			$("." + val).siblings("a").focus();
			$("#youtubePlayer").attr("src","");
		}
	});
	
	//2020-09-07 지워야함 - 기관요청
	
	//푸터 상태정보 제공
    $( '.family_site>a' ).click( function() {
        if( $( '.family_site' ).hasClass("open") ){
        	$( this ).attr("title","축소됨"); 
     		//$( '.family_site > a' ).attr("title","축소됨"); 
        }else{
        	$( this ).attr("title","확장됨"); 
     	    //$( '.family_site > a' ).attr("title","확장됨"); 
        }
     });
    
  //상단 title 작업
	$(top.document).find("html.ass > head > title").text($("head > title").text());
	
	//챗봇
	$('footer #opener').click(function(){
		$('#chatBot').contents().find('.total_menu a').focus();
	});
	$(top.document).find(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.chatBox_modal_ds.ui-draggable.ui-resizable").removeAttr("tabindex");

	//share

	var $this;

	$(".print_modified button.share").click(function(){

		$(".share-box").attr("tabindex", 0).show().focus();
		$this = $(this);

		$(".share-box > a").click(function(){

			$(".share-box").css("display", "none");

			$(".share").focus();

		});
	});
});


var initBody;
function beforePrint()
{
	initBody = document.body.innerHTML;
	document.body.innerHTML = div_page.innerHTML;
}
function afterPrint()
{
	document.body.innerHTML = initBody;
}
function pageprint()
{
	/*window.onbeforeprint = beforePrint;
	window.onafterprint = afterPrint;*/
	window.print();
}
function searchWord(keyword,_this) {
	$.ajax({
		url : "/inc/searchWorks/search.do",
		data : {"work" : keyword},
		type : "POST",
		success : function(data) {
			if(data != null) {
				console.log(data);
				$(".layer_popup1 .tit").html(data.work);
		        $(".layer_popup1 .desc").html(data.sense);
				$(".layer_popup1").attr("style","display:block");
			} else {
				alert("검색중 오류가 발생하였습니다.");
			}
		}
	});
}

function layer_popup_close(_this) {
    $(_this).closest('.layer_popup1').fadeOut(400 , function() {
		$(".layer_popup1 .tit").html("");
		$(".layer_popup1 .desc").html("");        	
    });
}

function fn_dictionarywokrs() {
	location.href="/lay1/program/S1T523C837/dictionaryworks/list.do";
}


//side menu
$(function(){
	// drawer menu show hide
	var movePs = $("#naviMenu").outerWidth();
	$("#naviMenu").css('right', -1000).hide();

	function navClose() {
		$('#naviMenu').removeClass('open').css('top',0).find('>div').andSelf().css('height',$(window).height());
		//$(".headerCom").removeClass("naviOpen");
		$("html, body").css({'overflow':'auto'});
		$(window).css({'overflow':'auto'});
		$(".wrap").css({'height':'auto', 'overflow':'auto'}).stop().animate({"right": 0}, 200);
		$("#naviMenu").css('top',0).stop().animate({'top':0, "right": -1000}, 200,function(){$(this).hide();});
		$(".dmm").remove();

		if($('#container').find('div').hasClass('lnbWrap')){
			//$('.lnbWrap, .prdList').css({'position':'fixed'});
		} else {
			//$('#lnb, .prdList').css({'position':'fixed'});
		}
	}

	function navOpen() {
		$('#naviMenu').css('top',0).find('>div').andSelf().css('height',$(window).height());
		//$(".headerCom").addClass("naviOpen");
		$("html, body").css({'overflow':'hidden'});
		$(window).css({'overflow':'hidden'});
		$("body").append('<div class="dmm"></div>');
		$(".wrap").css({'height':$(window).height(), 'overflow':'hidden'}).stop().animate({"right": movePs}, 200);
		$("#naviMenu").addClass('open').css('top',0).show().stop().animate({'top':0, "right": 0}, 200);

		if($('#container').find('div').hasClass('lnbWrap')){
			//$('.lnbWrap, .prdList').css({'position':'fixed'});
		} else {
			//$('#lnb, .prdList').css({'position':'absolute'});
		}
		$('.dmm').click(function(){
			navClose();
		});

		setTimeout( gnbPostionSet, 200 );
	}

	function gnbPostionSet()
	{
		var arrTop = [56,133,210,287,364,441];
		var arrTopPos = [0,-75,-150,-225,-300,-375];

		$(".gnb").each( function ( i ) {
			var t = arrTop[i];
			$(this).css("top", t );
			$(this).find("a").css("background-position", "0px " + arrTopPos[i] + "px");
		});
	}

	$(window).resize(function(){
		if($('#naviMenu').hasClass('open')){
			$('#naviMenu').css({'top':0, 'right':0}).find('>div').andSelf().css('height',$(window).height());
		} else {
			$('#naviMenu').css({'top':0, 'right':-1000}).find('>div').andSelf().css('height',$(window).height());
		}
	});


	$(".btnCtg").click(function() {
		navOpen();
	});
	$("#naviMenu .close").click(function() {
		navClose();
	});


	// drawer menu click

	$(".menuCtg .gnb").click(function(){
		$("li").has($(this)).siblings("li").removeClass("on");
		$("li").has($(this)).addClass("on");
	});

	$(".menuCtg span.arrow").click(function(){
		$(this).parent().parent().siblings("li").removeClass("on");
		if ($(this).parent().parent().find("ul").css('display') == 'block') {
			$(this).parent().parent().removeClass("on");
		}else {
			$(this).parent().parent().addClass("on");
		}
	});

	$(".menuCtg .subTit").click(function(){
		$(this).parent().siblings("li").removeClass("on");
		if ($(this).parent().find(".sub").css('display') == 'block') {
			$(this).parent().removeClass("on");
		}else {
			$(this).parent().addClass("on");
		}
	});

	$(".menuCtg .subTit").each(function() {
		if ($(this).parent().find(".sub").length < 1) {
			$(this).parent().addClass("subNo");
		}
	});

	$(".sideMn").addClass("mn1");
	$(".menuCtg .gnb").bind("click", function (e) {
		var i = $("li").has($(this)).index();
		$(".sideMn").attr('class', 'sideMn');
		$(".sideMn").addClass("mn" + i);
	});
	
	//LANGUAGE
	$('.btn_family').click(function () {
		$(this).toggleClass('open');
		$('.familyList').toggleClass('open').slideToggle(300);
	});					

	$('.familyList a').click(function () {
		$(".btn_family").text($(this).text());

		$(this).toggleClass('open');
		$('.familyList').toggleClass('open').slideToggle(300);
	});
	
	//관련사이트
	$('.btn_family2').click(function () {
		$(this).toggleClass('open');
		$('.familyList2').toggleClass('open')
	});					

	$('.familyList2 a').click(function () {
		$(".btn_family2").text($(this).text());

		$(this).toggleClass('open');
		$('.familyList2').toggleClass('open')
	});

	//검색
	$("a.sch_btn").click(function(){
		$(".sch_form").css("display","block");
		$("a.sch_btn").css("display","none");
		$("a.close_btn").css("display","block");
	});
	$("a.close_btn").click(function(){
		$(".sch_form").css("display","none");
		$("a.sch_btn").css("display","block");
		$("a.close_btn").css("display","none");
	});	
	
	// 검색창 라벨 활성화/비활성화
    $(".input-search, .searchInput").on("focusin", function() {
        var $label = $(this).next(".label-search, .searchLabel");
        $label.css("display", "none");
    }).on("focusout", function() {
        var $label = $(this).next(".label-search, .searchLabel");
        if (this.value.length == 0) {
            $label.css("display", "block");
        } else {
            $label.css("display", "none");
        }
    });
});

function ipinCheck_result(page, url, params){
	var loc = location.pathname.split("/");
	var realpath = "";
	jQuery.each(loc, function(i,o){
		if(o != null || o != ''){
			if(i != loc.length - 1){
				realpath += o + "/";
			}
		}
	});
	realpath = realpath.slice(0,-1) +"/" + url + "?" + page + "=" + params;
	location.replace(realpath);
}

function nameCheck_result(page, url, params){
	var loc = location.pathname.split("/");
	var realpath = "";
	jQuery.each(loc, function(i,o){
		if(o != null || o != ''){
			if(i != loc.length - 1){
				realpath += o + "/";
			}
		}
	});
	realpath = realpath.slice(0,-1) +"/" + url + "?" + page + "=" + params;
	location.replace(realpath);
}

function youtubePlayerPopup(youtubeId, index) {
	$("#youtubePlayer").attr("src", "https://www.youtube.com/embed/"+youtubeId);
	$("#TempYouTubeLink").attr("value", youtubeId);
	$(".video_popup").fadeIn(300);
	
	$('.video_popup #youtubePlayer').focus();
};