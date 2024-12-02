// IE용 CustomEvent polyfill
(function () {
	if (typeof window.CustomEvent === "function") return false;

	function CustomEvent(event, params) {
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}
	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();

// IE 감지
var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("msie") > -1 || agent.indexOf("trident") > -1) {
	$('body').addClass('ie');
}

//모달 이벤트 핸들링을 위한 커스텀 이벤트 추가
var hiddenEvent = new CustomEvent("hidden-modal", {});
var showEvent = new CustomEvent("show-modal", {});

// Skip Nav
$(document).on('click', '#skip a', function (e) {
	var tg = $(this).attr('href');
	$(tg).attr('tabindex', '0').focus();
	e.preventDefault();
});

// CMS 콘텐츠 타이틀 영역 템플릿 구조 변경
if ($('.content-body .content-header').length > 0) {
	$('.content-body .content-header').each(function () {
		$(this).closest('.content-body').prev('.content-header').remove();
	});
}

// 스크롤바 커스텀 디자인
scrollbar();
$('.popup .popup-body').mCustomScrollbar({
	scrollInertia: 300
});

function scrollbar() {

	var handleMediaChange = function (mediaQueryList) {
		if (mediaQueryList.matches) {
			// 모바일
			$('.custom-scroll, .modal-popup .popup-body').mCustomScrollbar('destroy');
		} else {
			// 데스크탑
			$('.custom-scroll, .modal-popup .popup-body').mCustomScrollbar('destroy');
			$('.custom-scroll, .modal-popup:not(.modal-user-menu) .popup-body').mCustomScrollbar({
				scrollInertia: 300
			});
		}
	}
	var mediaQueryMatch = window.matchMedia("(max-width: 1025px)");
	mediaQueryMatch.addListener(handleMediaChange);
	handleMediaChange(mediaQueryMatch);
}

// 모바일모드 더블터치 핀치 줌 방지
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
	var now = (new Date()).getTime();
	if (now - lastTouchEnd <= 300) {
		event.preventDefault();
		lastTouchEnd = now;
	}
}, false);

// 테이블 스크롤 표시
function tableScroll() {
	var table = $('.scroll-container');

	table.each(function () {
		var $this = $(this),
			ingClass = 'scroll-ing',
			endClass = 'scroll-end';
		$this.on('scroll', function (e) {
			var wrap = $(this).closest('.table-scroll'),
				currLeft = this.scrollLeft,
				scrWidth = this.scrollWidth,
				cliWidth = this.clientWidth;

			if (currLeft === 0) {
				wrap.removeClass(ingClass).removeClass(endClass);
			} else if (currLeft !== 0 && currLeft + cliWidth < scrWidth) {
				wrap.addClass(ingClass).removeClass(endClass);
			} else {
				wrap.addClass(endClass);
			}
		});
	});
}
tableScroll();

// PC모드 GNB 하위메뉴 하단부 클릭시 LNB 닫힘 처리
$(document).on('mousedown', 'body.lnb-open', function (e) {
	var $obj = $('.active .lnb-area');
	if ($obj.length > 0) {
		var objPos = $obj.offset();
		objPos.bottom = (objPos.top + $obj.height());
		if (e.pageY > objPos.bottom) {
			lnbClose($(this).closest('.lnb-area'));
		}
	}
});

// 탭메뉴
var tabCurrentIndex;
$('.tab-list .on a').each(function () {
	var tg = $(this).attr('href');
	if (tg !== '#' && tg.charAt(0) === '#') {
		$(tg + '.tab-content').css('display', 'block');
	}
});

function setFlicking(obj, col) {
	if (!$(obj).hasClass('tab-menu-matrix') && !$(obj).hasClass('tab-category-matrix') && $(obj).find('li').length > col) {
		$(obj).addClass('tab-menu-flicking');
		$(obj)
			.append('<div class="control"><button type="button" class="btn-tab-prev">Prev</button><button type="button" class="btn-tab-next">Next</button></div>')
			.wrapInner('<div class="tab-scroll-container"></div>');
	}
}

function unsetFlicking(obj) {
	$(obj).removeClass('tab-menu-flicking');
	$(obj).find('.control').remove();
	$('.tab-list', obj).css({
		'transform': 'translateX(0)',
	});
}

