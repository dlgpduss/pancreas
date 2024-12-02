
if( window.console == undefined ) { console = { log : function(){} }; }

$(function(){
	$.extend({
		// jquery 브라우저 구분 코드 (jquery 1.8.3 버전의 jQuery.broswer)
		// 아래의 코드가 필요하면 자신의 클래스에 붙여서 사용하면됨~!
		// Use of jQuery.browser is frowned upon.
		// More details: http://api.jquery.com/jQuery.browser
		// jQuery.uaMatch maintained for back-compat
		browser : (function(){
			function uaMatch( ua ) {
			ua = ua.toLowerCase();
			var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
			/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
			/(msie) ([\w.]+)/.exec( ua ) ||
			ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
			[];
			return {
			browser: match[ 1 ] || "",
			version: match[ 2 ] || "0"
			};
			};
			matched = uaMatch( navigator.userAgent );
			var browser = {};
			if ( matched.browser ) {
			browser[ matched.browser ] = true;
			browser.version = matched.version;
			}
			return browser;
		})()
	});
	window.$scrollRoot = (jQuery.browser.msie || jQuery.browser.mozilla || jQuery.browser.opera) ? $("html") : $("body");
});

/** 구글 애널리틱스에서 Ajax 호출을 모니터링하기 위한 코드 */
$(function(){
	$(document).ajaxSend(function(event, xhr, settings){ 
		
		if (typeof gtag != "undefined" && gtag != null) {
				gtag('config', 'G-P4T8CJWQ3M', {
				page_location: settings.url  // Full URL is required.
			});
		}
		
		
		if (typeof ga != "undefined" && ga != null) {
			ga('send', {
				  'hitType': 'pageview',
				  'page': settings.url
				});
		}
	});
});

/**
 * 아이디나 이름, jquery 로 객체를 찾아서 jquery로 리턴
 * @param element
 * @returns jquery 객체
 */
function fnGetElement(element) {
	var jq = null;
	if(element instanceof jQuery) {
		jq = element;
	} else {
		jq = $('#'+element);
		if(jq.length <= 0) {
			jq = $('[name='+element+']');
		}
	}
	return jq;
}
/**
 * 정규식 유효성 체크
 * @param element - id, name, jquery 중 하나를 넣어준다.
 * @param regexp - 정규식
 * @param msg - 유효성 체크 실패시 보여줄 메세지
 * @returns boolean - true(성공), false(실패)
 */
function fnIsValid(element, regexp, msg) {
	var jq = fnGetElement(element);

	if(!regexp.test(jq.val())) {
		if(msg != null && msg != "") {
			alert(msg);
		}
		jq.focus();
		return false;
	}
	return true;
}

/**
 * 한글 체크
 * @param element - id, name, jquery 중 하나를 넣어준다.
 * @param msg - 유효성 체크 실패시 보여줄 메세지
 * @param minLength - 입력값의 최소 길이 제한
 * @param maxLength - 입력값의 최대 길이 제한
 * @returns {Boolean} - true(성공), false(실패)
 */
function fnIsKor(element, msg, minLength, maxLength) {
	minLength = minLength > 0 ? minLength : 0;
	maxLength = maxLength > 0 ? maxLength : "";
	var reg = new RegExp("^[가-힝]{"+minLength+","+maxLength+"}$");
	return fnIsValid(element, reg, msg);
}

/**
 * 숫자 체크
 * @param element - id, name, jquery 중 하나를 넣어준다.
 * @param msg - 유효성 체크 실패시 보여줄 메세지
 * @returns {Boolean} - true(성공), false(실패)
 */
function fnIsNumber(element, msg) {
	return fnIsValid(element, /^[0-9]+$/, msg);
}

/**
 * 전화번호 체크
 * @param element - id, name, jquery 중 하나를 넣어준다.
 * @param msg - 유효성 체크 실패시 보여줄 메세지
 * @returns {Boolean} - true(성공), false(실패)
 */
function fnIsPhone(element, msg) {
	return fnIsValid(element, /^[0-9\-()+]{3,20}$/, msg);
}

