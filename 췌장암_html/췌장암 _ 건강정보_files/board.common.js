if(!window.App) {
	App = {};
}
if(!App.board){
	App.board = {};
}

// 시작 종료 날짜 체크
$(function(){
	$("form[name=writeForm").submit(function(){
		if($("#startDt").length > 0 && $("#endDt").length > 0 && $("#startDt").val() != "" && $("#endDt").val() != "") {
			if($("#startDt").val() > $("#endDt").val()) {
				alert("시작날짜가 종료날짜 이후 입니다.");
				$("#startDt").focus();
				return false;
			}
		}
	});
});

// 의료진 검색 팝업
function searchDocterPopup(){
						
	window.open(ctx+'/admin/popup/doctor.do' ,'popup' ,'width=600px,height=600px');

}

// 진료과 검색 팝업
function searchDepartPopup(){
						
	window.open(ctx+'/admin/popup/department.do' ,'popup' ,'width=600px,height=600px');

}

// 질병코드 검색 팝업
function searchDiseasePopup(){
	
	
	window.open(ctx+'/admin/popup/disease.do?cb=diseaseResult' ,'popup' ,'width=600px,height=600px' );
	
}



function diseaseResult( diseaseList ){

	
	var codes = ',';
	var codeNms = '';
	for(var i=0; i< diseaseList.length; i++ ){
		
		if( diseaseList[i].sckwndSymbl != undefined ){

			codes += diseaseList[i].sckwndSymbl ;
			
			codeNms += diseaseList[i].displayString ;
			
			if( i != diseaseList.length -1 ){
				codes += ',';
				codeNms += ',';
			}
			
			
		}
	}
	
	$("input#diseaseCodes").val( $("input#diseaseCodes").val()   +  ',' + codes );
	$("input#diseaseKorNm").val( $("input#diseaseKorNm").val() 	+  ',' + codeNms );
	
	if( $("input#diseaseKorNm").val().startsWith(',') ){
			
		var val = $("input#diseaseKorNm").val();
		
	 	$("input#diseaseKorNm").val( val.substring(1 , val.length ) );
		
	}
	
}

var $divDoctor = null;
var $divDepart = null;

$(function(){
	if($("input#doctorKorNm").length > 0) {
		$divDoctor = $("<div></div>");
		$("input#doctorKorNm").css("display", "none");
		$("input#doctorKorNm").after($divDoctor);
		$divDepart = $("<div></div>");
		$("input#departKorNm").css("display", "none");
		$("input#departKorNm").after($divDepart);
		updateDoctorDepart("add");
	}
});


function updateDoctorDepart(method) {
	if(method=="remove") {
		try {
			$v = $divDoctor.find("button");
			v0 = "";
			v1 = "";
			for(var i=0;i<$v.length;i++) {
				var c = $($v.get(i)).attr("data_key");
				var n = $($v.get(i)).attr("data_name");
				v0 += ("," + n);
				v1 += ("," + c);
			}
			if(v0 != "") v0 += ",";
			if(v1 != "") v1 += ",";
			$("input#doctorKorNm").val(v0);
			$("input#doctorCodes").val(v1);
		} catch(e){}
		try {
			$v = $divDepart.find("button");
			v0 = "";
			v1 = "";
			for(var i=0;i<$v.length;i++) {
				var c = $($v.get(i)).attr("data_key");
				var n = $($v.get(i)).attr("data_name");
				v0 += ("," + n);
				v1 += ("," + c);
			}
			if(v0 != "") v0 += ",";
			if(v1 != "") v1 += ",";
			$("input#departKorNm").val(v0);
			$("input#departCodes").val(v1);
		} catch(e){}			
	} else {
		try {
			$divDoctor.html("");
			var toks0 = null;
			var toks1 = null;
			toks0 = $("input#doctorKorNm").val().split(",");
			toks1 = $("input#doctorCodes").val().split(",");
			for(var i=0;i<toks0.length;i++) {
				if(toks0[i] == "") continue;
				var $t = $("<button type='button' onclick='deleteDoctorDepart(this)' style='margin-right:10px;'>" + toks0[i] + "</button>&nbsp;&nbsp;");
				$t.attr("data_key", toks1[i]);
				$t.attr("data_name", toks0[i]);
				$divDoctor.append($t);
			}
		} catch(e){}
		try {
			$divDepart.html("");
			toks0 = $("input#departKorNm").val().split(",");
			toks1 = $("input#departCodes").val().split(",");
			for(var i=0;i<toks0.length;i++) {
				if(toks0[i] == "") continue;
				var $t = $("<button type='button' onclick='deleteDoctorDepart(this)' style='margin-right:10px;'>" + toks0[i] + "</button>");
				$t.attr("data_key", toks1[i]);
				$t.attr("data_name", toks0[i]);
				$divDepart.append($t);
			}
		} catch(e){}
	}
}

