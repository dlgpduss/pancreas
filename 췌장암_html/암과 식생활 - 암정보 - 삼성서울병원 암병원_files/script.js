!function($, window) {

	SMC = {};
	window.SMC = SMC;

	$(function(){

		// GNB init
		//SMC.gnb.init( ); // parametar : #gnb
		SMC.Footer.init();
		SMC.location.init();
		initTabContainer();
		siteSignin.init();
		SMC.Readability.init();
	}); // end Document ready


	// GNB
	var siteGNB = function() {
		var that = this;
		this.GNB = $('#gnb');
		this.panel = $('.menu-panel');
		this.navigation = $('nav[role="navigation"]');

		this.syncBoth = function(activeID) {
			var $activeGNB = $('#'+activeID);
			var $activePanel = this.panel.find('.sub-menu[aria-labelledby="'+activeID+'"]');
			// GNB set
			$activeGNB.addClass('active')
				.parent('li').siblings().find('a[role="menuitem"]').removeClass('active');
			// panel set
			$activePanel.addClass('active')
				.siblings().removeClass('active');

			this.panel.addClass('expanded');

			return $activeGNB.hasClass('active') && $activePanel.hasClass('active');
		}

		this.reset = function() {
			this.GNB.find('[role="menuitem"]').removeClass('active');
			this.panel.find('.sub-menu').removeClass('active');
			this.panel.removeClass('expanded');
		}

		this.timer = function(func, args) {
			gnb_timer = this.navigation.data('gnb_timer');
			if( gnb_timer ) clearTimeout(gnb_timer);
			this.navigation.data('gnb_timer',
				setTimeout(function() {
					// console.log( typeof func, func, args );
					if (typeof func == "function") {
						func( args );
					}
				}, 130)
			);
		}

		// Init
		this.GNB.find('[role="menuitem"]').on('mouseenter', function(ev){
			var activeID = this.id;
			that.timer( that.syncBoth, activeID );
		});
		this.panel.find('.sub-menu').on('mouseenter', function(ev){
			var activeID = $(this).attr('aria-labelledby');
			that.timer( that.syncBoth, activeID );
		});
		this.navigation.on('mouseleave', function(ev){
			that.timer( that.reset );
		});
		// console.log( this.GNB, this.panel, typeof this.syncBoth, this.syncBoth('gnb_menu_C') );
	}.call();

	// 검색영역 확장 & submit
	$('.header-search')
		.find('.button-header-search').click(function(ev){
			if( $('.header-search').hasClass('expanded') ) {
				// 검색
				if( $('.header-search .input-text').val().length > 0 ) {
					// $('.header-search').submit()
				}
				else {
					$('.header-search').removeClass('expanded');
				}
			}
			else {
				$('.header-search').addClass('expanded');
			}

			// Close trigger
			$(document).one('keydown', function(ev) {
		    if ( ev.keyCode === 27 ) { // ESC
	        $('.header-search').removeClass('expanded')
		    }
			});
			$('.header-search').oneClickOutside({
				callback: function() {
					// alert( $('.header-search').hasClass('expanded') );
					$('.header-search').removeClass('expanded')
				}
			});
		});


	// siteSignin
	var siteSignin = {
		anchor: $('.header-signin .signin-context:not(.anchor-signin)'),
		obj: $('.header-signin .signed'),
		open: function() {
			var that = this;
			this.obj.addClass('show');
			this.outerClick();
		},
		close: function() {
			var that = this;
			this.obj.oneClickOutside("off");
			this.obj.removeClass('show');
		},
		outerClick: function() {
			var that = this;
			this.obj.oneClickOutside({
				callback: function() {
					that.close();
				}
			});
		},
		init: function() {
			var that = this;

			if( that.anchor.length == 0 ) {
				return false;
			}

			// Close trigger
			$(document).on('keydown', function(ev) {
			if ( ev.keyCode === 27 ) { // ESC
				that.close();
			}
			});

			this.outerClick();

			that.anchor.on('click', function(){
				if( that.obj.hasClass('show') ) {
					that.close();
				} else {
					that.open();
				}
				return false;
			});

			return this;
		}
	}

	// Affix GNB with bootstrap affix library
 	$('.header-menu-burger').on('click', function(ev) {
 		var $gnb = $('.header[role="banner"]')
 		$gnb.css({'position':'fixed','z-index':106}).stop(true,false).animate({
 				opacity: 1,
 				// top: '-100px'
 			}, 150, "linear", function() {
 				$(this).addClass('fixed').removeAttr('style');
 			});

 		$(window).one('scroll', function(ev) {
 			$gnb.stop(true,false).animate({
 				opacity: .1,
 				// top: '-100px'
 			}, 150, "linear", function() {
 				$(this).removeClass('fixed').removeAttr('style');

 			});
 		});
 	});

	// Readability
	SMC.Readability = {
		 target: $('.post-detail')
		,layer_content: $('#layerReadability .modal-content-body')
		,font_size: 1
		,max_size: 1.5
		,min_size: 1
		,fontsize_control: function(direction) {
			var that = this;
			if( direction == 'plus') { // bigger
				this.font_size += 0.1;
				if( this.font_size > this.max_size ) {
					this.font_size = this.max_size;
					$('.btn-fontsize-bigger').addClass('btn-font-disabled');
				}
				this.layer_content.css('font-size', that.font_size +'em');
				$('.btn-fontsize-smaller').removeClass('btn-font-disabled');
			}
			else if ( direction == 'minus' ) { // smaller
				this.font_size -= 0.1;
				if( this.font_size < this.min_size ) {
					this.font_size = this.min_size;
					$('.btn-fontsize-smaller').addClass('btn-font-disabled');
				}
				this.layer_content.css('font-size', that.font_size +'em');
				$('.btn-fontsize-bigger').removeClass('btn-font-disabled');
			}
			else { // reset
				this.font_size = 1;
				this.layer_content.css('font-size', that.font_size +'em');
			}
		}
		,open_readability: function() {
			var that = this;
			$title = this.target.find('.post-detail-head').clone();
			$content = this.target.find('.post-detail-body').clone();

			$('#layerReadability')
				.find('.modal-content').addClass('no-column')
				.find('.modal-content-head').html( $title.html() ).end()
				.find('.modal-content-body').html( $content.html() );

			modalWindow.modalShow('modal', 'layerReadability');
		}
		,close_readability: function() {
			$('#layerReadability .modal-container').oneClickOutside("off");
			modalWindow.modalHide('modal', '#layerReadability');
		}
		,init: function() {
			var that = this;

			$(document).on('click', '#btnReadability', function(ev) {
				ev.preventDefault();
				that.open_readability();

				// Close trigger
				$(document).one('keydown', function(ev) {
			    if ( ev.keyCode === 27 ) { // ESC
		        that.close_readability();
			    }
				});
				$('#layerReadability .modal-container').oneClickOutside({
					callback: function() {
						that.close_readability();
					},
					exceptions: "#modal-itemContMovie"
				});
				$('#layerReadability .button-modal-close').one('click', function(ev) {
					$('#layerReadability .modal-container').oneClickOutside("off");
				});
			});

			$('.btn-fontsize-smaller').on('click', function(ev){
				ev.preventDefault();
				that.fontsize_control('minus');
			});
			$('.btn-fontsize-bigger').on('click', function(ev){
				ev.preventDefault();
				that.fontsize_control('plus');
			});



			// this.obj.oneClickOutside({
			// 	callback: function() {
			// 		that.close_expand();
			// 	}
			// });
		}
	}
	// Footer expanded
	SMC.Footer = {
		 obj: $('#footer')
		,open_expand: function() {
			this.obj.addClass('expanded');
		}
		,close_expand: function() {
			this.obj.removeClass('expanded');
			this.obj.oneClickOutside("off");
		}
		,toggle_expand: function() {
			this.obj.toggleClass('expanded')
		}
		,init: function() {
			var that = this;
			this.obj.find('.expand-link .btn-expand-outer').on('click', function() {

				// Close trigger
				$(document).one('keydown', function(ev) {
			    if ( ev.keyCode === 27 ) { // ESC
		        // that.obj.removeClass('expanded')
		        that.close_expand();
			    }
				});
				$('#footer').oneClickOutside({
					callback: function() {
						// alert( $('.header-search').hasClass('expanded') );
						// that.obj.removeClass('expanded')
						that.close_expand();
					}
				});
				that.open_expand('expanded');
			});
			this.obj.oneClickOutside({
				callback: function() {
					that.close_expand();
				}
			});
			$('#footer .button-footer-close').on('click', function(ev){
				that.close_expand();
			});

			// Back to top
			$('.back-to-top').on('click touchstart', function(ev){
				ev.preventDefault();
				ev.stopPropagation();
				$("html, body").animate({ scrollTop: 0 }, 300, 'easeOutCubic');
			});
			
			on_resize(function() {
				if( $(window).height() * 1.8 > $(document).height()  ) { // 스크롤이 거의 없는 페이지는 back-to-top 버튼 노출안함
					$('.back-to-top').hide();
				}				
				else $('.back-to-top').css('display','');
				//alert('a');
			})();
		}
	};


	SMC.location = {
		 breadcrumbs: $('.breadcrumbs')
		,close_location: function(obj) {
			if( obj ) {
				obj.removeClass('expanded')
			}
			else {
				this.breadcrumbs.find('li').removeClass('expanded');
			}
		}
		,init: function() {
			var that = this;
			this.breadcrumbs.find('.location-label').on('click', function(ev){
				ev.preventDefault();
				$(this).parent('li').toggleClass('expanded').siblings().removeClass('expanded');

				$(document).one('keydown', function(ev) {
			    if ( ev.keyCode === 27 ) { // ESC
		        that.close_location();
			    }
				});
				that.breadcrumbs.oneClickOutside({
					callback: function() {
						that.close_location();
					}
				});
				$(window).one('scroll', function(ev) {
	 				that.close_location();
		 		});
			});
		}
	};

	/* 탭메뉴 */
	function initTabContainer() {

		var $tab = $('.tab-container');

		if( $tab.length == 0 ) {
			return false;
		}

		$tab.each(function() {

			var $tab		= $(this),
				$tabAnchor	= $tab.find('.tab-anchor').parent('li'),
				$tabPanel	= $tab.find('.tab-panel'),
				defaultTab	= 0;

			if( $tabAnchor.filter('.active').length > 0 ) {
				defaultTab = $tabAnchor.filter('.active').index();
			}

			if( $tabAnchor.hasClass('active') ) {
				$tabAnchor.removeClass('active');
			}

			$tabPanel.hide();

			$tabAnchor.on('click', function(e) {
				e.preventDefault();

				var $thisTabAnchor = $(this),
					$thisTabPanel = $($(this).find('>a').attr('href'));

				if( $thisTabAnchor.hasClass('active') ) {
					return false;
				}

				$tabAnchor.filter('.active').not($thisTabAnchor).removeClass('active');
				$tabPanel.filter('.active').not($thisTabPanel).removeClass('active').hide();

				$thisTabAnchor.addClass('active');
				$thisTabPanel.addClass('active').show();
			});

			$tabAnchor.eq(defaultTab).trigger('click');
		});
	}
	
	/* Youtube wmode opaque */
	$("iframe[src], embed[src]").each(function () {
    var url = $(this).prop("src");
    if(url.search(/\?/) === -1) {
            $(this).prop("src", url + "?wmode=opaque");
    } else {
            $(this).prop("src", url + "&wmode=opaque");
    }
	});
	
	// Print now
	$('.button-print').on('click',function(ev){
		window.print();
	});
	
}(window.jQuery, window);



