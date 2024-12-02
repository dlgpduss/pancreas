
function __getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}


// 배너 닫기 닫기도 확인할 것.
$(function(){
	if(location.href.indexOf("/intro.do") != -1) {
	   $("html").addClass("intro-template");
	}
	
	$('.btn-today-hide').click(function (e) {
		if($("#today-close").is(":checked")) {
		   localStorage.setItem("BANNER_"+CMS.siteId, __getToday());
		   console.log("SET: " + "BANNER_"+CMS.siteId, __getToday());
		} else {
			console.log("REMOVE: " + "BANNER_"+CMS.siteId, __getToday());
			localStorage.removeItem("BANNER_"+CMS.siteId);
		}
	});
	// 오늘 날짜로 닫기 설정되어 있는지 확인.
	if(localStorage.getItem("BANNER_"+CMS.siteId) == __getToday()) {
		$('#top-banner').css("display", "none");
	}
});

//검색.
var getSearchSiteID = function() {
	var rtn = {
		"m": "",
		"s": ""
	};
	if(CMS.siteId == "cancer" || CMS.siteId == "sev-heart" || CMS.siteId == "sev-children" || CMS.siteId == "sev-eye" || CMS.siteId == "sev-rehabil" || CMS.siteId == "health") {
		rtn.m = "sev";
		rtn.s = CMS.siteId;
	} else if(CMS.siteId == "gs-hbv" || CMS.siteId == "gs-cancer" || CMS.siteId == "gs-spine" || CMS.siteId == "gs-dent") {
		rtn.m = "gs";
		rtn.s = CMS.siteId;
	} else if(CMS.siteId == "sev-en" || CMS.siteId == "cancer-en" || CMS.siteId == "sev-heart-en" || CMS.siteId == "sev-children-en" || CMS.siteId == "sev-eye-en" || CMS.siteId == "sev-rehabil-en" || CMS.siteId == "health-en") {
		rtn.m = "sev";
		rtn.s = CMS.siteId;
	} else if(CMS.siteId == "gs-en" || CMS.siteId == "gs-hbv-en" || CMS.siteId == "gs-cancer-en" || CMS.siteId == "gs-spine-en" || CMS.siteId == "gs-dent-en") {
		rtn.m = "gs";
		rtn.s = CMS.siteId;
	} else if(CMS.siteId == "medicine-en" || CMS.siteId == "nursing-en" || CMS.siteId == "gsph-en" || CMS.siteId == "dentistry-en") {
		rtn.m = CMS.siteId.substring(0, CMS.siteId.length-3);
		rtn.s = CMS.siteId;
	} else if(CMS.siteId == "fund" || CMS.siteId == "research" || CMS.siteId == "news" || CMS.siteId == "recruit") {
		rtn.m = "yuhs";
	} else {
		rtn.m = CMS.siteId;
	}
	return rtn;
}

var getMenuCD = function() {
	if($("#sh-radio1").prop("checked")) {
		return "&menu_cd=doctor";
	} else if($("#sh-radio2").prop("checked")) {
		return "&menu_cd=department";
	} else if($("#sh-radio3").prop("checked")) {
		return "&menu_cd=professor";
	} else if($("#sh-radio4").prop("checked")) {
		return "&menu_cd=class";
	}
	return "";
}

