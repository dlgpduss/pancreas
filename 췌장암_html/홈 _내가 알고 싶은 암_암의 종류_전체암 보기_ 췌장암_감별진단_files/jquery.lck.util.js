/**
 **************************************************************************
 * 작성자		:	이창기
 * 기능설명		:	UTIL 모음
 * 작성일		:	2012/09/09
 **************************************************************************
 */
(function($){
	$.fn.swapClass = function(on, off) {
		if(this.hasClass(off)){
			this.removeClass(off).addClass(on);
		}else if(this.hasClass(on)){
			this.removeClass(on).addClass(off);
		}else{
			this.addClass(on);
		}
		return this;
	}
	
	
	//form 파라미터를 객체로 변환
	$.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	
	//긴문자열 ...처리
	$.cutString = function(str, size) {
		if($.checkByte(str) > size){
			var result = "";
			for(var i=0, j=0; j<size; i++, j++){
				if(str.charAt(i) >= ' ' && str.charAt(i) <= '~'){;}			
				else {j++;}
				result += str.charAt(i);
			}
			return result + "...";
		}else{
			return str;
		}
	};
	
	//글자수 제한하기
	$.fn.textlimit = function(o) {
	    o = $.extend({
	    	text_e : "textarea",
	    	count_e : null,	    	
	    	text_max : 300,
	    }, o || {});

	    return this.each(function() { 
	        var _wrap = $(this), _text = $(o.text_e, _wrap), _count_area = $(o.count_e, _wrap);
	        _text.on("keyup paste", function(){
	        	if($(this).val().length > o.text_max){
	        		alert("글자 입력수가 초과하였습니다.");
	        		_text.val(_text.val().substr(0, o.text_max));
	        	}
	        	if(!!_count_area)
	        		_count_area.text($(this).val().length);
	        });
	    });
	};
	
	//byte수 가져오기
	$.checkByte = function(str) {
		var strByte=0;
		for(var i=0; i<str.length; i++){
			if(str.charAt(i) >= ' ' && str.charAt(i) <= '~' )
				strByte++;
			else
				strByte += 2;
		}
		return strByte;
	};
	
	//byte수 만큼 문자 가져오기
	$.byteStr = function(str, len) {
		var strByte=0;
		var result = "";
		for(var i=0; i<str.length; i++){
			if(str.charAt(i) >= ' ' && str.charAt(i) <= '~' )
				strByte++;
			else
				strByte += 2;
			if(strByte > len){
				break;
			}
			result += str.charAt(i);
		}
		return result;
	};
	
	//숫자만 입력
	$.Number = function(str) {
		if ((/[^0-9]/g).test(str)){
			str = 0
		}else{
			str = Number(str);
        }
		return str;
	};
	
	//세자리 단위 콤마
	$.addComma = function(str) {
		var reg = /(^[+-]?\d+)(\d{3})/;
		str += '';
		while(reg.test(str))
			str = str.replace(reg, '$1' + ',' + '$2');
		return str;
	};
	
	//오라클의 nvl과 같은기능
	$.nvl = function(str, replacer){
		if(str == null || str == undefined){
			return (replacer == undefined ? "" : replacer);
		}else{
			return str;
		}
	}
	
	//문자열 포함여부 배열로 받음
	$.inStringArray = function(str, array){
		var rst = false;
		$.each(array, function(i, text){
			if(str.indexOf(text) > -1){
				rst = true;
				return false;
			}
		});
		return rst;
	}
	
	//url에 링크주기
	$.addLink = function(str) {
		return str.replace(/https?:\/\/(\w*:\w*@)?[-\w.]+(:\d+)?(\/([\w\/_.]*(\?\S+)?)?)?/gim, "<a href='$&' target='_blank'>$&</a>");
	};
})(jQuery);