/**
 * 이메일 체크
 * @param element - id, name, jquery 중 하나를 넣어준다.
 * @param msg - 유효성 체크 실패시 보여줄 메세지
 * @returns {Boolean} - true(성공), false(실패)
 */
function fnIsEmail(element, msg) {
	//return fnIsValid(element, /^[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/, msg);
	return fnIsValid(element, /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/, msg);
}

/**
 * POST 방식의 Ajax 호출을 통해서 json을 받아오는 메소드
 * fnPost(url, dataBody, 성공시 호출될 function)
 */
function fnPost(url, dataBody, func, dataType, isAsync) {
	if (dataType == null) {
		dataType = 'json';
	}
	if (isAsync == null) {
		isAsync = true;
	}

	//console.log("ajax 전송 : " + url);
	$.ajax(url, {
		type : 'POST',
		data : dataBody,
		dataType : dataType,
		async : isAsync,
		timeout : 30000,
		cache : false,
		success : func,
		error : function(request, status) {
			var msg = "오류발생 : "+request.statusText+"/status:"+status;
			if(status == "timeout") {
				msg = "오류발생 : 응답대기시간을 초과하였습니다.";
			}
			if(status == "error" || status == "timeout") {
				console.log(msg);
			} else {
				if(url.indexOf("/reservation") > -1) {
					alert("오류가 발생하였습니다. 예약 창을 닫고 다시 시도해 주시기 바랍니다.");
					return;
				} else {
					alert(msg);
				}
			}
		}
	});
}
/**
 * 문자의 끝에서 부터 입력한 수만큼을 특수 문자로 변경
 * @param str 일부를 특수문자로 변경할 내용
 * @param length 특수문자가 필요 한만큼의 수
 * @param asterisk 입력하지 않으면 * 로 표시
 * @returns {String}  ex : stri**(String)
 */
function fnReplaceAsterisk(str, length, asterisk){
	var replaceStr = "";
	if(asterisk == null || asterisk == '') {
		asterisk = "*";
	}
	for(var i=0;i<length;i++){
		replaceStr += asterisk;
	}
	return str.substring(0,(str.length)-length)+replaceStr;
}

/**
 * Json 으로 가져온 Date 형식 결과 값을 YYYY.MM.DD 형식으로 변환
 * @param str  ex :1391496160000
 * @returns {YYYY.MM.DD}
 */
function fnToDateString(str) {

	if(str != null && str != '') {
		var date = new Date(str);
		var year = date.getFullYear();
		var month = (date.getMonth()+1);
		if(month.length < 2) {
			month += "0" + month;
		}
		var day = date.getDate();
		if(day.length < 2) {
			day += "0" + day;
		}
		str = year+"."+month+"."+day;
	}
	return str;
}
/**
 * XSS Filter (크로스 사이트 스크립팅 방지)
 * <, >을 일반 문자 형태로 치환하여 악의적인 스트립트 실행을 방지한다
 * @param str	사용자 입력 문자열
 * @returns
 */
