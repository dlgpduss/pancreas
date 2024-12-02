//병원둘러보기 리뉴얼 2018-04 
GoOverHospitalView = {'on_obj_smbd':''}//on_obj_smbd 작은건물 on처리용 전역변수
var MapPointerCmm218 ='<img src="/_newhome/ui/home/static/img/info/guide/pointer.png" alt="" />';
var GoOverSpecMapPointer ='';
GoOverSpecMapPointer = '<span class="map_pointer" id="id_map_pointer">'+MapPointerCmm218+'</span>';//맵포인터 전역변수
GoOverSpecMapPointer2 = '<span class="map_pointer" id="id_map_pointer2">'+MapPointerCmm218+'</span>';//맵포인터 전역변수2 //장소가 두개일때
GoOverSpecMapPointer3 = '<span class="map_pointer" id="id_map_pointer3">'+MapPointerCmm218+'</span>';//맵포인터 전역변수3 //장소가 세개일때
GoOverSpecMapPointer4 = '<span class="map_pointer" id="id_map_pointer4">'+MapPointerCmm218+'</span>';//맵포인터 전역변수3 //장소가 4개일때
GoOverSpecMapPointer5 = '<span class="map_pointer" id="id_map_pointer5">'+MapPointerCmm218+'</span>';//맵포인터 전역변수3 //장소가 5개일때


//2021-04-19 인풋검색용 플레그
TypeforSrch2021 = {'on':'no','srch_first':'yes'};//초기는 no//srch_first는 검색버튼 안눌렀을때 yes 초기에 한번만 yes 고 누르면 계속 
TypeforSrchFlag ='result_no';//초기값 result_no
TypeforSrchListAtag = '';//검색한넘 클릭시 $(this)활용


//폐기능운영시간 툴팁외 2021-05
var MapToolTipInner ='<div class="tooltip_arrow_style01"><img src="/_newhome/ui/home/static/img/info/guide/tooltip_arrow_blue01.png" alt="" /></div><div class="inner_tooltip"><p class="tit_tooltip">운영시간</p><ul><li>평일 (7:30 ~ 17:30)</li><li>토요일 (7:30 ~ 12:00)</li></ul></div>';//폐기능 (본관)
id_lung_function_tooltip = '<div class="map_pointer_tooltip01 map_pointer_tooltip" id="id_lung_function_tooltip">'+MapToolTipInner+'</div>';

var MapToolTipInner02 ='<div><img src="/_newhome/ui/home/static/img/info/guide/tooltip_arrow_blue.png" alt="" /></div><div class="inner_tooltip"><p class="tit_tooltip">운영시간</p><ul><li>평일 (8:00 ~ 17:00)</li><li>주말운영안함</li></ul></div>';//심장,폐기능검사실
id_heart_function_tooltip = '<div class="map_pointer_tooltip" id="id_heart_function_tooltip">'+MapToolTipInner02+'</div>';

function openGuide2(bd,story,dept,search){//'외부'에서 링크로 접근시사용  위치보기팝업(진료조회, 편의시설등) //bd빌딩, story층 ex>B2.01.20,  dept부서등 고유값 (-빌딩과층수와결합하면 고유넘버가됨- 진료예약가능한과는 db에서 같이 맞췄음)//단, search는 둘러보기 메인에서 검색기능때 사용
	//예> openGuide2(6,'B2',1); 
	var url = "/home/info/guide/";
	if(bd == 1){
		url += "hmain"; //본관
	}else if(bd == 2){
		url += "annex"; //별관
	}else if(bd == 6){
		url += "cancer"; //암병원 db에 6이라서 같이 맞춤 진료조회페이지에서 위치보기가 있음 그때도 활용해야해서 같이맞춤
	}else if(bd == 4){
		url += "proton"; //양성자
	}
	url  = url +".do";
	//localStorage.DLocation = detail_location;// 쿠키처럼 값넣으려면 사용 onclick에  detail_location인자로 설정해서 사용
	if (search)//검색한부서 클릭시
	{
		guideNav2(bd,story,dept);
		return;
	}
	$obj2 = window.open(url,'','width=1380,height=900,scrollbars=yes,resizable=yes,menubar=yes,toolbar=yes');
	//$obj2 = window.open(url,'_blank');//윈도우 오픈말고 탭형식으로 오픈하려면 사용
	var popVar2 = setInterval(function() {
		if($obj2 != null) {
			if ( typeof($obj2.guideNav2) == 'function' || typeof($obj2.guideNav2) == 'object'  ) {
				$obj2.guideNav2(bd,story,dept);//아래
				clearInterval(popVar2);
			}
		}
	}, 500);
} 