function deleteDoctorDepart(obj) {
	if(!confirm('삭제하시겠습니까?')) {
		return;
	}
	$(obj).remove();
	updateDoctorDepart("remove");
}


function popupResult(list){
	var names = '';
	var codes = '';
	var selector = (list[0].empNo != undefined)?("doctor"):("depart");
	var html = [];

	for(var i=0;i<list.length;i++) {
		if(selector == "doctor"){
			var n = $.trim(list[i].displayString.substring(list[i].displayString.lastIndexOf(">")+1));
			var c = $.trim(list[i].empNo);
			names += ("," + n);
			codes += ("," + c);
		} else {
			names += ("," + $.trim(list[i].displayString.substring(list[i].displayString.lastIndexOf(">")+1)));
			codes += ("," + $.trim(list[i].deptCode));
		}
	}
	names = $("input#"+selector+"KorNm").val() + names + ",";
	$("input#"+selector+"KorNm").val(names.replace(',,', ','));
	
	codes = $("input#"+selector+"Codes").val() + codes + ",";
	$("input#"+selector+"Codes").val(codes.replace(',,', ','));
	
	updateDoctorDepart("add");
}

/*
function popupResult(doctorList){
	
	var codes = ',';
	var codeNms = '';
	
	var doctorYn = true;
	
	for(var i=0; i< doctorList.length; i++ ){
		
		if( doctorList[i].empNo != undefined ){

			codes += doctorList[i].empNo ;
			
			
			
			var displayString = doctorList[i].displayString;
			var tempArray = displayString.split(">");
			var tempStr = tempArray[tempArray.length-1];
			
			codeNms += tempStr + '(' + doctorList[i].empNo  + ')';
			
			if( i != doctorList.length -1 ){
				codes += ',';	
				codeNms += ',';
			}
			
			
		}else{
			
			doctorYn = false;
			
			codes += doctorList[i].deptCode ;
			
			var displayString = doctorList[i].displayString;
			var tempArray = displayString.split(">");
			var tempStr = tempArray[tempArray.length-1];
			
			codeNms += tempStr + '(' + doctorList[i].deptCode  + ')';
			
			
			if( i != doctorList.length -1 ){
				codes += ',';	
				codeNms += ',';
			}
			
			
		}
	}
	
	if( doctorYn ){
		// 의료진 코드
		console.log(codes);
		console.log(codeNms);
		
		$("input#doctorCodes").val( $("input#doctorCodes").val() + ',' +  codes );
		$("input#doctorKorNm").val(  $("input#doctorKorNm").val() + ',' + codeNms );
		
		if( $("input#doctorKorNm").val().startsWith(',') ){
			
			var val = $("input#doctorKorNm").val();
			
		 	$("input#doctorKorNm").val( val.substring(1 , val.length ) );
			
		}
		
	}else{
		
		// 진료과
		$("input#departCodes").val( $("input#departCodes").val() + ',' + codes );
		$("input#departKorNm").val( $("input#departKorNm").val() + ',' + codeNms );
		
		if( $("input#departKorNm").val().startsWith(',') ){
			
			var val = $("input#departKorNm").val();
			
		 	$("input#departKorNm").val( val.substring(1 , val.length ) );
			
		}
		
	}
	
	
}

*/

$(function() {

	var boardApp = new App.board.Common();

	boardApp.init();
	
	
	
	
	// 뷰페이지에서 카테고리 영역 div 비어있으면 영역 삭제
	if( $(".bn-view-common01 .extend-field > dl").length == 0 ){
		$(".bn-view-common01 .extend-field").remove();
	}
	
	// 뷰페이지에서 첨부파일 영역 div 비어 있으면 삭제
	if( $(".bn-view-common01 .attach-files li").length == 0 ){
		$(".bn-view-common01 .attach-files").remove();
	}
	
	// 등록페이지 확장필드 스타일 없으면 기본 스타일 적용( input ) 
	$("div.customfield input").each(function(){
			
		if( !$(this).hasClass("b-input") ){
		 	$(this).addClass("b-input");
		 }
		
	});
	
});