function moveFlicking(obj, tabCurrentIndex, col, colToScroll) {
	var $tabList = $(obj).find('.tab-list');
	var $btnWrapper = $(obj).find('.control');
	var length = $tabList.children('li').length - 1;
	var colWidth = Math.ceil($tabList.children('li').eq(0).outerWidth());
	var posX = 0;

	// 버튼 비활성화
	$btnWrapper.removeClass('start').removeClass('end');
	if (tabCurrentIndex == 0) {
		$btnWrapper.addClass('start');
	} else if (tabCurrentIndex == length) {
		$btnWrapper.addClass('end');
	}

	// 스크롤 위치 계산
	if (col < $tabList.children('li').length) {
		if (tabCurrentIndex >= col - colToScroll && tabCurrentIndex <= length) {
			if (tabCurrentIndex <= length - colToScroll) {
				var pos = tabCurrentIndex - col + colToScroll;
			} else {
				var pos = length - col + 1;
			}
			posX = colWidth * -1 * pos;
		}
		if (!$tabList.parent('.tab-menu').is('.tab-menu-matrix')) {
			$tabList.css({
				'transform': 'translateX(' + posX + 'px)',
			});
		}
	}
}

$('.tab-list a').on('click', function (e) {
	var tg = $(this).attr('href');
	$(this).parent('li').addClass('on').siblings('li').removeClass('on');

	if (tg === '#' || tg === '' || tg === '#;') {
		e.preventDefault();
	} else if (tg.charAt(0) === '#') {
		if ($(tg).hasClass('tab-content')) {
			$(tg).show().siblings('.tab-content').hide();
			e.preventDefault();

			// URL 해시 업데이트
			if ($(this).closest('.tab-menu').hasClass('tab-menu1') || $(this).closest('.tab-menu').hasClass('tab-menu-department')) {
				history.pushState('', document.title, window.location.pathname + window.location.search + tg);
			}
		}
	}

	// 탭 클릭시 점프 투 세팅 다시
	if ($('.jump-to-nav').length && ($(this).closest('.tab-menu').hasClass('tab-menu1') || $(this).closest('.tab-menu').hasClass('tab-menu-department'))) {
		$('.jump-to-nav').removeClass('fixed');
		setTimeout(function () {
			jumpTo(_mode, tg);
		}, 400)
	}

	if ($(this).closest('.tab-menu').hasClass('tab-menu-flicking')) {
		var tabCurrentIndex = $(this).parent('li').index();
		var col, colToScroll;
		if (_mode == 'pc' && $(this).closest('.tab-menu').hasClass('tab-menu-department')) {
			col = 4;
			colToScroll = 2;
		} else if (_mode == 'pc') {
			col = 6;
			colToScroll = 3;
		} else if (_mode == 'tablet') {
			col = 3;
			colToScroll = 2;
		} else if (_mode == 'mobile' && $(this).closest('.tab-menu').hasClass('tab-category')) {
			col = 3;
			colToScroll = 2;
		} else {
			col = 2;
			colToScroll = 2;
		}

		moveFlicking($(this).closest('.tab-menu'), tabCurrentIndex, col, colToScroll);
	}
});

// URL 해시 탭 활성화
$(window).on('load', function () {
	var tab = $('.tab-menu1 a[href="' + location.hash + '"]');
	if (tab.length > 0) {
		$('body, html').animate({
			scrollTop: 0
		}, 0);
	}
}).on('load hashchange', function () {
	$('.tab-menu1 a[href="' + location.hash + '"]').click();
});

// 진료과 상세 탭 동일 적용
$(window).on('load', function () {
	var tab = $('.tab-menu-department a[href="' + location.hash + '"]');
	if (tab.length > 0) {
		$('body, html').animate({
			scrollTop: 0
		}, 0);
	}
}).on('load hashchange', function () {
	$('.tab-menu-department a[href="' + location.hash + '"]').click();
});

// 모바일 플리킹 탭 터치무브 액션
var startX = 0,
	endX = 0;

$(document).on('touchstart', '.tab-menu-flicking', function (e) {
	startX = e.originalEvent.changedTouches[0].screenX;
}).on('touchend', '.tab-menu-flicking', function (e) {
	endX = e.originalEvent.changedTouches[0].screenX;
	if (startX - endX > 50) {
		$('.btn-tab-next', this).click();
	} else if (endX - startX > 50) {
		$('.btn-tab-prev', this).click();
	}
});

$(document).on('click', '.btn-tab-prev, .btn-tab-next', function () {
	var $obj = $(this).closest('.tab-menu');
	var $tabList = $obj.find('.tab-list');
	var length = $tabList.children('li').length - 1;
	var prevIndex = $obj.find('li.on').index();

	if ($(this).hasClass('btn-tab-prev')) {
		if (prevIndex == 0) {
			tabCurrentIndex = length;
		} else {
			tabCurrentIndex = prevIndex - 1;
		}
	} else if ($(this).hasClass('btn-tab-next')) {
		if (prevIndex == length) {
			tabCurrentIndex = 0;
		} else {
			tabCurrentIndex = prevIndex + 1;
		}
	}

	$tabList.children('li').eq(tabCurrentIndex).children().click();
});