function guideNav2(bd,story,dept){//층리스트 눌렀을때 및 외부에서 링크로 접근할때와 연동  //bd빌딩, story층 ex>B2.01.20,  dept부서등 고유값 (-빌딩과층수와결합하면 고유넘버가됨- 진료예약가능한과는 db에서 같이 맞췄음)
	//예>guideNav2(2,'01',12) 예>guideNav2(2,'B2',1)//scroll 스크롤값 
	var ajaxurl = '/home/info/guide/ajax2.do';
	var anchorbd = '#story'+bd; //빌딩
	var anchorstory = anchorbd+'_'+story // 층수 ex> 01 02 B2
	var finalurl = ajaxurl+' '+anchorstory //최종 불러오는url
	$('#story_name_2018').text($('.new_storylist li[data-storyno='+story+']').text())//로케이션에 텍스트 뿌리기
	$('.imglast_deco').hide();// 로케이션 > deco이미지 hide로 초기화
	$('#dept_name_2018').text('');// 로케이션 부서명 초기화
	if (dept)//외부에서 접근시 dept는 필수로 들어와야한다. 특정장소의 위치보기니까.
	{
		$('.imglast_deco').show();// > deco이미지 show
		hideshow_storylist_long();//층리스트보이기 화살표 위아래 관련//본관 암병원 층수가 높아서
		//$('body').addClass('popup_view_hguide');//외부에서 접근시에만 각 빌딩의 jsp도 수정해야함
		//$('.header, footer, .quick-navigation, .popup_view_hguide:after,.back-to-top , .header-fixed').hide();
		//$('.container').css('padding-top',0);
		//$('#id_print2018_hview').css('display','block');
	}
	//$(anchorstory).find('.map_pointer').remove();
	$('#aja_change').load(finalurl, function(statusTxt){ //#aja_change에  부서리스트 html뿌려라~!
		if (statusTxt ="success")//다 뿌린후~
		{	 
			var ajaxchange = $('#aja_change');
			$('.new_storylist li').removeClass('on');
			$('.new_storylist li[data-storyno='+story+']').addClass('on').children('a').attr('title', '선택됨');//층리스트 외부에서 링크로 접근할때와 연동되므로 story 인자로 처리, a11y
			$('.new_storylist li[data-storyno='+story+']').siblings().children('a').removeAttr('title'); //a11y
			var recent_dept_dom = $('#aja_change .deptc li[data-deptno='+dept+']');
			recent_dept_dom.addClass('on')//층별 부서리스트 외부에서 링크로 접근할때와 연동되므로 dept 인자로 처리
			$('#aja_change .deptc li a').attr('href', 'javascript:void(0);'); //a11y
			$('#dept_name_2018').text($('#aja_change .deptc li[data-deptno='+dept+']').text())//로케이션에 텍스트 뿌리기
			
			if ($('.outer_deptc_scroll').length > 0 && dept)//outer_deptc_scroll 있을때만 스크롤플러그인사용
			{ 
				$('.outer_deptc_scroll').nanoScroller({scrollTo: recent_dept_dom});//outer_deptc_scroll 있을때만 스크롤플러그인호출 //scrollTo: recent_dept_dom 해당 부서 li 위치로 스크롤
			}else if ($('.outer_deptc_scroll').length > 0 && !dept){
				$('.outer_deptc_scroll').nanoScroller(); //특정 부서 없을때 그냥 층리스트만 뿌릴때
			}
			ajaxchange.find('figure').append(GoOverSpecMapPointer);//맵포인터
			if (dept && recent_dept_dom.attr('data-top'))//외부에서 접근시 dept는 필수로 들어와야한다. 특정장소의 위치보기니까.
			{
				var data_top = Number(recent_dept_dom.attr('data-top'));
				var data_left = Number(recent_dept_dom.attr('data-left'));
				$('#id_map_pointer').css({'top':data_top,'left':data_left,'display':'block'})//맵포인터 위치설정
				$('#id_map_pointer2, #id_map_pointer3').remove();
			}

			if(dept && recent_dept_dom.attr('data-top3')){//위치가 세개일경우.attr('data-top3') 있음 ex본관 7층 
				ajaxchange.find('figure').append(GoOverSpecMapPointer2);
				ajaxchange.find('figure').append(GoOverSpecMapPointer3);
				var data_top2 = Number(recent_dept_dom.attr('data-top2'));
				var data_left2 = Number(recent_dept_dom.attr('data-left2'));
				var data_top3 = Number(recent_dept_dom.attr('data-top3'));
				var data_left3 = Number(recent_dept_dom.attr('data-left3'));
				$('#id_map_pointer2').css({'top':data_top2,'left':data_left2,'display':'block'})//맵포인터 위치설정
				$('#id_map_pointer3').css({'top':data_top3,'left':data_left3,'display':'block'})//맵포인터 위치설정
			}else if(dept && recent_dept_dom.attr('data-top2')){//위치가 두개일경우.attr('data-top2') 있음 ex본관 1층 안내
				ajaxchange.find('figure').append(GoOverSpecMapPointer2);
				var data_top2 = Number(recent_dept_dom.attr('data-top2'));
				var data_left2 = Number(recent_dept_dom.attr('data-left2'));
				$('#id_map_pointer2').css({'top':data_top2,'left':data_left2,'display':'block'})//맵포인터 위치설정
			}
			$('#id_srch_bdlist').removeClass('on');//검색초기화
			$('#id_srch_bdlist #id_input_txt').prop('value','').prop('placeholder','찾는 곳을 입력하세요');//검색초기화
			func_mapfigure_addimg();
		}
	});	
}
 
