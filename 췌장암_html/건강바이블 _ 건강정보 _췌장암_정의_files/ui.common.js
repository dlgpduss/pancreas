$(function(){
	$(window).on('load', function() {
        if($('#gnb').length) gnbFn();
        footerJs();
    })

    if($('.location-type01').length && !$('#container.guide .guide').length) locationJs();

    if($('.form-text').length) placeholderJs();
    if($('.form-select').length) selectJs();//focus관련.....
    if($('.form-file').length) formFileFocusJs();//focus관련.....

    if($('.tab_ui').length) tabUiJs();

    if($('.toggle_ui').length) tcFn();

    if(!$('.main_layout').length && $('.visual-banner').length) visualBannerFn();

    if($('.etc .privacy').length || $('.etc .clause').length) ancScrollFn();

    if($('.favo_heart').length) favoHeartFn();

    // if($('.slide_banner_ui').length) slideFn();

    // if($('.hospitalinfo .history_cmc').length) parallaxFn();

    if($('.list-type02').length) listType02Js();

    totalSearchFn();
    sitemapFn();

    // loadingLayerFn(true);

    //if($('.calendar_wrap').length) calendarTog();
    //if($('.appointment.examination').find('> .office').length) appointScrollFn();

    if($('.main_layout .icon_mouse').length) scrollIconFn();
})

function scrollIconFn(){
    var $iconScroll = $('.main_layout .icon_mouse');
    $(window).on('scroll',function(){
        var scrTop = $(this).scrollTop();

        if(scrTop > 0){
            TweenMax.to($iconScroll,.3,{
                opacity:0
            });
        }else{
            TweenMax.to($iconScroll,.3,{
                opacity:1
            });
        }
    })
}

function appointScrollFn(){
    setTimeout(function(){
        $('html, body').stop().animate( { scrollTop : '281' } );
    },2000)
}

function favoHeartFn(){
    $('.favo_heart').each(function(){
        $(this).on('click','a',function(){
            var $heart = $(this).closest('.favo_heart');
            if(!$heart.hasClass('active')){
                $heart.addClass('active');
            }else{
                $heart.removeClass('active');
            }
        })
    });
}

function ancScrollFn(){
    $('.anchor_area .li-type01 li').on('click','button',function(){
        var $li = $(this).closest('li')
            ,	idx = $li.index()
            ,	ulIndex = $(this).closest('.li-type01').index();

        $('.etc .box').each(function(i){
            if($(this).attr('id') == $li.attr('class')){
                $("html, body").animate({scrollTop : $('.etc .box').eq(i).position().top}, 800,"easeInOutCubic");
                return false;
            }
        })
    });
}

function visualBannerFn(){
    var oriT = $('.visual-banner').css('top'),
    tarT = parseInt(oriT) - 56;

    $(window).on('scroll',function(){
        var $this = $(this)
            ,	scrTop = $this.scrollTop();
        if(scrTop >= tarT){
            $('.visual-banner').css({
                'position':'fixed'
                ,	'top':57
            });

        }else{
            $('.visual-banner').css({
                'position':'absolute'
                ,	'top':oriT
            });
        }

        if(scrTop >= tarT + 400){
            $('.visual-banner').css({
                'display':'none'
            });
        }else{
            $('.visual-banner').css({
                'display':'block'
            });
        }

    });
}

function tcFn(){
    $('.toggle_ui').each(function(){
        $(this).find('> * > a').on('click',function(){
            var $li = $(this).closest('li');
            $li.addClass('active').siblings().removeClass('active');
        })
    })
}

function tabUiJs(){
    $('.tab_ui').find('> li').on('click','a',function(){
        var $li = $(this).closest('li')
            ,	idx = $li.index()
            ,	$tabUiCont = $(this).closest('.tab_ui').siblings('.tab-cont');
        $li.addClass('active').siblings().removeClass('active');
        $tabUiCont.find('> li').eq(idx).addClass('active').siblings().removeClass('active');

        if(typeof tabUiCallBackFn  !== 'undefined'){
            tabUiCallBackFn(idx);
        }
    })
}

