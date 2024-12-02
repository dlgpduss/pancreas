/*******************************************************
* 프로그램명   : mysearchkwd.js   # 최근검색어 리스트
* 설명         : 최근검색어 리스트용 자바스크립트
* 작성일       : 2012.01.09
* 작성자       : 장진후
* 수정내역     : 변수 refactoring
  *****************************************************/

var maxResult = 10;		 // 최대 결과값
var resultNm = "keywords";	 // 쿠키명
var separator = "__";		 // 쿠키 separator
var shortFlag = true;		 // 줄임말 사용여부
var shortLen = 8;			 // 줄임말 사용시 길이

/**
* 쿠키 세팅
* 
* @ param name(쿠키명), value(세팅할 값), expiredays(쿠키유지시간)
* @ return	
**/
function setCookie(name, value, expiredays) {
    var today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";";
}

/**
* 쿠키값 얻기
* 
* @ param name(쿠키명)
* @ return str(쿠키값)
**/
function getCookie(name) {
    cookie = document.cookie;
    name = name + "=";
    idx = cookie.indexOf(name);
    if (cookie && idx >= 0) {

        tmp = cookie.substring(idx, cookie.length);
        deli = tmp.indexOf(";");
        if(deli > 0) {
            return tmp.substring(name.length, deli);            
        }else{
            return tmp.substring(name.length);            
        }
    }
}

/**
* 쿠키값 중복체크하고 저장
* 
* @ param name(쿠키명)
* @ return str(쿠키값)
**/
function callKwdCookie( _kwd ) {
    var tempStr = null;
    var cookieStr = "";
    var kwd = "";
    
    if (getCookie(resultNm) != null) {    // 쿠키 존재 할 경우
        cookieStr = getCookie(resultNm);        
        tempStr = cookieStr.split(separator);

        // 쿠키가 현재 2개 이상일 경우
        if (tempStr.length > 1 ) {            
            for(var i=0; i<tempStr.length; i++) {
            	
            	// 동일 키워드 발견
                if (unescape(tempStr[i]) == _kwd) { 
                    kwd = unescape(cookieStr);
                    break;                    
                }    
                
                // 동일 쿠키를 발견하지 못하였음.
                if(i == tempStr.length-1){ 
                    //현재 쿠키가 max값 쿠키와 비교해서 높은지 낮은지 체크
                    if(tempStr.length < maxResult){
                        kwd = unescape(cookieStr) + separator + _kwd;
                    }else{                        
                        for(var j=1; j<tempStr.length; j++){
                           kwd = kwd + unescape(tempStr[j]) + separator;                           
                           if(j == tempStr.length-1){
                               kwd = kwd +_kwd;
                           }
                        }
                    }
                }
            }
        // 쿠키가 한개밖에 없을 경우
        }else{ 
            // 현재 한개와 키워드를 체크 한다.            
            if(unescape(cookieStr) == _kwd || (unescape(cookieStr)=="")){	
                kwd = _kwd;                
            }else{  
                kwd = unescape(cookieStr) + separator + _kwd;
            }            
        }
    }else{
      kwd = _kwd;    
    }
    
    setCookie(resultNm, kwd, 365);    
}

/**
* 쿠키 삭제
* 
* @ param kwd(지울키워드)
* @ return
**/
function delKwdLst( kwd ){	
	var cookie_str = null;
	var temp_str = null;
	var rtn_str = "";
	var sepaLen = separator.length;
	
	if (getCookie(resultNm) != null) {
		cookie_str = getCookie(resultNm);
		temp_str = cookie_str.split(separator);
		if (temp_str.length > 0) {  
			for (var i=0; i<temp_str.length; i++) {
				if (unescape(temp_str[i]) != kwd) {
                	if(i == temp_str.length-1){
                		rtn_str +=  unescape(temp_str[i]);
                	}else{
                		rtn_str +=	unescape(temp_str[i]) + separator;
                	}
                }
			}
		}		
		
		// 마지막 쿠키값을 지울경우 separator 지우는 로직
		if(rtn_str.length > sepaLen){
			if(rtn_str.substring(rtn_str.length-sepaLen, rtn_str.length) == separator){
				rtn_str = rtn_str.substring(0,rtn_str.length-sepaLen);
			}
		}
		
		setCookie(resultNm, rtn_str, 365);
	}
	drawSearchedKwd();
}

/**
* 내가 찾은 검색어 넣기.
* 
* @ param
* @ return
**/
function drawSearchedKwd() {
    var temp_val = "";
    var temp_str = null;
    var mySearchKwdHtml = "";
    var rct_kwd = "";
    
    if (getCookie(resultNm) != null) { 
    	temp_val = getCookie(resultNm);
    	if(temp_val != ""){
	    	temp_str = temp_val.split(separator);
	        if (temp_str.length > 0 ) {         	
	            for (var i = 0; i < temp_str.length; i++) {
	            	if(i==0){
	            		mySearchKwdHtml += "<ul class=\"first\">"
	            	}else if(i==5){
	            		mySearchKwdHtml += "<ul class=\"second dp_n\">"
	            	}
	            	
	            	rct_kwd = unescape(temp_str[i]);
	            	mySearchKwdHtml += "<li>";
	            	if(shortFlag == true && rct_kwd.length > shortLen ){	            		
	            		mySearchKwdHtml += "<a href=\"javascript:dftSchKwd('" + rct_kwd + "');\" style=\"cursor:pointer;\" title\"" + rct_kwd + "\" >" + rct_kwd.substring(0,shortLen) + "...</a>";
	            	}else{
	            		mySearchKwdHtml += "<a href=\"javascript:dftSchKwd('" + rct_kwd + "');\" style=\"cursor:pointer;\" title\"" + rct_kwd + "\" >" + rct_kwd + "</a>";
	            	}
	            	mySearchKwdHtml += "<a href=\"javascript:delKwdLst('" + rct_kwd + "');\" class=\"remove\" style=\"cursor:pointer;\" title=\"" + rct_kwd + "\"> <img src=\"images/bt_aside_close.gif\" alt=\"삭제\" /></a>";
	            	mySearchKwdHtml += "</li>";
	            	
	            	if(i==4 || i==maxResult-1){
	            		mySearchKwdHtml += "</ul>";
	            	}
	            }
	            
	            if(i<4){
	            	mySearchKwdHtml += "</ul>";
	            }else if(i>4 && i<maxResult-1){
	            	mySearchKwdHtml += "</ul>";
	            }
	            
	        }	           
    	}
    }    
    
    if(mySearchKwdHtml == "")	mySearchKwdHtml = "<li>내가 찾은 검색어 목록이 없습니다.</li>";
    
    $("#searchedKwd").html(mySearchKwdHtml);	
} 