function GotoBuilding(ajaxurl2,bd,story,big){//상단작은그림건물 클릭시 및 큰건물클릭시  big인자는 큰건물그림 클릭시 넘어오는 구분값 //2021-04 큰건물 삭제함 따라서 그냥 본관 로딩때 호출해버림//stoty는 1~9층 모두 01 02이렇게 들어옴
	
	if (big == 'y')//병원둘러보기 서브메인에 큰건물 클릭시 //2021-04 삭제함 따라서 그냥 본관 로딩때 호출해버림
	{
		//$('#outer_submain_bdlist').animate({'height':1},800,'easeInSine',function(){
			$('#outer_submain_bdlist').hide();
			//$('#bdajaxmain, #bdajax .location_aside, #wrapajax_specific_cont').animate({'opacity':1},800,'easeInSine')
			$('#bdajaxmain, #bdajax .location_aside, #wrapajax_specific_cont').css('opacity',1)
			$('#id_print2018_hview').css('display','block');// 인쇄버튼 보이기
		//})
	}
 
	if(ajaxurl2.indexOf('hmain') > 0){
		GoOverHospitalView.on_obj_smbd = "#id_hmain_small"; //본관//a태그의 id값
		$('#buiding_name_2018').text('본관');//로케이션텍스트뿌리기
		
	}else if(ajaxurl2.indexOf('annex') > 0){
		GoOverHospitalView.on_obj_smbd = "#id_annex_small"; //별관
		$('#buiding_name_2018').text('별관');
	}else if(ajaxurl2.indexOf('cancer') > 0){
		GoOverHospitalView.on_obj_smbd = "#id_cancer_small"; //암병원  
		$('#buiding_name_2018').text('암병원');
		$('.location_aside').removeClass().addClass('location_aside location_aside_cancer');
	}else if(ajaxurl2.indexOf('proton') > 0){//양성자
		GoOverHospitalView.on_obj_smbd = "#id_proton_small"; //양성자
		$('#buiding_name_2018').text('양성자치료센터');
		$('.location_aside').removeClass().addClass('location_aside location_aside_proton');//글자  길이 때문 css 분기
	}
	//로케이션 초기화 
	$('.imglast_deco').hide();// 로케이션 > deco이미지 hide로 초기화
	$('#story_name_2018').text('1F');//1층으로
	if(ajaxurl2.indexOf('proton') > 0){//양성자
		$('#story_name_2018').text('B1');//1층으로
	}
	$('#dept_name_2018').text('');//부서네임 초기화
	if (TypeforSrch2021.on =='yes')//로케이션 다시 세팅 (인풋검색한거만)
	{
		var data_f = TypeforSrchListAtag.attr('data-f');//TypeforSrchListAtag 가 $(this)
		var floornum02 = data_f.toString();
		if (floornum02.length ==1)
		{
			$('#story_name_2018').text(data_f+'F');
		}else{
			$('#story_name_2018').text(data_f);
		}
		$('#dept_name_2018').text(TypeforSrchListAtag.attr('data-text'));
		$('.imglast_deco').show();//로케이션에 deco이미지 show;
	}
	

	var finalurl2 = ajaxurl2 +' #specific_section_contents';//해당 빌딩의 층리스트부르기 #앞에 한칸띄우기
	$('#wrapajax_specific_cont').load(finalurl2, function(statusTxt){
		if (statusTxt ="success")//층리스트 부르기
		{
			var anchorbd = '#story'+bd; //빌딩
			var anchorstory = anchorbd+'_'+story; // 층수 ex> 01 02 B2
			var finalurl ='/home/info/guide/ajax2.do'+' '+anchorstory; //최종 불러오는url (세부내용)	
			hideshow_storylist_long();//층리스트보이기 화살표 위아래 관련//본관 암병원 층수가 높아서
			if (ajaxurl2.indexOf('hmain') > 0 && story >10)//본관 암병원 층수가 높아서
			{
				$('.new_storylist_hmain .btn_go_storyup').click();
			}else if(ajaxurl2.indexOf('cancer') > 0 && story >07){
				$('.new_storylist_cancer .btn_go_storyup').click();
			}
			$('#aja_change').load(finalurl, function(statusTxt){//층에대한 부서리스트 부르기
				if (statusTxt ="success")
				{
					$('.new_storylist li[data-storyno='+story+']').addClass('on').children('a').attr('title', '선택됨');//층리스트 외부에서 링크로 접근할때와 연동되므로 story 인자로 처리
					$('.new_storylist li a').attr('href', 'javascript:void(0);') //a11y
					$('#aja_change .deptc li a').attr('href', 'javascript:void(0);'); //a11y
					$('.btn_go_storyud').attr('href', 'javascript:void(0);') //a11y
					if (TypeforSrch2021.on =='yes')//(인풋검색한거만)
					 {
						$('#specific_section_contents .inner_storylist li').removeClass('on');
						$('.new_storylist li[data-storyno='+story+']').addClass('on');//층리스트 외부에서 링크로 접근할때와 연동되므로 story 인자로 처리
						//부서 클릭유도 
						var data_text = TypeforSrchListAtag.attr('data-text');
						//$("#aja_change").find(".deptc > ul > li:contains('"+data_text+"')").each(function () {
							//console.log($(this).html())
							//$(this).find('a').click();//트리거
						//});
						$("#aja_change").find(".deptc > ul > li:contains('"+data_text+"')").each(function () {
							//console.log($(this).html())
							var onlyone_txt = $(this).find('a').text();
							if (data_text == onlyone_txt)
							{
								$(this).find('a').click();//트리거
							}
						});
						//검색리스트 초기화
						TypeforSrchFlag = 'result_no';
						TypeforSrch2021.on ='no';
						$('.cms_loading_wrap2, .modal-dimed2').hide();
						$('#id_input_txt').prop('value','');
						$('#aja_change').find('figure').css('top',-47);//map이미지 위치초기화
						$('#put_srchlist_area').empty();//검색했던 리스트 초기화
						$('#id_srch_bdlist').removeClass('on');//검색했던 리스트 초기화
						
					}
					func_mapfigure_addimg();//figure에 img로 변경 
					afterajax_small_bd_onoff_interac();//작은건물onoff
					if ($('.outer_deptc_scroll').length > 0){$('.outer_deptc_scroll').nanoScroller();}//스크롤이 본관만 있음  					
					//asdasd()//포인터 좌표알려주는 함수 테스트용
				 
				}//success
			})//load
		}//success
	});//load
}