$(function(){
	$("#sh-radio").prop('checked', true);
	$.ajax({
		url:'/search/r.jsp?m_site_cd=' + getSearchSiteID().m + "&language=" + CMS.locale,
		dataType:'json',
		success:function(data){
			var cd = getSearchSiteID();
			for(var i=0;i<data.length;i++) {
				var h = "keyword=" + encodeURIComponent(data[i]) + "&m_site_cd=" + cd.m + "&language=" + CMS.locale;
				if(CMS.siteId.indexOf("-en") != -1) {
					var item = "<span class='keyword-item text-lg text-normal'><a target='_blank' class='r_k' href='/search-en/result?" + h + "'>#" + data[i] + "</a></span>";
				} else {
					var item = "<span class='keyword-item text-lg text-normal'><a target='_blank' class='r_k' href='/search/result?" + h + "'>#" + data[i] + "</a></span>";
				}
				$("#list_recommend_search").append(item);
			}
		}
	});
	
	$("#btn_search").click(function(){
		if($("#keyword_search").val() == "") return;
		var opt = getMenuCD();
		
		if(CMS.siteId.indexOf("-en") != -1) {
			window.open("/search-en/result?keyword="+encodeURIComponent($("#keyword_search").val())+"&m_site_cd="+getSearchSiteID().m +"&language="+CMS.locale + opt, "_blank");
		} else {
			window.open("/search/result?keyword="+encodeURIComponent($("#keyword_search").val())+"&m_site_cd="+getSearchSiteID().m +"&language="+CMS.locale + opt, "_blank");
		}
	});
	 
	var search_timer = -1;
	$("#keyword_search").keyup(function(event){
		var opt = getMenuCD();
		
		if(search_timer != -1)
			clearTimeout(search_timer);
		if($(this).val() != "") {
			
			if(event.which == 13) {
				$("#btn_search").click();
				return;
			}

			var kw = encodeURIComponent($(this).val());
			search_timer = setTimeout(function(){
				$.ajax({
					url:'/search/a.jsp?m_site_cd=' + getSearchSiteID().m + "&language=" + CMS.locale + "&keyword=" + kw + opt ,
					dataType:'json',
					success:function(data){
						if(data.autocomplete.removeTagList.length > 0) {							
							var html = "";
							for(var i=0;i<data.autocomplete.removeTagList.length;i++) {
								var h = "keyword=" + encodeURIComponent(data.autocomplete.removeTagList[i]) +'&m_site_cd=' + getSearchSiteID().m + "&language=" + CMS.locale + opt;
								html += "<li><a target='_blank' href='/search/result?" + h + "'>" + data.autocomplete.list[i] + "</li>";
								//console.log(data.autocomplete.list[i]);
							}
							$("#auto_wrapper").css("display", "block");
							$("#list_search").html(html);
							//console.log(html);
							//$("#mCSB_1_container").html(html);
							$(".mCSB_container").html(html);
						} else {
							$("#auto_wrapper").css("display", "none");
							$(".mCSB_container").html("");
						}
					}
				});			
			}, 300);
		} else {
			search_timer = setTimeout(function(){
				$("#auto_wrapper").css("display", "none");
				$(".mCSB_container").html("");
			}, 300);
		}
	});
});



window.setTimeout(function(){
	try{lnbSetting();}catch(e){}
}, 100);


// 뭔가 스크롤 이상
$(function(){
	if(location.href.indexOf("/faq/faq.do") != -1 && location.href.indexOf("srCategoryId=238") != -1) {
		window.setTimeout(function(){
			$(".tab-list").css({"transform": "translateX(-402px)"});
		}, 1);
	}
});

$(window).load(function(){
	// 상단 공지 모바일 깨짐 현상 개선
	if( $(".notice-container .bbs-list").length > 0 && $(".notice-container .bbs-list .bbs-item").length > 2 && CMS.device == 'mobile' ) {
		$('.notice-container .bbs-list').slick('refresh');
		
		// notice-container의 자식이 3개 초과일 경우 remove
		var ch = $(".notice-container .bbs-list .bbs-item");
		if(ch.length > 3) {
			for(var i=3;i<ch.length;i++) {
				$(ch[i]).remove();
			}
		}
	}
	
	// 의료진 찾기 셀렉박스 커스텀 스크롤 적용 오류 개선
	if($('.custom-scroll').length > 0) {
		$('.custom-scroll').mCustomScrollbar('destroy');
		$('.custom-scroll').mCustomScrollbar({
			scrollInertia: 300
		});
	}
	
	// 게시판에서 버튼을 사용하지 않을 때 버튼 그룹 전체 삭제
	if($('.b-btn01').length > 0 && !$('.b-btn01 a.btn').length > 0) {
		$('.b-btn01').remove();
	}
	
});

