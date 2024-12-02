var activeAjaxConnections = 0;
(function($) {
	$(document).ajaxComplete(function (event, xhr, settings) {
		if(settings.url.startsWith('/api') || settings.url.startsWith('/cryptData')) {
			if (--activeAjaxConnections <= 0) {
		        activeAjaxConnections = 0;
		        $(".progress_loading").remove();
		      }
			
	//		if(bodyScroll !== undefined)
	//			bodyScroll(false);
		}
		
	}).ajaxError(function (event, jqxhr, settings, thrownError) {
		if(settings.url.startsWith('/api') || settings.url.startsWith('/cryptData')) {
			if (--activeAjaxConnections <= 0) {
		        activeAjaxConnections = 0;
		        $(".progress_loading").remove();
		      }
	//		if(bodyScroll !== undefined)
	//			bodyScroll(false);
			try{
				var response = JSON.parse(jqxhr.responseText);
				Yonsei.Modal.alert({
					content: response.result.message || "error"
				});
			} catch(e) {
				
			}
		}
		return;
	}).ajaxSend(function (event, req, settings) {
		req.setRequestHeader("AJAX", "true");
		if(!settings.hasOwnProperty('dataType')) settings.dataType = 'JSON';
		if(settings.url.startsWith('/api') || settings.url.startsWith('/cryptData')) {
			activeAjaxConnections++;
			if($(".progress_loading").length == 0) {
				$("body").append([
					'<div class="progress_loading modal-popup modal-loader show" style="z-index:1120;">'
					,     '<div class="dimed"></div>'
					,     '<div class="popup-inner">'
					,         '<div class="loader-inner ball-triangle-path">'
					,             '<div></div>'
					,             '<div></div>'
					,             '<div></div>'
					,         '</div>'
					,     '</div>'
					, '</div>'		
					].join(''));
			}
		}
	});

	$(document).ready(function(){

		var url = window.location.href;
		// 비자체검사 페이지 스크립트
		if(url.indexOf("/patient-carer/appointment/visa/") > -1) {
			
			$('.btn.btn-lg.btn-primary.btn-round').click(function(){
				if(!$('#visaCheck1').prop('checked')) {
	        		Yonsei.Modal.alert({
                		content : '<p class="al-center">위 내용 확인 후 진행해주시기 바랍니다.</p>'
              		});
	 	            return false;
	        	}

				// 기관코드 체크
				var insttCode = Yonsei.Util.insttCodeByUrl(url);
				var nation = url.substring(url.lastIndexOf('/')+1, url.indexOf('.do'));
				window.open('/online/online.do?visaYn=Y&insttCode='+insttCode+"&nation="+nation);
			});
		}
		// 자원봉사 안내
		else if(url.indexOf("/story/volunteer/info.do") > -1) {
			$('#tab-content3 .btn-section.h-60 > a').removeAttr('target');
			$('#tab-content3 .btn-section.h-60 > a').click(function(){
				location.href="volunteering.do";
				return false;
			});
		}
		// 병원 인트로 페이지 스크립트
		else if(url.indexOf("/intro.do") > -1) {
			$('.intro-cont .intro-search-form .form-group .btn-icon-box .btn').click(function(){
				var keyword = $('.intro-input').val();
				if(keyword == "") {
					Yonsei.Modal.alert({
		        		content : '검색어를 입력해주세요. '
		      		});
					return false;
				}
				
				var u = new URL(url);
      		  	var siteId = u.pathname.substr(1).split('/')[0];
      		  	
      		  	var language = 'ko';
				var s_site_cd = Yonsei.Util.searchSSiteId(siteId);
				var m_site_cd = Yonsei.Util.searchMSiteId(siteId);
				window.open("/search/result?m_site_cd="+m_site_cd+"&s_site_cd="+s_site_cd+"&language=ko&keyword="+keyword);
			});
		}
		// 예약안내 페이지 스크립트
		else if(url.indexOf("/patient-carer/appointment/treatment/apt-guide.do") > -1) {
			
			// 기관코드 체크
			var insttCode = Yonsei.Util.insttCodeByUrl(url);
			
			$('#agree1').attr('checked', false);
			$('#phone2, #phone3').keyup(function(){
				if($(this).val().length > 4) {
					$(this).val($(this).val().substring(0,4));
				}
			});
			
			$('#tab-content1 .btn.btn-lg.btn-block.btn-primary.btn-round').click(function(){
				
				if($('#phone2').val() == "" || $('#phone3').val() == "") {
	        		Yonsei.Modal.alert({
                		content : '<p class="al-center">연락처를 입력해주세요.</p>'
              		});
	        		return false;
	        	}
				if($("input[name=clnReqDocYn]").prop("checked") == true){
					
					if($('#reqHosNm').val() == "") {
		        		Yonsei.Modal.alert({
	                		content : '<p class="al-center">의뢰병원을 입력해주세요.</p>'
	              		});
		        		return false;
		        	}
					
					if($('#drNm').val() == "") {
		        		Yonsei.Modal.alert({
	                		content : '<p class="al-center">의뢰의사를 입력해주세요.</p>'
	              		});
		        		return false;
		        	}
				}
			
				
	        	if (!$('#agree1').prop('checked')) {
	        		Yonsei.Modal.alert({
                		content : '<p class="al-center">개인정보 수집에 동의해주셔야 간편예약 신청이 가능합니다.</p>'
              		});
	 	            return false;
	        	}
	        	
	          	var $modal = Yonsei.Modal.confirm({
	            	title : '간편예약',
	            	content : '<p class="al-center">신청하시겠습니까?</p>',
	            	callback : {
	              		okBtn : function() {
	                		
	              			var hpNo = $('#phone1').val()+"-"+$('#phone2').val()+"-"+$('#phone3').val()
	              			var	reqHosNm = "";
	              			var	drNm = "";
	              			var	drLcnsNo = "";
	              			var clnReqDocYn = "N";
	              			if($("input[name=clnReqDocYn]").prop("checked") == true) {
	              				clnReqDocYn = $("#clnReqDocYn1").val()
	              				reqHosNm = $("#reqHosNm").val()
		              			drNm = $("#drNm").val()
		              			drLcnsNo = $("#drLcnsNo").val()
	              			}
	      		            var data = {
	      		                insttCode : insttCode, 
	      		                hpNo : hpNo,
	      		                reqHosNm : reqHosNm,
	      		              	drNm : drNm,
	      		            	drLcnsNo : drLcnsNo,
	      		            	clnReqDocYn : clnReqDocYn
	      		            }
	      		            
	      		            $.ajax({
	      		              	url : '/api/hospital/online/simpleReservation.do',
	      		              	type : "GET",
	      		              	data : data,
	      		              	success : function(result) {
	      		                	if (result.result.status == 'success') {
	      		                		Yonsei.Modal.alert({
	      		                    		content : '<p class="al-center">간편예약 신청이 완료되었습니다.</p>',
	      		                    		callback : {
	      		                                closeBtn : function() {
	      		                                  location.reload();
	      		                                }
	      		                              }
	      		                  		});
	      		                	} else {
	      		                		if(result.data && result.data.errorMsg) {
	          		                		Yonsei.Modal.alert({
	          		                  			content : ['<p classs="al-center">'
	          		                    			,result.data.errorMsg.replace(/\n/g, '<br/>')
	          		                    			,'</p>'].join('')
	          		                		});
	          		              		}
	          		              		else {
	          				                Yonsei.Modal.alert({
	          				                  content : ['<p classs="al-center">'
	          				                    ,result.result.message
	          				                    ,'</p>'].join('')
	          				                });
	          		            		}
	      		                	}
	      		              	},
	      		              	error : function() {}
	      					});
	              			
	              		}
	            	}
	          	});
			});
			
			// 위치 및 오시는길
			$('#tab-content3 .cont-right.btn-text-bottom').find('button:eq(0)').click(function(){
				var hosPath = location.pathname.substr(1).split('/')[0];
				location.href="/"+hosPath+"/about/location-map.do";
			});
			
			// 주차장 안내
			$('#tab-content3 .cont-right.btn-text-bottom').find('button:eq(1)').click(function(){
				var hosPath = location.pathname.substr(1).split('/')[0];
				location.href="/"+hosPath+"/about/location-parking.do";
			});
			
			// 온라인 예약
			$('#tab-content4 .btn.btn-lg.btn-primary.btn-round').click(function(){
				var data = {
					insttCode : insttCode
            	}
	           	Yonsei.Util.clearSession('online');
				var success = Yonsei.Util.setSessionItem(data, 'online');
				if (success) {
					var insttCode = Yonsei.Util.insttCodeByUrl(url);
					window.open('/online/online.do?insttCode='+insttCode);
				}  
			});
		}
		
		$("div.icon-shortcut-slider .item.certificate").click(function(){
			Yonsei.Modal.alert({content : "준비중 입니다."});
		});
	});
})(jQuery)