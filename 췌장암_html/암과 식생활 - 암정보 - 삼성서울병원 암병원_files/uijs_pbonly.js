 

$(document).ready(function(){
	//푸터 부서홈페이지, 패밀리사이트 확장부분	
	$('.expand-link-new .btn-expand-outer').click(function(){
		if ($(this).hasClass('on'))//닫기
		{
			$(this).removeClass('on').attr('aria-expanded', 'false').siblings().removeClass('on'); //a11y
			$('.outer-link-new').removeClass('on');
			$('#contentColumn, #contents').css('position','relative')//부서컨텐츠쪽
			quickmenu_onoff02();
			
		}else if (!$(this).hasClass('on')){//열기
			$(this).addClass('on').attr('aria-expanded', 'true').siblings().removeClass('on').attr('aria-expanded', 'false'); //a11y
			$('.outer-link-new').addClass('on');
			$('#contentColumn, #contents').css('position','static')//부서컨텐츠쪽
			quickmenu_onoff();
		}
		
		if ($(this).hasClass('btn-expand-dept'))//이건 뭐가됐든 레이어 여는것
		{
			$('.dept-link-new').addClass('on');
			$('.family-link-new').removeClass('on');
			$('#contentColumn, #contents').css('position','static')//부서컨텐츠쪽
		}else if($(this).hasClass('btn-expand-fm')){
			$('.family-link-new').addClass('on')
			$('.dept-link-new').removeClass('on');
			$('#contentColumn, #contents').css('position','static')//부서컨텐츠쪽
		}
	});
	$('#footer .btn_cls_layerlink').click(function(e){//닫기
		e.preventDefault();
		$('.dept-link-new, .family-link-new, .expand-link-new .btn-expand-outer').removeClass('on');
		$('.btn-expand-outer').attr('aria-expanded', 'false'); //a11y
		$('#contentColumn, #contents').css('position','relative')//부서컨텐츠쪽
		quickmenu_onoff02();
	});
	function quickmenu_onoff(){
		
		if ($(window).width() < 1590)
		{
			$('.quick_fixed_menu.abright').hide();
			//console.log($(window).width())
		}else{
			$('.quick_fixed_menu.abright').show();
		}
	}
	function quickmenu_onoff02(){
		
			$('.quick_fixed_menu.abright').show();
		
	}

	$(window).resize(function(){
		if ($('.dept-link-new').hasClass('on') || $('.family-link-new').hasClass('on') )
		{
			quickmenu_onoff();
		}
	})


var chk_pc_v2017 = function(){//check pc 버전
	var ua = navigator.userAgent.toLowerCase();
	if(ua.indexOf('msie 9') != -1){
		if (ua.indexOf('trident') != -1)
		{
			jQuery('body').addClass('ver_ie')		
			//alert('gh')
		}
	}else{
		if (ua.indexOf('trident') > -1)
		{	
			jQuery('body').addClass('ver_ie')		
			//alert('gh3')
		}
	}
}
chk_pc_v2017();

var check_ie_yes2017 = function(){ //ie여부 체크후 비디오 using_custom_vodplay 있으면 실행 교육인재개발실 외국인의학자연수
	if (jQuery('body').hasClass('ver_ie'))
	{
		if (jQuery('#smc_video_cust').length >0)
		{
			var vod = document.getElementById("smc_video_cust");
			var smc_video_pl = document.getElementById("smc_video_pl");
			smc_video_pl.addEventListener("click", function(){
				vod.play();
				smc_video_pl.style.display ="none";
			},false)

			//var jQusing_custom_vodplay = jQuery('.using_custom_vodplay');
			//for (z=1; z==jQusing_custom_vodplay.length ;z++ )
			//{
			//		var zero = '0'
			//}
			//한페이지에 여러개 들어갈때 맥스 네개 id다르게 하여 이벤트 등록해놓기
			//var jQusing_custom_vodplay = jQuery('.using_custom_vodplay');
			//if(jQusing_custom_vodplay.length ==4){
				
				//var vod04 = document.getElementById("smc_video_cust04");
				//var smc_video_pl04 = document.getElementById("smc_video_pl04");
				//smc_video_pl04.addEventListener("click", function(){
					//vod04.play();
					//smc_video_pl04.style.display ="none";
				//},false);
			//}else if(jQusing_custom_vodplay.length ==3){
				
				
			//}else if(jQusing_custom_vodplay.length ==2){
				
				
			//}
		}
		
	}
}
check_ie_yes2017();
});