function locationJs(){
    var locationObj = {
        $location : $('.location-type01'),
        $header : $('header'),
        dropNaviJs : function(){
            var $d_l = $('.location-type01').find('.depth_list')
                ,	targetH = 0
                ,	$listUl = locationObj.$location.find('.cu_page .depth_list ul');

            locationObj.$location.find('.cu_page').each(function(){
                var 	$this = $(this)
                    ,	$locUl = $(this).find('.depth_list');

                $this.data('outTimerID',0);
                $locUl.find('ul').css('top',-($locUl.find('ul').height()));

                $(this).find('> a').on('mouseenter focus',function(){
                    locOverFn($this);
                }).on('mouseleave blur',function(){
                    locOutFn($this);
                })

                $locUl.find('ul').on('mouseenter focus',function(){
                    locOverFn($this);
                }).on('mouseleave blur',function(){
                    locOutFn($this);
                })
            })
            function locOverFn(obj){
                var $d_l = obj.find('.depth_list');
                $d_l.css({
                    'height':$d_l.find('ul').height()+2
                    ,	'border-top':'1px solid #d9d9d9'
                });
                TweenMax.to($d_l.find('ul'),.4,{
                    top:0
                    , ease:'easeOutExpo'
                })

                if(obj.data('outTimerID') != 0){
                    clearInterval(obj.data('outTimerID'));
                    obj.data('outTimerID',0);
                }
            }

            function locOutFn(obj){
                var $d_l = obj.find('.depth_list');
                if(obj.data('outTimerID') == 0){
                    var setTimeID = setTimeout(function(){
                        TweenMax.to($d_l.find('ul'),.3,{
                            top:-($d_l.find('ul').outerHeight())
                            , ease:'easeOutExpo'
                            , onComplete:function(){
                                $d_l.css({
                                    'height':0
                                    ,	'border-top':'0'
                                });
                            }
                        })
                    },100)
                    obj.data('outTimerID', setTimeID);
                }
            }
        },
        fixedScrolledJs : function(){
            $(window).on('scroll',function(){
                var $this = $(this)
                    ,	scrTop = $this.scrollTop();

                if(scrTop >= locationObj.$header.offset().top+105){
                    locationObj.$location.css({
                        'position':'fixed'
                        ,	'top':0
                        ,	'border-bottom':'1px solid #d9d9d9'
                    })
                }else{
                    locationObj.$location.css({
                        'position':'absolute'
                        ,	'top':locationObj.$header.offset().top+73
                        ,	'border-bottom':'none'
                    })
                }
            });
        }
    }
    locationObj.dropNaviJs();
    locationObj.fixedScrolledJs();
}