function fnXSSfilter(str) {
	if(str != null && str != '') {
		str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	return str;
}
/**
 * 입력받은 문자열 앞뒤 공백제거 (Java의 trim()과 같은 기능)
 * @param str
 */
function fnTrim(str) {
	if(str != null && str != '') {
		str = str.replace(/(^\s*)|(\s*$)/gi, "");
	}
	return str;
}
/**
 * 입력받은 문자열 따옴표 확인하여 치환
 * @param str
 */
function fnReplaceQuote(str) {
	if(str != null && str != '') {
		str = str.replace("\\\"", "&quot;");	// 쌍따옴표
		str = str.replace("'", "&#039;");	// 홑따옴표
	}
	return str;
}

/**
 * 년월을 입력받아 해당월의 마지막 일를 반환한다(년월)
 * @param sYM 입력스트링(YYYYMM)
 */
function lastDay(sYM)
{
	if(sYM.length != 6)
	{
		return;
	}
	daysArray = new Array(12);    // 배열을 생성한다.
	for (i=1; i<8; i++)
	{
		daysArray[i] = 30 + (i%2);
	}
	for (i=8; i<13; i++)
	{
		daysArray[i] = 31 - (i%2);
	}
	var sYear = sYM.substring(0, 4) * 1;
	var sMonth = sYM.substring(4, 6) * 1;

	if (((sYear % 4 == 0) && (sYear % 100 != 0)) || (sYear % 400 == 0))
	{
		daysArray[2] = 29;
	}
	else
	{
		daysArray[2] = 28;
	}
	return daysArray[sMonth].toString();
}
/**
 * 숫자 형태의 파일 사이즈를 입력받아 바이트 단위로 변환
 * @param bytes
 */
function fnHumanFileSize(bytes) {
    var thresh = 1000;
    if(bytes < thresh) return bytes + ' B';
    var units = ['KB','MB','GB','TB','PB','EB','ZB','YB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(bytes >= thresh);
    return bytes.toFixed(1)+' <small>'+units[u]+"</small>";
};

var dateUtil = function() {
    this.startObject = null;
    this.endObject = null;
    this.args = null;
    this.dtdiv = ".";
};

dateUtil.prototype.formatLen = function(str) {
    return str = (""+str).length<2 ? "0"+str : str;
};

dateUtil.prototype.formatDate = function(dateObject) {
    // delimiter = delimiter || "-";
    return dateObject.getFullYear() + this.dtdiv + this.formatLen(dateObject.getMonth() + 1) + this.dtdiv + this.formatLen(dateObject.getDate());
};

dateUtil.prototype.toDay = function() {
    return this.formatDate(new Date());
};

dateUtil.prototype.calDate = function() {
    var year = this.args.year == null ? 0 : Number(this.args.year);
    var month = this.args.month == null ? 0 : Number(this.args.month);
    var day = this.args.day == null ? 0 : Number(this.args.day);
    var result = new Date();

    result.setYear(result.getFullYear() + year);
    result.setMonth(result.getMonth() + month);
    result.setDate(result.getDate() + day);
    return this.formatDate(result);
};

// 기간에 따른 날짜를 Date 형태로 리턴
dateUtil.prototype.setDateVal = function(ymd) {
    var year = this.args.year == null ? 0 : Number(this.args.year);
    var month = this.args.month == null ? 0 : Number(this.args.month);
    var day = this.args.day == null ? 0 : Number(this.args.day);
    var result;
    if(ymd == null || ymd == "")
    	result = new Date();
    else
    	result = this.parseDate(ymd);

    result.setYear(result.getFullYear() + year);
    result.setMonth(result.getMonth() + month);
    result.setDate(result.getDate() + day);
    return this.formatDate(result);
};

// 기간세팅 첫날과 뒷날 세팅(기간에 따라 세팅 - 시작날짜를 조정)
// 날짜를 기간에 맞춰 조정
// 사용법 - onclick 이벤트에 등록
// dateUtilObj.setDate('시작formID', '끝FormID','/',{}) - 시작과 끝 날짜가 오늘로 세팅 리턴값
// (yyyy/MM/dd)
// dateUtilObj.setDate('시작formID', '끝FormID','.',{day:-7}) - 시작날짜가 일주일전으로 세팅
// (yyyy.MM.dd)
// dateUtilObj.setDate('시작formID', '끝FormID','-',{month:-1}) - 시작날짜가 한달전으로 세팅
// (yyyy-MM-dd)
// dateUtilObj.setDate('시작formID', '끝FormID','/',{year:-1}) - 시작날짜가 일년전으로 세팅
// (yyyy/MM/dd)
// var dateUtilObj = new dateUtil(); -- 생성자

// startObject : 시작날짜의 input id
// endObject : 끝날짜의 input id
// dtdiv : 세팅될 날짜의 포맷팅(ex : /,-,.) ymd 사이의 구분자값 없으면 공백
// args : 계산될 날짜포맷팅 {day:-7},{month:-1},{year:1}
dateUtil.prototype.Term_setDate = function(startObject, endObject, dtdiv, args) {
    this.startObject = startObject;
    this.endObject = endObject;
    this.dtdiv = dtdiv;
    this.args = args;

    document.getElementById(this.startObject).value = this.calDate();
    document.getElementById(this.endObject).value = this.toDay();
};

dateUtil.prototype.TermSetDate = function(startObject, endObject, dtdiv, args) {
    this.startObject = startObject;
    this.endObject = endObject;
    this.dtdiv = dtdiv;
    this.args = args;

    var ymd = document.getElementById(this.startObject).value;
    document.getElementById(this.endObject).value = this.setDateVal(ymd);
};

// 입력한 날짜를 기준으로 달의 첫날과 마지막날을 구한다.
// ex) var dtutil = new DateUtil();
// dtutil.set_thismonth('시작날-인풋박스','끝-인풋박스','날짜형태(.,-,/등)','yyyyMMdd');
// dtutil.set_thismonth('input_st_dt','input_ed_dt','-','2012/12/22');
// dtutil.set_thismonth('input_st_dt','input_ed_dt','-','2012-12-15');
// dtutil.set_thismonth('input_st_dt','input_ed_dt','-','2012.12.21');
// 셋의 모든 결과 2012-12-01 - 2012-12-31
dateUtil.prototype.set_thismonth = function(startObject, endObject, dtdiv, ymd) {

	var limit_char = /[~!\#$^&*\=+|:;?"<,.>']/;
	ymd = ymd.split(limit_char).join("");

	var _year = ymd.substr(0,4);
	var _month = ymd.substr(4,2);
	var _day = ymd.substr(6,2);

	var first_day = _year+dtdiv+_month+dtdiv+"01";
	var last_day = this.lastDay(ymd).format("yyyy"+dtdiv+"MM"+dtdiv+"dd");

    this.startObject = startObject;
    this.endObject = endObject;
    this.dtdiv = dtdiv;

    document.getElementById(this.startObject).value = first_day;
    document.getElementById(this.endObject).value = last_day;
};


// args : args : 계산될 날짜포맷팅 {day:-7},{month:-1},{year:1} - Date 형태로 리턴
dateUtil.prototype.setDate = function(args,ymd){
    this.args = args;
    return this.setDateVal(ymd);
};

// 현재달의 마지막날(일자) 구하기
dateUtil.prototype.lastDay = function(ymd){

	var limit_char = /[~!\#$^&*\=+|:;?"<,.>']/;
	ymd = ymd.split(limit_char).join("");

	var _year = ymd.substr(0,4);
	var _month = ymd.substr(4,2);
// var _day = ymd.substr(6,2);
	var d2;
	d2 = new Date(_year, _month, '0');
	return d2;
};

dateUtil.prototype.parseDate = function(ymd){

	var limit_char = /[~!\#$^&*\=+|:;?"<,.>']/;
	ymd = ymd.split(limit_char).join("");

	var _year = ymd.substr(0,4);
	var _month = ymd.substr(4,2);
	var _day = ymd.substr(6,2);
	var d2;
	d2 = new Date(_year, _month-1, _day);
	return d2;
};

var fnDateUtil = new dateUtil();


// 날짜 차이를 빼서 일수를 가져온다.
function diffDate(checkInDate, checkOutDate){

	var date1, date2;
	checkInDate = replaceAll(checkInDate,".","");
	checkOutDate = replaceAll(checkOutDate,".","");
	date1 = new Date(checkInDate.substring(0,4),checkInDate.substring(4,6)-1,checkInDate.substring(6,8)).valueOf();
	date2 = new Date(checkOutDate.substring(0,4),checkOutDate.substring(4,6)-1,checkOutDate.substring(6,8)).valueOf();

	var diffDate = (date2 - date1) / 86400000;

	return diffDate;
}


// 입력받은 날짜에서 원하는 날짜 를 입력 받아 해당 날짜를 리턴한다.
function plusDate(sDate, iDay){

	chkDate = replaceAll(sDate,".","");
	var yy = parseInt(chkDate.substr(0, 4), 10);
    var mm = parseInt(chkDate.substr(4, 2), 10);
    var dd = parseInt(chkDate.substr(6), 10);

    var d = new Date(yy, mm - 1, dd + iDay);

    yy = d.getFullYear();
    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

    return '' + yy + '.' +  mm  + '.' + dd;
}

/**
 * 숫자를 입력하면 3자리 마다 콤마를 찍어줌
 * @param val
 * @param limit
 * @returns
 */
function fnGetCurrency(val, limit) {
	var rgx1 = /\D/gi;  // /[^0-9]/gi 와 같은 표현
	var rgx2 = /(\d+)(\d{3})/;
	var num01;
	var num02;
	if(limit == null) limit = 20;
	num01 = val.substring(0,limit);
	num02 = num01.replace(rgx1,"");
	var tempNum02 = num02;
	while (rgx2.test(tempNum02)) {
		tempNum02 = tempNum02.replace(rgx2, '$1' + ',' + '$2');
	}
	num01 = tempNum02;

	if(num01.indexOf("0")==0){
	    num01 = num01.replace(num01.indexOf("0"),'');
	}
	return num01;
}
// 정의 : 오로지 숫자만 입력
// 사용법 : 컨트롤에 onkeydown='fnOnlyNumber()'를 쓰면된다.
// 한글입력안됨..."-"(그레이키쪽과 중앙쪽),엔터와 백스페이스,탭키,스페이스키,delete,insert,home/end/방향키값,그레이키숫자값,키보드위숫자값만 입력가능하게 한다.
function fnOnlyNumber() {
	var ek = event.keyCode;

	if (ek != 13 && ek != 9
			&& ek != 8 && ek != 32 && ek != 46 && ek != 45
			&& (ek < 34 || ek > 40) && (ek < 48 || ek > 57)
			&& (ek < 96 || ek > 105)) {
		// alert(ek);
		event.returnValue = false;
	}
}
/**
 * 숫자를 입력받아 한글로 돈표시를 리턴
 */
function fnKoreanMoney(money) {
	money = money.replace(/\D/gi,"");	// 숫자만 남김
	if(money == 0) return "";

	var han1 = [ "", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구" ];
	var han2 = [ "", "십", "백", "천" ];
	var han3 = [ "", "만#", "억#", "조#", "경#" ];

	var len = money.length;

	var result = "";
	for (var i = len - 1; i >= 0; i--) {
		result += han1[money.substring(len - i - 1, len - i)];

		if (money.substring(len - i - 1, len - i) > 0)
			result += han2[i % 4];

		if (i % 4 == 0 && result.charAt(result.length-1) != "#")
			result += han3[i / 4];
	}
	return fnTrim(result.replace(/#/gi, " 	"))+"원";
}
// 문자치환
function replaceAll(sValue, param1, param2) {
    return sValue.split(param1).join(param2);
}

/** 글자 수 체크 (Byte) 
 * param obj : this 
 * param maxLength : 최대 byte
 */
function checkContentLength(obj, maxLength)
{
    var _byte = getContentLength(obj);
    
    if(maxLength < _byte){
    	$("#byteView").text(_byte); // 화면에 보여줄 현재 바이트 표시
    	$("#byteView").css({'color': 'red'});
    	return false;
    }
    $("#byteView").text(_byte); // 화면에 보여줄 현재 바이트 표시
    $("#byteView").css({'color': 'black'});
    
}

/** Submit 전에 글자 수 체크 (Byte) 
 * param obj : this 
 * param maxLength : 최대 byte
 * return boolean
 */
function getContentLength(obj)
{
    var str = new String(obj.value);
    var _byte = 0;
    if(str.length != 0) {
        for (var i=0; i < str.length; i++) {
            var str2 = str.charAt(i);
            if(escape(str2).length > 4) {
                _byte += 2;
            } else {
                _byte++;
            }
        }
    }
    return _byte;
}

/**
 * 특정영역 인쇄 (익스, 크롬 작동함)
 * @contents 인쇄할 HTML
 * @cp 컨텍스트 패스
 * @title 인쇄물 제목(기본값 : 서울아산병원)
 */
function fnDivPrint(contents, cp) {
	$(document).find("#printHiddenFrame").remove();
	$(document).find("body").append("<iframe id=\"printHiddenFrame\" name=\"printHiddenFrame\" width=\"800\" height=\"0\"></iframe>");
    tmp = window.open(cp+"/common/print/print.do", "printHiddenFrame");
    window.frames['printHiddenFrame'].focus();
    setTimeout(function(){ $(document).find("#printHiddenFrame").contents().find("body").html(contents); tmp.print(); }, 1000);
}

/**
 * 현재 브라우저가 IE(ActiveX 가능)이면 true 아니면 false
 * @returns {Boolean}
 */
function isIE() {
	return (navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("Trident") > -1);
}

/**
 * 북마크
 * @param title 북마크 이름
 * @param url 북마크 주소
 */
function fnBookmark(title, url){
	if(window.opera && window.print) { // opera
		var elem = document.createElement('a');
		elem.setAttribute('href',url);
		elem.setAttribute('title',title);
		elem.setAttribute('rel','sidebar');
		elem.click();
	} else if(document.all) { // ie
		window.external.AddFavorite(url, title);
	} else if(window.sidebar) { // firefox
		window.sidebar.addPanel(title, url, "");
	} else if(window.chrome) {
		alert("Ctrl + D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
	}
}

/**
 * 숫자를 통화형으로
 * @param number
 * @returns
 */
function fnCurrency(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

/**
 * 통화형을 숫자로
 * @param currency
 * @returns
 */
function fnNumber(currency) {
	return Number(currency.replace(/[^0-9\.]+/g, ""));
}



/* Cookie */
function ui_getCookie(name){
	// var allCookies = decodeURIComponent(document.cookie);
	var allCookies = document.cookie;
	var strCnt = name.length;
	var pos = allCookies.indexOf(name+"=");

	if(pos == -1) return undefined;

	var start = pos + strCnt+1;
	var end = allCookies.indexOf(";", start);
	if(end == -1) end = allCookies.length;
	var value = allCookies.substring(start, end);
	return value = decodeURIComponent(value);
}
function ui_setCookie(name,value,max_age,cPath,cDomain){
	var pathStr = (cPath) ? "; path=" + cPath : "; path=/";
	var domainStr = (cDomain) ? "; domain=" + cDomain : "";
	max_age = max_age || 1;

	var today = new Date();
	var expires = new Date();
	expires.setTime( today.getTime() + (1000*60*60*24*max_age) );

	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)
							+ pathStr
							+ domainStr
							+ "; expires=" + expires.toGMTString();
							// + "; max-age=" + (60*60*24*max_age);
}
function ui_removeCookie(name){ ui_setCookie(name, "", -1); }

function fnNonResvLoadPage(url, isFirst, isWide) {
	
	if(isFirst == true) {
		if(isWide == true) {
			$('#layerNonResv').removeClass('layerpopup_wrap');
		} else {
			$('#layerNonResv').addClass('layerpopup_wrap');
		}		
		
	 	$('#layerNonResv').load(url, function() {
			$('#layerNonResv').modal("show");
			$(".modal-layout").niceScroll({touchbehavior:false,cursorcolor:"#999999",cursoropacitymax:0.7,cursorwidth:10,background:"#e3e3e3",autohidemode:false});
		});
	} else {
		$('#layerNonResv').load(url, function() {
			if(isWide == true) {
				$('#layerNonResv').removeClass('layerpopup_wrap');
			} else {
				$('#layerNonResv').addClass('layerpopup_wrap');
			}		
		});
	}
}

function fnCloseTemp() {
    
   // location.reload();
	$('#layerNonResv').modal("hide");
        
}

function fnFileDownloadAjax(url, fileId) {
	var inputs = "<input type='hidden' name='fileId' value='"+fileId+"' />"
	//크롬56 버전 이후 동적 폼 생성 시 오류로 수정함
	//jQuery("<form action='"+url+"' method='POST'>"+inputs+"</form>").prepend('body').submit().remove();
	var form = jQuery("<form action='"+url+"' method='POST' id='fileDownloadAjaxForm'>"+inputs+"</form>");
	$(document.body).append(form);
	$('#fileDownloadAjaxForm').submit().remove();

}