App.board.Common = function() {

	var self;

	return {
		init: function() {
			self = this;

			// selectBox  검색, 쓰기 셀렉트박스 바인딩
			self.selectBoxBind();

			// sns 로 보내기 버튼 이벤트 바인딩
			self.bindSendSnsBtn();

			// 에디터 바인딩
			self.bindEditor();

			// 추천 반대 이벤트 바인딩
			self.clickRecommend();

			// 2차 분류 셀렉트 박스 동적 로딩
			self.loadCategory2Depth();

			// 캘린더 datepicker, class 에 calendar 가 있으면 datepicker 생성
			self.datePicker();

			// 이메일 도메인 선택
			self.bindEmailDomain();

			// 공지 체크
			self.noticeCheck();

			// 공지일때 정렬번호 및 문구 여부 체크
			self.orderNoUserCheck();

			// 첨부 파일 버튼 바인딩
			self.initAttachButton();

			// 쓰기폼 유효성 체크
			self.formValid();

			// 답글 쓰기폼 유효성 체크
			self.replyfromValid();

			// 비밀번호 입력 유효성 체크
			self.bindPassword();

			// 기타 바인딩
			self.bindEtc();

			// 플래시 맵이 존재하면 메시지 출력
			self.showFlashMessage();

			// tag
			self.tagInput();

			// captcha
			self.bindCaptcha();

			// faq 클릭
			self.faqOpen();

			// 썸네일 이미지 첨부 대체텍스트 필수
			self.thumbAltCheck();

			// 게시판 복사
			self.popBoardList();

			//FAQ 답변 toggle 메소드
			self.toggleText();


		},
		thumbAltCheck : function(){

			$('.thumb').change(function(){

				var $this = $(this), val = $this.val(), alt = $this.parent().siblings().children('.file-alt'), isImg = /\.(png|bmp|jpg|gif)$/i.test(val);

				if( alt.length > 0 ) {

					if(val !== '' && isImg ) {
						if ( alt.val() == '' ){
							alt.addClass('jwvalid-must');
						}
					} else {
						alt.removeClass('jwvalid-must');
					}

				}

			});

		},
		faqOpen : function(){


			self = this;
      		$box = $(".board-faq-list li");

      		$box.each(function(){

	        		$(this).find("a.faqTitle").click(function(){

	        		  if($(this).parent().siblings(".board-faq-answer").is(":hidden")){
				        $(this).parent().siblings(".board-faq-answer").slideDown();
				        $(this).addClass("faq-close");
			      } else if($(this).parent().siblings(".board-faq-answer").is(":visible")){
				        $(this).parent().siblings(".board-faq-answer").slideUp();
				        $(this).removeClass("faq-close");
			      }
				  return false;

	        		});

      		});

		},

		//FAQ 답변 toggle 메소드
		toggleText: function() {
			$('.faq .toggleTitle').click(function( event ) {
				var $this = $(this);
				$this.closest('.b-quest-box').next('.b-ans-box').slideToggle(0);
				return false;
			});
		},

		// 셀렉트 박스
		selectBoxBind : function(){

			// 커스텀 셀렉트박스외 영역 클릭시 감춤
			$(document).on('click',':not(.b-sel-box)',function( e ) {

				var parentSelectBox = $(e.target).closest('.b-sel-box');

				if(parentSelectBox.length == 0) {
					// 셀렉트 박스 외의 영역 클릭시  모든 셀렉트 박스 감춤
					$('.b-sel-box ul').hide();
				} else {
					// 셀렉트 박스 안을 클릭시 자신의 셀렉트박스 외의 셀렉트 박스 감춤
					var ul = parentSelectBox.find('ul').get(0);
					$('.b-sel-box ul').each(function() {
						if(this !== ul) {
							$(this).hide();
						}
					});
				}
			});

			// 커스텀 셀렉트박스 option 클릭시
			$(document).on("click",".b-sel-box .select-option",function(e) {

				e.preventDefault();

				var value    = $(this).attr("data-value");
				var text    = $(this).text();

				var $container =  $(this).closest('.b-sel-box');

				$container.find('input[type=hidden]').val(value);

				// 선택된 option 텍스트 표시
				$container.find("a.b-sel-title").text(text);

				$container.find('li').removeClass('selected');

				if(value !== '' && value !== undefined) {
					$(this).parent('li').addClass('selected');
				}

				if(!$container.is('.cate-box')) {
					return;
				}

				// 카테고리일 경우
				// 하위 뎁스가 존재하면

				// 1. 하위의 모든 카테고리 초기화
				var cateBox = $container;
				while((cateBox = cateBox.next('.cate-box')).length > 0) {
					cateBox.find('input[data-category-name]').val('');
					cateBox.find('a.b-sel-title').text( cateBox.find('label').text() );
					cateBox.find('li:not(:first)').remove();
					cateBox.addClass('disabled');
				}

				// 하위 뎁스의 옵션 추가
				var cateBox = $container.next('.cate-box');
				if(cateBox.length > 0) {

					var children = findChildren(value);

					if(children.length > 0) {

						cateBox.removeClass('disabled');
						var $ul = cateBox.find('ul');
						for(var i=0; i<children.length; i++) {
							var item = children[i];
							$ul.append('<li><a href="#category" class="select-option" data-value="' + item.categoryId + '" title="' + item.categoryNm + '">'+ item.categoryNm +'</a></li>');

						}

					}
				}


			});

			// 커스텀셀렉트 박스를 클릭하면 리스트 보임/감춤
  	        $(document).on('click','.b-sel-box',function(){
  	        	var $box = $(this);
  	        	// 비활성이면 클릭 금지
  	        	if($box.is('.disabled')) {
  	        		return false;
  	        	}

				$('.b-sel-box').css('z-index',0);
  	        	$box.css({zIndex: $box.find("ul").is(":hidden")? 10: 0  });
		        $box.find("ul").toggle();

	        });

	        // 일반 카테고리 셀렉트박스를 클릭하면 하위 카테고리 셀렉트박스 옵션 변경
	        $('select[data-category-name]').change(function() {

	        	var $this = $(this), self = this, value = $this.val();

				// 1. 하위의 모든 카테고리 초기화
	        	var nextsibling = false, $next;
	        	$('select[data-category-name]').each(function() {
	        		if(nextsibling && !$next) {
	        			$next = $(this); // 다음 카테고리
	        		}
	        		if(nextsibling) {
						$(this).val('');
						$(this).find('option:not(:first)').remove();
						$(this).attr('disabled','disabled');
	        		}
	        		if(self == this) nextsibling = true;
	        	});

	        	// 하위 카테고리의 옵션 추가
				if($next) {

					var children = findChildren(value);

					if(children.length > 0) {

						$next.removeAttr('disabled');
						for(var i=0; i<children.length; i++) {
							var item = children[i];
							$next.append($('<option>',{value:item.categoryId,text:item.categoryNm}));
						}

					}
				}

	        });

	        // 트리에서 찾기
	        function findChildren( categoryId ) {
	        	var stack = [categoryItems];
	        	while(stack.length !== 0) {
	        		var items = stack.pop();
	        		for(var i=0; i<items.length; i++) {
	        			var item = items[i];
	        			if(item.categoryId == categoryId) {
	        				return item.children || [];
	        				break;
	        			}
	        			if((item.children || []).length > 0) {
	        				stack.push( item.children );
	        			}
	        		}
	        	}
	        	return [];

	        }


			// 커스텀 셀렉트박스 초기값 설정
			function init( $box ) {

				var val = $box.find('input[type=hidden]').val(), text;
				$box.find('[data-value]').each(function( index, item ) {
					var $item = $(item);
					if(index == 0 && !$item.attr('data-value')) {
						text = $item.text();
					}
					if($item.attr('data-value') == val) {
						if(val !== '' && val !== undefined) {
							$item.parent().addClass('selected');
						}
						text = $item.text();
						return false;
					}
				});
				$box.find("a.b-sel-title").text(text);

			}

			// 커스텀 셀렉트박스 초기값 적용
  	        $(".b-sel-box").each(function(){
  	        	var $box = $(this);
				init( $box );

				if($box.find('li').length <= 1) {
					$box.addClass('disabled');
				}

	        });

	        // 검색 클릭시 name 을 마지막 카테고리 셀렉트박스에 적용한다. (검색 : srCategoryId, 쓰기 : categoryId)
	        $('form').filter(function() {

	        	return /get/i.test($(this).attr('method'));

	        }).submit(function() {

	        	var cateList = $('[data-category-name]');
	        	cateList.removeAttr('name');
	        	for(var i=cateList.length-1; i>=0; i--) {

	        		var $cate = $(cateList[i]);
	        		var val = $cate.val();
	        		if(val !== '' && val !== undefined) {
	        			$cate.attr('name',$cate.attr('data-category-name'));
	        			break;
	        		}
	        	}


	        });

	        // 저장 클릭시 name 을 마지막 카테고리 셀렉트박스에 적용한다. (검색 : srCategoryId, 쓰기 : categoryId)
	        $('form[name=writeForm]').submit(function() {

	        	var cateList = $('[data-category-name]');
	        	cateList.removeAttr('name');
	        	cateList.removeClass('jwvalid-must');

	        	// 커스텀 셀렉트 박스
	        	var $items = $('.b-sel-box.cate-box');
	        	for(var i=$items.length-1; i>=0; i--) {
	        		var $box = $($items[i]);
	        		if($box.find('li').length > 1) { // 리스트가 존재하는 셀렉트박스에 name 과 jwvalid-must 를 넣어주어서 필수체크와 서버 전송값으로 지정
	        			var $input = $box.find('input[data-category-name]');
	        			// data-valid-must 어트리뷰트가 있는경우만 jwvalid-must 클래수 추가
	        			if($input.is('[data-valid-must]')) {
	        				$input.addClass('jwvalid-must');
	        			}
	        			$input.attr('name',$input.attr('data-category-name'));
	        			break;
	        		}
	        	}

	        	// 일반 셀렉트 박스
	        	var $items = $('select[data-category-name]');
	        	for(var i=$items.length-1; i>=0; i--) {
	        		var $box = $($items[i]);
	        		if($box.find('option').length > 1) { // 리스트가 존재하는 셀렉트박스에 name 과 jwvalid-must 를 넣어주어서 필수체크와 서버 전송값으로 지정
	        			if($box.is('[data-valid-must]')) {
	        				$box.addClass('jwvalid-must');
	        			}
	        			$box.attr('name',$box.attr('data-category-name'));
	        			break;
	        		}
	        	}


	        });



		},
		tagInput: function() {
			if($('input.tag').length == 0) {
				return;
			}
			$('input.tag').tagit({
				// 자동 완성 ajax
				allowSpaces: true,
				autocomplete: {
					source: function( search, showChoices ) {
					    $.ajax({
							dataType: 'json',
					        url: ctx+'/cms/plugin/tag/searchTag.do',
					        data: {
					            'tag': search.term,
					            'limit': 10
					        },
					        cache: false,
					        success: function( json ) {
					        	if(json.success) {
					        		showChoices(json.items);
					        	}
					        }
					    });
					}
				}
			});

			$('.ui-autocomplete-input').val(" + TAG");
			$('.ui-autocomplete-input').autosizeInput();

			$('.ui-autocomplete-input').focus(function(){
					$(this).val('');
					$(this).data('autosizeInputInstance').update();
					$(this).css('color','#555555');
			});

			$('.ui-autocomplete-input').blur(function(){
					$(this).val(' + TAG');
					$(this).data('autosizeInputInstance').update();
					$(this).css('color','blue');
			});

		},
		bindEtc: function() {

			// 본인글만 확인가능 메시지
			$('a[href="#secureArticle"]').click(function(e) {
				e.preventDefault();
				toastr.error($m('본인만조회가능'));

			});

			// 게시물 삭제버튼 바인딩
			$('.attch-del-check').click(function() {
				var isDel = this.checked;
				if(isDel) {
					//$(this).parent('li').addClass('deleted');
					$(this).siblings('.del').addClass('deleted');
				} else {
					//$(this).parent('li').removeClass('deleted');
					$(this).siblings('.del').removeClass('deleted');
				}

			});

			// 처리 전 질문
			$('a[data-confirm]:not(.adm)').click(function() {

				if(confirm($m($(this).attr('data-confirm')))) {
					return true;
				}

				return false;

			});


			// 처리 전 질문
			/*$('a[data-confirm]').not('.adm').not('.college_schedule').click(function() {

				if(confirm($m($(this).attr('data-confirm')))) {
					return true;
				}

				return false;

			});
			*/

		},
		/**
		 * 이메일 도메인 선택
		 */
		bindEmailDomain: function() {

			$('select.email-domain').each( function() {
				self.changeDomain( $(this) )
			});

			$('select.email-domain').change( function() {
				self.changeDomain( $(this) );
			});

		},
		changeDomain: function( $select ) {

			var val  =  $select.val(), $input = $select.prev('input');

			if(val) {
				$input.val(val);
			}

			if(!val) {
				// 도메인 입력필드를 텍스트 로변경
				$input.attr('type','text');
				//setTimeout( function() {$input.focus();},100 );

			} else {
				// 도메인 입력필드를 히든으로변경
				$input.attr('type','hidden');
			}

		},
		/**
		 * 플래시 맵이 존재하면 메시지 출력
		 */
		showFlashMessage: function() {

			if( $('.flash-map').length > 0 ) {

				$('.flash-map').each(function() {
					// 이전 스크립트에서 호출 했으면 스킵
					if(!$(this).data('flash-map')) {
						showAlert($(this).text());
						$(this).data('flash-map',true)
					}

				});

			}

		},
		/**
		 * sns 로 보내기 버튼 이벤트
		 */
		bindSendSnsBtn: function () {

			$('.lsns-lnk-btn').click(function() {
				var $this = $(this);
				jwxe_popupWindow( $this.attr('href'), $this.attr('data-width'), $this.attr('data-height'), $this.attr('data-sns'), "yes", "yes");
				return false;
			});

		},
		/**
		 * 에디터 바인딩
		 */
		bindEditor: function() {

			$('textarea.editor').each( function( index ) {

				var height = $(this).attr('data-editor-height') || 300;

				var editor = initEditor({
					height: height,
					index: index,
					$textarea: $(this),
					el: this
				});
				$(this).data('editor', editor);


				/*
				var editorHeight = $(this).attr('data-editor-height') || 200;
				var editor = initEditor(this , resPath + 'js/ck_config.js', editorHeight);
				// 에디터를 textarea 저장소에 담아 둔다.
				$(this).data('editor', editor);
				*/


			});


		},
		/**
		 * 2차 분류를 동적으로 로딩 한다.
		 */
		loadCategory2Depth: function() {

			if($('#category2').length ==0) {
				return;
			}

			$('#category1').change(function() {

					var $cate1 = $(this), $cate2 = $('#category2'), value = $cate1.val();

					$cate2.val('');
					//selectBox bug fix
					$cate2.next('a').find('span.ui-selectBox-label').text( $cate2.find('option:eq(0)').text() );

					if(!value) {
						$cate2.find('option:not(:eq(0))').remove();
						return;
					}

					$cate2.parent().spinStart();

					$.ajax({
						url: ctx+'/app/board/board.do',
						cache: false,
						data: {
							mode: 'loadSubCategory',
							mstCategoryId: value
						},
						dataType: 'json',
						error: function() {
							$cate2.parent().spinStop();
						},
						success: function(data) {

							$cate2.parent().spinStop();

							if(typeof(data.success) != 'undefined' && data.success == true) {

								$cate2.find('option:not(:eq(0))').remove();

								for(var i=0; i<data.items.length; i++) {

									$cate2.append($('<option>',{
										value: data.items[i].id,
										text: data.items[i].categoryNm
									}));


								}


							}
						}

					});

			});


		},
		/**
		 * 폼 유효성 검증
		 */
		formValid: function() {

			// 에디터 내용을 textarea 로 옮긴다.
			$('form[name=writeForm]').submit(function() {

				if($(this).data('complete')) {
					alert('서버로 전송중 입니다.');
					e.stopImmediatePropagation();
					return false;
				}


				$('textarea.editor').each(function() {

					var editor = $(this).data('editor');

					$(this).val( editor.getData() );

				});

				// 개인정보 보호 동의
				if($('input[name=infoProtectYn]').length > 0) {
					if($('input[name=infoProtectYn]:checked').val() !== 'Y') {
						alert('개인정보 보호 동의해 체크해야만 등록이 가능합니다.')
						return false;
					}
				}
				
				// 대상 사이트 선택 
				if($('input[name=siteCheckList]').length > 0) {
					
					var siteCheckList = ",";
					var total = $('input[name=siteCheckList]:checked').length;
					
					$('input[name=siteCheckList]:checked').each(function(index){
						
						siteCheckList += $(this).val() + "," ;
						
						
					});
					
					$("#checkSite").val( siteCheckList );
				}
				
				
				// 질병분류 선택 
				if($('input[name=illnessCheckList]').length > 0) {
					
					var illnessCheckList = ",";
					var total = $('input[name=illnessCheckList]:checked').length;
					
					$('input[name=illnessCheckList]:checked').each(function(index){
						
						illnessCheckList += $(this).val() + "," ;
						
						
					});
					
					$("#check-illness").val( illnessCheckList );
				}
				
				
				// 질환분류 선택 
				if($('input[name=diseaseCheckList]').length > 0) {
					
					var diseaseCheckList = ",";
					var total = $('input[name=diseaseCheckList]:checked').length;
					
					$('input[name=diseaseCheckList]:checked').each(function(index){
						
						diseaseCheckList += $(this).val() + "," ;
						
						
					});
					
					$("#check-disease").val( diseaseCheckList );
				}
				
				

				return true;

			});

			$('form[name=writeForm]').formValid({
				beforeSubmit: self.validate
			});

			$('form[name=writeForm]').submit(function(e) {
                $(this).data('complete',true);
			});

			/*
			$('form[name=writeForm]').formValid({
				title: [
					{title: 'writer',	text: $m('writer')	},
					{title: 'emailid',	text: '이메일 아이디'	},
					{title: 'emaildomain',	text: '이메일 도메인'	},
					{title: 'cate1', text: '1차분류'},
					{title: 'cate2', text: '2차분류'},
					{title: 'category', text: $m('category')},
					{title: 'summary', text: '요약글'},
					{title: 'alt', text: '이미지 대체텍스트'},
					{title: 'youtobe', text: '동영상'},
					{title: 'img', text: '이미지'}


				],
				alertFunction: toastr.error,
				beforeSubmit: self.validate
			});
			*/
		},

		replyfromValid : function(){

			// 에디터 내용을 textarea 로 옮긴다.
			$('form[name=reply-write]').submit(function() {

				if($(this).data('complete')) {
					alert('서버로 전송중 입니다.');
					e.stopImmediatePropagation();
					return false;
				}


				$('textarea.editor').each(function() {

					var editor = $(this).data('editor');

					$(this).val( editor.getData() );

				});

				return true;

			});

			$('form[name=reply-write]').submit(function(e) {
                $(this).data('complete',true);
			});


		},

		/**
		 * 폼 검증 후 세부 검증
		 */
		validate: function() {

			// 상단공지 옵션이 있을경우
			if($('#topNoticeYn').length > 0) {

				var checked = $('#topNoticeYn').get(0).checked;

				// 공지에 체크가 되어있지 않으면 시작일 종료일을 지운다.
				if(!checked) {
					$('#noticeStartDt').val(''); $('#noticeEndDt').val('');
				} else {
					if(!$('#noticeStartDt').val() || !$('#noticeEndDt').val()) { // 기간 선택이 없으면 유효성 오류
						toastr.error('공지 기간을 선택 해 주세요');
						return false;
					}
					if($('#noticeStartDt').val() > $('#noticeEndDt').val()) {
						toastr.error('공지 시작일이 종료일 보다 클 수 없습니다.');
						return false;
					}
				}

			}

			return true;
		},
		/**
		 * 공지 여부 체크
		 */
		noticeCheck: function() {

			if($('#topNoticeYn').length == 0) {
				return;
			}

			var toggle = function() {
				var checked = $('#topNoticeYn').get(0).checked;
				if(checked) {
					/*disabled는 값이 전송되지 않으므로 readonly로 수정*/
					$('#noticeStartDt').removeAttr('readonly').removeClass('dark');
					$('#noticeEndDt').removeAttr('readonly').removeClass('dark');
				} else {
					$('#noticeStartDt').attr('readonly','readonly').addClass('dark').val('');
					$('#noticeEndDt').attr('readonly','readonly').addClass('dark').val('');
				}

			}

			toggle();

			//공지 여부를 체크하면 기간 텍스트 박스를 활성/비활성한다.
			$('#topNoticeYn').click( toggle );


		},
		/**
		 * 공지일때 정렬 번호 및 문구 여부 체크
		 */
		orderNoUserCheck: function() {

			if($('#topNoticeYn').length == 0) {
				return;
			}

			var toggle = function() {
				var checked = $('#topNoticeYn').get(0).checked;
				if(checked) {
					$('#order-no-user').attr('readonly','readonly').addClass('dark').val('');
					$('.orderNoUserInfo').css('display','none');
				} else {
					$('#order-no-user').removeAttr('readonly').removeClass('dark');
					$('.orderNoUserInfo').css('display','initial');
				}

			}

			toggle();

			//공지 여부를 체크하면 정렬번호 텍스트 박스 및 문구를 활성/비활성한다.
			$('#topNoticeYn').click( toggle );


		},
		datePicker: function() {

			$('input.calendar').datepicker({
				dateFormat: 'yy-mm-dd',
				showMonthAfterYear: true,
				buttonImageOnly: true,
				changeMonth: true,
				changeYear: true
			});

		},

		changeAttachCount: function( cnt ) {

			$('.file-list').each(function( index ) {
				$(this).css('display', cnt > index ? 'block':'none') ;
			});

		},
		/**
		 * 첨부 파일 버튼 바인딩
		 */
		initAttachButton: function() {

			// 첨부 갯수 선택
			self.changeAttachCount( $('#attachCnt').val() );
			$('#attachCnt').change(function() {

				self.changeAttachCount( $(this).val() );

			});

			// 첨부 파일이 선택되면 텍스트에 뿌려준다.
			$('input[type=file]').change(function() {

				var $this = $(this);

				$this.prev('.file-prev-view').val( $this.val() );

			});

		},
		bindPassword: function() {

			$('form[name=password]').formValid({
				alertFunction: toastr.error
			});

		},

		/**
		 * 추천 반대 이벤트 바인딩
		 */
		clickRecommend: function() {

			$('.recommend').click(function(e) {

				var $this = $(this), articleNo = $('input[name=articleNo]').val(), mode = $this.attr('data-type');

				e.preventDefault();


				$.ajax({
					url:'/_common/jsp/recommend/set_point.jsp?dc='+new Date().getTime(),
					data: {
						mode: mode,
						article_no: articleNo
					},
					dataType: 'json',
					success: function(data) {
						if(typeof(data.success) != 'undefined') {
							if (data.success == true) {
				  			//$this.html('<em>' + data.cnt + '</em>');
							$this.parent().find(".goodCnt").text( data.cnt );
							$this.removeClass("board-like").addClass("board-like-active");
				  		} else {
								if(data.msg) {
									//alert(data.msg);
									alert("이미 좋아요 를 클릭한 게시글 입니다.");
								}
							}
						}
					}
				});

			});

		},

		/**
		 * 게시글 등록시 캡챠
		 */
		bindCaptcha : function() {

			rand = Math.random();
			$('#jwxe_catpcha').html('<img src="' + ctx + '/cms/CaptCha.jsp?rand=' + rand + '" style="float:left;" />');



			$('#captcha_reLoad').click(function(){ self.bindCaptcha()  }); //새로고침버튼에 클릭이벤트 등록
			$('#captcha_soundOn').click(function(){ self.bindAudioCapcha(0); });	//음성듣기버튼에 클릭이벤트 등록
			$('#captcha_soundOnKor').click(function(){ self.bindAudioCapcha(1); }); //한글음성듣기 버튼에 클릭이벤트 등록

		},

		/**
		 *  캡챠 오디오 요청
		 */
		bindAudioCapcha : function(type){

			var kor = (type > 0) ? "lan=kor&":"";
			$.ajax({
				url: ctx+'/cms/captcha/audio.do',
				type: 'POST',
				dataType: 'text',
				data: {rand: rand, ans : 'y'},
				async: false,
				success: function(resp) {
					var uAgent = navigator.userAgent;
					var soundUrl = ctx+'/cms/captcha/audio.do' + kor + 'rand=' + rand + '&ans=' + resp;

					if (uAgent.indexOf('Trident') > -1 || uAgent.indexOf('MSIE') > -1) {
						winPlayer(soundUrl+'&agent=msie');
					} else if (!!document.createElement('audio').canPlayType) {
						try { new Audio(soundUrl).play(); } catch(e) { winPlayer(soundUrl); }
					} else window.open(soundUrl, '', 'width=1,height=1');
				}
			});
		},
		popBoardList : function(){
			$('#copy').click(function(){
				jwxe_popupWindow( '/_custom/' + clientId + '/_common/boardList/app.do?boardTy=' + boardTy + '&boardNo=' + boardNo + '&siteId=' + siteId, "1200", "800", true, true);
			});
		}

	}
}

toastr.options = {
		closeButton: true,
		"debug": false,
		"positionClass": "toast-top-right",
		"timeOut": "3000"
}


function showAlert( msg ) {
	alert(msg);
}