function footerJs(){
    var footerObj = {
        $footer : $('footer'),
        $network : $('.cmc_network'),
        networkJs : function(){
            var targetH = 0
                ,   initTop = -(footerObj.$footer.find('.footer_cont').outerHeight(true) + (footerObj.$network.find('.network_wrap .btn_open').outerHeight(true)-1));
            footerObj.$network.css({
                top:initTop
            });

            footerObj.$network.find('.btn_open').on('click',function(){
                if(!footerObj.$network.hasClass('active')){
                    footerMoveJs(true);
                }else{
                    footerMoveJs(false);
                }
            }).on('focus',function(){
                if(!footerObj.$network.hasClass('active')){
                    footerMoveJs(true);
                }
            }).on('blur',function(){
                // footerMoveJs(false);
            })

            var $networkLi = $('.network_cont_wrap').find('.d_1 > li');

            $networkLi.eq($networkLi.length-1).find('.d_2 > li').eq($networkLi.eq($networkLi.length-1).find('.d_2 > li').length-1).on('blur','a',function(){
                footerMoveJs(false);
            })

            $('.network_cont_wrap').find('.d_1 li a').on('focus',function(){
                footerMoveJs(true);
            })

            function footerMoveJs(bool){
                var targetH = 0;

                if(bool == true){
                    targetH = -(footerObj.$network.find('.network_wrap').outerHeight(true)+(footerObj.$footer.find('.footer_cont').outerHeight(true)-2));
                    footerObj.$network.addClass('active');
                }else{
                    targetH = initTop
                    footerObj.$network.removeClass('active');
                }
                TweenMax.to(footerObj.$network,1.3,{
                    top : targetH
                    ,	ease:'easeOutExpo'
                })
            }
        },
        dropNaviJs : function(){
            var $dropDown = footerObj.$footer.find('.drop_down')
                ,	$dropList = $dropDown.find('.drop_list')
                ,	$dropBtn = footerObj.$footer.find('.drop_btn')
                ,   dropID = 0;

            $dropBtn.on('mouseover',function(){
                // dropMoveFn();
                dropOver();
            });

            $dropBtn.on('mouseout',function(){
                dropOut();
            });

            $dropList.on('mouseover',function(){
                // dropMoveFn();
                dropOver();
            });

            $dropList.on('mouseout',function(){
                dropOut();
            });

            function dropOver(){
                dropMoveOverFn();
                if(dropID != 0){
                    clearInterval(dropID);
                    dropID = 0;
                }
            }

            function dropOut(){
                if(dropID == 0){
                    dropID = setTimeout(function(){
                        dropMoveOutFn();
                    },200)
                }
            }

           $dropBtn.on('focus',function(){
                if(!footerObj.dropClickChk){
                    dropOver();
                }
            });

            $dropBtn.on('blur',function(){
                if(!footerObj.dropClickChk){
                    dropOut();
                }
            });

            $dropList.on('focus','a',function(){
                dropOver();
            });

            $dropList.on('blur','a',function(){
                dropOut();
            });
            /* */
            function dropMoveOverFn(){
                var targetH = 0;

                $dropList.addClass('active');
                targetH = $dropList.find('ul').innerHeight() + 2;
                $dropList.css({
                    'left':$dropDown.position().left+10,
                    'top':$dropDown.position().top + 31
                });
                TweenMax.to($dropList,1,{
                    opacity: 1
                    //,	height:targetH
                    ,	height:'140px'
                    ,	ease:'easeOutExpo'
                });
            }

            function dropMoveOutFn(){
                $dropList.removeClass('active');
                TweenMax.to($dropList,1,{
                    opacity: 1
                    ,	height:0
                    ,	ease:'easeOutExpo'
                    ,	onComplete:function(){
                        $dropList.css('opacity',0);
                    }
                });
            }
        }
    }
    footerObj.networkJs();
    footerObj.dropNaviJs();
}

// list-type02
function listType02Js(){
    var $list02 = $('.list-type02 ul li');

    $list02.find('.question').on('click','a',function(){
        var $li = $(this).closest('li');
        if(!$li.hasClass('active')){
            $li.addClass('active').siblings().removeClass('active');
            TweenMax.to($li.find('.answer'),.7,{
                height:$li.find('.answer_wrap').outerHeight()
                , ease:'easeOutExpo'
            });
            TweenMax.to($li.siblings().find('.answer'),.7,{
                height:0
                , ease:'easeOutExpo'
            });
        }else{
            $li.removeClass('active');
            TweenMax.to($li.find('.answer'),.7,{
                height:0
                , ease:'easeOutExpo'
            });
        }
    })
}

