/*******************************************************
* 프로그램명 	 : search.js 
* 설명           : 표준화 3차 통합검색 전용 액션 스크립트
* 작성일         : 2012.04.12
* 작성자         : 장진후
* 수정내역     	 : 필요소스만 정리(by 조소영)
  *****************************************************/
var sizeStatus = 2;

/**
* onload시 실행되는 functions
*/
$(document).ready(function(){
	akcInit(); //자동완성 모듈 
	detailAction();	// 상세검색 액션
});


/**
 * 상세검색 액션
 * 
 * @param
 * @return
 */
function detailAction(){
	// 메인 페이지 검색 액션(main.jsp)
	$('#mainSearchForm').submit('click',function(){
				
		var str =  $('#topKwd').val();

	    //var pattern = /[~!@\#$%<>^&*\()\-=+_\']/gi;
		
		var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
		
		if(pattern.test(str)){
			str = str.replace(pattern, ' ');
		}
				
		 $('#topKwd').val(str);
		
		if( str==""){
			alert("키워드를 입력하여 주십시오. 특수문자는 검색에서 사용하실 수 없습니다.");
			return false;
		}
	});
	
	if($('#topKwd').val()!="") {
		$('#searchDesc').hide();
	}
	
	$('#mainSearchForm>fieldset>a ').on('click', function(){
		dftSchKwd($('#topKwd').val());
	});
}

/**
* 입력받은 키워드로 Default 검색
*
* @ param kwd - 검색어   
*
* @ return	void
**/	
function dftSchKwd(kwd){
	
	var str =  kwd;
	
	var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;

    //var pattern = /[~!@\#$%<>^&*\()\-=+_\']/gi;
    //var pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
	
	if(pattern.test(str)){
		str = str.replace(pattern, ' ');
	}
	
	$('#topKwd').val(str);
	
	
	if(str == ""){
		alert("검색어를 입력해주세요.");
		return false;
	}else{
		$('#topKwd').val(str);
		$('#mainSearchForm').submit();
	}
	
}
