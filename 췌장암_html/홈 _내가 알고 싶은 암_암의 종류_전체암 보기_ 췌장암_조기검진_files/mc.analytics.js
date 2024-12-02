(function($){
	var pgwBrowser;
	try{
		if(location.href.indexOf("#currentview")>0)
			return;
		pgwBrowser = $.pgwBrowser();
		var params = {
				url:location.href
				,title : $("title").text()
				,query_string : location.search
				,referer : document.referrer
				,browser : pgwBrowser.browser.name
				,os : pgwBrowser.os.name
			};
		
		$.ajax("/analytics/history.do", {
			type : 'POST',
			data : params
		});	
	}catch(e){}
	
})(jQuery);