/* 이미지 에러 체크 */
$(window).load(function(){
	imgErrorCheck();
});

function imgErrorCheck(){
	//log('check now')
	var $imgs = $('.card-list img:not(.checked)')
	,	imgLength = $imgs.length;


	function callML() { // Fix masonry rerender
		
		if( $('.masonry').length ) {
			$('.masonry').masonry();
			$('.masonry').masonry( 'on', 'layoutComplete', function(laidOutItems) {
				imgErrorCheck();
			})
		}		
	}

	$imgs.each(function(node){
		var $this = $(this);
		var newImg = new Image();

		$(newImg).error(function(){
			$this.hide().addClass('checked hide')

			if( $this.parent('.card-content-img').length != 0 ) {
				$this.parent('.card-content-img').hide().addClass('checked hide');
			}

			if( imgLength == node+1) {callML()}
		}).one('load', function(){
			$this.addClass('checked')

			if( $this.parent('.card-content-img').length != 0 ) {
				$this.parent('.card-content-img').addClass('checked');
			}

			if( imgLength == node+1 ) {callML()}
		})

		newImg.src = $this.attr('src');
	})
}


function windowOpenCenter(url, width, height) {
	var screenW = screen.width,
		screenH = screen.height,
		posX = (screenW - width)/2,
		posy = (screenH - height)/2,
		popupOption  = 'top='+ posy +',left=' + posX;

		popupOption += ',width=' + width + ',height=' + height + ',toolbar=0, resizable=1, status=0, scrollbars=1';

	window.open (url,'', popupOption) ;
}