function sitemapFn(){
    $('.wrap_gnb_util .btn_total > a').on('click',function(){
        var totalMaxArr = [];

        $('.total_menu').appendTo($('html'));
        $('body').css({
            'position':'fixed',
            'left':0,
            'right':0,
            'overflow-y':'scroll'
        });
        $('.total_menu').css({
            'display':'block',
            'position':'absolute',
            'top':0,
            'left':0,
            'z-index':9999,
            'height':0
        });

        $('.total_menu').attr('tabindex',0).focus();

        $('.total_menu').find('.p_t').each(function(){
            totalMaxArr.push($(this).height());
        });
        $('.total_menu').find('.p_t').css('height',Math.max.apply(null,totalMaxArr));

        TweenMax.to($('.total_menu'),1,{
            'height':$('.total_menu').find('.inner').outerHeight(true),
            'ease':'easeInOutExpo',
            'onComplete':function(){
                $('.total_menu').addClass('active');
            }
        });
    });

    $('.total_menu .inner .close_btn a').on('click focusout',function(){
        $('.total_menu').removeClass('active');
        TweenMax.to($('.total_menu'),1,{
            'height':0,
            'ease':'easeInOutExpo',
            'onComplete':function(){
                $('body').css({
                    'position':'relative',
                    'left':'initial',
                    'right':'initial',
                    'overflow-y':'initial'
                });
                $('.total_menu').appendTo($('.btn_total'));
                $('.total_menu').css('display','none');
            }
        });
        // $('body').attr('tabindex',0).focus();
        $('.btn_total a').focus();
        // $('.total_menu').focus();
        // setTimeout(function(){

        // },2000)
    })
}
function totalSearchFn(){
    var seachMoveChk = false;

    $('.wrap_gnb_util .btn_search > a').on('click',function(){
        // console.log(seachMoveChk)
        if(!seachMoveChk){
            seachMoveChk = true;
            if(!$('header .header_gnb_wrap').hasClass('status_search')){
                $('#header_wrap').trigger('mouseleave');
                $('header .header_gnb_wrap').addClass('status_search');
                $('#total_search').addClass('active');
                $('#total_search').insertAfter($('header'));
                $('#total_search').css({
                    'display':'block'
                });
                TweenMax.to($('#total_search .total_search_wrap'),.5,{
                    'delay':'.3',
                    'top':'105px',
                    'ease':'easeOutExpo',
                    onComplete:function(){
                        seachMoveChk = false;
                    }
                });
                $('#total_search').attr('tabindex',0).focus();
                dimdFn(true,15,null);
            }else{
                $('header .header_gnb_wrap').removeClass('status_search');
                $('#total_search').removeClass('active');
                TweenMax.to($('#total_search .total_search_wrap'),1,{
                    'top':'-25px',
                    'ease':'easeOutExpo',
                    onComplete:function(){
                        $('#total_search').appendTo('.btn_search');
                        $('#total_search').css({
                            'display':'none'
                        });
                        seachMoveChk = false;
                    }
                });
                $('.btn_search a').focus();
                dimdFn(false);
            }
        }

    });
}
function gnbFn(){
    var gnbObj = {
        outTimerID : 0,
        overTimerID : 0,
        d1OpenChk : false,
        d2MaxH : 0,
        d1CuNum : -1,
        gnbBannerSlider:null,
        gnbBannerChk:true,
        setLayout : function(){
            var d2hArr = [];
            if($('.gnb_banner').length != 0){
                gnbObj.gnbBannerChk = true;
            }else{
                gnbObj.gnbBannerChk = false;
            }
            if(gnbObj.gnbBannerChk){
                gnbObj.gnbBannerSlider = $('.gnb_banner').accSlider({
                    'autoSpeed':2500,
                    'arrowBtn':false
                });
            }

            $('#gnb').find('.d_2 > ul > li').each(function(){
                if($(this).find('.d_3').length){
                    $(this).closest('li').addClass('bl');
                }
            })
            $('#gnb .gnb_wrap .d_1_wrap').append('<span class="active_line"></span>');
            $('.active_line').css({
                position:'absolute'
                ,	top:'73px'
                ,	bottom:'0'
                ,	left:'0'
                ,	display:'block'
                ,	width:'40px'
                ,	height:'0'
                ,	'background-color':'#1f4bb4'
            });
            $('#gnb .gnb_wrap .d_2').each(function(){
                d2hArr.push($(this).outerHeight(true));
            });
            gnbObj.d2MaxH = Math.max.apply(null,d2hArr);
            if(gnbObj.d2MaxH < 427){
                gnbObj.d2MaxH = 427;
            }
            $('#gnb .gnb_wrap .d_2').css('height',gnbObj.d2MaxH-60);
        },
        lineSetFn:function(){
            $('#gnb .gnb_wrap .d_1').find('> li').each(function(i){
                if($(this).hasClass('active')){
                    gnbObj.lineFn(i);
                    gnbObj.d1CuNum = i;
                }
            })
        },
        addEvent : function(){
            $('#gnb').find('.d_btn_1').on('mouseenter focus', 'a', function(){
                var $li = $(this).closest('li')
                    ,	idx = $li.index();
                if(!gnbObj.d1OpenChk){

                }
                if(gnbObj.overTimerID == 0){
                    gnbObj.overTimerID = setTimeout(function(){
                        gnbObj.d1Over(idx);
                        gnbObj.overFn();
                    },300);
                }else{
                    gnbObj.d1Over(idx);
                    gnbObj.overFn();
                }
                // console.log($('#total_search').hasClass('active'));
            }).on('mouseleave', 'a',function(){
                var $li = $(this).closest('li')
                    ,	idx = $li.index();
                if(!gnbObj.d1OpenChk){
                    if(gnbObj.overTimerID != 0){
                        clearInterval(gnbObj.overTimerID);
                        gnbObj.overTimerID = 0;
                    }
                }
            });
            $('#gnb').find('.d_2').on('mouseenter',function(){
                var $li = $(this).closest('li')
                    ,	idx = $li.index();
                /*gnbObj.lineFn($li.closest('.d_1 > li').index());
                gnbObj.menuResetFn();*/
                if(gnbObj.d1OpenChk == false){
                    gnbObj.d1Over(idx);
                    gnbObj.overFn();
                }

            });
            $('#gnb').find('.d_2 > ul > li').find('> a').on('mouseenter focus', function(){
                var $li = $(this).closest('li')
                    ,	idx = $li.index();
                gnbObj.lineFn($li.closest('.d_1 > li').index());
                if($('#gnb').find('.d_2 > ul > li').find('.d_3').length){
                    $('#gnb').find('.d_2 > ul > li').find('.d_3').css({
                        'display':'none'
                        // ,	'opacity':0
                    });
                }

                if($li.find('.d_3').length){
                    $li.find('.d_3').css({
                        'display':'block'
                        // ,	'opacity':0
                        ,	'height':gnbObj.d2MaxH
                    });
                    $li.find('.d_3').find('> ul').css({
                        'top':(idx*36)+10,
                        'opacity':0
                        // 'display':'none'
                    }).stop().animate({
                        'top':(idx*36)+30,
                        'opacity':1
                    },800,'easeOutExpo');

                    if(((idx*36)+30) + $li.find('.d_3').find('> ul').height() > gnbObj.d2MaxH-5){
                        var overH = (((idx*36)+30) + $li.find('.d_3').find('> ul').height() - gnbObj.d2MaxH)+30;

                        TweenMax.to($('#header_wrap'),1,{
                            height:(gnbObj.d2MaxH+73) + overH
                            ,	ease:'easeOutExpo'
                        });
                        $('#gnb .gnb_wrap .d_2').css('height',(gnbObj.d2MaxH-60)+ overH);
                        $li.find('.d_3').css({
                            'height':gnbObj.d2MaxH+ overH
                        });
                    }else{
                        TweenMax.to($('#header_wrap'),1,{
                            height:gnbObj.d2MaxH+73
                            ,	ease:'easeOutExpo'
                            ,	onComplete:function(){
                                $('#gnb .gnb_wrap .d_2').each(function(){
                                    $(this).css('height',gnbObj.d2MaxH-60);
                                });

                                $li.find('.d_3').css({
                                    'height':gnbObj.d2MaxH
                                });
                            }
                        });
                    }

                }else{
                    TweenMax.to($('#header_wrap'),1,{
                        height:gnbObj.d2MaxH+73
                        ,	ease:'easeOutExpo'
                        ,	onComplete:function(){
                            $('#gnb .gnb_wrap .d_2').each(function(){
                                $(this).css('height',gnbObj.d2MaxH-60);
                            });

                            $li.find('.d_3').css({
                                'height':gnbObj.d2MaxH
                            });
                        }
                    });
                }

                $('#gnb').find('.d_2 > ul > li').find('> a').removeClass('active');
                $li.find('> a').addClass('active');

                gnbObj.overFn();
            })

            $('#gnb').find('.d_2 > ul > li').find('> a').on('mouseleave blur', function(){
                var $li = $(this).closest('li')
                    ,	idx = $li.index();

                $('#gnb').find('.d_2 > ul > li').find('> a').removeClass('active');
                if($li.find('.d_3').length){
                    $li.find('> a').addClass('active');
                }
            })

            $('#header_wrap').on('mouseleave',function(){
                gnbObj.outFn();
            });

        },
        d1Over : function(num){
            if(!gnbObj.d1OpenChk){
                gnbObj.d1OpenChk = true;
                /*$('#gnb').find('.d_1 > li').find('.d_2').css({
                    'display':'none'
                });*/

                TweenMax.set($('#gnb').find('.d_1 > li').find('.d_2'),{
                    top:52,
                    opacity:0
                });
                $('#gnb').find('.d_1 > li').find('.d_2').css('display','block');
                TweenMax.to($('#gnb').find('.d_1 > li').find('.d_2'),.8,{
                    top:72
                    ,   opacity:1
                    ,	ease:'easeOutExpo'
                })
            }
            gnbObj.menuResetFn();
            TweenMax.to($('#header_wrap'),1,{
                height:gnbObj.d2MaxH+73
                ,	ease:'easeOutExpo'
                ,	onComplete:function(){
                    if(gnbObj.gnbBannerChk){
                        gnbObj.gnbBannerSlider.playSlide();
                    }

                }
            });


            $('.header_gnb_wrap .gnb_banner').css('display','block');
            TweenMax.to($('.header_gnb_wrap .gnb_banner'),1.5,{
                opacity:1
            });

            gnbObj.d1OverEffectFn(num);
            gnbObj.lineFn(num);
        },
        d2Over : function(num){

        },
        overFn : function(){
            dimdFn(true,15,null);
            if(gnbObj.outTimerID != 0){
                clearInterval(gnbObj.outTimerID);
                gnbObj.outTimerID = 0;
            }
            /*gnbObj.gnbBannerSlider.goToSlide(1);
            gnbObj.gnbBannerSlider.playSlide();*/
        },
        outFn : function(){
            if(gnbObj.outTimerID == 0){
                gnbObj.outTimerID = setTimeout(function(){
                    // $('#header_wrap').css('height', 105);
                    TweenMax.to($('#header_wrap'),.7,{
                        height:73
                        ,	ease:'easeOutExpo'
                        ,	onComplete:function(){
                            if(gnbObj.gnbBannerChk){
                                gnbObj.gnbBannerSlider.stopSlide();
                            }
                        }
                    })

                    /*TweenMax.to($('#gnb').find('.d_1 > li').find('.d_2'),.5,{
                        opacity:0
                    });*/
                    /*
                    $('#gnb').find('.d_1 > li').find('.d_2').css('display','none');
                    $('#gnb').find('.d_1 > li').find('.d_2 .d_3').css('display','none');
                    */
                    TweenMax.to($('.header_gnb_wrap .gnb_banner'),.2,{
                        opacity:0
                        ,	onComplete:function(){
                            $('.header_gnb_wrap .gnb_banner').css({
                                'display':'none'
                                ,	'opacity':0
                            })
                        }
                    })

                    gnbObj.d1OverEffectFn();
                    gnbObj.menuResetFn();
                    if(!$('#total_search').hasClass('active')){
                        dimdFn(false);
                    };
                    gnbObj.lineFn(gnbObj.d1CuNum);

                    gnbObj.d1OpenChk = false;
                },100);
                if(gnbObj.overTimerID != 0){
                    clearInterval(gnbObj.overTimerID);
                    gnbObj.overTimerID = 0;
                }
            }
        },
        lineFn : function(num){
            var pos = 0
                ,	wd = 0;
            if(num < 0){
                TweenMax.to($('.active_line'),.4,{
                    top:'73px'
                    ,	height:'0px'
                    ,	ease:'easeOutExpo'
                    ,	delay:.1
                    ,	onComplete:function(){
                        $('.active_line').css('left',0);
                    }
                })
            }else{
                pos = $('.d_1').find('> li').eq(num).position().left
                wd = $('.d_1').find('> li').eq(num).find('.d_btn_1').outerWidth(true);

                if($('.active_line').css('left') == '0px'){
                    $('.active_line').css({
                        'left':pos
                        ,	'width':wd
                    });
                    TweenMax.to($('.active_line'),.4,{
                        top:'69px'
                        ,	height:'4px'
                        ,	ease:'easeOutExpo'
                    })
                }else{
                    TweenMax.to($('.active_line'),.5,{
                        left:pos
                        ,	width:wd
                        ,	top:'69px'
                        ,	height:'4px'
                        ,	ease:'easeOutExpo'
                    })
                }
            }
        },
        d1OverEffectFn : function(num){

        },
        menuResetFn : function(){
            $('#gnb').find('.d_2 > ul > li').each(function(){
                $(this).find('> a').removeClass('active');
            });
            $('#gnb').find('.d_2 .d_3').each(function(){
                $(this).css('display','none');
            });
        }

    }

    gnbObj.setLayout();
    gnbObj.addEvent();
    var psBtnChk = false;
    $('.playstop a').on('mouseenter',function(){
        psBtnChk = true;
    })
    $('.playstop a').on('mouseleave',function(){
        psBtnChk = false;
    })
    $('.playstop a').on('focus',function(){
        if(!psBtnChk){
            gnbObj.outFn();
        }
    })
}

