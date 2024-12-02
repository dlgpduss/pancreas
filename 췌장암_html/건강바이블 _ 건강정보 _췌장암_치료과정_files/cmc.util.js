(function () {
    'use strict';

    /**
     * CMC 유틸리티 클래스.
     */
    cmc.util = new (cmc.Class(/** @lends cmc.util */{
        /**
         * API 호출 (ajax)
         * @param param
         */
        api: function(param) {
            window.isLoading = true;
            if(param.loading != false && window.vm && window.vm.$forceUpdate) window.vm.$forceUpdate();
            if(!param.data) {
                param.data = {};
            }
            if(param.type == 'POST' || param.type == 'PUT' || param.type == 'DELETE') {
                param.url += '?' + $.param(param.data);
                param.data = {};
            }
            /*
            return $.ajax({
                type: param.type,
                url: param.url,
                data: param.data,
                async: param.async == undefined ? true : param.async,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            }).success(function(data) {
                window.isLoading = false;
                if (param.success) {
                    param.success(data);
                }
            }).fail(function(err) {
                window.isLoading = false;
                if (param.fail) {
                    param.fail(err);
                } else {
                    if(err.status == '401') {
                        cmc.util.alert('로그인이 필요합니다.');
                        cmc.util.loginTargetPage();
                    } else if(err.status == '400') {
                        cmc.util.alert('잘못된 요청입니다.');
                        if(document.location.href.indexOf("/board") != -1){  //건의및 불편사항 30분이상 입력시 세션날라가서 오류메세지 표출
                        	cmc.util.alert('입력시간이 30분이 초과되어 \n사용자 개인정보보호 보안정책에 따라 자동으로 로그아웃 처리된 상태입니다. \n다시 로그인하여 주시기 바랍니다. \n재로그인 하면 작성하신 글은 삭제 됩니다.');
                    	}
                    } else if(err.status == '404' || err.status == '503') {
                        cmc.util.alert('인터넷 연결이 끊어졌거나 서버가 재시작 중입니다.\n인터넷 연결을 확인하시고 잠시 후 다시 시도해주세요.');
                    } else if(err.status == '500') {
                        cmc.util.alert('오류가 발생했습니다. 페이지를 새로고침하고 다시 실행해 주세요.\n증상이 계속되면 관리자에게 문의 부탁드립니다.');
                    }
                }
            });
            */
            return $.ajax({
                type: param.type,
                url: param.url,
                data: param.data,
                async: param.async == undefined ? true : param.async,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                success:function(data) {
                    window.isLoading = false;
                    if (param.success) {
                        param.success(data);
                    }
                },
                statusCode:{
                  401:function(){
                      cmc.util.alert('로그인이 필요합니다.');
                      cmc.util.loginTargetPage();
                  },
                  400:function(){
                      cmc.util.alert('잘못된 요청입니다.');
                      if (document.location.href.indexOf("/board") != -1){  //건의및 불편사항 30분이상 입력시 세션날라가서 오류메세지 표출
                    	  cmc.util.alert('입력시간이 30분이 초과되어 \n사용자 개인정보보호 보안정책에 따라 자동으로 로그아웃 처리된 상태입니다. \n다시 로그인하여 주시기 바랍니다. \n재로그인 하면 작성하신 글은 삭제 됩니다.');
                      }
                  },
                  404:function(){
                	  cmc.util.alert('인터넷 연결이 끊어졌거나 서버가 재시작 중입니다.\n인터넷 연결을 확인하시고 잠시 후 다시 시도해주세요.');
                  },
                  500:function(){
                	  cmc.util.alert('오류가 발생했습니다. 페이지를 새로고침하고 다시 실행해 주세요.\n증상이 계속되면 관리자에게 문의 부탁드립니다.');
                  },
                  503:function(){
                	  cmc.util.alert('인터넷 연결이 끊어졌거나 서버가 재시작 중입니다.\n인터넷 연결을 확인하시고 잠시 후 다시 시도해주세요.');
                  },
                }
              }).done(function() {
              }).fail(function(err) {
            	  window.isLoading = false;
            	  if (param.fail) {
                      param.fail(err);
                  }
              }).always(function() {
              });
        },
        /**
         * API 호출 (ajax)
         * 기존 get방식시 내용이 길때 414에러 발생하여 post방식으로 수정함_20220323(#22858)
         * @param param
         */
        apiArticle: function(param) {
            window.isLoading = true;
            if(param.loading != false && window.vm && window.vm.$forceUpdate) window.vm.$forceUpdate();
            if(!param.data) {
                param.data = {};
            }
            return $.ajax({
                type: param.type,
                url: param.url,
                data: JSON.stringify(param.data),
                async: param.async == undefined ? true : param.async,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8'
            }).success(function(data) {
                window.isLoading = false;
                if (param.success) {
                    param.success(data);
                }
            }).fail(function(err) {
                window.isLoading = false;
                if (param.fail) {
                    param.fail(err);
                } else {
                    if(err.status == '401') {
                        cmc.util.alert('로그인이 필요합니다.');
                        cmc.util.loginTargetPage();
                    } else if(err.status == '400') {
                        cmc.util.alert('잘못된 요청입니다.');
                        if(document.location.href.indexOf("/board") != -1){  //건의및 불편사항 30분이상 입력시 세션날라가서 오류메세지 표출
                        	cmc.util.alert('입력시간이 30분이 초과되어 \n사용자 개인정보보호 보안정책에 따라 자동으로 로그아웃 처리된 상태입니다. \n다시 로그인하여 주시기 바랍니다. \n재로그인 하면 작성하신 글은 삭제 됩니다.');
                    	}
                    } else if(err.status == '404' || err.status == '503') {
                        cmc.util.alert('인터넷 연결이 끊어졌거나 서버가 재시작 중입니다.\n인터넷 연결을 확인하시고 잠시 후 다시 시도해주세요.');
                    } else if(err.status == '500') {
                        cmc.util.alert('오류가 발생했습니다. 페이지를 새로고침하고 다시 실행해 주세요.\n증상이 계속되면 관리자에게 문의 부탁드립니다.');
                    }
                }
            });
        },        
        /**
         * javascript 객체를 복사한다.
         * @param data
         */
        copy: function(data) {
            return JSON.parse(JSON.stringify(data));
        },
        /**
         * PC 메인 페이지
         */
        mainPage: function() {
            location.href = '/';
        },
        /**
         * 로그인 페이지 이동
         */
        loginPage: function() {
            location.href = '/common.member.login.sp';
        },
        /**
         * 로그인 타겟 페이지 이동
         */
        loginTargetPage: function() {
            var _targetUrl = encodeURIComponent(location.pathname + location.search);
            location.href = '/common.member.login.sp?_targetUrl=' + _targetUrl;
        },
        /**
         * 한글 문자열을 입력받아 가장 앞단어 초성을 리턴
         * @param koreanStr
         */
        initialChar: function(koreanStr) {
            var result = '';
            var initialCharArray = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
            var code = koreanStr.charCodeAt(0)-44032;
            if(code>-1 && code<11172) result += initialCharArray[Math.floor(code/588)];
            return result;
        },
        /**
         * 숫자에 천단위 마다 콤마(,) 표시
         * @param value
         */
        number: function(value) {
            if(!value) value = 0;

            var reg = /(^[+-]?\d+)(\d{3})/;
            var n = (value + '');

            while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

            return n;
        },
        /**
         * 휴대폰번호 - 추가 작업
         * @param value
         */
        changePhone: function(value) {
            if(value.length >= 9 || value.length <= 11) {
                var values = [];
                if(value.length == 9) {
                    values[0] = value.substring(0, 2);
                    values[1] = value.substring(2, 5);
                    values[2] = value.substring(5, 9);
                } else if(value.length == 10) {
                    values[0] = value.substring(0, 3);
                    values[1] = value.substring(3, 6);
                    values[2] = value.substring(6, 10);
                } else if(value.length == 11) {
                    values[0] = value.substring(0, 3);
                    values[1] = value.substring(3, 7);
                    values[2] = value.substring(7, 11);
                }
                value = values[0] + '-' + values[1] + '-' + values[2];
            }
            return value;
        },
        /**
         * 문자열에서 HTML 태그 제거
         * @param value
         */
        removeTag: function(value) {
            if(!value) return '';

            var reg = /<[^>]*>|&([^;])*;/;

            while (reg.test(value)) value = value.replace(reg, '');

            value = value.replace(/\n\s*\n/g, '\n\n');

            return value;
        },
        /**
         * 객체 직렬화
         * @param obj
         * @returns {{}}
         */
        serializeObject : function(obj) {
            var o = {};
            var a = obj.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },
        /**
         * 입력받은 객체를 url param에 넣고 history에 추가 (reload 없이)
         * @param obj 객체
          * @param isReplace true이면 이전 history를 삭제함
         */
        changeUrlParam : function(obj, isReplace) {
            if(obj && (this.ieVer() == -1 || this.ieVer() >= 10)) { // IE 9 이하는 작동이 안됨
                var param = $.param(obj);
                if(isReplace == true) {
                    window.history.replaceState(obj, document.title, location.pathname + '?' + param);
                } else {
                    window.history.pushState(obj, document.title, location.pathname + '?' + param);
                }
            }
            else {
                location.href = location.pathname + '?' + $.param(dataObj);
            }
        },
        /**
         * 입력받은 이름과 동일한 이름의 function을 실행
         * @param name
         * @param data
         * @returns {*}
         */
        callFunctionByName : function(name, data) {
            if(jQuery.type(name) === 'function') {
                return name(data);
            }else {
                return window[name](data);
            }
        },
        /**
         * 파일 다운로드
         * @param uri
         * @param param
         */
        download : function(uri, param) {
            var ifr = $('<iframe />').attr('src', uri + '?' + $.param(param, true)).hide().appendTo('body');
            setTimeout(function () {ifr.remove();}, 5000);
        },
        /**
         * confirm 창 띄우기
         * @param msg
         */
        confirm : function(msg) {
            return confirm(msg);
        },
        /**
         * alert 창 띄우기
         * @param msg
         */
        alert : function(msg) {
			if (cmc.util.cmcRunning) {
				cmc.util.cmcRunning = false;
			}
            alert(msg);
        },
        /**
         * 로그인 화면 이동
         * @param fromUrl 이전 URL
         */
        auth : function(fromUrl) {
            var _window = window;
            if(parent && parent != this) {
                // 팝업에서 호출
                _window = window.parent;
            }
            if(typeof fromUrl === 'undefined') {
                fromUrl = _window.location.pathname;
            }
            _window.location.href = '/signin?_targetUrl='+fromUrl;
        },
        /**
         * 새 창 열기
         * @param verb [GET|POST]
         * @param url
         * @param data
         * @param target [_self|_blank| ... ]
         */
        open : function(verb, url, data, target) {
            var form = document.createElement('form');
            form.action = url;
            form.method = verb;
            if (data) {
                for (var key in data) {
                    var input = document.createElement('textarea');
                    input.name = key;
                    input.value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
                    form.appendChild(input);
                }
            }
            var token = $('meta[name=\'_csrf\']').attr('content');
            var tokenInput = document.createElement('textarea');
            tokenInput.name = '_csrf';
            tokenInput.value = token;
            form.appendChild(tokenInput);
            form.style.display = 'none';
            document.body.appendChild(form);

            window.open('about:blank', target || '_self', 'width=1000,height=800,toolbar=0');
            form.target = target || '_self';
            form.submit();
        },
        /**
         * 달력만들기 (moment.js 이용)
         * @param year(YYYY)
         * @param month(1~12)
         */
        calendar: function(year, month) {
            var isValid = year && year.toString().length == 4 && month && month >= 1 && month <= 12;
            var nowDate = moment();
            if(isValid) {
                nowDate.year(year).month(month-1).date(1);
            } else {
                nowDate.date(1);
            }
            var calendar = [];
            var week = [];
            var lastDate = moment(nowDate).endOf('month');
            var prevLastDate = moment(nowDate).subtract(1, 'days');
            var nextFirstDate = moment(lastDate).add(1, 'days');
            for(var i=0;i<lastDate.date();i++) {
                if(i == 0 && prevLastDate.day() < 6) {
                    for(var j=0;j<=prevLastDate.day();j++){
                        var prevLoopDate = moment(prevLastDate).subtract(prevLastDate.day()-j, 'days');
                        week.push(getDateObj(prevLoopDate));
                    }
                }
                var loopDate = moment(nowDate).add(i, 'days');
                week.push(getDateObj(loopDate));
                if(loopDate.day() == 6){
                    calendar.push(week);
                    week = [];
                }
                if(i == lastDate.date()-1 && lastDate.day() != 6) {
                    for(var k=0;k<7-nextFirstDate.day();k++){
                        var nextLoopDate = moment(nextFirstDate).add(k, 'days');
                        week.push(getDateObj(nextLoopDate));
                    }
                    calendar.push(week);
                }
            }

            function getDateObj(date) {
                return {
                    year: date.year(),
                    month: date.month()+1,
                    date: date.date()
                };
            }

            return calendar;
        },
        /**
         * 전역로딩화면 열기/닫기
         * @param flag 열기/닫기(true/false)
         */
        loading: function(flag) {
            window.isWholeLoadingYn = flag ? 'Y' : 'N';
            if(window.isMobileYn != 'Y') {
                var $loadingLayer = $('.loading_layer');

                if(flag){
                    $('html body').scrollTop(0);
                    $('body').css({
                        'overflow':'hidden'
                    });
                    $loadingLayer.css({
                        'display':'block',
                        'opacity':1
                    });
                    // $loadingLayer.addClass('active');
                }else{
                    $('body').css({
                        'overflow':''
                    });
                    $loadingLayer.animate({
                        'opacity':0
                    },400,function(){
                        $loadingLayer.css({
                            'display':'none'
                        });
                        $loadingLayer.removeClass('active');
                    });
                }

                $loadingLayer.css({
                    'width':$(window).width(),
                    'height':$(window).height()
                });

                $(window).on('resize',function(){
                    $loadingLayer.css({
                        'width':$(window).width(),
                        'height':$(window).height()
                    });
                });
            } else {
                if(flag) {
                    window.dimdFn(true,500);
                } else {
                    window.dimdFn(false,0);
                }
            }
        },
        /**
         * 클립보드로 텍스트 복사
         * @param url
         */
        clipboard : function(url) {
            if(typeof url === 'undefined') {
                url = location.href;
            }
            if(this.ieVer() > 0) {
                if(window.clipboardData){
                    window.clipboardData.setData('Text' , url);
                    cmc.util.alert(this.copyMsg);
                }
            } else {
                prompt('이 페이지의 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요', url);
            }
        },
        /**
         * Internet Explorer 버전 확인
         * @returns {number}
         */
        ieVer : function () {
            var rv = -1; // Return value assumes failure.
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        }
    }));

})();
