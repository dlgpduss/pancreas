function locationChage(text_current){

	if ( text_current != "" ){
		
		
		
		var ul = $("ul.breadcrumbs");

		var li1 = "";
		var li2 = "";
		var li3 = "";
		var li4 = "";

		var li1_cnt = 1;
		var li2_cnt = 1;
		var li3_cnt = 1;
		var li4_cnt = 1;

		var a_current = "";
		var ul_current = "";
		//var text_current = "<c:out value="${pageLocation}" />";
		
		var a_class = "";	//a태그 

		var dept2_text = "";
		//병원소개,진료예약 타이틀은 2개메뉴에서 사용중이라 url로 어디메뉴인지 판단
		var chk_url = new Array(2);
		chk_url[0] = new Array("/home/healthMedical/corporate/checkup/detail/maleProgram.do","/home/healthMedical/corporate/checkup/vip/maleProgram.do","/home/healthMedical/corporate/checkup/comp/maleProgram.do");
		//chk_url[1] = new Array("/home/healthMedical/corporate/checkup/vip/femaleProgram.do","/home/healthMedical/corporate/checkup/detail/femaleProgram.do","/home/healthMedical/corporate/checkup/comp/femaleProgram.do");


		chk_url[1] = new Array("/home/healthMedical/corporate/checkup/detail/femaleProgram.do","/home/healthMedical/corporate/checkup/vip/femaleProgram.do","/home/healthMedical/corporate/checkup/comp/femaleProgram.do")


		chk_url[2] = new Array("/home/healthMedical/corporate/reservation/reservation.do","/home/healthMedical/corporate/reservation/indHealthReserveView.do");
		chk_url[3] = new Array("/home/healthMedical/corporate/reservation/changeSchedule.do","/home/healthMedical/corporate/reservation/indChangeSchedule.do");
		
		// 미래의학연구원 연구부서
		chk_url[4] = new Array(		// 소개
				"/home/future/dept/sgi.do?tab=1",  	//	0
				"/home/future/dept/be.do?tab=1", 	//	1
				"/home/future/dept/sc.do?tab=1", 	//	2
				"/home/future/dept/bb.do?tab=1", 	//	3
				"/home/future/dept/bm.do?tab=1", 	//	4
				"/home/future/dept/la.do?tab=1", 	//	5
				"/home/future/dept/ctc.do?tab=1", 	//	6
				"/home/future/dept/oc.do?tab=1"		//	7
		);
		chk_url[5] = new Array(		// 업무
				"/home/future/dept/sgi.do?tab=2", 	//	0
				"/home/future/dept/be.do?tab=2", 	//	1
				"/home/future/dept/sc.do?tab=2", 	//	2
				"/home/future/dept/bb.do?tab=2", 	//	3
				"/home/future/dept/bm.do?tab=2", 	//	4
				/*"/home/future/dept/la.do?tab=2", 	//	5*/
				"/home/future/dept/ctc.do?tab=2", 	//	5
				"/home/future/dept/oc.do?tab=2"		//	6
		);
		chk_url[6] = new Array(		// 주요장비
				"/home/future/dept/sgi.do?tab=3",	//	0
				"/home/future/dept/bb.do?tab=3"		//	1
		);
		chk_url[7] = new Array(		// 주요보직자
				"/home/future/dept/sgi.do?tab=4", 	//	0
				"/home/future/dept/be.do?tab=3",	// 	1
				"/home/future/dept/sc.do?tab=3", 	//	2
				"/home/future/dept/bb.do?tab=4", 	//	3
				"/home/future/dept/bm.do?tab=3", 	//	4
				"/home/future/dept/la.do?tab=3", 	//	5
				"/home/future/dept/ctc.do?tab=3" 	//	6
		);
		// 미래의학연구원 연구 부서 끝
		
		
		
		var chk_index1 = "";
		var chk_index2 = "";
		
		var loop_cnt = 1;
		
		for(var i = 0 ; i < chk_url.length; i++){
			
			for(var j = 0 ; j < chk_url[i].length; j++){

				if ( chk_url[i][j].indexOf(url) > -1 ) {
					
					//배열자리저장
					chk_index1 = i;
					chk_index2 = j;
					
				}
				
			}

		}
		//url = "/home/reservation/onlineReservation.do";		

		$(".dev_menu a").each(function(i){
			
			if ( $(this).text() == text_current ) {
				
				if ( chk_index2+1 < loop_cnt ){					
					return false;
				} else if ( chk_index2+1 > loop_cnt ) {					
					loop_cnt++;
					return true;
				}				
				
				$(this).parents('li').addClass("current");
				ul_current = $(this).parent().parent();
				dept2_text = $(this).parent().parent().parent().prev().text();
				
				if( dept2_text == "" ){
					dept2_text = $(this).text();
				}
				
				a_current = $(this);
				//alert(a_current.html())
				
				$("#location1 .location-text").text($(this).parents(".dev_menu").prev().text()); //1dept text
				$(".header-fixed em").text($(this).text()); //1dept text
				$( "em:contains('"+$(this).parents(".dev_menu").prev().text()+"')" ).parent().addClass("current");	//1dept current
				
				$(this).parents(".dev_menu").find("a").each(function(j){
					
					//2dept
					if ( $(this).hasClass("dev_inner-anchor") ) {
						
						if ( li3 == "" ) {
						
							li3 += "<a href=\"#\" class=\"location-label\"><span class=\"location-text\">"+dept2_text+"</span><i class=\"ico-location-expand\"></i></a>";
							li3 += "<ul class=\"location-child\">";
							li3 += "<li><a href=\""+$(this).attr("href")+"\">"+$(this).text()+"</a></li>";
							
						} else {
	
							//li3 += "<li><a href=\""+$(this).attr("href")+"\">"+$(this).text()+"</a></li>";

							if ($(this).attr("target"))
							{
								li3 += "<li><a href=\""+$(this).attr("href")+"\" target=\"_blank\" >"+$(this).text()+"</a></li>";
							}else if (!$(this).attr("target"))
							{
								li3 += "<li><a href=\""+$(this).attr("href")+"\">"+$(this).text()+"</a></li>";
							}
													
						}							
						
					} else {
					//3dept
						
						if ( ul_current.is($(this).parent().parent())) {
							
							//li활성화
							if ( a_current.is($(this)) ) {
								console.log(this);
								a_class = "class=\"current\"";
								
							} else {
								a_class = "";
							}
							
							if ( li4 == "" ) {
	
								li4 += "<a href=\"#\" class=\"location-label\"><span class=\"location-text\">"+text_current+"</span><i class=\"ico-location-expand\"></i></a>";
								li4 += "<ul class=\"location-child\">";
								li4 += "<li><a href=\""+$(this).attr("href")+"\""+a_class+">"+$(this).text()+"</a></li>";
								
							} else {
	
								li4 += "<li><a href=\""+$(this).attr("href")+"\""+a_class+">"+$(this).text()+"</a></li>";
													
							}
	
						}
					}
					
				});
	
				loop_cnt++;
				
			}
					
		});
		//2dept가 끝인메뉴
		$("dev_menu > a").each(function(i){
			//alert($(this).text());
			if ( $(this).text() == text_current ) {
				
				ul_current = $(this).parent().parent();
				
				a_current = $(this);
	
				
				if ( chk_index2 == "0" && loop_cnt > 1 ){
					
					return false;
				} else if ( chk_index2 == "1" && loop_cnt == 1 ) {
					loop_cnt++;
					return true;
				}
				
				$("#location1 .location-text").text($(this).parents(".dev_menu").prev().text());				
	
				$(this).parents(".dev_menu").find("a").each(function(j){
	
					if ( ul_current.is($(this).parent().parent())) {
	
						//li활성화
						if ( a_current.is($(this)) ) {
	
							a_class = "class=\"current\"";
							
						} else {
							a_class = "";
						}
						
						if ( li3 == "" ) {
						
							li3 += "<a href=\"#\" class=\"location-label\"><span class=\"location-text\">"+text_current+"</span><i class=\"ico-location-expand\"></i></a>";
							li3 += "<ul class=\"location-child\">";
							li3 += "<li><a href=\""+$(this).attr("href")+"\""+a_class+">"+$(this).text()+"</a></li>";
							
						} else {
	
							li3 += "<li><a href=\""+$(this).attr("href")+"\""+a_class+">"+$(this).text()+"</a></li>";
													
						}
						
					}
					
				});
			}
					
		});

		li3+= "</ul>";
		li4+= "</ul>";
		
		$("#location1").next().remove();
		$("#location1").next().remove();
		
		if ( li3 != "</ul>" ){
			$("#location1").parent().append("<li>"+li3+"</li>");
		}
		if ( li4 != "</ul>" ){
			$("#location1").parent().append("<li>"+li4+"</li>");
		}

		function setting_equal(){//글자가 같은놈 세팅 예) 오시는 길 밑에 오시는 길
			var parent_equal = $('.dev_menu > li.current');//2뎁스 메뉴인데 current있는경우
			if ($('.dev_menu > li').hasClass('current') && parent_equal.find('>a').text() == text_current)//2뎁스메뉴의 current 있는 경우와 그 텍스트와 현재페이지의 텍스트가 일치할 경우. text_current는 현재메뉴의 텍스트이다.
			{
				parent_equal.find('.sub-menu li').each(function(){//하위메뉴조사
					var thistxt = $(this).text();
					var thistxt02 = parent_equal.find('>a').text();
					if(thistxt == thistxt02){
						$(this).addClass('current')
					}
				})
			}
		}//setting_equal
		setting_equal();
	}
		
}

function logOut(){
	
	document.location.href = "/home/member/logout.do";
	
}

function Preparation(){
	alert('서비스 준비중입니다');
}