// form

function placeholderJs(){
    $('.form-text').each(function(){
        var $this = $(this),
            $input = $this.find('input'),
            $placeholder = $this.find('label.placeholder');

        if($input.val() != ""){
            $placeholder.hide();
        }

        if(!$input.attr('readOnly')){
            $input.focus(function(){
                $placeholder.hide();
            }).blur(function(){
                if($input.val() != ""){
                    $placeholder.hide();
                }else{
                    $placeholder.show();
                }
            });
        }else{
            $input.change(function(){
                $placeholder.hide();
            });
        }

    })
}

function selectJs(){
    $('.form-select, .form-select02 ').each(function(){
        var $this = $(this),
            $select = $this.find('select'),
            defVal = $this.find('option:selected').text();

        if($this.find('.virtual_select').length != 0){
            $this.find('.virtual_select').remove();
        }
        $this.prepend('<span class="virtual_select">'+defVal+'</span>');

        $select.on('focus',function(){
            $this.addClass('active');
        }).on('blur',function(){
            $this.removeClass('active');
        })

        $select.change(function(){
            $this.find('span').text($this.find("option:selected").text());
        });
    });
}

function formFileFocusJs(){
    $('.form-file').each(function(){
        var $this = $(this);

        $this.find('input[type="file"]').on('focus',function(){
            $this.addClass('active');
        }).on('blur',function(){
            $this.removeClass('active');
        })
    })
}