$(function(){
	if(location.href.indexOf("/professor") != -1 || location.href.indexOf("/community") != -1 || location.href.indexOf("/sev-ganho") != -1 || location.href.indexOf("/gs-ganho") != -1 || location.href.indexOf("/gn-ganho") != -1 ) {
		$(".board .container").addClass("type02");
	}
	
	//연세암병원 폐암센터
	if ( location.href.indexOf("/lung-cancer-center.do") != -1 ) {
		console.log(location.href.indexOf("/lung-cancer-center.do"))
		$(".content-header").css('background-image', "url(/_res/yuhs/cancer/img/department/lung-backimgs.jpg)");
		$(".content-title").css("color", "white")
		$(".department-tab-contents").removeClass("container");
		$("#tab-content1").addClass("container");
		$("#tab-content2").addClass("container");
	}
	
	//연세암병원 두경부암센터
	if ( location.href.indexOf("/head-neck-cancer-center.do") != -1 ) {
		console.log(location.href.indexOf("/head-neck-cancer-center.do"))
		$(".content-header").css('background-image', "url(/_res/yuhs/sev/img/department/bg-department-header.jpg)");
		$(".content-title").css("color", "#333")
		$(".department-tab-contents").removeClass("container");
		$("#tab-content1").addClass("container");
		$("#tab-content2").addClass("container");
	}
	
	
	// notice-container에 6개 초과 자식이 있으면 remove
	$(".notice-container").css("display", "block");
	var ch = $(".notice-container .bbs-list").children();
	if(ch.length > 3) {
		for(var i=3;i<ch.length;i++) {
			$(ch[i]).remove();
		}
	}
	

	// 더보기 버튼이 있으면 상세보기 파라미터를 바꾼다.
	// 목록으로 돌아올때 게시물 갯수를 유지하기 위해서..
	if($("#btnMoreArticle").length > 0) {
		
		var bbs_item_cnt=0;
		
		
		
		if($(".bbs-list .bbs-item ").length>0){
			bbs_item_cnt=$(".bbs-list .bbs-item ").length;
		}else if($(".thumb-list .thumb-item ").length>0){
			bbs_item_cnt=$(".thumb-list .thumb-item ").length;
		}else if($(".faq-list dt ").length>0){
			bbs_item_cnt=$(".faq-list dt ").length;	 
		}
		
		var bbs_totalCnt=$("#board_totalCnt").val();
		
		
		if(bbs_item_cnt==bbs_totalCnt){
		   $("#btnMoreArticle").css("display", "none");
		   return false;
		}
		
		$(document).on('click.article','.board a[href^="?mode=view&"]',function(e) {
			
			e.preventDefault();
			
			var link = $(this).attr('href').substring(1);
			var params = link.split('&');
			var href = '?';
			
			for(var i=0; i<params.length; i++) {
				var item = params[i];
				if(item.startsWith('article.offset') || item.startsWith('articleLimit')) continue;
				href += '&'+item;
			}
			href += '&articleLimit='+$('.board div:not(div.notice-container) > .bbs-list a[href^="?mode=view&"]').length;
			location.href = href;
			
			localStorage.setItem(location.pathname, $(window).scrollTop() );
			
			return false;
			
		});
		// 상세보기 이후 목록으로 돌아오면 하단으로 스크롤
		if($.unparam(location.search)['articleLimit'] > 12) {
			var t = localStorage.getItem(location.pathname) || $('.board .bbs-list a[href^="?mode=view&"]:last').offset().top;
			$('html,body').stop(true, false).animate({scrollTop: t  }, 200);
		}
		
	}
	
	$("#btnMoreArticle").click(function(){
		var sel = ".container > .MAIN_BOARD_LIST";
		if($(sel).length == 0) {
			sel = ".container > .bbs-list";
		}
		if($(sel).length == 0) {
			sel = ".container > .thumb-list";
		}

		var h = location.href;

		if(h.indexOf("#") != -1) {
			h = h.substring(0, h.indexOf("#"));
		}

		h = h.replace(/article.offset=[0-9]+/gi, "");

		if($(".faq-list dt ").length>0){
		   if(h.indexOf("?") == -1) {
				h = h + "?article.offset=" + $(".faq-list dt ").length;
			} else {
				h = h + "&article.offset=" + $(".faq-list dt ").length;
			}
		}else{
			if(h.indexOf("?") == -1) {
				h = h + "?article.offset=" + $(sel).children().length;
			} else {
				h = h + "&article.offset=" + $(sel).children().length;
			}
			
		}

		$.ajax({
			url: h,
			success:function(data){
				
				
				if($(".faq-list dt ").length>0){
				   var h = $(data).find(".faq-list");
					$(".faq-list").append(h.html());
				}else{
					var h = $(data).find(sel);
					$(sel).append(h.html());
				}
				
				
				var bbs_item_cnt=0;
				if($(".bbs-list .bbs-item ").length>0){
					bbs_item_cnt=$(".bbs-list .bbs-item ").length;
				}else if($(".thumb-list .thumb-item ").length>0){
					bbs_item_cnt=$(".thumb-list .thumb-item ").length;
				
				}else if($(".faq-list dt ").length>0){
					bbs_item_cnt=$(".faq-list dt ").length;	 
				}
				
				
				var bbs_totalCnt=$("#board_totalCnt").val();
				
				
				if(bbs_item_cnt==bbs_totalCnt){
					
					console.log(bbs_item_cnt);
					console.log(bbs_item_cnt);
					
					setTimeout(function(){
						$("#btnMoreArticle").css("display", "none");
					},300)
				   
				   return false;
				}
				
				
				
				if(h.children().length == 0) {
					$("#btnMoreArticle").css("display", "none");
				}
			}
		});
		return false;
	});
});

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isHospital() {
	var h = ["sev", "sev-rehabil", "sev-heart", "sev-eye", "sev-children", "cancer", "dental", "gs", "gs-hbv", "gs-cancer", "gs-spine", "gs-dent", "yi"];
	for(var i=0;i<h.length;i++) {
		if(location.href.indexOf("/" + h[i] + "/") != -1) {
			return true;
		}
	}
	return false;
}

