(function () {
    'use strict';

    /**
     * sns share
     * @namespace
     */
    cmc.sns = cmc.Class(/** @lends cmc.sns */{
        /**
         * 초기화
         * @param url
         * @param copyBtnId
         * @param copyMsg
         * @param snsTitle
         */
        $init : function (url, copyBtnId, copyMsg, snsTitle) {

            this.url = url;
            this.encodeUrl = encodeURIComponent(url);
            this.copyMsg = '복사되었습니다. \n'+'Ctrl+V를 눌러 확인해보세요.';
            if(typeof copyMsg != 'undefined') {
                this.copyMsg = copyMsg;
            }
            if (snsTitle != null && typeof snsTitle != 'undefined') {
                this.snsTitle = '[' + this.instName() + '] \n' + snsTitle;
            } else {
                this.snsTitle = '[' + this.instName() + ']';
            }

            window.Kakao.init(window.kakaoAppId);

            var _msg = this.copyMsg;
            var _url = this.url;
            if (cmc.util.ieVer() > 0 && cmc.util.ieVer() < 9) {
                $('#copyBtnId').on('copy', function() {
                    cmc.util.clipboard(_url);
                });
            } else{
                ZeroClipboard.config({
                    forceHandCursor: true
                });

                var client = new ZeroClipboard(document.getElementById(copyBtnId));

                client.on( 'ready', function() {

                    client.on('copy', function() {
                        client.setData('text/plain', _url);
                    });

                    client.on('aftercopy', function() {
                        cmc.util.alert(_msg);
                    });

                } );
            }

        },
        /**
         * 페이스북 공유
         * @param url
         */
        facebook : function(url) {
            if (typeof url === 'undefined') {
                url = this.encodeUrl;
            }
            window.open('http://www.facebook.com/sharer.php?u=' + url, this.instName(),'resizable=yes width=570 height=300');
        },
        /**
         * 카카오스토리 공유
         * @param url
         */
        kakaostory : function(url, snsTitle) {
            if (typeof url === 'undefined') {
                url = this.encodeUrl;
            }
            if (typeof snsTitle === 'undefined') {
                snsTitle = this.snsTitle;
            }
            window.open('http://story.kakao.com/share?url=' + url, this.instName(),'resizable=yes width=500 height=450');
        },
        /**
         * 카카오톡 공유
         * @param url
         */
        kakaotalk : function(url, snsTitle) {
            if (typeof url === 'undefined') {
                url = this.url;
            }
            if (typeof snsTitle === 'undefined') {
                snsTitle = this.snsTitle;
            }
			
			var description = document.querySelectorAll('meta[property="og:description"]')[0].content;
			var imageUrl = document.querySelectorAll('meta[property="og:image"]')[0].content;
			
			window.Kakao.Link.createDefaultButton({
				container: '#kakao',
				objectType: 'feed',
				content: {
					title: snsTitle,
					description: description,
					imageUrl: imageUrl,
					link: {
						webUrl: url,
						mobileWebUrl: url
					}
				},
				buttons: [{ 
					title: '바로가기',
					link: {
						mobileWebUrl: url,
						webUrl: url
					}
				}]
			});

			/*
            window.Kakao.Link.sendTalkLink({
                label: snsTitle,
                webButton: {
                    text: '바로가기',
                    url: url
                }
            });
			*/
        },
        /**
         * 트위터 공유
         * @param url
         */
        twitter : function(url) {
            if(typeof url === 'undefined') {
                url = this.encodeUrl;
            }
            window.open('http://twitter.com/intent/tweet?url=' + url, this.instName(),'resizable=yes width=570 height=300');
        },
        /**
         * 네이버 블로그 공유
         * @param url
         * @param snsTitle
         */
        nblog : function(url, snsTitle) {
            if(typeof url === 'undefined') {
                url = this.encodeUrl;
            }
            if(typeof snsTitle === 'undefined') {
                snsTitle = this.snsTitle;
            }
            window.open('http://share.naver.com/web/shareView.nhn?url=' + url + '&title=' + snsTitle, this.instName(),'resizable=yes width=557 height=604');
        },
        /**
         * 기관명 조회
         */
        instName : function() {
            return window.instName ? window.instName : '성모병원';
        }
    });

})();