function layerPopupJs(popObj, openBtn){
    var $popup = $('.'+popObj)
        ,	$openBtn = null;

    openBtn == undefined?$openBtn=event.currentTarget:$openBtn=$('.'+openBtn);

    dimdFn(true,30,popupcloseFn);
    /*$('.content').on('scroll mousewheel', function(event) {
       event.preventDefault();
       event.stopPropagation();

       return false;
    });*/
    $popup.css({
        'position':'fixed'
        ,	'top': topH()-20
        ,	'left':($(window).width()/2) - ($popup.outerWidth(true) / 2)
        ,	'z-index':40
        ,	'display':'block'
    })

    TweenMax.to($popup,1,{
        height:$popup.find('.popup_wrap').innerHeight()
        ,	top:topH()
        ,	ease:'easeOutExpo'
    })

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

    $popup.find('.popup_close_btn a').on('click focusout',function(){
        popupcloseFn();
    });

    function popupcloseFn(){
        dimdFn(false);
        $popup.css({
            'display':'none'
        });
        $(window).off('resize',function(){
            $popup.css({
                'top':($(window).height()/2) - ($popup.outerHeight(true) / 2) - 20
                ,	'left':($(window).width()/2) - ($popup.outerWidth(true) / 2)
            });
        });
        $popup.find('.popup_close_btn a').off('click focusout');
        $openBtn.focus();
    }
}


