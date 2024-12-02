(function () {
    'use strict';

    /**
     * CMC 레이어 팝업 클래스.
     * (jQuery 필요)
     */
    cmc.popup = new (cmc.Class(/** @lends cmc.popup */{
        /**
         * 팝업 열기
         * @param config
         * @return 팝업 객체
         */
        open: function (config) {
            var defaultConfig = {
                popup: null,      // 팝업 element
                openBtn: null,    // 오픈 element
                data: {},         // 팝업에서 사용할 데이터
                success: function() { // 성공 닫기 callback. 반드시 boolean값 return.
                    return true;
                },
                dismiss: function() {    // 취소 닫기 callback. 반드시 boolean값 return.
                    return true;
                },
                closeDim: false    // dim 화면을 클릭시 닫히는지 여부(true/false)
            };
            config = $.extend({}, defaultConfig, config);

            var $popup = $(config.popup);

            if(!config.popup) {
                console.error('non popup element');
                return null;
            }

            var instance = { $popup: $popup, config: config };  // 팝업 객체

            $popup.css({
                'position':'fixed'
                ,	'top': topH()-20
                ,	'left':($(window).width()/2) - ($popup.outerWidth(true) / 2)
                ,	'z-index':40
                ,	'display':'block'
            });

            TweenMax.to($popup,1,{
                height:$popup.find('.popup_wrap').innerHeight()
                ,	top:topH()
                ,	ease:'easeOutExpo'
            });

            $(window).on('resize',function(){
                $popup.css({
                    'top':topH()
                    ,	'left':($(window).width()/2) - ($popup.outerWidth(true) / 2)
                });
                popupScrollFn();
            });

            popupScrollFn();
            function popupScrollFn(){
                if(topH() == $('header').outerHeight(true)+20){
                    if($(window).height() < ($('header').outerHeight(true)+20)+$popup.height()){
                        $popup.css({
                            'position':'absolute'
                        });
                        $('#wrap').css({
                            'padding-bottom':(($('header').outerHeight(true)+20)+$popup.height())-$(window).height()
                        });
                    }
                }else{
                    $popup.css({
                        'position':'fixed'
                    });
                    $('#wrap').css({
                        'padding-bottom':'initial'
                    });
                }
            }

            function topH(){
                return ($(window).height()/2) - ($popup.outerHeight(true) / 2) <= $('header').outerHeight(true)? $('header').outerHeight(true)+20 : ($(window).height()/2)+20 - ($popup.outerHeight(true) / 2);
            }

            $popup.attr('tabindex',0).focus();

            window.dimdFn(true,30,config.closeDimd == true ? cmc.popup.dismiss(instance) : null);

            if($popup.find('.popup_close_btn a').length > 0) {
                $popup.find('.popup_close_btn a').on('click', function() {
                    cmc.popup.dismiss(instance);
                });
            }
            
            if($popup.find('.popup_close_button').length > 0) {
                $popup.find('.popup_close_button').on('click', function() {
                    cmc.popup.dismiss(instance);
                });
            }

            return instance;
        },
        /**
         * 팝업 성공 닫기
         * @parma 팝업 객체
         */
        success: function(instance, noDimClose) {
            cmc.popup.close(instance, instance.config.success, noDimClose);
        },
        /**
         * 팝업 취소 닫기
         * @parma 팝업 객체
         */
        dismiss: function(instance, noDimClose) {
            cmc.popup.close(instance, instance.config.dismiss, noDimClose);
        },
        /**
         * 팝업 닫기
         * @parma 팝업 객체
         */
        close: function(instance, callback, noDimClose) {
            var config = instance.config;

            var $popup = $(config.popup);
            var $openBtn = $(config.openBtn);

            if(!callback || callback(config.data) == true) {
                if(noDimClose != true) {
                    window.dimdFn(false);
                } else {
                    setTimeout(function() {
                        if($popup.css('display') != 'block') {
                            window.dimdFn(false);
                        }
                    },1000);
                }
                $popup.attr('style', '');
                $('#wrap').attr('style', '');
                $(window).off('resize');
                $popup.find('.popup_close_btn a').off('click focusout');
                $openBtn.focus();
            }
        }
    }));

})();