// 카테고리 드롭다운
$('.category-container').each(function () {
	var col = $(this).children().length;
	$(this).addClass('col' + col);
});
$('.dropdown-control .btn-dropdown').on('click', function () {
	var control = $(this).closest('.dropdown-control');
	$('.dropdown-control').not(control).removeClass('opened');
	$(control).toggleClass('opened');
});
$(document).on('click', function (e) {
	var $obj = $('.dropdown-control.opened');
 	var $list = $('.dropdown-list', $obj);
 	if ($list.length) {
			var objPos = $obj.offset();
			var listPos = $list.offset();
			objPos.right = (objPos.left + $obj.width());
			objPos.bottom = (listPos.top + $list.height());
			if ((e.pageX < objPos.right - 40 || e.pageX > objPos.right || e.pageY < listPos.top || e.pageY > listPos.bottom) && !$(e.target).closest('.btn-dropdown').length && !$(e.target).closest('.breadcrumb-list').length) {
				$('.dropdown-control').removeClass('opened');
			}
		}
}).on('click', '.category-list a', function (e) {
	e.preventDefault();
	$(this).parent('li').addClass('on').siblings('li').removeClass('on');
});

// 게시판 목록 : 상단 공지 슬라이더
function bbsNoticeSlider() {
	var maxLength = 2;
	$('.notice-container').each(function () {
		if ($('.bbs-item', this).length > maxLength) {
			$('.bbs-list', this).not('.slick-initialized').slick({
				infinite: false,
				slidesToScroll: 1,
				slidesToShow: 2,
				rows: maxLength,
				arrows: false,
				dots: true,
				adaptiveHeight: true,
				draggable: true,
				responsive: [{
					breakpoint: 9999,
					settings: 'unslick'
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
					}
				}],
			});
		}
	});
}

// 게시판 목록 : FAQ 아코디언 목록
$(document).on('click', '.faq-list dt a', function (e) {
	e.preventDefault();
	$(this).parent('dt').next('dd').slideToggle('fast').siblings('dd').slideUp('fast');
	$(this).parent('dt').toggleClass('on').siblings('dt').removeClass('on')
});

// 게시판 상세 : 카드 슬라이더
if ($('.card-paging').length > 0) {
	var $cardObj = $('.card-slider');
	var $status = $('.card-paging');

	$cardObj.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$status.html('<strong class="text-primary">' + i + '</strong>/' + slick.slideCount);
	});

	$cardObj.not('.slick-initialized').slick({
		infinite: false,
		slidesToScroll: 1,
		slidesToShow: 1,
		arrows: true,
		dots: false,
	});
}

// 게시판 상세 : 연계 콘텐츠 슬라이더
function bbsLinkContentSlider() {
	var maxLength1 = 5;
	var maxLength2 = 3;
	$('.link-content-track').each(function () {
		var itemLength = $('.link-content-item', this).length;
		if ($(this).hasClass('dictionary') && itemLength > maxLength1) {
			$(this).not('.slick-initialized').slick({
				slidesToShow: 2,
				rows: 2,
				slidesToScroll: 1,
				arrows: true,
				infinite: false,
				dots: false,
				adaptiveHeight: true,
				focusOnSelect: false,
				mobileFirst: true,
				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToScroll: 2,
						rows: 1,
						slidesToShow: maxLength1,
					}
				}],
			});
		} else if ($(this).hasClass('part') && itemLength > maxLength2) {
			$(this).not('.slick-initialized').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				rows: maxLength2,
				arrows: true,
				infinite: false,
				dots: false,
				adaptiveHeight: true,
				focusOnSelect: false,
				mobileFirst: true,
				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
						rows: 1,
					}
				}],
			});
		
		} else if (!$(this).hasClass('dictionary') && itemLength > maxLength2) {
			$(this).not('.slick-initialized').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				rows: maxLength2,
				arrows: true,
				infinite: false,
				dots: false,
				adaptiveHeight: true,
				focusOnSelect: false,
				mobileFirst: true,
				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						rows: 1,
					}
				}],
			});
		}
	});
}

// 게시판 등록 : 파일첨부
$(function () {
	var fileTarget = $('.form-file');
	fileTarget.on('change', function () {
		if (window.FileReader) {
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).next('.file-name').text(filename);
	});
});