function dimdFn(bool,zNum,func){
    if(bool){
        if(!$('.dimd').length){
            $('<div class="dimd"></div>').appendTo($('#wrap'));

            $('.dimd').css({
                'position':'fixed'
                ,	'top':0
                ,	'left':0
                ,	'opacity':0
                ,	'z-index':zNum
                ,	'width':$(window).width()
                ,	'height':$(window).height()
                ,	'background-color':'rgba(0,0,0,.5)'
                ,	'display':'block'
            });

            $(window).on('resize',function(){
                $('.dimd').css({
                    'width':$(window).width()
                    ,	'height':$(window).height()
                });
            });

            TweenMax.to($('.dimd'),.3,{
                'opacity':1
            })
            $('.dimd').on('click',function(){
                if(func != null){
                    func();
                }
            })
        }
    }else{
        if($('.dimd').length){
            TweenMax.to($('.dimd'),.3,{
                'opacity':0
                , onComplete:function(){
                    $('.dimd').remove();
                }
            })

            $(window).off('resize',function(){
                $('.dimd').css({
                    'width':$(window).width()
                    ,	'height':$(window).height()
                });
            });

            $('.dimd').off('click');
        }
    }

}

function numberEfFn(num1,num2,num3,num4){
    function numberCounter(target_frame, target_number) {
        this.count = 0; this.diff = 0;
        this.target_count = parseInt(target_number);
        this.target_frame = document.getElementById(target_frame);
        this.timer = null;
        this.counter();
    };
    numberCounter.prototype.counter = function() {
        var self = this;
        this.diff = this.target_count - this.count;

        if(this.diff > 0) {
            self.count += Math.ceil(this.diff / 5);
        }

        this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        if(this.count < this.target_count) {
            this.timer = setTimeout(function() { self.counter(); }, 20);
        } else {
            clearTimeout(this.timer);
        }
    };
    new numberCounter("line01", num1);
    new numberCounter("line02", num2);
    new numberCounter("line03", num3);
    new numberCounter("line04", num4);
}

