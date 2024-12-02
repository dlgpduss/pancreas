;(function($){
    var defaults = {
        mode: 'horizontal',
        auto:false,
        autoSpeed:4000,
        slideSelector: '',
        slideWidth: 0,
        lbtn:'',
        rbtn:'',
        controls: true,
        pager:true,
        playStop:true,
        arrowBtn:true,
        onSliderStart: function() { return true; },
        onSliderEnd:function() { return true; },
        goToNextSlide: function() { return true; }
    };

    $.fn.accSlider = function(options) {
        if (this.length === 0) {
            return this;
        }

        if (this.length > 1) {
            this.each(function() {
                $(this).bxSlider(options);
            });
            return this;
        }

        var slider = {}
            ,	el = this
            ,	cuNum = 0
            ,	clickNum = 0
            ,	moveChk = false
            ,	gapNum = 1
            ,	intervalTimeID = 0
            // ,	autoSpeed = 4000
            ,	touchChk = false
            ,	clickChk = false
            ,	totalNum = el.find('.banner_inner_wrap > ul > li').length
            ,	wd = el.find('.banner_inner_wrap > ul > li').width();

        if ($(el).data('accSlider')) { return; }

        /**
         * Initializes namespace settings to be used throughout plugin
         */
        var init = function(){
            if ($(el).data('accSlider')) { return; }
            slider.settings = $.extend({}, defaults, options);
            slider.controls = {};
            // slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
            // slider.active = { index: slider.settings.startSlide };
            // slider.children.eq(slider.settings.startSlide)
            // slider.settings.slideWidth = 1;
            // console.log(slider.children.eq(0))
            setup();
        }

        /**
         * Performs all DOM and CSS modifications
         */
        var setup = function() {
            el.find('.banner_inner_wrap').css('width',totalNum*wd);
            el.find('.banner_wrap .banner').each(function(i){
                $(this).css({
                    'position':'absolute'
                    ,	'left':i*el.find('.banner_inner_wrap > ul > li').width()
                });
            });

            if(totalNum < 2){
                slider.settings.playStop = false;
                slider.settings.controls = false;
                slider.settings.pager = false;
                slider.settings.arrowBtn = false;
                slider.settings.auto = false;
            }

            if (slider.settings.controls) { appendControls(); }
            if (slider.settings.pager) { indiSetting(); }
            if (slider.settings.playStop) { psSetting(); }
            if (slider.settings.arrowBtn) { arrowSetting(); }
            start();
            // loadElements(start);

        }

        var loadElements = function(callback) {
            callback();
            // return;
        };

        var appendControls = function(){
            slider.controls.el = el.find('.btn_banner');

        }

        var indiSetting = function(){
            var pagerHtml = '';

            slider.pagerEl = $('<ul class="indicator" />');
            slider.controls.el.addClass('has-pager').prepend(slider.pagerEl);

            for(i=1; i<=totalNum; i++){
                pagerHtml += '<li><a href="#none"><em class="blind">'+i+'번 배너이동'+'</em></a></li>';
            }
            slider.pagerEl.html(pagerHtml);
            slider.controls.slideInd =  slider.pagerEl.find('li');
            slider.controls.slideInd.eq(0).addClass('active');
            slider.controls.slideInd.on('click','a',indiClick);

        }

        var psSetting = function(){
            var psHtml = ''
                ,	str = (slider.settings.auto)?"play":"stop";
            slider.psEl = $('<div class="playstop" />');
            slider.controls.el.addClass('has-playstop').append(slider.psEl);
            psHtml = '<a href="#none"><span class='+str+'><em class="txt_stop blind">자동 플레이 멈춤</em><em class="txt_play blind">자동 플레이</em></span></a>'
            slider.psEl.html(psHtml);

            slider.controls.playstop = slider.psEl;
            slider.controls.playstop.on('click',playStopClick);
        }

        var arrowSetting = function(){
            var arrowHtml = '';
            slider.arrowEl = $('<div class="arr_wrap" />');
            slider.controls.el.addClass('has-arrow_btn').append(slider.arrowEl);
            arrowHtml = '<a href="#none" class="arr lft_arr">이전</a><a href="#none" class="arr rgt_arr">다음</a>'
            slider.arrowEl.html(arrowHtml);

            slider.controls.prev = slider.arrowEl.find('.lft_arr');
            slider.controls.next = slider.arrowEl.find('.rgt_arr');

            slider.controls.prev.on('click',onClickPrev);
            slider.controls.next.on('click',onClickNext);
        }

        var onClickPrev = function(e){
            e.preventDefault();
            if(!moveChk){
                moveChk = true;
                if(cuNum > 0){
                    clickNum--;
                }else{
                    clickNum = totalNum-1;
                }
                bMove(clickNum,'left');
            }
        }

        var onClickNext = function(e){
            e.preventDefault();
            if(!moveChk){
                moveChk = true;
                if(cuNum < totalNum-1){
                    clickNum++;
                }else{
                    clickNum = 0;
                }
                bMove(clickNum,'right');
            }
        }

        var indiClick = function(e){
            e.preventDefault();
            var $tg = $(e.currentTarget)
                ,	idx = $tg.closest('li').index()
                ,	dir = '';

            if(!moveChk){
                moveChk = true;
                cuNum - idx > 0?dir="left":dir="right";
                gapNum = Math.abs(cuNum - idx);
                bMove(idx,dir,gapNum);
            }
        }

        var playStopClick = function(e){
            var	$tg = $(e.currentTarget)
                ,	statusStr = '';

            if($tg.find('span').attr('class') == 'play'){
                statusStr = 'stop';
                $tg.find('span').addClass('stop').removeClass('play');
            }else{
                statusStr = 'play';
                $tg.find('span').addClass('play').removeClass('stop');
            }
            autoPlay(statusStr);
        }

        var start = function() {
            if(slider.settings.auto === true){
                autoPlay('play');
            }
            accessUtil();
        }

        var accessUtil = function(){
            el.find('.banner_wrap .banner').on('mouseenter',function(e){
                touchChk = true;
            });
            el.find('.banner_wrap .banner').on('mouseleave',function(e){
                touchChk = false;
            });


            el.find('.banner_wrap .banner').on('mousedown','a',function(e){
                clickChk = true;
            });
            el.find('.banner_wrap .banner').on('mouseup','a',function(e){
                clickChk = false;
            });


            /*el.find('.banner_wrap .banner').on('focus','a',accOnFocus);
            el.find('.banner_wrap .banner').on('blur','a',accOnBlur);*/

        }

        var accOnFocus = function(e){
            var $tg = $(e.currentTarget)
                ,	idx = $tg.closest('.banner').index();
            if(!touchChk){
                autoPlay("stop");
                slider.controls.slideInd.eq(idx).addClass('active').siblings().removeClass('active');
                cuNum = idx;
                clickNum = cuNum;
            }
        }

        var accOnBlur = function(e){
            var $tg = $(e.currentTarget)
                ,	idx = $tg.closest('.banner').index();
            if(!clickChk){
                if(idx == totalNum-1){
                    el.find('.banner_inner_wrap').css({
                        'position':'relative'
                        ,'left':totalNum*wd - wd
                    });
                    cuNum = 0;
                    clickNum = cuNum;
                    slider.controls.slideInd.eq(cuNum).addClass('active').siblings().removeClass('active');
                }
            }
        }

        var bMove = function(num,dirStr,gnum){
            autoPlay("stop");
            gnum==undefined?gapNum = 1:gapNum = gnum;
            slider.controls.slideInd.eq(num).addClass('active').siblings().removeClass('active');

            if(dirStr == 'left'){
                var gnum = 0;
                if(gapNum == 1){
                    el.find('.banner_wrap .banner').eq(num).css({
                        left:-1*wd
                    });

                    el.find('.banner_wrap .banner').each(function(i){
                        var targetL = parseInt($(this).css('left')) + (wd*gapNum);

                        if(slider.settings.mode == 'horizontal'){
                            TweenMax.to($(this),1,{
                                left:targetL
                                ,	ease:'easeInOutExpo'
                                ,	onComplete:function(){
                                    moveChk = false;
                                    autoPlay("play");
                                }
                            });
                        }else if(slider.settings.mode == 'vertical'){

                        }else if(slider.settings.mode == 'normal'){
                            $(this).css({
                                'left':targetL
                            });
                            moveChk = false;
                            autoPlay("play");
                        }



                    });
                }else{
                    for(i=0; i<num+gapNum;i++){
                        el.find('.banner_wrap .banner').eq(i).css({
                            left:-(wd*((num+gapNum)-i))
                        });
                    }
                    //
                    for(k=0; k<totalNum;k++){
                        var targetL = parseInt(el.find('.banner_wrap .banner').eq(k).css('left')) + (wd*gapNum);

                        if(slider.settings.mode == 'horizontal'){
                            TweenMax.to(el.find('.banner_wrap .banner').eq(k),1,{
                                left:targetL
                                ,	ease:'easeInOutExpo'
                                ,	onComplete:function(){
                                    gnum++;
                                    if(gnum == num+gapNum){
                                        for(i=0; i<num;i++){
                                            el.find('.banner_wrap .banner').eq(i).css({
                                                left:parseInt(el.find('.banner_wrap .banner').eq(totalNum-1).css('left')) + (wd*(i+1))
                                            });
                                        }
                                        moveChk = false;
                                        autoPlay("play");
                                        gnum = 0;
                                    }
                                }
                            });
                        }else if(slider.settings.mode == 'vertical'){

                        }else if(slider.settings.mode == 'normal'){
                            el.find('.banner_wrap .banner').eq(k).css({
                                'left':targetL
                            });
                            gnum++;
                            if(gnum == num+gapNum){
                                for(i=0; i<num;i++){
                                    el.find('.banner_wrap .banner').eq(i).css({
                                        left:parseInt(el.find('.banner_wrap .banner').eq(totalNum-1).css('left')) + (wd*(i+1))
                                    });
                                }
                                moveChk = false;
                                autoPlay("play");
                                gnum = 0;
                            }
                        }

                    }

                }

            }else if(dirStr == 'right'){
                var tnum = 0;
                el.find('.banner_wrap .banner').each(function(i){
                    var targetL = parseInt($(this).css('left')) - (wd*gapNum);

                    if(slider.settings.mode == 'horizontal'){
                        TweenMax.to($(this),1,{
                            left:targetL
                            ,	ease:'easeInOutExpo'
                            ,	onComplete:function(){
                                tnum++;
                                if(tnum == totalNum){
                                    if(gapNum == 1){
                                        var xnum = 0;

                                        if(num != 0){
                                            xnum = num-1;
                                        }else{
                                            xnum = totalNum-1;
                                        }
                                        el.find('.banner_wrap .banner').eq(xnum).css({
                                            left:(totalNum-1)*wd
                                        });

                                    }else{
                                        for(i=0; i<num;i++){
                                            el.find('.banner_wrap .banner').eq(i).css({
                                                left:parseInt(el.find('.banner_wrap .banner').eq(totalNum-1).css('left')) + (wd*(i+1))
                                            });
                                        }
                                    }
                                    tnum = 0;
                                    moveChk = false;
                                    autoPlay("play");
                                }
                            }
                        });
                    }else if(slider.settings.mode == 'vertical'){

                    }else if(slider.settings.mode == 'normal'){
                        $(this).css({
                            'left':targetL
                        });
                        tnum++;
                        if(tnum == totalNum){
                            if(gapNum == 1){
                                var xnum = 0;

                                if(num != 0){
                                    xnum = num-1;
                                }else{
                                    xnum = totalNum-1;
                                }
                                el.find('.banner_wrap .banner').eq(xnum).css({
                                    left:(totalNum-1)*wd
                                });

                            }else{
                                for(i=0; i<num;i++){
                                    el.find('.banner_wrap .banner').eq(i).css({
                                        left:parseInt(el.find('.banner_wrap .banner').eq(totalNum-1).css('left')) + (wd*(i+1))
                                    });
                                }
                            }
                            tnum = 0;
                            moveChk = false;
                            autoPlay("play");
                        }
                    }

                });
            }

            slider.settings.onSliderStart.call(el,num);

            cuNum = num;
            clickNum = cuNum;
        }

        var autoPlay = function(str){
            if(str == "play"){
                if(intervalTimeID == 0){
                    intervalTimeID = setInterval(function(){
                        if(!moveChk){
                            moveChk = true;
                            if(cuNum < totalNum-1){
                                clickNum++;
                            }else{
                                clickNum = 0;
                            }
                            bMove(clickNum,'right');
                        }

                    }, slider.settings.autoSpeed);
                    // slider.controls.playstop.find('span').addClass('play').removeClass('stop');
                }
            }else{
                if(intervalTimeID != 0){
                    clearInterval(intervalTimeID);
                    intervalTimeID = 0;
                    // slider.controls.playstop.find('span').addClass('stop').removeClass('play');
                }
            }
        }

        /**
         * ===================================================================================
         * = PUBLIC FUNCTIONS
         * ===================================================================================
         */
        el.goToSlide = function(num){
            el.find('.banner_wrap .banner').eq(num).css({
                left:-1*wd
            });

            el.find('.banner_wrap .banner').each(function(i){
                var targetL = parseInt($(this).css('left')) + (wd*gapNum);
                $(this).css({
                    'left':targetL
                })
                moveChk = false;
                autoPlay("play");
            });
            cuNum = num;
        };

        el.playSlide = function(){
            autoPlay("play");
        };

        el.stopSlide = function(){
            autoPlay("stop");
        };

        init();

        $(el).data('accSlider', this);
        return this;
    }
})(jQuery);