// 맨 위로
(function toTop() {
	var $header = $('#header');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 320) {
			$('#btn-totop').addClass('show');
			$header.addClass('bg-fadein')
		} else {
			$('#btn-totop').removeClass('show');
			$header.removeClass('bg-fadein');
		}
	});

	$(document).on('click', '#btn-totop', function (e) {
		e.preventDefault();
		$('body, html').animate({
			scrollTop: 0
		}, 300);
		return false;
	});
})();

// 데이트피커 적용
$('.form-datepicker').each(function () {
	setDatepicker($(this));
});

$(document).on('click', '.btn-datepicker', function (e) {
	e.preventDefault();
	openCalendar($(this).prev());
});

function setDatepicker(obj) {
	$(obj).wrap('<span class="datepicker"></span>');
	$(obj).after('<button type="button" class="btn btn-datepicker"><i class="ico ico-datepicker-gray"></i><span class="sr-only">달력</span></button>');
}

// 모달 레이어
$(function () {
	$('.modal-popup.show').each(function () {
		openModal($(this), null);
	});
});

var modalOpener = null;
$(document).on('click', 'a.js-layer-open', function (e) {
	var tg = $(this).attr('href');
	openModal(tg, $(this));
	e.preventDefault();
}).on('click', '.js-layer-close, .modal-popup .btn-close-popup, .modal-popup .js-layer-close, .modal-popup .dimed', function () {
	var target = $(this).closest('.modal-popup').attr('id');
	closeModal('#' + target, modalOpener);
}).on('keydown', '.modal-popup .popup-inner', function (e) {
	if ($('.popup-inner').is(e.target) && e.keyCode == 9 && e.shiftKey) { // shift + tab
		e.preventDefault();
		$(this).find('.btn-close-popup').focus();
	}
}).on('keydown', '.modal-popup .btn-close-popup', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) { // tab
		e.preventDefault();
		$(this).closest('.popup-inner').attr('tabindex', '0').focus();
		$(this).unbind('keydown').keydown();
	}
});

function openModal(_target, _opener) {
	modalOpener = _opener;

	$(_target).insertAfter('.wrapper');
	setTimeout(function () {
		$(_target).addClass('show').removeClass('hide');
		//show-modal 이벤트 발생
		$(_target)[0].dispatchEvent(showEvent);
	}, 100);
	setTimeout(function () {
		$('.popup-inner', _target).attr('tabindex', '0').focus();
	}, 300);
	//bodyScroll(true, $('body').width());

}

function closeModal(_target, _opener) {
	//_opener 없을 때 모달 전부 닫치는 현상 수정
	//bodyScroll(false);
	var tg = $(_target);

	if (tg.length == 0) {
		tg = $('.modal-popup.show');
	}

	tg.addClass('hide').removeClass('show');
	var modalOpener = $(_opener);
	if (modalOpener.length > 0) {
		modalOpener.focus();
	}

	//hidden-modal 이벤트 발생
	if (tg.length > 0)
		tg[0].dispatchEvent(hiddenEvent);
}

var modalScrollTop;

function bodyScroll(_status, _orgWidth) {
	var $fixedModal = $('body');

	if (_status) {
		modalScrollTop = $(window).scrollTop();
		$fixedModal.addClass('modal-open');
		$fixedModal.css({
			'top': -1 * modalScrollTop,
		});
		if ($('html').get(0).scrollWidth > $('html').width() === false) {
			$fixedModal.css('margin-right', $('body').width() - _orgWidth);
		}
	} else {
		$fixedModal.removeClass('modal-open');
		$fixedModal.css({
			'margin-right': '',
			'top': '',
		});
		$(window).scrollTop(modalScrollTop);
	}
}

// 윈도우 팝업 오픈
var popOpenBtn = null;

function openWindow(_obj, popName, w, h, _opener) {
	var popW = 900;
	var popH = 600;
	var myUrl = _obj;

	if (typeof _obj !== 'string') {
		if ($(_obj).prop('tagName') === 'A') {
			popOpenBtn = $(_obj);
			myUrl = $(_obj).attr('href');
		} else if (_opener) {
			popOpenBtn = $(_opener);
		}
	}

	if (w) popW = w;
	if (h) popH = h;
	var left = window.screenX + (window.outerWidth - popW) / 2;
	var top = window.screenY + (window.outerHeight - popH) / 2;
	window.open(myUrl, popName, 'width=' + popW + ', height=' + popH + ', left=' + left + ', top=' + top + ', scrollbars=yes');
}

function closeWindow() {
	if (window.opener != null) {
		window.opener.openerFocus();
	}
	window.close();
}

function openerFocus() {
	if (popOpenBtn != null) {
		$(popOpenBtn).focus();
		popOpenBtn = null;
	}
}

