/* click 레이어팝업 (의료진소개 더보기), (동일전문분야 의료진 더보기) */
$.fn.layerView_click = function( _options ){
	return this.each(function(){
		var options = $.extend({}, { targetLayer : null, close : ".close" }, _options)

			, $button = $(this)
			, $layer = $(options.targetLayer || this.hash)
			, $close = $layer.find(options.close)
			, $layerAlinks = $layer.find("a").not($close);

		init();

		function init(){
			$button.bind("click", onButtonClick);
			$layerAlinks.bind("mouseover focus", onLayerAlinksOver);
			$layerAlinks.bind("mouseout blur", onLayerAlinksOut);
			$close.bind("click", onAlinkClose);
			$(document).bind("click", onBodyClose);
		}

		function onLayerAlinksOver(e){ $(this).parent().addClass("current") }
		function onLayerAlinksOut(e){ $(this).parent().removeClass("current") }

		function onButtonClick(e){
			if( $button.parent().hasClass("active") ){
				onAlinkClose();
			}else{
				$(this).parent().addClass("active");
				$layer.show();
			}
			e.preventDefault();
		}

		// close - alink
		function onAlinkClose(e){
			$layer.hide();
			$button.parent().removeClass("active");
			$button.focus();
			return false;
		}

		// close - body
		function onBodyClose(e){
			var tg = e.target;
			var condition1 = $button.is(tg);
			var condition2 = !!$button.find(tg).length;

			if( !condition1 && !condition2 ){
				$layer.hide();
				$button.parent().removeClass("active");
			}
		}

	});
};

(function($){
	var dimArray = [];

	$.dimPopup = $({});
	$.dimPopup.layerOpen = function( _ele ){
		dimArray.push(_ele);
		$(_ele).modal("show");
	}
	$.dimPopup.layerClose = function(){
		var _ele = dimArray.pop();
		$(_ele).modal("hide");
	}
})(jQuery);
	
(function($){
		function onINPUTOver(){
			$(".passlayer_boxwrap").show();
		}
		function onINPUTOut(){
			$(".passlayer_boxwrap").hide();
		}
		
	function deptWayEvent(){
		if($(".list").length){
			$(".layerbox_wrap a.whiteSmBtn").each(function(){
				var wBtn = $(this);
				$(wBtn).on("mouseover focusin",function(){
					$(wBtn).next(".list").show();
				});
				$(wBtn).parent().on("mouseleave",function(){
					$(wBtn).next(".list").hide();
				});
			});
			$(".layerbox_wrap .list").each(function(){
				var list_wrap = $(this);
				$(this).find("a").last().on("focusout",function(){
					list_wrap.hide();
				});
			});
			$(".layerbox_wrap .list").on("mouseleave",function(){
				$(this).hide();
			});
		}
	}
		
	

	$(document).ready(function(e) {
			$("#PassWord_Layer").bind("click", onINPUTOver);
			$("#PassWord_Layer").bind("focusout", onINPUTOut);
			
			//진료과 찾아오시는 길 마우스오버시 레이어 팝업
			deptWayEvent();
	});



})(jQuery);

jQuery.fn.menuOver = function( chgUrl ){
	return this.each(function(i, n){
		var $this = $(this)
			, img = $this.find("img")[0]
			, initUrl = img.src;

		$this.on("mouseenter focus", over);
		$this.on("mouseleave blur", out);

		function over(){
			img.src = ( chgUrl ) ? chgUrl : img.src.replace("_off", "_on");
		}

		function out(){
			img.src = initUrl;
		}
	});
};

/* 둘러보기 오버 */
// hasClass
function hasClass(element,value) {
	var re = new RegExp("(^|\\s)" + value + "(\\s|$)");
	return re.test(element.className);
}

// addClass
function addClass(element,value) {
	if (!element.className) {
			element.className = value;
	}else{
		var new_class_name = element.className;
		if (!hasClass(element,value)) {
			element.className += " " + value;
		}
	}
}

// removeClass
function removeClass(element,value) {
	if (element.className && hasClass(element,value)) {
		var re = new RegExp("(^|\\s)" + value);
		element.className = element.className.replace(re,"");
	}
}

// tblTrHover
function tblTrHover(obj){
	var obj = document.getElementById(obj);
	var objTr = obj.getElementsByTagName("TR");

	for(i=0; i<objTr.length; i++){
		if(objTr[i].parentNode.nodeName == "TBODY"){
			objTr[i].onmouseover = function(){
				addClass(this, "trhover")
			}
			objTr[i].onmouseout = function(){
				removeClass(this, "trhover")
			}
		}
	}
}

/* 롤링 */
$.fn.bnnrRolling2 = function( _options ){
	return this.each(function(i, n){
		var  options = jQuery.extend({}, {
				listWrap : ".listWrap", list : ".list",  lis :".list li" , btnL : ".left", btnR : ".right", btnAuto : ".auto", anchors : ".anchors button",
				speed : 3000, auto : false, motionSpeed : 300,
				callback : function(){}
			}, _options)
		
			, $wrap = $(this)
			, $btnL = $wrap.find( options.btnL )
			, $btnR = $wrap.find( options.btnR )
			, $btnAuto = $wrap.find( options.btnAuto )
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
		$anchors.bind("click mouseover", onAnchorsClick ).eq(0).addClass("current");
					
		if( auto ){
			$wrap.bind("mouseenter focusin", onWrapMouseEnter );
			$wrap.bind("mouseleave focusout", onWrapMouseLeave );
			onStart();
		}
		
		function onBtnAutoClick(){
			pause = ! pause;
			$btnAuto.toggleClass("stop", pause);
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
		function onAnchorsClick(){
			unActiveAnchor( oldActive );
			var n = $anchors.index( this ) + visibleLisCnt;
			onChange( n );
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
