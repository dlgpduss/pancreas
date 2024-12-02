/*******************************************************
* 프로그램명 	 : search.js   # 검색기능
* 설명           : 통합검색용 자바스크립트
* 작성일         : 2012.01.03
* 작성자         : 장진후
* 수정내역     	 :
  *****************************************************/

var ctgr_arr = [["통합검색","TOTAL"],	
                ["뮤직뱅크","MUSIC"],
                ["노컷뉴스","NOCUT"]];

var ctgr_cnt = ctgr_arr.length;
var ctgr_val = "";

var page_url = "search.jsp";
var srchFrm = "searchForm";
var fltrFrm = "searchFilterForm";
var hstrFrm = "historyForm";
var detlFrm = "detailSearchForm";

/**
* onload시 실행되는 functions
**/
$(document).ready(function(){
	init();		// 검색화면 초기화
    akcInit();	// 자동완성 초기화
/*	detlInit();	// 상세검색화면 초기화
	fltrInit();	// 필터검색화면 초기화
	ctgrInit();	// 카테고리 초기화*/

	// 우측 모듈 레이어 전체제어
	/*$('.arr').bind('click', function(){
		//현재 부모의 부모의 두번째 자식을 제어함.
		var ctr_lay = $(this).parent().parent().children().next();	// 디자인 통일화가 필요함.
		
		if( $(this).text() == "▼" ){	// 클릭할 수 있을 경우
			$(this).text('▲');
			ctr_lay.show('fast');
			$(this).css({"background-position":""});
		}else{
			$(this).text('▼');
			ctr_lay.hide('fast');
			$(this).css({"background-position":"0 -14px"});
		}
	});	*/
	
	// 더보기 자동 초기화
	$('.more_result').each(function(){
		var ctgr_nm = repSpace($(this).parent('div').children('h3').children('b').text());	// 카테고리명 가져오기.
		var ctgr_cd = rtnCtgrVal(ctgr_nm,0);		
		var ctgr_str = "<a title=\"" + ctgr_nm + "더보기\">" + ctgr_nm  + " 더보기</a>";
		
		$(this).html(ctgr_str);
		
		// 버튼 기능 넣기
		$(this).children('a').bind('click', function(){
			var ctgr = CommonUtil.getValue(getForm(hstrFrm), "category"); 
			goCategory(ctgr_cd);
		});		
	});
});

function moreResult( category_name ) {
    goCategory(category_name);
}


/**
* 통합검색 초기화 
*
* @ param 
*
* @ return	void
**/	
function init(){
	var ctgr_val = CommonUtil.getValue(getForm(srchFrm), 'category');
	var ctgr_nm = "";
	
	if(ctgr_val == "") 
		ctgr_val = "TOTAL";
	
	makeCtgrSltBox(ctgr_val);
	ctgr_nm = rtnCtgrVal(ctgr_val,1);
	
	// 카테고리 selected 로직
	$('.left_nav > li').each(function(){		  		
		if(repSpace($(this).text()) == (ctgr_nm))  $(this).addClass("selected");
	});
	
	$('#cateName').children().first().text(ctgr_nm);
	
/*	insertRctKwd();*/
}




/**
* 상세검색 화면 자동 초기화 
*
* @ param 
*
* @ return	void		
**/	
function detlInit(){
	var sepa = "_";
	var hstr_frm = getForm(hstrFrm);
	
	var ctgr_flds = CommonUtil.getValue(hstr_frm, "category");
	var srch_fd = CommonUtil.getValue(hstr_frm, "srchFd");
	var date = CommonUtil.getValue(hstr_frm, "date");
	var sort = CommonUtil.getValue(hstr_frm, "sort");
	
	// 상세검색 체크박스 초기화(체크)
	$('.detl_dd').children('input:checkbox').each(function(){
		if(ext_flds.indexOf(this.value) > -1)	this.checked = true;
	});
	
	// 상세검색  라디오박스 초기화(체크)
	$('.detl_dd').children('input:radio').each(function(){	
		if(ctgr_flds.indexOf(this.value) > -1)	this.checked = true;
		if(srch_fd.indexOf(this.value) > -1)  this.checked = true;			
		if(date.indexOf(this.value) > -1)  this.checked = true;
	});
	
	// 상세검색  정렬 초기화(셀렉트박스)
	$('#d1_sort').children('option').each(function(){
		if(sort == this.value)	this.selected = true;
	});
	
	// 상세검색의 클릭시 액션
	$('.detl_dd').children('input:checkbox').bind('click',function(){		
		var temp_str = "";
		var is_total = false;
		
		// total 체크박스 체크 유무
		if($(this).val() == "TOTAL"){
			is_total = true;
		}
		
		// detl_dd class의 포함된 checkbox만 가져옴.
		$(this).parent().children('input:checkbox:checked').each(function(){
			if(is_total == false){				
				if(this.value == "TOTAL"){
					this.checked = false; 
				}else{
					temp_str += this.value + sepa;
				}
			}else{				
				if(this.value != "TOTAL"){
					this.checked = false;
				}
			}
		});
	});
	
	// 상세검색 날짜 클릭 액션
	$('#detl_date').children('input:radio').bind('click',function(){
		choiceDatebutton("startDate", "endDate", this.value, 1);
	});	
	
	// 상세검색 레이어 토글
	$('#dt_btn').bind('click',function(){
		$('#sch_more').slideToggle('slow');
	});
	
	// 상세검색 닫기 액션
	$('#detl_close').bind('click',function(){
		$('#sch_more').slideToggle('slow');
	});
	
	// 상세검색 폼 엔터키처리(for IE BUG...)	
	$('#sch_more').keydown(function(event){
		if(event.keyCode == 13)  
			detlSchKwd();		
	});
	
	// 상세검색에서 검색 키 작동
	$('.sch_more_bt').children('input').bind('click', function(){
		detlSchKwd();
	});		
	
}