function loadingLayerFn(bool){
    var $loadingLayer = $('.loading_layer');

    if(bool){
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
        $loadingLayer.animate({
            'opacity':0
        },400,function(){
            $('body').css({
                'overflow':'initial'
            });
            $loadingLayer.removeClass('active');
        })
    }

    loadingSetSize();

    function loadingSetSize(){
        $loadingLayer.css({
            'width':$(window).width(),
            'height':$(window).height()
        });
    }

    $(window).on('resize',function(){
        loadingSetSize();
    })

}

/*function calendarTog(){
    $(".calendar_wrap").each(function(){
        $(".btn_toggle",this).on("click",function(){
            if(!$(this).hasClass("active")){
                $(this).addClass("active");
            }else{
                $(this).removeClass("active");
            }
        })
    })
}*/
/*function calendarTog(){
    var $subSection = $('#sub_section')
        ,	sectionPbNum =  $subSection.css('padding-bottom');

    $(".calendar_wrap").each(function(){
        $(".btn_toggle",this).on("click",function(){
            var $cBox = $(this).siblings('.calendar_box');

            if(!$(this).hasClass("active")){
                $(this).addClass("active");
                if($cBox.position().top + parseInt($cBox.outerHeight(true)) > $('.cmc_network').position().top){
                    $subSection.css('padding-bottom', parseInt(sectionPbNum)+($cBox.offset().top+parseInt($cBox.outerHeight(true)) - $('.cmc_network').offset().top) + 10);
                }
            }else{
                $(this).removeClass("active");
                if($subSection.css('padding-bottom') > sectionPbNum){
                    $subSection.css('padding-bottom',sectionPbNum);
                }
            }
        })
    })
}*/

function topBtnScroll(){
    var sct = Number($(window).scrollTop());
    var dH = Number($(document).outerHeight());
    var wH = Number($(window).height());
    var thisH = Number($(".top_btn").outerHeight());
    var fbH = btH = ctH = 0;

    if($(".f_banner")) fbH = Number($(".f_banner").height());
    if($("#footer_wrap .cmc_network .btn_open")) btH = Number($("#footer_wrap .cmc_network .btn_open").outerHeight());
    if($(".footer_cont")) ctH = Number($(".footer_cont").outerHeight());


    if(sct == 0){
        $("#footer_wrap .top_btn").removeClass("active");
    }else{
        $("#footer_wrap .top_btn").addClass("active");
        if(dH - sct - wH < fbH + btH + ctH){
            $("#footer_wrap .top_btn").removeClass("fix").css({"top" : -1 * (fbH + btH + ctH + thisH + 40) + "px"});
        }else{
            $("#footer_wrap .top_btn").addClass("fix").css({"top" : "auto"});
        }
    }
}

$(document).ready(function(){
    topBtnScroll()
})

$(window).on("scroll",function(){
    topBtnScroll()
})

$(document).ready(function(){
    $("#container.error").not($("#container.error.scrOn")).parents("body").css({"overflow-y" : "hidden"});
    globalGnbFn();
})

function globalGnbFn(){
    var gl = $(".global_gnb .global_list");
    // console.log(gl)

    $(".global_gnb>a").on("mouseover focus",function(){
        gl.slideDown();
    })
    $(".global_gnb").on("mouseleave",function(){
        gl.slideUp();
    })
    $(".global_gnb .global_list li:last-child a").on("focusout",function(){
        gl.slideUp();
    })
}