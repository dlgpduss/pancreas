if(!window.App) {
	App = {};
}
if(!App.board){
	App.board = {};
}

$(function() {

	var boardApp = new App.board.Common.Sns();

	boardApp.init();
	
});

App.board.Common.Sns = function() {

	var self;
	var sns = {
		"facebook" : "https://www.facebook.com/sharer/sharer.php?u=",
		"twitter" : "https://twitter.com/intent/tweet?url=",
		"google" : "https://plus.google.com/share?url=",
		"naverblog" : "http://share.naver.com/web/shareView.nhn?url=",
		//"naverblog" : "http://blog.naver.com/openapi/share?url=",
		//"navershare" : "http://share.naver.com/web/shareView.nhn?url=", // 네이버 공유 url 통합 ( 블로그 / 카페 )
		"naverband" : "http://www.band.us/plugin/share?route=",
		"linkedin" : "https://www.linkedin.com/shareArticle?url=",
		"kakaostory" :"https://story.kakao.com/share?url="
    };
    
    var _thisHost = location.protocol+'//'+location.host;
    
	return {
		init: function() {
			self = this;
			
			// SNS 공유
			self.snsShare();
				
			// 카카오톡 공유
			self.kakaoTalk();
			
		},

		
		kakaoTalk : function(){
			
			var $img = $("div.article-body").find('img');
			if($('#kakao-link-btn').length == 0) {
				return;
			}
			//<![CDATA[
			    // // 사용할 앱의 JavaScript 키를 설정해 주세요.
			    //Kakao.init('c05b2cbe3151ef2df1d1764c0c346dea');
				Kakao.init('3e773bf9eb552f3eacb7dc8a3778d3b8');
			
			    // // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
			    Kakao.Link.createDefaultButton({
			      container: '#kakao-link-btn',
			      objectType: 'feed',
			      content: {
			        title: document.title,
			        //description: '내용, 주로 해시태그',
			        imageUrl: $img.length > 0 ? $("div.article-body").find('img')[0].src : '' ,
			        link: {
			          webUrl: document.location.href,
			          mobileWebUrl: document.location.href
			        }
			      },
			      /*
			      social: {
			        likeCount: 286,
			        commentCount: 45,
			        sharedCount: 845
			      },
			      */
			      buttons: [
			        {
			          title: '바로가기',
			          link: {
			            mobileWebUrl: document.location.href,
			            webUrl: document.location.href
			          }
			        }  
			      ]
			    });
			  //]]>
			
		},
		
		
		snsShare : function(){
			
			$('.sns').click( function(e) {
				
				var shortUrl;
                e.preventDefault();	
                                
                var $this = $(this), id = $this.attr('id')
                	//, url = sns[$this.attr('class')]
                	, snsType;
                	
                	var title = $("title").text();
                	var url = '';
                	
                	
                var className = $this.attr('class').replace(/\s{2,20}/g,' ')
					, classes = className.split(' '); // 클래스 분리
				
				if (classes.length > 1) {
					
					snsType = classes[0];

					url = sns[classes[0]];
					
				}
				
				
				
                if ( typeof(snsType) != 'undefined' ) {
                	
                		var link = location.protocol + "//" + location.host +  location.pathname + location.search;
                	
	                // 짧은 주소 구하기
                		/*
	                $.ajax({
						url: '/cms/util/getShortUrl.do',
						data: {
	                    	url: location.pathname + location.search
	                  	},
	                  	success: function(json) {
	                    	if(json.success) {
	                      		shortUrl = _thisHost+'/s.do?'+ json.shortUrl;
	                    	}
	                  	},
	                  	async: false,
	                  	dataType: 'json'
	            	});
	            	*/
					
	                //$this.attr('href', '#' +  id );
					
	                if( snsType == 'facebook') url += encodeURIComponent( link + '&t=' + title);
	                if( snsType == 'twitter') url += encodeURIComponent( link + '&text=' + title );
	                if( snsType == 'google')  url +=  encodeURIComponent( link );
	                if( snsType == 'naverblog' || $this.attr('class') == 'navershare') url += encodeURIComponent( link ) +   '&title=' +  encodeURIComponent( title ) ;
	                if( snsType == 'naverband') url += encodeURIComponent(  link + '&body=' + title);
	                if( snsType == 'linkedin') url += encodeURIComponent( _thisHost + '&mini=true');
					if( snsType == 'kakaostory') url += encodeURIComponent( link );
	                
	                window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=680,width=830');
                
	                
	                
				}
				
              
                //jwxe_popupWindow( url , "830", "680", true, true);	
			});
			
		}

	}
}