// 병원군만 들어오도록 한다. 모바일 인트로로 이동시킨다.
/* if(location.href.indexOf("/index.do") != -1) {		
	//if(document.referrer.indexOf("intro.do") == -1) {
	if(
		document.referrer == null
		|| document.referrer == ""
		|| document.referrer.indexOf("/"+CMS.siteId+"/") == -1
	  ) {
		if(isMobile() && isHospital()
		  && location.href.indexOf("redirectUrl") < 0 	
		  ) {
			location.href="intro.do";
		}
	}
} */
if(location.href.indexOf("/intro.do") != -1) {		
	//if(document.referrer.indexOf("intro.do") == -1) {
	if(
		document.referrer == null
		|| document.referrer == ""
		|| document.referrer.indexOf("/"+CMS.siteId+"/") == -1
	  ) {
		location.href="index.do";
	}
}
/* 후원 명예의전당 */
if(location.href.indexOf("/honor_main.do") != -1) {
	location.href="honor_1885.do";
}
/* 신촌 병원 영문 홈페이지 통합 작업으로 예하병원 index 페이지 이동시 본원(sev-en)으로 이동 */
function sev_engCombine() {
	var h_list = ["cancer-en", "sev-heart-en", "sev-children-en", "sev-rehabil-en", "sev-eye-en"];
	for(var i=0; i < h_list.length; i++) {
		if(location.href.indexOf("/" + h_list[i] + "/") != -1){
			return true;
		}
	}
	return false
}
if(location.href.indexOf("/index.do") != -1) {
	if(
		document.referrer == null
		|| document.referrer == ""
		|| document.referrer.indexOf("/"+CMS.siteId+"/") == -1
	  ) {
		if(sev_engCombine()){
			location.replace("/sev-en")
		}
	}
}

$(function(){
	$(".fr-video").removeClass("fr-video");

	// 임시 수정요청 게시판.
	/*
	if(location.href.indexOf("/_custom") == -1) {
		var w = 10;
		var h = 10;
		if(isMobile()) {
			h = 60;
		}
		$("body").append("<div style='z-index:1000;position:absolute;left:"+w+"px;top:"+h+"px;background-color:red;color:white;font-size:1.5em;font-weight:bold;padding:5px;'><a target='_blank' href='/_custom/yuhs/_common/board/index/893.do?mode=write&article.offset=0&articleLimit=10'>수정사항<br>요청하기</a></div>");
	}
	*/
	window.setTimeout("$($('input').get(0)).click();", 100);
});