/**
* 필터검색 화면 자동 초기화 
*
* @ param 
*
* @ return	void		
**/
function fltrInit(){
	var fltr_frm = getForm(fltrFrm);
	
	// 필터(정렬) 기능
	$('#arange > li').bind('click', function(){
		var btn_txt = repSpace($(this).text());
		
		if(btn_txt == "정확도"){
			goSrch("sort","r");
		}else if(btn_txt == "최신순"){	// 최신순
			goSrch("sort","d");
		}
	});
}

/**
* 카테고리 초기화 
*
* @ param 
*
* @ return	void		
**/
function ctgrInit(){	
	
	// 카테고리 셀렉트 박스 클릭시
	$('#cateName').bind('click',function(){
		if( $('#sch_arr').hasClass('sch_arr') == true ){
			$('#sch_arr').removeClass('sch_arr').addClass('sch_arr_on');
			$('#sel_sch').show('fast');
		}else{
			$('#sch_arr').removeClass('sch_arr_on').addClass('sch_arr');
			$('#sel_sch').hide('fast');
		}
	});

	// 카테고리 네비게이터의 액션 및 토글 기능 입히기...
	$('.left_nav').children('li').bind('click', function(){		
		if($(this).is('#view_more') == true){
			$('#hidden_ctgr').slideToggle();
			
			if($('#view_more').children('span').text() == "더보기"){
				$('#view_more').removeClass('view_more').addClass('view_more on');
				$('#view_more').children('span').text('접기');
			}else{
				$('#view_more').removeClass('view_more on').addClass('view_more');
				$('#view_more').children('span').text('더보기');	
			}			
		}else{	
			var sel_ctgr_nm = repSpace($(this).text());	// ie7.0 이하를 위한 로직			
			var ctgr_cd = rtnCtgrVal(sel_ctgr_nm,0);
			goCategory(ctgr_cd);			
		}
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
	var frmObj = document.forms[srchFrm];
	
/*	if(kwd != ""){
		callKwdCookie(kwd);
	}		*/
	CommonUtil.setValue(frmObj, "kwd", kwd);
	frmObj.submit();
}

/**
* 입력받은 키워드로 검색
*
* @ param frmObj - 폼오브젝트   
*
* @ return	boolean
**/	
function srchKwd( frmObj ){
	var kwd = frmObj.kwd.value;
	
	if(kwd == ""){
		alert("검색어를 입력해주세요.");
		return false;
	}else{		
		callKwdCookie(kwd);
		
		CommonUtil.setValue(frmObj, "kwd", kwd);
		frmObj.submit();
	}				
}

/**
* 입력받은 키워드로 검색(상세검색)
*
* @ param kwd - 검색어   
*
* @ return	void	
**/	
function detlSchKwd(){
	var frm = getForm(detlFrm);
	var kwd = CommonUtil.getValue(frm, "kwd");
	
	if(kwd == ""){
		alert("검색어를 입력해주세요.");
		return;
	}else{		
		callKwdCookie(kwd);
		frm.submit();
	}	
}

/**
* 입력받은 카테고리값 검색
*
* @ param ctgr_val - 카테고리 코드   
*
* @ return	void
**/	
function goCategory( ctgr_val ){
	var frm = getForm(hstrFrm);
	
	CommonUtil.setValue(frm, "ctgr", "TOTAL");
	CommonUtil.setValue(frm, "pageNum", "1");	
	CommonUtil.setValue(frm, "category", ctgr_val);	
	CommonUtil.setValue(frm, "subCategory", "ALL");
	
	frm.submit();
}

/**
* 입력받은 서브카테고리값 검색
*
* @ param ctgr_val, sub_ctgr_val - 카테고리 코드, 서브카테고리 코드   
*
* @ return	void
**/	
function goSubCategory( ctgr_val, sub_ctgr_val){
	var frm = getForm(hstrFrm);
	
	CommonUtil.setValue(frm, "ctgr", "TOTAL");
	CommonUtil.setValue(frm, "pageNum", "1");
	CommonUtil.setValue(frm, "category", ctgr_val);
	CommonUtil.setValue(frm, "subCategory", sub_ctgr_val);
	
	frm.submit();
}

/**
* 셀렉트 박스 카테고리 매칭 
*
* @ param value - 카테고리
*
* @ return	void	
**/	
function setSltBox( value ){
	var ctgr = "";
	
	for(var i=0;i<ctgr_cnt;i++){
		if(value == ctgr_arr[i][0]) 
			ctgr = ctgr_arr[i][1];
	}

	makeCtgrSltBox(ctgr);
	CommonUtil.setValue(getForm(srchFrm), "category", ctgr);	
}

/**
* 카테고리 셀렉트 박스 만들기(HTML) 
*
* @ param ctgr - 카테고리  
*
* @ return	void	
**/	
function makeCtgrSltBox( ctgr ){
	var temp_str = "";	
	
	for(var i=0;i<ctgr_cnt;i++){
		if(ctgr != ctgr_arr[i][1])
			temp_str += "<li>"+ctgr_arr[i][0]+"</li>";
	}
	
	$('#sel_sch').html(temp_str);
	
	$('#sel_sch').children().click(function(){
		var cate_nm = $(this).text();
		
		$('#cateName').children().first().text(cate_nm);
		$('#sch_arr').removeClass('sch_arr_on').addClass('sch_arr');
		$('#sel_sch').hide('fast');
		
		setSltBox(cate_nm);
	});
}

/**
* 카테고리 매칭 함수. 
* 카테고리명을 넘겨주면 코드를, 코드값을 넘겨주면 카테고리 명을 리턴
*
* @ param ctgr - 카테고리값 
* @ param type - 타입(0 : 카테고리명, 1 : 카테고리코드 )  
*
* @ return str 			
**/	
function rtnCtgrVal( ctgr, type ){
	var rtn_val = "";
	if( type != 0 && type != 1 )
		return rtn_val;
	
	for(var i=0;i<ctgr_cnt;i++){
		if( ctgr_arr[i][type] == ctgr ){
			if( type == 0 ){
				rtn_val = ctgr_arr[i][1];
			}else{
				rtn_val = ctgr_arr[i][0];
			}
		}
	}
	
	return rtn_val;
}

/**
* 폼 Object 리턴
* 
* @ param frm_nm (폼명)  
* 
* @ return  폼 객체 리턴
**/
function getForm( frm_nm ){
	return document.forms[frm_nm];
}


/**
* 마지막 공백일 시 제거 (trim) for ie 7.0 이하
* 
* @ param str  
* 
* @ return  rtn_str (공백 제거 str)
**/
function repSpace( str ){
	var rtn_str = "";
	
	if( str == "" ){
		return rtn_str;
	}
	
	if(str.substring(str.length-1, str.length) == " "){
		rtn_str = str.substring(0, str.length-1);
	}else{
		rtn_str = str;
	}
	
	return rtn_str;
}


/**
* 키워드 체크
* 
* @ param frmObj(폼 오브젝트)
* 
* @ return  true, false;
**/
function chkNullKwd( frmObj ){
	if(frmObj.kwd.value == ""){
		alert('값없음');
		return false;
	}else{		
		return true;
	}
}

/**
* 검색어 체크 
* 
* @ param	frm				- form Object
* 
* @ return   true / false 	- 키워드 있음(true) , 없음(false)
**/
function searchKwd(frm)
{
	var kwd = CommonUtil.getValue(frm, 'kwd');
	if (kwd == '')
	{
		alert('검색어를 입력해 주세요');
		return false;
	}
	else
	{
		return true;
	}
}

/**
* 원하는 조건으로 검색 
* 
* @ param	fd_nm(input name), val(넣을값)
*
* @ return   void
**/
function goSrch(fd_nm, val)
{
	var frm = getForm(hstrFrm);
	
	CommonUtil.setValue(frm, fd_nm, val);
	frm.submit();
}

/**
* 페이지 이동 ( historyForm사용)
* 
* @ param	pagenum		- 페이지 번호
*
* @ return   void
**/
function gotoPage(pagenum)
{
	var frm = getForm(hstrFrm);
	
	CommonUtil.setValue(frm,"pageNum",pagenum);
	frm.submit();
}

/** 
 * 검색 필터옵션 초기화
 * 
 * @ param	
 *
 * @ return   void 
 */
function resetSearchFilter() 
{
	var frm = getForm(fltrFrm);		
	
	// 추가된 옵션의 경우 동일 방식으로 초기화 필요
	CommonUtil.setValue(frm, "sort", "");	// 정렬
	CommonUtil.setValue(frm, "srchFd", "");	// 영역
	CommonUtil.setValue(frm, "date", "0");	// 기간 (선택)
	CommonUtil.setValue(frm, "sliderValue", "5");	// 기간 (슬라이더)	
	CommonUtil.setValue(frm, "startDate", "");	// 기간 (시작일)
	CommonUtil.setValue(frm, "endDate", "");	// 기간 (종료일)
	checkBoxStat( frm.year, "0");				// 연도 - 배열
	checkBoxStat( frm.fileExt2, "0");			// 첨부문서 - 배열
	
	if ( frm.kwd.value != "" ) {
		frm.submit();	
	}
}

/**
* 현재 날짜 기준으로 날짜범위 계산 및 반영 ( detailSearchForm 사용)
* @ param	startname		- 시작일
* @ param    endname		- 종료일
* @ param    range		- 범위 (1일,(1) 1달(30), 3달(90)...)
* @ param    formType	- 1: detailForm, 2 : filterForm
*
* @ return   void
**/
function choiceDatebutton(startname, endname, range, formType)
{
	var startDate = '';
	var endDate   = '';
	var frm = getForm(detlFrm);
	
	if ( formType == 1 ) {
		frm = getForm(detlFrm);
	} else if (formType == 2 ) {
		frm = getForm(fltrFrm);
	}
	
	if (range == 1) {
		startDate 	= CommonUtil.getToday();
		endDate		= CommonUtil.getToday();
	}
	else if (range == 7) {
		startDate 	= CommonUtil.calcDateWeek(CommonUtil.getToday(),-1);
		endDate		= CommonUtil.getToday();
	}
	else if (range == 30) {
		startDate 	= CommonUtil.calcDateMonth(CommonUtil.getToday(),-1);
		endDate		= CommonUtil.getToday();
	}
	else if (range == 90) {
		startDate 	= CommonUtil.calcDateMonth(CommonUtil.getToday(),-3);
		endDate		= CommonUtil.getToday();
	}
	else if (range == 180) {
		startDate 	= CommonUtil.calcDateMonth(CommonUtil.getToday(),-6);
		endDate		= CommonUtil.getToday();
	}
	else if (range == 365) {
		startDate 	= CommonUtil.calcDateYear(CommonUtil.getToday(),-1);
		endDate		= CommonUtil.getToday();
	}
	else if (range == 1095) {
		startDate 	= CommonUtil.calcDateYear(CommonUtil.getToday(),-3);
		endDate		= CommonUtil.getToday();
	}

	CommonUtil.setValue(frm, startname, startDate);
	CommonUtil.setValue(frm, endname, endDate);
}



/**
* GNB창의 레이어 selectBox 창 컨트롤 ( searchForm 사용)
* @ param	code			- 코드값
* @ param    name			- 이름
*
* @ return   void
*
* 참고사항
* selectedSearch , searchSelect 의 레이어를 사용하며 style의 class명을 이용한 컨트롤
**/
function selectSearch(code, name)
{
    var selecttxt_obj  = document.getElementById("selectedSearch");		// 셀렉트박스 선택이름이 바뀔 텍스트위치
	var viewselect_obj = document.getElementById("searchSelect");		// 셀렉트박스 목록
	var frm = getGnbForm();
	
	// 텍스트 변경
	if (typeof(selecttxt_obj) == "object" && typeof(viewselect_obj) == "object" )
	{
		selecttxt_obj.innerHTML = name;				//셀렉트 박스 이름 변경
		viewselect_obj.className = "searchSelect_off";	//셀렉트 박스 목록 제거
		
		CommonUtil.setValue(frm, "category", code);	//폼값 싱크맞춤			
	}
}


/**
* 미리보기 기능구현
* @ param	divid		-  내용을 넣어줄 div의 id
* @ param    rowid		-  미리보기할 대상 데이터의 $ROWID 값
* @ param    index		-  다중첨부일 경우 몇번째 첨부문서인지의 index값 (0~)
* @ return   void
*
* 참고사항 
* 1) url의 내용을 divid의 레이어에 innerHTML해줌
* 2) 해당 div를 display none, block으로 토글해줌
* 3) 내부참조펑션 : konan_get_htmltext(Url)
**/
function konan_preview(divid, rowid, index)
{
	//preview.xxx 를 자동으로 체크해서 이름을 넘겨줌 (하드코딩해도됨)
	var preview_html = '';
	if      (document.location.pathname.indexOf('.jsp') > 0)
		preview_html += 'preview.jsp';
	else if (document.location.pathname.indexOf('.aspx') > 0)
		preview_html += 'preview.aspx';
	else if (document.location.pathname.indexOf('.asp') > 0)
		preview_html += 'preview.asp';	
	else if (document.location.pathname.indexOf('.php') > 0)
		preview_html += 'preview.php';	
	else if (document.location.pathname.indexOf('.html') > 0)
		preview_html += 'preview.html';	
		
	if (preview_html == '') {
		alert('미리보기할 URL 페이지가 등록되지 않았습니다');
		return;
	}
	
	var url 		= './'+preview_html+'?rowid='+rowid+'&index='+index+'&kwds=';
	var divboxobj 	= document.getElementById(divid+'_box');	// 외곽 box
	var divobj 		= document.getElementById(divid);			// 내용들어가는곳
	var default_str = '';
	
	if (divobj == null || divboxobj==null ) {
		alert('해당 div의 id를 찾을수 없습니다');
	}
	else {
		var kwds 	= '';
		kwds 		+= CommonUtil.getValues(getForm(detlFrm), 'kwd');
		kwds 		+= CommonUtil.getValues(getForm(detlFrm), 'preKwd');
		
		//키워드가 깨질 경우에는 인코딩 변경을 해지하거나, preview.jsp에서 kwds 파라미터 인코딩 관련 사항을 수정하세요.
		//url 		+= encodeURIComponent(kwds);
		url 		+= kwds;

		//기본값과 같을경우에만 요청해서 값을 바꿔줌
		if (CommonUtil.trim(divobj.innerHTML) == default_str)
		{
			var html = CommonUtil.UtltoHtml(url);
			if (CommonUtil.trim(html) == '') {
				//alert('첨부파일에 해당 키워드로 검색되지 않았습니다');
				divboxobj.style.display = 'none';
				return;
			}
			else {
				divobj.innerHTML = html;
			}
		}
		
		/*/미리보기 기능 토글
		if (typeof(divboxobj.style.display) != 'undefined')
		{
			if (divboxobj.style.display == 'none')
				divboxobj.style.display = 'block';
			else
				divboxobj.style.display = 'none';
		}*/
	}
}

/**
* 상세검색창 보기/숨기기  (토글처리)
* @ return   void
*
* 참고사항 
* "advanced_search" 레이어의 style class명을 체크하여 변경해줌
**/
function detailview()
{
	var divobj = document.getElementById("advanced_search");
	if (typeof(divobj.className) == "string")
	{
		if (divobj.className == "")
			divobj.className = "hidden";
		else
			divobj.className = "";
	}
}

/**
* GNB 영역 카테고리 선택
* @ return   void
*
* 참고사항 
* "searchSelectList" 레이어의 style.display 를 변경해줌
**/
function categotyView(flag)
{
	var divobj = document.getElementById("searchSelectList");
	
	if (flag == true)
		divobj.style.display = "block";
	else
		divobj.style.display = "none";

}

/**
* 파일다운로드 기능 (샘플)
* @ param   str		- 파일명
* @ return   void
*
**/
function fileDownload(str)
{
	alert("파일명 : " + str );
}

/**
* 첨부파일 새창으로 보기 (샘플)
* @ param   rowid		- 미리보기할 대상 데이터의 $ROWID 값
* @ param   index            -  다중첨부일 경우 몇번째 첨부문서인지의 index값 (0~)
* @ return   void
*
**/
function fileView(rowid, index)
{
	alert("새창으로 첨부파일 열기\nROWID="  + rowid + ", index=" + index );
}


/**
* 달력기능 호출
* @ param   checkname         - 미리보기할 대상 데이터의 $ROWID 값
* @ param   textid            -  달력에서 선택된 날짜가 출력될 <input type="text" ../> 의 ID
* @ param   divid             -  달력이 그려질 레이어 <div ...> 의  ID
* @ return   void
*
**/
function showCalendar(checkname, textid, divid, obj) {
	var target = document.getElementById(textid);
	var obj_x = CommonUtil.getElementX(target);
	var obj_y = CommonUtil.getElementY(target);
		
	//상세검색
	if (checkname != '') {
		var data = CommonUtil.getValue(getForm(detlFrm), checkname);
	    
		obj_y -= 60;
	
	    if (data == 'select')
	        konanCalendar.loadCalendar(textid, divid, obj_x, obj_y);
	    else
	        alert('기간입력을 눌러주세요');
	}
	//좌측영역
	else {
		obj_y = target.style.top;
		
		konanCalendar.loadCalendar(textid, divid, obj_x, obj_y);
	}
}


/**
* 텍스트박스 날짜 입력값 확인 (달력)
* @ param inputObj	입력창obj
*/
function checkDate (inputObj) {
	var pattern = /^[0-9]*$/;
	var target 	= inputObj.value;
	
	if(!pattern.test(target)) {
		inputObj.value = '';
		alert('숫자만 입력해주세요.');
	}
	else if (target.length > 8) {
		inputObj.value = '';
		alert('8자리로 입력해주세요. 예)\''+ CommonUtil.getToday() +'\'');
	}
	else if (target<19000101 || target>20331231) {
		alert('기간은 19000101 ~ 20331231 사이만 검색 가능합니다.');
		inputObj.value = '';
	}
}


/**
* 체크박스 전체 선택&해제
* @ param chkObj	체크박스obj
*/
function checkBoxStat (chkObj, div) {	
	if (div == 'TOTAL' || div == '0') {
		for (var i=1; i<chkObj.length; i++) {
			chkObj[i].checked = false;
		}
	}
	else {
		chkObj[0].checked = false;
	}
}

/**
* 해당 ID를 가진 DIV의 class명을 classname 으로 바꿔준다.
* 
* @ param objid(바꿀id값), classname(바꿀 class명)
* 
* @ return void	
*/
function evtChangeClassName(objid, classname) {
    var divobj  = document.getElementById(objid);
    if (divobj != null) {
          divobj.className = classname;
    } else {
          alert('해당 레이어의 ID \'' + objid + '\'는 찾을수 없습니다');
    }
}

/**
* 해당 ID를 가진 DIV의 class명을 classname 으로 바꿔준다. (토글형태)
* 
* @ param objid(바꿀id값), classname_show(보여줄 클래스명), classname_hidden(숨길 클래스명)
* 
* @ return void	
*/
function evtChangeClassNametg(objid, classname_show, classname_hidden) {
    var divobj  = document.getElementById(objid);
    if (divobj != null) {
	  		if (divobj.className == classname_hidden)
				divobj.className = classname_show;
			else
				divobj.className = classname_hidden;
    } else {
          alert('해당 레이어의 ID \'' + objid + '\'는 찾을수 없습니다');
    }
}

/*******************************************************
* 프로그램명 : search.js   # 공통기능
* 설명             : 통합검색용  범용 코드 구현 js Class (CommonUtil)
* 작성일         :  2010.04.05
* 작성자         : 정민철
* 수정내역     :
*
* 2010.03.25 - 첨부파일미리보기 펑션수정
* 2010.03.24 - trim, replaceAll 추가
* 2010.03.23 - getValues 기능추가
* 2010.03.17 - getValue의 checkbox 리턴값 버그 수정
  *****************************************************/
var CommonUtil = {
	
	/**
	* URL을 받아서 해당 결과를 String으로 리턴해줌
	* @ param   url		- 읽어올 페이지의 주소
	* 
	* @ return   str		-  url에서 보여지는 페이지 결과의 string
	*
	**/
	UtltoHtml : function (url) {
		var str = '';

		var xmlhttp = null;

		if(window.XMLHttpRequest) {
		   // FF 로 객체선언
		   xmlhttp = new XMLHttpRequest();
		} else {
		   // IE 경우 객체선언
		   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if ( xmlhttp ) 
		{//비동기로 전송
			xmlhttp.open('GET', url, false);
			xmlhttp.send(null);
			str = xmlhttp.responseText;
		}
		return str;
	},
	
	/**
	* form 의 특정 name에 값을 세팅해줌 (라디오버튼, input,hidden, 셀렉트 박스) 알아서 처리해줌
	* @ param   frmobj		- 폼오브젝트
	* @ param	name			- 해당 데이터의 name
	* @ param	value			- 세팅될 값
	*
	* @ return   void
	* 
	* 주의사항
	* name이 복수개일경우 첫번째에 값을 세팅해줌
	**/
	setValue : function (frmobj, name, value) {
		if ( typeof(frmobj) == "object" && typeof(frmobj.length) == "number");
		{
			for (var i=0; i< frmobj.length; i++)
			{
				if (frmobj[i].name == name)
				{
					if (frmobj[i].type=="text" || frmobj[i].type=="hidden" )
					{// hidden , text
						frmobj[i].value = value;
						break;
					}//--end: hidden, text
					else if (frmobj[i].type=="radio" && frmobj[i].value == value )
					{// radio 버튼
						 frmobj[i].checked = true;
						 break;
					}//--end:radio
					else if (frmobj[i].type=="checkbox")
					{//checkbox박스
						if (value == true)
							frmobj[i].checked = true;
						else
							frmobj[i].checked = false;
						
						break;
					}//--end:checkbox
					else if (frmobj[i].type=="select-one" && typeof(frmobj[i].options) == "object" && typeof(frmobj[i].length) == "number")
					{//select박스
						var selectidx = 0;
						for(var j=0; j<frmobj[i].length; j++)
						{
							if (value == frmobj[i].options[j].value)
							{
								selectidx = j;
								break;
							}
						}
						frmobj[i].selectedIndex = selectidx;
					}//--end:select
					
				}
				
			}
		}
	},
	
	/**
	* form 의 특정 name에 값을 가져옴 (라디오버튼, input,hidden, 셀렉트 박스 알아서 처리됨  )
	* @ param   frmobj		- 폼오브젝트
	* @ param	name			- 해당 데이터의 name
	*
	* @ return   해당 frmobj의 특정 name에 있는 값(value)
	* 
	* 주의사항
	* name이 복수개일경우 첫번째에 값을 리턴
	**/
	getValue : function (frmobj, name)	{
		var result = null;

		if ( typeof(frmobj) == "object" && typeof(frmobj.length) == "number" )
		{
			for (var i=0; i< frmobj.length; i++)
			{
				if (frmobj[i].name == name)
				{
					if (frmobj[i].type=="text" || frmobj[i].type=="hidden" )
					{// hidden , text
						result = frmobj[i].value;
						break;
					}//--end: hidden, text
					else if (frmobj[i].type=="radio" && frmobj[i].checked == true)
					{// radio 버튼
						 result = frmobj[i].value;
						 break;
					}//--end:radio
					else if (frmobj[i].type=="checkbox")
					{//checkbox박스
						result = frmobj[i].checked;
						break;
					}//--end:checkbox
					else if (frmobj[i].type=="select-one" && typeof(frmobj[i].options) == "object" && typeof(frmobj[i].length) == "number")
					{//select박스
						var idx = frmobj[i].selectedIndex;
						result = frmobj[idx].value;
						break;
					}
				}
			}
		}
		return result;
	},
	
	/**
	* form 의 특정 name에 값을 가져옴(라디오버튼, input,hidden, 셀렉트 박스 알아서 처리됨  )
	*
	* @ param   frmobj		- 폼오브젝트
	* @ param	name			- 해당 데이터의 name
	*
	* @ return   해당 frmobj의 특정 name에 있는 값(value)
	* 
	* 주의사항
	* name이 복수개일경우 공백(space)을 넣어 나열된 값을 리턴
	**/
	getValues : function (frmobj, name)	{
		var result = "";

		if ( typeof(frmobj) == "object" && typeof(frmobj.length) == "number");
		{
			for (var i=0; i< frmobj.length; i++)
			{				
				if (frmobj[i].name == name)
				{
					if (frmobj[i].type=="text" || frmobj[i].type=="hidden" )
					{// hidden , text						
						result += frmobj[i].value;
					}//--end: hidden, text
					else if (frmobj[i].type=="radio" && frmobj[i].checked == true)
					{// radio 버튼
						 result += frmobj[i].value;
					}//--end:radio
					else if (frmobj[i].type=="checkbox")
					{//checkbox박스
						result += frmobj[i].checked;
					}//--end:checkbox
					else if (frmobj[i].type=="select-one" && typeof(frmobj[i].options) == "object" && typeof(frmobj[i].length) == "number")
					{//select박스
						var idx = frmobj[i].selectedIndex;
						result += frmobj[idx].value;
					}
					
					result += " ";
				}
			}
		}
		return result;
	},
	
	/**
	* YYYYMMDD를 DATE() 형으로 변환
	*
	* @ param   str			- YYYYMMDD형 스트링 형태의 날짜값
	*
	* @ return   			- Date() 형 날짜값
	**/
	string2date : function (str)
	{
		var year = "";
        var month = "";
        var day = "";

        if (typeof (str) == "string") {
            if (str.length < 8)
			{
				alert("[error - search.js] : string2date() 8자리 날짜가 아닙니다");
                return null;
			}
            year = parseInt(str.substring(0, 4));
            month = parseInt(str.substring(4, 6));
            day = parseInt(str.substring(6, 8));

            return Date(year, month - 1, day);

        }
	},
	
	/**
	* DATE() 형을 YYYYMMDD String형으로 리턴
	*
	* @ param   date			- Date()형 값
	*
	* @ return   			- "YYYYMMDD" string형 날짜데이터
	**/	
	date2string : function (date)
	{
		var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;

        return year + "" + month + "" + day;
	},
	
	/**
	* 오늘 날짜 리턴 
	*
	* @ param   
	*
	* @ return   			- YYYYMMDD 오늘날짜
	**/	
	getToday : function () {
			if (typeof(this.todaystr) == "undefined")
			{
				this.todaystr = this.date2string(new Date());
				
			}
			return this.todaystr;
	},
	
	/**
	* 날짜계산 (일단위)
	*
	* @ param   p_strdate		- YYYYMMDD 
	* @ param   p_agoday		- 0 : 오늘 ,    음수 : 과거 ,   양수: 미래       (일(Day)단위)
	*
	* @ return   			- YYYYMMDD 에서 p_agoday일 전후 
	**/	
	calcDateDay : function (p_strdate, p_agoday) {
		var result = "";
		var year,month,day;
		var tmp_strdate = ""+p_strdate;	//string형으로 변환
		
        if (typeof (tmp_strdate) == "string") {
            if (tmp_strdate.length == 8)
			{
				year = parseInt(tmp_strdate.substring(0, 4));
				month = parseInt(tmp_strdate.substring(4, 6));
				day = parseInt(tmp_strdate.substring(6, 8));
				
				result = new Date(year, month-1, day + p_agoday);
			}	
		}
		return this.date2string(result);
	},
	
	/**
	* 날짜계산 (주단위)
	*
	* @ param   p_strdate		- YYYYMMDD 
	* @ param   p_agoweek		- 0 : 오늘 ,    음수 : 과거 ,   양수: 미래       (주(Week)단위)
	*
	* @ return   			- YYYYMMDD 에서 p_agoweek 주 전후 
	**/	
	calcDateWeek : function (p_strdate, p_agoweek) {
		var agoDay = p_agoweek * 7;
		
		return this.calcDateDay(p_strdate, agoDay );
	},
	
	/**
	* 날짜계산 (월단위)
	*
	* @ param   p_strdate		- YYYYMMDD 
	* @ param   agoMonth		- 0 : 오늘 ,    음수 : 과거 ,   양수: 미래       (월(Month)단위)
	*
	* @ return   			- YYYYMMDD 에서 agoMonth 월 전후 
	**/	
	calcDateMonth : function (p_strdate, agoMonth) {
		var result = "";
		var year,month,day;
		var tmp_strdate = ""+p_strdate;	//string형으로 변환
		
        if (typeof (tmp_strdate) == "string") {
            if (tmp_strdate.length == 8)
			{
				year = parseInt(tmp_strdate.substring(0, 4));
				month = parseInt(tmp_strdate.substring(4, 6));
				day = parseInt(tmp_strdate.substring(6, 8));
				
				result = new Date(year, month-1+agoMonth, day);
			}	
		}
		return this.date2string(result);
	},
	
	/**
	* 날짜계산 (년단위)
	*
	* @ param   p_strdate		- YYYYMMDD 
	* @ param   agoYear		- 0 : 오늘 ,    음수 : 과거 ,   양수: 미래       (년(Year)단위)
	*
	* @ return   			- YYYYMMDD 에서 agoYear 년 전후 
	**/	
	calcDateYear : function (p_strdate, agoYear) {
		var result = "";
		var agoMonth = (agoYear + 0) * 12
		var tmp_strdate = ""+p_strdate;	//string형으로 변환
		
        result = this.calcDateMonth(p_strdate,agoMonth);
		
		return result;
	},
	
	/**
	* 문자열 치환
	*
	* @ param   target		- 원본 text
	* @ param   oldstr		- 변경 대상 string
	* @ param   newstr	- 변경될 string
	*
	* @ return   		- 치환된 text
	**/	
	replaceAll : function (target, oldstr, newstr)
	{
		var result = target;
		if (target != null)
		{
			result = target.split(oldstr).join(newstr);
		}
		return result;
	},
	
	/**
	* white Space제거
	*
	* @ param   str		- 문자열
	*
	* @ return   		- 제거된 문자열
	**/	
	trim : function (str)
	{
		var result = str;
		if (str != null)
		{
			result = result.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		}
		return result;
	},
	
	//엘레먼트의 절대값 y픽셀을 구함
	getElementY : function(element)
	{
		var targetTop = 0;

		if (element.offsetParent) {
			while (element.offsetParent)
			{
				targetTop += element.offsetTop;
	            element = element.offsetParent;
			}
		}
		else if(element.y) {
			targetTop += element.y;
	    }

		return targetTop;
	},
	//엘레먼트의 절대값 x픽셀을 구함
	getElementX : function(element)
	{
		var targetTop = 0;

		if (element.offsetParent)
		{
			while (element.offsetParent)
			{
				targetTop += element.offsetLeft;
	            element = element.offsetParent;
			}
		}
		else if(element.x)
		{
			targetTop += element.x;
		}

		return targetTop;
	}
}

