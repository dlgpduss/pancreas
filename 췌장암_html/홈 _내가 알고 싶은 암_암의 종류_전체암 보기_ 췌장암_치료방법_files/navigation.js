$(document).ready(function() {
    function resizeTopGNB() {
        // Mobile & Tablet에서만 수행
        if ($(document).width() >= 1200)
            return;

        var $gnb_top = $(".navigation .gnb-top");
        var width = 0.0;

        $gnb_top.children("li").each(function() {
        	var style = getComputedStyle(this);
        	width += parseFloat(style.width);
        	width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        	width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        });
//        if (width !== parseFloat($gnb_top.get(0).style.width)) {
//            $gnb_top.width(width);
//        }
    }

	function updateGNBBlur() {
		var $nav = $(".navigation");
		var $section_top = $nav.find(".section-top");
        var $gnb_top = $nav.find(".gnb-top");
		var scrollLeft = $section_top.scrollLeft();
		
		if (scrollLeft > 0)
			$nav.find(".blur.left").fadeIn();
		else
			$nav.find(".blur.left").fadeOut();
		
//		if (scrollLeft + $section_top.width() < Math.floor(parseFloat( $gnb_top.get(0).style.width)))
//			$nav.find(".blur.right").fadeIn();
//		else
//			$nav.find(".blur.right").fadeOut();
	}

    function toggleBottomGNB() {
        $(".navigation .section-bottom").slideToggle().toggleClass("sb_ac");
        if($(".navigation .section-bottom").hasClass("sb_ac")){
        	$(".navigation .gnb-bottom-button").attr("title","메뉴 닫기");
        }else{
        	$(".navigation .gnb-bottom-button").attr("title","메뉴 열기");
        }
    }

    resizeTopGNB();
    updateGNBBlur();
    $(window).resize(resizeTopGNB);
    $(window).resize(updateGNBBlur);
    $(".navigation .section-top").scroll(resizeTopGNB);
    $(".navigation .section-top").scroll(updateGNBBlur);

    $(".navigation .gnb-bottom-button").click(toggleBottomGNB);
});