$(function() {
	// 모바일 메뉴 현재 페이지 표시 기능
	$('.mobile-allmenu a').each(function() {
		var menuCd = CMS.menuCd + '_m';
		if($(this).attr('id') === menuCd) $(this).parent('li').addClass('current');
	})
});


//-----------------------------------------------
// 쿼리스트링을 오브젝트로 컨버트
// querystring to param
// @param {} value
// @return {}
//
//-----------------------------------------------
jQuery.unparam = function (value) {

    if(value.startsWith('?')) {
    	value = value.substring(1);
    }

    var
    params = {},
    pieces = value.split('&'),
    pair, i, l;


    for (i = 0, l = pieces.length; i < l; i++) {
        pair = pieces[i].split('=', 2);
        params[decodeURIComponent(pair[0])] = (pair.length == 2 ?
            decodeURIComponent(pair[1].replace(/\+/g, ' ')) : true);
    }

    return params;
};
$(function(){
	
	if(CMS.locale != 'ko') {
		$("#btnMoreArticle").text("More");
	}
});


$(function(){
try {
$("a").click(function(){
	try{
		var h = $(this).attr("href");
		if(h.indexOf("/professor-") != -1 || h.indexOf("/community-") != -1 || h.indexOf("/common") != -1) {
			return true;
		}
		
		
		if(h.indexOf("infra.yonsei.ac.kr") != -1) {
			window.open("https://portal.yonsei.ac.kr/", "_blank");
			return false;
		}
		
		if(CMS.siteId=="myseverance" || CMS.siteId=="member") return true;
		if(h.substring(0,1) != "/") return true; //  /로 시작하는 경로가 아니면 그냥 반환.
		h = h.split("/")[1];
		if(h == "cms") return true; // 다운로드 링크니깐 그냥 반환한다.
		if(h == "search") return true; // 다운로드 링크니깐 그냥 반환한다.
		if(h == 'severance') return true;
		if(h == 'api') return true;
		if(h == CMS.siteId) return true; // 같은 사이트내 이동이니깐 그냥 반환한다.
		if(h.indexOf("-en") != -1
			|| h.indexOf("-cn") != -1
			|| h.indexOf("-jp") != -1	  
			|| h.indexOf("-ar") != -1	  
			|| h.indexOf("-ru") != -1	  
		  ) return true; // 다국어 사이트면 패스..
		// 현재 사이트의 location을 얻어온다.
		var u = location.href;
		if(u.indexOf("yonsei.ac.kr") != -1) return true;
		u = u.substring(0,u.indexOf("/", 10));

		u = u.replace("//www.", "//"+h+".");
		u = u.replace("//"+CMS.siteId+".", "//"+h+".");

		u = u + $(this).attr("href");

		//console.log(u);
		if(u.indexOf("/member/") != -1) {
			window.open(u, "_self");
		} else {
			window.open(u, "_blank");
		}

		return false;
	} catch(e) {	
	}
});
} catch(e) {	
}
});

// 커뮤니티 체크 
	
if( /community\-\w+|professor\-\w+/.test( CMS.siteId || '' ) ) {

	$.ajax({
		url: '/_custom/yuhs/_common/community-check.jsp',
		dataType: 'json',
		cache: false,
		async: false,
		data: {
			siteId : CMS.siteId
		}
	}).done(function( json ) {

		if(!json.success) {
			console.log('error',json.msg);
			return;
		}	
		// 권한이 없다.
		if(json.auth == false) {
			// 새로운 이동 url 이 있다.
			if(json.newUrl) {
				location.href = json.newUrl;
			}
		}


	});

}

//간편예약
// 정규식, maxlength 설정
	var $simple_phoneNum = $(".apply-section input[type='text'][id^='phone']")
	$simple_phoneNum.attr("maxlength", 4);
	$simple_phoneNum.keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});
// 진료의뢰서 관련 스크립트
	$("input[name=clnReqDocYn]").on("change", function(){
		var _$this = $(this).closest(".request-wrap").find(".col-group");
		_$this.find("input").val("")
		if($(this).val() == "Y"){
			_$this.show();
		}else{
			_$this.hide();
		}
	})
	