// ordering-list
$('.ordering-list button').click(function () {
	$(this).addClass('on');
	$(this).parent('li').siblings().find('button').removeClass('on');
});

// 리사이즈 감지 
var term = 0,
	timer = null;

$(window).on('load resize', function () {
	clearTimeout(timer);
	timer = setTimeout(_modeDetect, term);
	term = 300;
});

var _mode;

function _modeDetect() {
	var widthScreen = $(window).width();
	var beforeMode = _mode;

	if (widthScreen > 1024) {
		_mode = 'pc';
	} else if (widthScreen >= 768) {
		_mode = 'tablet';
	} else {
		_mode = 'mobile';
	}
	

	console.log('device : ' + _mode);

	if (beforeMode !== _mode) {
		// 게시판 상단 공지 슬라이더
		bbsNoticeSlider();

		// 게시판 상세 연계 콘텐츠 슬라이더
		bbsLinkContentSlider();
		
		// 점프 투 최초 호출
		if ($('.jump-to-wrap').length) {
			jumpTo(_mode);
		}
		
		// 탭메뉴
		$('.tab-list').each(function () {
			var col, colToScroll;
			if (_mode == 'pc' && $(this).closest('.tab-menu').hasClass('tab-menu-department')) {
				col = 4;
				colToScroll = 2;
			} else if (_mode == 'pc') {
				col = 6;
				colToScroll = 3;
			} else if (_mode == 'tablet') {
				col = 3;
				colToScroll = 2;
			} else if (_mode == 'mobile' && $(this).closest('.tab-menu').hasClass('tab-category')) {
				col = 3;
				colToScroll = 2;
			} else {
				col = 2;
				colToScroll = 2;
			}
			unsetFlicking($(this).closest('.tab-menu'));
			setFlicking($(this).closest('.tab-menu'), col);
			moveFlicking($(this).closest('.tab-menu'), $(this).find('li.on').index(), col, colToScroll);
		});
	}
}
//초기 디바이스 확인용 함수 실행
_modeDetect();

// 점프 투 jumpTo
$('.jump-to-nav .btn-dropdown').on('click', function (e) {
	var myNav = $(this).closest('.jump-to-nav');
	myNav.toggleClass('opened')
});

function jumpTo(mode, container) {
	var ranges;
	var scrollArea = $('html, body');
	var navArea = $('.jump-to-nav');
	var navItem = $('.jump-nav-item');
	var scrollItem = $('.jump-to-content');

	if (container != undefined) {
		navArea = $(container + ' .jump-to-nav');
		navItem = $(container + ' .jump-nav-item');
		scrollItem = $(container + ' .jump-to-content');
	}

	navPosTop = navArea.offset().top;
	if (mode == 'pc') {
		navPosTop = navPosTop - 10;
	}

	// 네비 상단 고정
	$(window).on('load scroll', function () {
		if ($(this).scrollTop() < navPosTop) {
			if (!$('body').hasClass('modal-open')) {
				$(navArea).removeClass('fixed');
			}
		} else {
			$(navArea).addClass('fixed');
		}
	});

	getPosition();

	navItem.off('click').on('click', function (e) {
		e.preventDefault();
		var myNav = $(this).closest('.jump-to-nav');

		if (mode == 'pc' || myNav.hasClass('opened')) {
			getPosition();
			setActive($(this));
			scrollArea.stop().animate({
				scrollTop: ranges[$(navItem).index(this)][0]
			}, 100);
			myNav.removeClass('opened');
		} else {
			myNav.addClass('opened');
		}
	});

	$.fn.scrollStopped = function (callback) {
		var that = this,
			$this = $(window);

		$this.scroll(function (e) {
			clearTimeout($this.data('scrollTimeout'));
			$this.data('scrollTimeout', setTimeout(callback.bind(that), 150, e));
		});
	};

	scrollArea.scrollStopped(function (e) {
		var pos = Math.ceil($(this).scrollTop());

		$.each(ranges, function (i, range) {
			if (pos >= range[0] && pos < range[1]) {
				setActive(navItem.eq(i)[0]);
				return;
			}
		});
	});

	function setActive(elem) {
		$(elem).parent('li').addClass('on').siblings('li').removeClass('on');
	}

	function getPosition() {
		var defaultT = 55;
		if (mode == 'pc') {
			defaultT = 0;
		}

		ranges = scrollItem.map(function (i) {
			var contentItemTop = scrollItem.eq(i).position().top - defaultT;
			return [
				[Math.ceil(contentItemTop), Math.ceil(scrollItem.eq(i).outerHeight() + contentItemTop)]
			];
		});
	}
}