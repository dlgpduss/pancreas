/*$(document).ready(function() {
	function closeCancerMenu(e) {
		var $active = $("#cancerMenu ul.active");
		
		if (!$active.is(e.target) && $active.has(e.target).length === 0) {
			$active.removeClass("active");
		}
	}
	function openCancerMenu() {
		var top = $(this).outerHeight();
		var $li = $(this).next("li");
		var $parent = $(this).parent("ul");

		if ($parent.hasClass("active")) {
			$parent.removeClass("active");
			return;
		}
		
		$("#cancerMenu > ul.active").not($parent).removeClass("active");
		$parent.addClass("active");
		
		while ($li.length > 0) {
			$li.css("top", top+"px");
			top += $li.outerHeight();
			$li = $li.next("li");
		}
	}
	
	$("#cancerMenu ul li.category").not(".no_childs").click(openCancerMenu);
	$(document).click(closeCancerMenu);
});
*/