(function() {
  'use strict';
  
  Yonsei.Util = {
      formSerialize : function($form, ignoreRegexArr) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        ignoreRegexArr = ignoreRegexArr || [];
//        var regExArrLength = ignoreRegexArr.length;
        
        $.map(unindexed_array, function(n, i){
          var isAvailable = true;
          if(ignoreRegexArr) {
            for(var j = 0; j < ignoreRegexArr.length; ++j) {
              if(ignoreRegexArr[j].exec(n['name'])) {
                isAvailable = false;
                break;
              }
            }
          }
          if(isAvailable) indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
      },
      
      jstlParamToJson : function(jstlParamString) {
        
        //중괄호 제거 후 구분자 기준으로 배열로 분할
        var keyValuePairStrArr = jstlParamString.replace(/{/gi, '')
            .replace(/}/gi, '')
            .split(', ');
        
        var resultObj = {};
        $.each(keyValuePairStrArr, function(index, value) {
          var keyValuePairArr = value.split('=');
          resultObj[keyValuePairArr[0]] = keyValuePairArr[1];
        });
        
        return resultObj;
      },
      
      lpad : function(str, width) {
        str = str + '';
        return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
      },
      commaFormat : function(number){

    		if(number==0) return 0;

    		var reg = /(^[+-]?\d+)(\d{3})/;
    		var n = (number + '');

    		while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    		return n;    	  
    	  
      },
      
      isInteger : function(num) {
        return (num ^ 0) === num;
      },
      
      capitalizeFirstLetter : function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      
      // 세션 초기화
      clearSession: function(itemName) {
    	  sessionStorage.removeItem(itemName || "data");
//    	  sessionStorage.clear();
      },
      
      getSessionItem: function(itemName) {
    	  var _data = sessionStorage.getItem((itemName || 'data'));
    	  var decryptedData = null;

          $.ajax({
            url : '/cryptData/decrypt.do',
            type : "POST",
            data : {
              data : _data,
            },
            async: false,
            success : function(result) {
              if(result.hasOwnProperty('data') && result.data !== "") {
            	  decryptedData = JSON.parse(result.data);
              }
            },
            error : function() {

            }
          });
          
          return decryptedData;
      },
      
      setSessionItem: function(data, itemName) {
    	  var isSave = false;
          $.ajax({
            url : '/cryptData/encrypt.do',
            type : "POST",
            data : data,
            async: false,
            success : function(result) {
              if(result.hasOwnProperty('data')) {
                sessionStorage.setItem((itemName || 'data'), result.data);
                isSave = true;
              }
            },
            error : function() {
            	
            }
          });
          return isSave;
      },
      
      
      newlineToBreak: function(plainText, repeatCnt) {
        return (plainText || '').split('\n').join('<br/>'.repeat(repeatCnt || 1)); 
      },
      nameChange : function(txt){
    	  var name = "";
    	  for(var j = 0; j < txt.length; j++) {		// 짝수번째 '*' 처리
			if ((j+1)%2 == 0) name += '*';
			else name += txt.substring(j,j+1);
    	  }
    	  return name;
      },
      
      // 사용자 활동 로그 수집
      saveLog: function(type, insttCode, actHist) {	// type.. member/content
//	  var userInfo = this.getLoginInfo();
//		return;
//  		$.ajax({
//	  	 	url: '/api/common/log/user-action.do',
//	  		type: 'POST',
//	  		data: {type: type
//				, insttCode: insttCode
//				, mberId: (userInfo ? userInfo.id : '')
//				, menuNm: ""
//				, actHist: actHist},
////	  		data: {type: type, insttCode: insttCode, mberId: (userInfo ? userInfo.id : ''), menuNm: nodeTitle, actHist: actHist},
//	  		dataType: 'json',
//	  		success: function(result) {
//	  			if (result.data.cnt > 0) {
//	  				//
//	  			}
//	  		},
//	  		error: function() {
//	  			
//	  		}
//	  	});
      },
      
      // 비동기 ajax 처리
      promiseAjax: function(url, data, successCallBack) {
    	  var deferred = $.Deferred();
    	  $.ajax({
    		  url: url,
    		  type: 'GET',
    		  dataType: 'json',
    		  data: data,
    		  success: function(result) {
    			  if (successCallBack) successCallBack(result);
    			  deferred.resolve(result);
    		  },
    		  error: function() {
    			  deferred.reject('시스템 에러');
    		  }
    	  })
    	  return deferred.promise();
      },
      
      callOCS : function(ocsType, ocsValue, callback) {
        var _this = this;
        _this.promiseAjax('/api/common/transport/ocs/info.do', {
            ocsType : ocsType,
            ocsValue : ocsValue
          }, callback
        )
      },
      
      confirmMoveToLogin : function() {
    	  Yonsei.Modal.confirm({
    		    title : '로그인',
				content : '로그인 페이지로 이동하시겠습니까?',
				callback : {
					okBtn : function() {
						location.href = "/member/login.do?redirectUrl=" + encodeURIComponent(location.href);
					}
				}
			})
      },
      

      alertMoveToLogin : function() {
    	  Yonsei.Modal.alert({
    		  title : '로그인',
    		  content : '로그인이 필요한 서비스입니다.',
    		  callback : {
    			  closeModal : function() {    				  
    				  location.href = "/member/login.do?redirectUrl=" + encodeURIComponent(location.href);
    			  }
    	       }
			})
		},
      
      loginCheck : function(modalType){
    	  modalType = modalType || 'alert'
    	  
          $.ajax({
	  			url : '/api/member/loginCheck.do',
	              type : 'GET',
	              async : false,
	              success : function(result) {
	                if(result.data.Check == "N"){
	                	Yonsei.Util[modalType + 'MoveToLogin']();
	                	return false;
	                }
	                
	                return true;
	              },
	              error : function() {

	              }
          });
      },
      
      reservationCheck : function(code){
	        var group = [
	            {
	              group : ['2','10','12','13','14','15','26','33'],
	              call : '1599-1004',
	            },
	            {
	              group : ['4','24','25','34','31'],
	              call : '1599-6114',
	            },
	            {
	              group : ['16'],
	              call : '1899-1004',
	            },
	        ];  
	        var result = "";
	        $.each(group, function(index, value) {
	        	if(value.group.includes((""+code).trim())) {
	        		return result = value.call;
	        	}
	        });
	        
          //var message = "전화예약만 가능합니다. " + result;
          Yonsei.Modal.alert({
            content : [
                '<p>전화예약만 가능</p>',
                '<p><a href="Tel : '+result+'">Tel : '+ result +'</a></p>'                
            ].join(''),
          });    	  
    	  
      },
      
      insttCodeByUrl : function(u) {
    	  var insttCode = "2"; //default
    	  if(u) {
    		  try {
    			  var url = new URL(u);
        		  var path = url.pathname.substr(1).split('/')[0];
        		  if(path == "") {
        			  path = url.host.split('.')[0];
        		  }
            	  if(path) {
            		  if(path == "sev") {insttCode="2";}
                	  else if(path == "sev-heart") {insttCode="12";}
                	  else if(path == "sev-eye") {insttCode="13";}
                	  else if(path == "sev-rehabil") {insttCode="14";}
                	  else if(path == "sev-children") {insttCode="26";}
                	  else if(path == "dental") {insttCode="10";}
                	  else if(path == "cancer") {insttCode="15";}
                	  else if(path == "gs") {insttCode="4";}
                	  else if(path == "gs-cancer") {insttCode="31";}
                	  else if(path == "gs-spine") {insttCode="24";}
                	  else if(path == "gs-dent") {insttCode="25";}
                	  //else if(path == "gs-hbv") {insttCode="32";}
                	  else if(path == "medicine") {insttCode="1";}
                	  else if(path == "yuhs") {insttCode="32";}
                	  else if(path == "yi") {insttCode="16";}
                	  else {insttCode="2";}   
            	  }  
    		  }catch(e) {
    			  try {
    				  var url = u.replace('http://', '').replace('https://', '');
            		  var path = url.split('/')[1];
            		  if(path == "") {
            			  path = url.split('/')[0].split('.')[0];
            		  }
                	  if(path) {
                		  if(path == "sev") {insttCode="2";}
                    	  else if(path == "sev-heart") {insttCode="12";}
                    	  else if(path == "sev-eye") {insttCode="13";}
                    	  else if(path == "sev-rehabil") {insttCode="14";}
                    	  else if(path == "sev-children") {insttCode="26";}
                    	  else if(path == "dental") {insttCode="10";}
                    	  else if(path == "cancer") {insttCode="15";}
                    	  else if(path == "gs") {insttCode="4";}
                    	  else if(path == "gs-cancer") {insttCode="31";}
                    	  else if(path == "gs-spine") {insttCode="24";}
                    	  //else if(path == "gs-dent") {insttCode="25";}
                    	  //else if(path == "gs-hbv") {insttCode="32";}
                    	  else if(path == "medicine") {insttCode="1";}
                    	  else if(path == "yuhs") {insttCode="32";}
                    	  else if(path == "yi") {insttCode="16";}
                    	  else {insttCode="2";}   
                	  }  
    			  }catch(e2) {}
    		  }
    	  }
    	  return insttCode;
      },
      
      groupCodeByInsttCode : function(c) {
    	  var insttCode = "2"; //default
    	  if(c) {
    		  try {
        		  if(c == "2") {insttCode="2";}
            	  else if(c == "12") {insttCode="2";}
            	  else if(c == "13") {insttCode="2";}
            	  else if(c == "14") {insttCode="2";}
            	  else if(c == "26") {insttCode="2";}
            	  else if(c == "10") {insttCode="2";}
            	  else if(c == "15") {insttCode="2";}
            	  else if(c == "4") {insttCode="4";}
            	  else if(c == "34") {insttCode="4";}
            	  else if(c == "31") {insttCode="4";}
            	  else if(c == "24") {insttCode="4";}
            	  else if(c == "25") {insttCode="4";}
            	  else if(c == "16") {insttCode="16";}
            	  else {insttCode="2";}   
    		  }catch(e) {
    			  
    		  }
    	  }
    	  return insttCode;
      },

      searchMSiteId : function(s) {
    	  var siteId = "sev"; //default
    	  if(s) {
    		  if(s == "dental") {siteId = "dental";}
    		  else if(s == "dentistry") {siteId = "dentistry";}
    		  else if(s == "nursing") {siteId = "nursing";}
    		  else if(s == "gsph") {siteId = "gsph";}
    		  else if(s == "yuhs") {siteId = "yuhs";}
    		  else if(s.indexOf('sev') > -1 || s == "cancer") {siteId = "sev";}
    		  else if(s.indexOf('gs') > -1) {siteId = "gs";}
    		  else if(s.indexOf('yi') > -1) {siteId = "yi";}
    	  }
    	  return siteId;
      },
      
      searchSSiteId : function(s) {
    	  var siteId = "main"; //default
    	  if(s) {
    		  if(s == "cancer") {siteId = "cancer";}
    		  else if(s == "sev-heart") {siteId = "heart";}
    		  else if(s == "sev-children") {siteId = "children";}
    		  else if(s == "sev-eye") {siteId = "eye";}
    		  else if(s == "sev-rehabil") {siteId = "rehabil";}
    		  else if(s == "gs-hbv") {siteId = "cc";}
    		  else if(s == "gs-cancer") {siteId = "cancer";}
    		  else if(s == "gs-spine") {siteId = "spine";}
    		  else if(s == "gs-dent") {siteId = "dent";}
    		  
    	  }
    	  return siteId;
      },
      
      hcodeByUrl : function(u) {
    	  var hcode = ""; //default
    	  if(u) {
    		  try {
    			  var url = new URL(u);
        		  var path = url.pathname.substr(1).split('/')[0];
        		  if(path == "") {
        			  path = url.host.split('.')[0];
        		  }
            	  if(path) {
            		  if(path == "sev") {hcode="09";}
                	  else if(path == "gs") {hcode="10";}
                	  else if(path == "yi") {hcode="20";}   
            	  }  
    		  }catch(e) {
    			  
    		  }
    	  }
    	  return hcode;
      },
      
      hcodeByInsttCode : function(insttCode) {
    	  var hcode = ""; //default
    	  
    	  if(insttCode == "2") {hcode="09";}
    	  else if(insttCode == "4") {hcode="10";}
    	  else if(insttCode == "16") {hcode="20";}
    	  
    	  return hcode;
      },
      
      progress : function(isLoad) {
    	  if(isLoad) {
    		  $("body").prepend("<div id=\"progress_loading\" style=\"display: block; width: 100%; height: 100%; top: 0; left: 0; position: fixed; background-color: rgba(0, 0, 0, 0.7); z-index: 1200; text-align: center;\"><img src=\"/_res/ims/images/progress_loading.gif\" style=\"position: absolute; left: 50%; top: 50%; z-index: 100;\" /></div>");
    	  	  $('div.loader-wrap').show();  
    	  }
    	  else {
    		  $("#progress_loading").remove();    		  
    	  }
      },
      
 	 checkJumin : function(jumin1, jumin2) {
    	 
    	 if(jumin1.length != 6) {
    	 return "올바르지 않은 주민등록번호입니다.";
    	 } 
    	 if(jumin2.length != 7) {
    	 return "올바르지 않은 주민등록번호입니다.";
    	 }	 
    	 
    	 var korYn = null;
    	 var fullNum  = jumin1+""+jumin2;
    	 var firstNum = jumin2.substr(0, 1);
    	 if (firstNum == 1 || firstNum == 2 || firstNum == 3 || firstNum == 4) {
    	 //console.log("내국인");
    	 	korYn = "Y";
          }else if (firstNum == 5 || firstNum == 6 || firstNum == 7 || firstNum == 8) {
        	 //console.log("외국인");
        	 korYn = "N";
          }else{
        	 //console.log("내국인/외국인 구분할 수 없는 경우");
        	 korYn = null;
        	 return "올바르지 않은 주민등록번호입니다.";
          }
    	 
    	 if(korYn == "Y"){ //내국인
			var yearCheck = jumin1.substr(0, 2)
			var monthCheck = jumin1.substr(2, 2);
			if ( ((yearCheck == '20' && monthCheck == '10') || (yearCheck == '20' && monthCheck == '11') || (yearCheck == '20' && monthCheck == '12') || yearCheck >= '21') && (firstNum == 3 || firstNum == 4) ) {
				
    	     } else {
				var sum = 0;
				for (var i = 0; i < 12; i++) {
					sum += Number(fullNum.substr(i, 1)) * ((i % 8) + 2);
				}
				if (((11 - (sum % 11)) % 10) != Number(fullNum.substr(12, 1))) {
					return "올바르지 않은 주민등록번호입니다.";
				}else{

				}
			 }
    	 }else{
    	 var sum = 0;
    	     if (Number(fullNum.substr(7, 2)) % 2 != 0) {
    	         return "올바르지 않은 주민등록번호입니다.";
    	     }
    	     for (var i = 0; i < 12; i++) {
    	         sum += Number(fullNum.substr(i, 1)) * ((i % 8) + 2);
    	     }
    	     if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(fullNum.substr(12, 1))) {
    	         
    	     }else{
    	   	 	return "올바르지 않은 주민등록번호입니다.";
    	     }
    	 }
      }
  };
})();