//function asdasd(){//포인터 좌표알려주는 함수
	 
	 //$('figure img').click(function(event){
			//console.log(event.offsetY-66);
			//console.log(event.offsetX+17);
		//})
//} 

function deptetc_click_interactionf(){//부서명 클릭시 
	$(document).on('click','.wrap_contdeptfloor .deptc li a',function(e){//ajax라서 on으로 바인딩 //층별 부서 리스트 클릭시
		var ajaxchange = $('#aja_change');
		$(this).parent().addClass('on').siblings().removeClass('on');//글자 on
		$(this).attr('title', '선택됨').parent().siblings().children('a').removeAttr('title'); //a11y
		$("#dept_name_2018").text($(this).text())//로케이션에 텍스트 뿌리기
		$('.imglast_deco').show();//로케이션에 deco이미지 show
		if (!$('#id_map_pointer').length)//위치가 1개일경우
		{
			ajaxchange.find('figure').append(GoOverSpecMapPointer)//맵포인터 append
		}
		var data_top = Number($(this).parent('li').attr('data-top'));
		var data_left = Number($(this).parent('li').attr('data-left'));
		//$('#id_map_pointer').css({'top':data_top,'left':data_left,'display':'block'})//맵포인터 위치설정
		$('#id_map_pointer').css('display','block').stop().animate({'top':data_top,'left':data_left},600,'easeOutSine')//맵포인터 위치설정
		$('#id_map_pointer2,#id_map_pointer3,#id_map_pointer4,#id_map_pointer5').remove();
		if($(this).parent('li').attr('data-top3')){//위치가 세개일경우.attr('data-top3') 있음 ex본관 7층
			ajaxchange.find('figure').append(GoOverSpecMapPointer2);
			ajaxchange.find('figure').append(GoOverSpecMapPointer3);
			var data_top2 = Number($(this).parent('li').attr('data-top2'));
			var data_left2 = Number($(this).parent('li').attr('data-left2'));
			$('#id_map_pointer2').css({'top':data_top2,'left':data_left2,'display':'block'})//맵포인터2 위치설정
			var data_top3 = Number($(this).parent('li').attr('data-top3'));
			var data_left3 = Number($(this).parent('li').attr('data-left3'));
			$('#id_map_pointer3').css({'top':data_top3,'left':data_left3,'display':'block'})//맵포인터3 위치설정
		}else if($(this).parent('li').attr('data-top2')){//위치가 두개일경우.attr('data-top2') 있음 ex본관 1층 안내
			ajaxchange.find('figure').append(GoOverSpecMapPointer2);
			var data_top2 = Number($(this).parent('li').attr('data-top2'));
			var data_left2 = Number($(this).parent('li').attr('data-left2'));
			$('#id_map_pointer2').css({'top':data_top2,'left':data_left2,'display':'block'})//맵포인터2 위치설정
		}else{
			$('#id_map_pointer2,#id_map_pointer3,#id_map_pointer4,#id_map_pointer5').remove();
		}

		if ($(this).parent('li').attr('data-top5'))//본관20층,별관3층 몇개 없음 //네개짜리 함수만들기는 하지않음 5개로는 만들어서 필요없는 포인터를 멀리 보냈음
		{
			ajaxchange.find('figure').append(GoOverSpecMapPointer4);
			ajaxchange.find('figure').append(GoOverSpecMapPointer5);
			var data_top4 = Number($(this).parent('li').attr('data-top4'));
			var data_left4 = Number($(this).parent('li').attr('data-left4'));
			$('#id_map_pointer4').css({'top':data_top4,'left':data_left4,'display':'block'})//맵포인터4 위치설정
			var data_top5 = Number($(this).parent('li').attr('data-top5'));
			var data_left5 = Number($(this).parent('li').attr('data-left5'));
			$('#id_map_pointer5').css({'top':data_top5,'left':data_left5,'display':'block'})//맵포인터5 위치설정
		}
		//asdasd();//포인터 좌표알려주는 함수.구축때 left top값 추출위해서 사용
		//툴팁 2021-05
		$('.map_pointer_tooltip').hide();
		if ($(this).parent('li').hasClass('lung_function_tooltip'))//폐기능
		{
			var data_tool_top = Number($(this).parent('li').attr('data-tooltip-top'));
			var data_tool_left = Number($(this).parent('li').attr('data-tooltip-left'));
			 
			ajaxchange.find('figure').append(id_lung_function_tooltip);
			$('#id_lung_function_tooltip').css({'top':data_tool_top,'left':data_tool_left,'display':'block'})//툴팁 위치설정
			 
		}else if ($(this).parent('li').hasClass('heart_function_tooltip'))//심장, 폐기능
		{
			var data_tool_top = Number($(this).parent('li').attr('data-tooltip-top'));
			var data_tool_left = Number($(this).parent('li').attr('data-tooltip-left'));
			 
			ajaxchange.find('figure').append(id_heart_function_tooltip);
			$('#id_heart_function_tooltip').css({'top':data_tool_top,'left':data_tool_left,'display':'block'})//툴팁 위치설정
		}
		e.preventDefault();
	});
}
deptetc_click_interactionf();