//2017-01-26 암센터 리뉴얼 추가
$(document).ready(function(){
	$('.CareCenterSubTab li').each(function(i){
		$(this).find('>a').click(function(){
			$(this).parent('li').addClass('on').siblings('li').removeClass('on');
			$('#WrapperTabContents .CareCenterTabContents').hide();
			$('#WrapperTabContents .CareCenterTabContents').eq(i).show();
		});
	});
	//2017-08-14 암센터 홍보관에서 의료진소개 접근시
	var urlNew = window.location.toString();
	if(urlNew.indexOf("cancer=promote") > -1 ){
		$('head').append('<link rel="stylesheet" href="/_newhome/ui/cancer/static/css/cancer_prnew.css" media="all">')
		$('header, #footer, .header-fixed, section .tab_area, .card-footer-btn .light-green, .card-footer-btn .light-blue').hide();
		$('.card-footer-btn').removeClass('btn-3p');
		$('.container').css('padding-top','0');
	};
});


//2017-06-27 암센터 상세 슬라이드 추가
$(function(){
	centerSlide();
});

function centerSlide() {
	var $centerSlide = $('.center-slide-container');
	

	if( $centerSlide.length == 0 ) {
		return false;
	}

	function goPrev(swiper) { // IE9 fixed
		if(!Modernizr.cssanimations) {
			if( swiper.isBeginning ) { swiper.slideTo( swiper.slides.length -1) }
			else { swiper.slidePrev() }		
		}
		else { swiper.slidePrev() }	
	}
	function goNext(swiper) { // IE9 fixed
		if(!Modernizr.cssanimations) {
			if( swiper.isEnd ) { swiper.slideTo(0) }
			else { swiper.slideNext() }
		}
		else { swiper.slideNext() }	
	}

	config = {
		loop: true,
		mode:'horizontal',
		pagination: '',
		paginationClickable : true,
		autoplay: 3500,
		speed: 500,
		effect: 'fade'
	}
	if(!Modernizr.cssanimations) {
		config.loop = false;
	}

	$centerSlide.each(function() {

		var $slideItem = $(this).find('.swiper-slide'),
			$slideHandler = $(this).find('.swiper-handler'),
			$slidePrev = $(this).find('.swiper-control-prev'),
			$slideNext = $(this).find('.swiper-control-next'),
			$slidePagination = $(this).find('.swiper-pagination'),				
			mySwiper;

		config.pagination = $slidePagination[0];
		

		if( $slideItem.length <= 1 ) {
			$slideHandler.hide();
			return;
		}

		mySwiper = $(this).find('.swiper-container').swiper(config);

		if( $slidePrev.length > 0 ) {
			$slidePrev.on('click', function(e) {
				e.preventDefault();
				goPrev(mySwiper);	 		
			});
		}

		if( $slideNext.length > 0 ) {
			$slideNext.on('click', function(e) {
				e.preventDefault();
				goNext(mySwiper);
			});
		}
	});
}