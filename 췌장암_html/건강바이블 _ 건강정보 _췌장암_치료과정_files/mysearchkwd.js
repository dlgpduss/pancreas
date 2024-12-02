/*******************************************************
* 프로그램명   : mysearchkwd.js   # 최근검색어 리스트
* 설명         : 최근검색어 리스트용 자바스크립트
* 작성일       :  2012.01.09
* 작성자       : 장진후
* 수정내역     :
  *****************************************************/

var max_cookie = 10;		 // 최대 쿠키값
var cookie_nm = "keywords";	 // 쿠키명
var separator = "__";		 // 쿠키 separator
var short_flag = true;		 // 줄임말 사용여부
var short_len = 8;			 // 줄임말 사용시 길이


/**
* 쿠키 세팅
* 
* @ param name(쿠키명), value(세팅할 값), expiredays(쿠키유지시간)
* 
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
* 
* @ return str(쿠키값)
**/
function getCookie(name) {
    cookie = document.cookie;
    name = name + "=";
    idx = cookie.indexOf(name);
    if (cookie && idx >= 0) {

        tmp = cookie.substring(idx, cookie.length);
        deli = tmp.indexOf(";");
        if (deli > 0) {
            return tmp.substring(name.length, deli);            
        } else {
            return tmp.substring(name.length);            
        }
    }    
}

/**
* 쿠키값 중복체크하고 저장
* 
* @ param name(쿠키명)
* 
* @ return str(쿠키값)
**/
function callKwdCookie( _kwd ) {
    var tempStr = null;
    var cookieStr = "";
    var kwd = "";
    
    if (getCookie(cookie_nm) != null) {    // 쿠키 존재 할 경우
        cookieStr = getCookie(cookie_nm);        
        //있다면 키워드가 동일한 것이 있는지 체크
        tempStr = cookieStr.split(separator);  // 구분자로 쿠키 배열화        
        if (tempStr.length > 1 ) {      // 쿠키가 현재 2개 이상일 경우            
            for (var i = 0; i < tempStr.length; i++) {
                if (unescape(tempStr[i]) == _kwd) { // 동일 키워드 발견
                    kwd = unescape(cookieStr);
                    break;                    
                }    
                
                if( i == tempStr.length-1 ){ // 동일 쿠키를 발견하지 못하였음.
                    //현재 쿠키가 max값 쿠키와 비교해서 높은지 낮은지 체크
                    if( tempStr.length < max_cookie ){   // 쿠키 TO 남음.
                        kwd = unescape(cookieStr) + separator + _kwd;
                    }else{  // 쿠키 TO 없음.                        
                        for(var j=1; j<tempStr.length; j++){
                           kwd = kwd + unescape(tempStr[j]) + separator;                           
                           if( j == tempStr.length-1 ){
                               kwd = kwd +_kwd;
                           }
                        }
                    }
                }
            }
        }else{ // 쿠키가 한개밖에 없을 경우
            // 현재 한개와 키워드를 체크 한다.            
            if( unescape(cookieStr) == _kwd || (unescape(cookieStr)=="")){	
                kwd = _kwd;                
            }else{  
                kwd = unescape(cookieStr) + separator + _kwd;
            }            
        }
    }else{
      kwd = _kwd;    
    }
    
    setCookie(cookie_nm, kwd, 365);    
}

/**
* 쿠키 삭제
* 
* @ param kwd(지울키워드)
* 
* @ return
**/
function delKwdLst( kwd ){	
	var cookie_str = null;
	var temp_str = null;
	var rtn_str = "";
	var sepa_len = separator.length;
	
	if (getCookie(cookie_nm) != null) {    // 쿠키 존재 할 경우
		cookie_str = getCookie(cookie_nm);
		temp_str = cookie_str.split(separator);  // 구분자로 쿠키 배열화
		if (temp_str.length > 0 ) {  
			for (var i = 0; i < temp_str.length; i++) {
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
		if(rtn_str.length > sepa_len){
			if(rtn_str.substring(rtn_str.length-sepa_len, rtn_str.length) == separator){
				rtn_str = rtn_str.substring(0,rtn_str.length-sepa_len);
			}
		}
		
		setCookie(cookie_nm, rtn_str, 365);
	}
	insertRctKwd();
}

/**
* 내가 찾은 검색어 넣기.
* 
* @ param
* 
* @ return
**/
function insertRctKwd() {
    var temp_val = "";
    var temp_str = null;
    var mySearchKwdHtml = "";
    var rct_kwd = "";
    
    if (getCookie(cookie_nm) != null) { 
    	temp_val = getCookie(cookie_nm);
    	if(temp_val != ""){
	    	temp_str = temp_val.split(separator);
	        if (temp_str.length > 0 ) {         	
	            for (var i = 0; i < temp_str.length; i++) {            	
	            	rct_kwd = unescape(temp_str[i]);
	            	mySearchKwdHtml += "<li>";	            	
	            	if(short_flag == true && rct_kwd.length > short_len ){	            		
	            		mySearchKwdHtml += "<a href=\"javascript:dftSchKwd('" + rct_kwd + "');\" class=\"mykeyword\" style=\"cursor:pointer;\" title\"" + rct_kwd + "\" >" + rct_kwd.substring(0,short_len) + "...</a>";
	            	}else{
	            		mySearchKwdHtml += "<a href=\"javascript:dftSchKwd('" + rct_kwd + "');\" class=\"mykeyword\" style=\"cursor:pointer;\" title\"" + rct_kwd + "\" >" + rct_kwd + "</a>";
	            	}
	            	mySearchKwdHtml += "<a href=\"javascript:delKwdLst('" + rct_kwd + "');\" class=\"remove\" style=\"cursor:pointer;\" title=\"" + rct_kwd + "\"><img src=\"images/bt_c_close.gif\" alt=\"삭제\" /></a>";
	            	mySearchKwdHtml += "</li>";	            	
	            }	            
	            
	        }	           
    	}
    }    
    
    if(mySearchKwdHtml == "")	mySearchKwdHtml = "<li>내가 찾은 검색어 목록이 없습니다.</li>";
    
    $("#mysearchkwd").html(mySearchKwdHtml);	
} 