function callajax_small_bd(bd){//작은건물 이미지 뿌리기. 외부에서 접근시 jsp에서 호출됨
	if(bd == 1){
		GoOverHospitalView.on_obj_smbd = "#id_hmain_small"; //본관//a태그의 id값
	}else if(bd == 2){
		GoOverHospitalView.on_obj_smbd = "#id_annex_small"; //별관
	}else if(bd == 6){
		GoOverHospitalView.on_obj_smbd = "#id_cancer_small"; //암병원 db에 6이라서 같이 맞춤 진료조회페이지에서 위치보기가 있음 그때도 활용해야해서 같이맞춤
	}else if(bd == 4){
		GoOverHospitalView.on_obj_smbd = "#id_proton_small"; //양성자
	}
	$('#bdajaxmain').load('/home/info/guide/hmain.do #bdajaxmain', function(statusTxt){// 본관jsp에서 가져옴
		if (statusTxt ="success"){
			afterajax_small_bd_onoff_interac();//작은 빌딩 이미지 on off관련
			hideshow_storylist_long();//층리스트보이기 화살표 위아래 관련//본관 암병원 층수가 높아서
		}
	})//ajax로 건물모양리스트 뿌림.
	$('#id_print2018_hview').css('display','block');// 인쇄버튼 보이기
}
function afterajax_small_bd_onoff_interac(){//작은 빌딩 이미지 on off관련
	$('.smbd_list_small li a').each(function(){
		$(this).find('img').attr('src',$(this).find('img').attr('src').replace('_on','_off'));
		$(this).removeAttr('title'); //a11y
	});
	$(GoOverHospitalView.on_obj_smbd).addClass('on').attr('title', '선택됨'); //a11y
	$(GoOverHospitalView.on_obj_smbd).find('img').attr('src',$(GoOverHospitalView.on_obj_smbd).find('img').attr('src').replace('_off','_on'));
	$('.smbd_list_small li a').mouseenter(function(){ 
		$(this).find('img').attr('src',$(this).find('img').attr('src').replace('_off','_on'));
		$(GoOverHospitalView.on_obj_smbd).find('img').attr('src',$(GoOverHospitalView.on_obj_smbd).find('img').attr('src').replace('_off','_on'));//해당빌딩은 다시 on
	});
	$('.smbd_list_small li a').mouseleave(function(){ 
		$(this).find('img').attr('src',$(this).find('img').attr('src').replace('_on','_off'));//전부 off
		$(GoOverHospitalView.on_obj_smbd).find('img').attr('src',$(GoOverHospitalView.on_obj_smbd).find('img').attr('src').replace('_off','_on'));//해당빌딩은 다시 on
	});
}
function btn_print2018_hview(){//인쇄관련
	if ($('body').hasClass('ver_ie'))
	{
		alert(" '파일' > '인쇄미리보기' 나 '페이지설정'을 통하여 인쇄환경을 설정할 수 있습니다.");
	}
	window.print();
}

