$(document).ready(function() {
    function resizeTab() {
        // PC에서만 수행
        if ($(document).width() < 1200)
            return;

        var $tab = $(".contents .tab");
        var tWidth = $tab.width();
        var $elements = $tab.find("li");
        var num = $elements.length;
        
        $elements.each(function(element) {
        	var index = $elements.index(this);
        	var half = parseInt(num/2);
        	var width;
        	
        	if (num < 5) // 1st row of a row
        		width = tWidth / num;
        	else if (index < half) // 1st row of 2 rows
        		width = tWidth / half;
        	else { // 2nd row of 2 rows
        		width = tWidth / (num - half);
        		
        		$(this).css("margin-top", "-1px");
        		if (index == half) // 1st element of 2nd row
        			$(this).find("span").css("margin-left", 0);
        	}
            $(this).width(width);
        });
    }

    function openMenu() {
    	var status = $(this).parent("li").hasClass("active");
        if (status) {
        	$(this).siblings("ul").slideUp(function() {
        		$(this).parent("li").removeClass("active");
        		$(this).parent().find("div").find("button").html("하위메뉴가 열립니다.");
        	});
        } else {
        	$(this).siblings("ul").slideDown().parent("li").addClass("active");
        	$(".util", this).html("하위메뉴가 닫힙니다.");
        }
    }openMenu();

    function openInnerMenu() {
        var $li = $(this).parent("li");
        $li.parent().children(".active").removeClass("active");
        $li.toggleClass("active");
    }
    
    function toggleAccordion() {
    	var $ac = $(this).parent(".accordion");
    	$ac.find(".ac_body").slideToggle();
    }
    function openAccordion() {
    	var $ac = $(this).parent(".accordion");
    	$ac.find(".ac_body").slideDown();
    }
    
    resizeTab();
    $(window).resize(resizeTab);

    $("#left_menu > ul > li > .util_line").click(openMenu);
    $("#left_menu > ul > li > .util_line .util").text("하위메뉴가 열립니다.");
    $("#left_menu > ul > li.active > .util_line .util").text("하위메뉴가 닫힙니다.");
    
    //$("#left_menu > ul > li > ul > li > .util_line").click(openInnerMenu);
    
    /*
    $(".accordion .ac_head")
    	.each(function () { $(this).attr("tabindex", 0); })
    	.click(toggleAccordion)
    	.focusin(openAccordion);
    */
    
    $(".accordion .ac_head")
	.each(function () { $(this).attr("tabindex", 0); })
	.click(openAccordion)
	.focusin(openAccordion);
    
    
    $("#left_menu > ul").each(function(i,o){
		$("ul>li>.util_line>button", this).remove();
	});
});