function hideshow_storylist_long(){//층수가 높아서 화살표기능있는게 본관과 암병원만 있음
	var btn_go_storyup = $('.btn_go_storyup');
	var btn_go_storydown = $('.btn_go_storydown');
	var value_hmain = '-462px';
	var value_cancer = '-168px';
	btn_go_storyup.click(function(e){//위 화살표
		if (!$(this).hasClass('disabled'))
		{
			$('.new_storylist .inner_storylist ul').css('margin-top',0);
			btn_go_storyup.addClass('disabled').attr('aria-hidden', 'true'); //a11y
			btn_go_storydown.removeClass('disabled').attr('aria-hidden', 'false'); //a11y
		}
		e.preventDefault();
	});
	btn_go_storydown.click(function(e){//아래 화살표
		if (!$(this).hasClass('disabled'))
		{
			if ($(this).parent('.new_storylist').hasClass('new_storylist_hmain'))
			{
				$('.new_storylist .inner_storylist ul').css('margin-top',value_hmain);
			}else{
				$('.new_storylist .inner_storylist ul').css('margin-top',value_cancer);
			}
			btn_go_storydown.addClass('disabled').attr('aria-hidden', 'true'); //a11y
			btn_go_storyup.removeClass('disabled').attr('aria-hidden', 'false'); //a11y
		}
		e.preventDefault();
	});
}
// //end 병원둘러보기 리뉴얼 2018-04
function func_mapfigure_addimg(){//figure에 data-src받아서 img로 html 생성
	var mapfigure = $('#aja_change figure');
	var imgsrc = mapfigure.attr('data-src');
	var imgalt = mapfigure.attr('data-alt');
	var img = '<img id="mapfigure_img" alt="'+ imgalt +'" src="'+ imgsrc +'" />' //a11y
	var mapfigure2 = mapfigure.append(img);
};
//검색기능 추가 2021-04
$(document).ready(function(){

$('#bdajaxmain li >a').click(function(){//작은건물 클릭시 검색리스트 초기화
	if (TypeforSrchFlag == 'result_yes')
	{
		//검색리스트 초기화
		TypeforSrchFlag = 'result_no';
		TypeforSrch2021.on ='no';
		$('.cms_loading_wrap2, .modal-dimed2').hide();
		$('#id_input_txt').prop('value','');
		$('#aja_change').find('figure').css('top',-47);//map이미지 위치초기화
		$('#put_srchlist_area').empty();//검색했던 리스트 초기화
		$('#id_srch_bdlist').removeClass('on');//검색했던 리스트 초기화
	}
});
//로딩이미지
//var dim2021 = '<div id="id_modal_dimed2" class="modal-dimed modal-dimed2 off-d" style="display:none;opacity:0.1"></div>';
//var loadingimg = '<div class="cms_loading_wrap cms_loading_wrap2" style="display:none;"><div class="pace"><div class="pace-activity" style="z-index:5000"></div></div></div>';
$('body').on('click','.call_showingmap_location',function(e){//set_srch2021()에서 인풋 검색된 부서나 지도보기 클릭시
	$('#idpace, #id_modal_dimed2').show();//로딩이미지
	TypeforSrch2021.on ='yes';
	TypeforSrchListAtag = $(this);
	//var url = "/home/info/guide/";
	var data_bd = $(this).attr('data-bd');
	var floor = $(this).attr('data-f');
	var floornum = floor.toString();
	if (floornum.length ==1)
	{
		floor = '0'+floor;
	}
	//아래함수 스타일 GotoBuilding(ajaxurl2,bd,story,scrolltop);
	if (data_bd =='본관')
	{
		GotoBuilding('/home/info/guide/hmain.do',1,floor,'n');//data-f상 1~9층은 01 02 이렇게 들어감
		
	}else if(data_bd =='별관'){
		GotoBuilding('/home/info/guide/annex.do',2,floor,'n');
	}else if(data_bd =='암병원'){
		GotoBuilding('/home/info/guide/cancer.do',6,floor,'n');
	}else if(data_bd =='양성자치료센터'){
		GotoBuilding('/home/info/guide/proton.do',4,floor,'n'); 
	};
});
function set_srch2021(){ 
	var jqid_all_deptforsrch = $('#id_all_deptforsrch');
	var jqput_srchlist_area = $('#put_srchlist_area');
	if (jqid_all_deptforsrch.length <1){return;}//관련없는페이지인 경우 리턴
	jqid_all_deptforsrch.load('/home/info/guide/ajax2.do #all_guide_ajax2', function(statusTxt){
	if (statusTxt ="success"){
		$('#idmap_figure').css('visibility','visible');
		$('#id_modal_dimed2, #idpace').hide();
	}
	});
	var jqid_srch_bdlist = $('#id_srch_bdlist');
	var jqid_input_txt = $('#id_input_txt');//인풋
	 
	$('#id_btn_srchbdlist').click(function(){
		FNsearch_dept_list();
	});
	$(document).keypress(function(e) {
		if (jqid_input_txt.val() && e.which == 13){FNsearch_dept_list();}
	});
	function FNsearch_dept_list(){
		//1.로딩이미지나오고
		//2.벨류 앞뒤공백제거 등 세팅 
		//3. 검색어 입력했는지 유무 체크
		jqput_srchlist_area.empty();//검색했던 리스트 초기화
		jqid_srch_bdlist.removeClass('on');//검색했던 리스트 초기화
		var arr_text = [];//부서명 배열비우기
		var arr_bd = [];//건물명 배열비우기
		var arr_floor = [];//층 배열비우기
		var arr_top = [];//top 배열비우기 맵포인터 위치
		var arr_left = [];//left 배열비우기
		var arr_top2 = [];//top 배열비우기
		var arr_left2 = [];//left 배열비우기
		var arr_top3 = [];//top 배열비우기
		var arr_left3 = [];//left 배열비우기
		var arr_top4 = [];//top 배열비우기
		var arr_left4 = [];//left 배열비우기
		var arr_top5 = [];//top 배열비우기
		var arr_left5 = [];//left 배열비우기
		var arr_html = [];//검색뿌릴 html 배열용
		var itxt_ready = jqid_input_txt.val();//인풋값
		var itxt01 = itxt_ready.toLowerCase();//인풋값 소문자로변경
		var itxt = itxt01.replace(/(\s*)/g, "");//인풋값 모든공백제거
		
		TypeforSrchFlag ='result_no';//초기값 result_no
		//var itxt_ready3 =  itxt_ready2.replace(/^\s+|\s+$/gm,'')//앞뒤공백제거
		var i = Number(-1);//배열인덱스용
		var z = Number(0);
		if (itxt_ready < 1)//공백이나 암것도 없을때
		{
			alert('검색어를 입력해주세요.');
			jqput_srchlist_area.empty();//검색했던 리스트 초기화
			$('#outer_srch_bdinput > input').focus(); //a11y
			return;
		}
		jqid_all_deptforsrch.find('.deptc > ul > li a').each(function(z){
			var this_txt = $(this).text();
			var lowercase_dept_txt = this_txt.toLowerCase();//소문자로변경
			//$(this).text().match(new RegExp(itxt_ready, 'i'))//i는 대소문자구분 안하는것
			if (lowercase_dept_txt.replace(/(\s*)/g, "").indexOf(itxt) != -1)//모든 공백제거
			{
				i = i + 1;
				//console.log('z '+ z)
				//console.log('i '+ i)
				jqid_srch_bdlist.addClass('on');
				//console.log('index'+i)
				//alert(typeof $(this))
				//console.log($(this).html())//.deptc > ul li는 a테그나옴
				$(this).parent('li').addClass('show_srch');
				arr_text[i] = this_txt;//부서명
				var show_srch= $(this).parent('li.show_srch');
				arr_bd[i] = show_srch.attr('data-building');
				arr_floor[i] = show_srch.attr('data-floor'); 
				arr_top[i] = show_srch.attr('data-top'); 
				arr_left[i] = show_srch.attr('data-left');
				function set_arr_topleft2(){
					arr_top2[i] = show_srch.attr('data-top2'); 
					arr_left2[i] = show_srch.attr('data-left2');
				}
				function set_arr_topleft3(){
					arr_top3[i] = show_srch.attr('data-top3'); 
					arr_left3[i] = show_srch.attr('data-left3');
				}
				function set_arr_topleft4(){
					arr_top4[i] = show_srch.attr('data-top4'); 
					arr_left4[i] = show_srch.attr('data-left4');
				}
				if (show_srch.attr('data-top5'))//맵포인터 5개가 최고 2021-04-16 현재
				{
					arr_top5[i] = show_srch.attr('data-top5'); 
					arr_left5[i] = show_srch.attr('data-left5');
					set_arr_topleft2();
					set_arr_topleft3();
					set_arr_topleft4();
				}else if (show_srch.attr('data-top4'))
				{
					set_arr_topleft2();
					set_arr_topleft3();
					set_arr_topleft4();
				}else if (show_srch.attr('data-top3'))
				{
					set_arr_topleft2();
					set_arr_topleft3();
				}else if (show_srch.attr('data-top2'))
				{
					set_arr_topleft2();
				}
				
				arr_html[i] = '<tr>';
				arr_html[i] +=	'<td>';
				arr_html[i] +=		'<p class="location_elem_dept"><a href="javascript:void(0);"  class="call_showingmap_location" data-bd="'+arr_bd[i]+'" data-f="'+arr_floor[i]+'" data-text="'+arr_text[i]+'"  data-top="'+arr_top[i]+'" data-left="'+arr_left[i]+'" data-top2="'+arr_top2[i]+'" data-left2="'+arr_left2[i]+'"   data-top3="'+arr_top3[i]+'" data-left3="'+arr_left3[i]+'" data-top4="'+arr_top4[i]+'" data-left4="'+arr_left4[i]+'" data-top5="'+arr_top5[i]+'" data-left5="'+arr_left5[i]+'">'+arr_text[i]+'</a></p>'; //a11y
				arr_html[i] +=	'</td>';
				arr_html[i] +=	'<td>';
				arr_html[i] +=		'<p class="location_elem_building">'+arr_bd[i]+'</p>';
				arr_html[i] +=	'</td>';
				arr_html[i] +=	'<td>';
				arr_html[i] +=		'<p class="location_elem_floor">'+arr_floor[i]+'</p>';
				arr_html[i] +=	'</td>'; 
				arr_html[i] +=	'<td>';
				arr_html[i] +=		'<a href="javascript:void(0);" class="call_showingmap_location" data-bd="'+arr_bd[i]+'" data-f="'+arr_floor[i]+'" data-text="'+arr_text[i]+'" data-top="'+arr_top[i]+'" data-left="'+arr_left[i]+'" data-top2="'+arr_top2[i]+'" data-left2="'+arr_left2[i]+'"   data-top3="'+arr_top3[i]+'" data-left3="'+arr_left3[i]+'" data-top4="'+arr_top4[i]+'" data-left4="'+arr_left4[i]+'" data-top5="'+arr_top5[i]+'" data-left5="'+arr_left5[i]+'">지도보기</a>'; //a11y
				arr_html[i] +=	'</td>';
				arr_html[i] += '</tr>';
				TypeforSrchFlag = 'result_yes';
			}
		}); 
		if (TypeforSrchFlag == 'result_yes')
		{
			jqput_srchlist_area.append(arr_html)
				//console.log(arr_html)
			//높이계산하여 figure top에 반영
			var result_list_h = ($('#clickable_list_table').outerHeight() + 49)*-1;
			$('#aja_change').find('figure').css('top',result_list_h);

		}else{
			TypeforSrchFlag = 'result_no';
			jqid_input_txt.prop('value','');
			$('#aja_change').find('figure').css('top',-47);//map이미지 위치초기화
			alert('검색결과가 없습니다.');
			
		}
	}
}
set_srch2021();
});//document ready