var Vue = Vue || {};

// vue pagination
Vue.component('vuePagination', {
    template: '<ul :class="containerClass" v-show="isPaging == true && totalCnt > 0">\n' +
    '    <li :class="firstClass">\n' +
    '        <a href="javascript:;" @click="goFirstPage()" @keyup.enter="goFirstPage()" :class="firstLinkClass" tabindex="0">\n' +
    '            <em class="blind">첫 페이지로 이동</em>\n' +
    '        </a>\n' +
    '    </li>\n' +
    '    <li :class="prevClass">\n' +
    '        <a href="javascript:;" @click="goPrevPage()" @keyup.enter="goPrevPage()" :class="prevLinkClass" tabindex="0">\n' +
    '            <em class="blind">이전 페이지로 이동</em>\n' +
    '        </a>\n' +
    '    </li>\n' +
    '    <li v-for="page in pages" :class="[pageClass, { active: page.num == currentPage }]">\n' +
    '        <a href="javascript:;" v-if="page.num == currentPage" :class="pageLinkClass" tabindex="0">{{ page.num }}</a>\n' +
    '        <a href="javascript:;" v-else @click="handlePageSelected(page.num)" @keyup.enter="handlePageSelected(page.num)"\n' +
    '           :class="pageLinkClass" tabindex="0">{{ page.num }}</a>\n' +
    '    </li>\n' +
    '    <li :class="nextClass">\n' +
    '        <a href="javascript:;" @click="goNextPage()" @keyup.enter="goNextPage()" :class="nextLinkClass" tabindex="0">\n' +
    '            <em class="blind">다음 페이지로 이동</em>\n' +
    '        </a>\n' +
    '    </li>\n' +
    '    <li :class="lastClass">\n' +
    '        <a href="javascript:;" @click="goLastPage()" @keyup.enter="goLastPage()" :class="lastLinkClass" tabindex="0">\n' +
    '            <em class="blind">마지막 페이지로 이동</em>\n' +
    '        </a>\n' +
    '    </li>\n' +
    '</ul>',
    props: {
        blockSize: {
            type: Number,
            default: 10
        },
        containerClass: {
            type: String
        },
        pageClass: {
            type: String
        },
        pageLinkClass: {
            type: String
        },
        firstClass: {
            type: String,
            default: 'btn-first'
        },
        firstLinkClass: {
            type: String
        },
        prevClass: {
            type: String,
            default: 'btn-prev'
        },
        prevLinkClass: {
            type: String
        },
        nextClass: {
            type: String,
            default: 'btn-next'
        },
        nextLinkClass: {
            type: String
        },
        lastClass: {
            type: String,
            default: 'btn-last'
        },
        lastLinkClass: {
            type: String
        }
    },
    data: function() {
        return {
            url: '',
            param: '',
            totalCnt: 0,
            currentPage: 1,
            dataPerPage: 10,
            preCall: function() {},
            callback: function() {},
            isFirst: true,
            isPaging: true
        };
    },
    computed: {
        pages: function () {
            var items = [];
            // totalPage : 전체 페이지 수
            this.totalPage = Math.ceil(this.totalCnt/this.dataPerPage);
            if(this.totalPage < 1) this.totalPage = 1;
            // lastPage : 블록의 마지막 페이지
            this.lastPage =  Math.ceil(this.currentPage/this.blockSize) * this.blockSize;
            // firstPage : 블록의 처음 페이지
            this.firstPage = (this.lastPage - this.blockSize)+1;
            if(this.lastPage > this.totalPage) this.lastPage = this.totalPage;

            for(var i=this.firstPage; i<=this.lastPage; i++) {
                items.push({
                    num: i
                });
            }
            return items;
        }
    },
    methods: {
        handlePageSelected: function(page) {
            if (this.currentPage === page) return;
            this.list(page);
        },
        goFirstPage: function() {
            if (this.currentPage == 1) return;
            this.list(1);
        },
        goPrevPage: function() {
            if (this.prevBlockNone()) return;
            this.list(this.firstPage-this.blockSize);
        },
        goNextPage: function() {
            if (this.nextBlockNone()) return;
            this.list(this.lastPage+1);
        },
        goLastPage: function() {
            if (this.currentPage == this.totalPage) return;
            this.list(this.totalPage);
        },
        prevBlockNone: function() {
            return this.firstPage == 1;
        },
        nextBlockNone: function() {
            return this.lastPage == this.totalPage;
        },
        firstPageSelected: function() {
            return this.currentPage === 1;
        },
        lastPageSelected: function() {
            return (this.currentPage === this.totalPage) || (this.totalPage === 1);
        },
        /**
         * 페이징 대상 목록 호출
         * @param page 현재 페이지
         * @param size 한 페이지에 보여줄 항목 개수
         * @param url 호출 URL
         * @param param 호출 인자값
         * @param preCall 호출 전 실행 함수
         * @param callback 호출 후 실행 함수
         */
        list: function(page, size, url, param, preCall, callback) {
            var vm = this;
            if(url) vm.url = url;
            if(param) vm.param = param;
            if(page > 0) vm.currentPage = page;
            if(size > 0) vm.dataPerPage = size;
            if(size == 0) {
                vm.isPaging = false;
                vm.dataPerPage = 1000;
            }
            if(preCall) vm.preCall = preCall;
            if(callback) vm.callback = callback;
            var dataObj = { // ajax 전송시 파라미터
                p: vm.currentPage,
                s: vm.dataPerPage,
                q: JSON.stringify(vm.param)
            };
            vm.preCall(dataObj);
            var ieVer = window.cmc.util.ieVer();
            if(vm.isFirst == true || ieVer == -1 || ieVer >= 10) { // 최초 호출 이거나 IE 10 이상
                window.cmc.util.api({
                    type: 'GET',
                    url: vm.url,
                    data: dataObj
                }).done(function(data, status, xhr) {
                    vm.callback(data, dataObj);
                    vm.totalCnt = parseInt(xhr.getResponseHeader('X-Cmc-Total-Count'), 10);
                    vm.currentPage = parseInt(xhr.getResponseHeader('X-Cmc-Current-Page'), 10);
                    vm.dataPerPage = parseInt(xhr.getResponseHeader('X-Cmc-Data-Count'), 10);
                    if(vm.isPaging == true) {
                        window.cmc.util.changeUrlParam(dataObj, vm.isFirst);   // 인자값을 URL에 querystring으로 넣는다
                    }
                    vm.isFirst = false;
                    window.selectJs();
                    window.placeholderJs();
                });
            } else {
                $('body').css('display', 'none');
                if(vm.isPaging == true) {
                    location.href = location.pathname + '?' + $.param(dataObj);
                }
            }
        }
    },
    mounted: function() {
        var vm = this;
        window.onpopstate = function(e) {
            vm.isFirst = true;
            vm.list(e.state.p,e.state.s,null,JSON.parse(e.state.q));
        };
    }
});

Vue.component('vueMobilePagination', {
    template: '<div class="pagingBox" v-if="totalCnt > 0">\n' +
    '\t<div class="paging">\n' +
    '\t\t<a href="javascript:;" @click="goPrevPage()" @keyup.enter="goPrevPage()" class="arrow prev"></a>\n' +
    '\t\t<template v-for="page in pages">\n' +
    '\t\t<a v-if="page.num == currentPage" :class="page.num === currentPage ? \'active\' : \'\'" href="#">{{page.num}}</a>\n' +
    '\t\t<a href="javascript:;" v-else @click="handlePageSelected(page.num)" @keyup.enter="handlePageSelected(page.num)">{{ page.num }}</a>\n' +
    '\t\t</template>\n' +
    '\t\t<a href="javascript:;" @click="goNextPage()" @keyup.enter="goNextPage()" class="arrow next"></a>\n' +
    '\t</div>\n' +
    '</div>',
    props: {
        blockSize: {
            type: Number,
            default: 5
        },
        containerClass: {
            type: String
        },
        pageClass: {
            type: String
        },
        pageLinkClass: {
            type: String
        },
        firstClass: {
            type: String,
            default: 'btn-first'
        },
        firstLinkClass: {
            type: String
        },
        prevClass: {
            type: String,
            default: 'btn-prev'
        },
        prevLinkClass: {
            type: String
        },
        nextClass: {
            type: String,
            default: 'btn-next'
        },
        nextLinkClass: {
            type: String
        },
        lastClass: {
            type: String,
            default: 'btn-last'
        },
        lastLinkClass: {
            type: String
        }
    },
    data: function() {
        return {
            url: '',
            param: '',
            totalCnt: 0,
            currentPage: 1,
            dataPerPage: 10,
            preCall: function() {},
            callback: function() {},
            isFirst: true,
            isPaging: true
        };
    },
    computed: {
        pages: function () {
            var items = [];
            // totalPage : 전체 페이지 수
            this.totalPage = Math.ceil(this.totalCnt/this.dataPerPage);
            if(this.totalPage < 1) this.totalPage = 1;
            // lastPage : 블록의 마지막 페이지
            this.lastPage =  Math.ceil(this.currentPage/this.blockSize) * this.blockSize;
            // firstPage : 블록의 처음 페이지
            this.firstPage = (this.lastPage - this.blockSize)+1;
            if(this.lastPage > this.totalPage) this.lastPage = this.totalPage;

            for(var i=this.firstPage; i<=this.lastPage; i++) {
                items.push({
                    num: i
                });
            }
            return items;
        }
    },
    methods: {
        handlePageSelected: function(page) {
            if (this.currentPage === page) return;
            this.list(page);
        },
        goFirstPage: function() {
            if (this.currentPage == 1) return;
            this.list(1);
        },
        goPrevPage: function() {
            if (this.prevBlockNone()) return;
            this.list(this.firstPage-this.blockSize);
        },
        goNextPage: function() {
            if (this.nextBlockNone()) return;
            this.list(this.lastPage+1);
        },
        goLastPage: function() {
            if (this.currentPage == this.totalPage) return;
            this.list(this.totalPage);
        },
        prevBlockNone: function() {
            return this.firstPage == 1;
        },
        nextBlockNone: function() {
            return this.lastPage == this.totalPage;
        },
        firstPageSelected: function() {
            return this.currentPage === 1;
        },
        lastPageSelected: function() {
            return (this.currentPage === this.totalPage) || (this.totalPage === 1);
        },
        /**
         * 페이징 대상 목록 호출
         * @param page 현재 페이지
         * @param size 한 페이지에 보여줄 항목 개수
         * @param url 호출 URL
         * @param param 호출 인자값
         * @param preCall 호출 전 실행 함수
         * @param callback 호출 후 실행 함수
         */
        list: function(page, size, url, param, preCall, callback) {
            var vm = this;
            if(url) vm.url = url;
            if(param) vm.param = param;
            if(page > 0) vm.currentPage = page;
            if(size > 0) vm.dataPerPage = size;
            if(size == 0) {
                vm.isPaging = false;
                vm.dataPerPage = 1000;
            }
            if(preCall) vm.preCall = preCall;
            if(callback) vm.callback = callback;
            vm.preCall();
            var dataObj = { // ajax 전송시 파라미터
                p: vm.currentPage,
                s: vm.dataPerPage,
                q: JSON.stringify(vm.param)
            };
            var ieVer = window.cmc.util.ieVer();
            if(vm.isFirst == true || ieVer == -1 || ieVer >= 10) { // 최초 호출 이거나 IE 10 이상
                window.cmc.util.api({
                    type: 'GET',
                    url: vm.url,
                    data: dataObj
                }).done(function(data, status, xhr) {
                    vm.totalCnt = parseInt(xhr.getResponseHeader('X-Cmc-Total-Count'), 10);
                    vm.currentPage = parseInt(xhr.getResponseHeader('X-Cmc-Current-Page'), 10);
                    vm.dataPerPage = parseInt(xhr.getResponseHeader('X-Cmc-Data-Count'), 10);
                    if(vm.isPaging == true) {
                        window.cmc.util.changeUrlParam(dataObj, vm.isFirst);   // 인자값을 URL에 querystring으로 넣는다
                    }
                    vm.isFirst = false;
                    window.selectJs();
                    window.placeholderJs();
                    vm.callback(data);
                });
            } else {
                $('body').css('display', 'none');
                if(vm.isPaging == true) {
                    location.href = location.pathname + '?' + $.param(dataObj);
                }
            }
        }
    },
    mounted: function() {
        var vm = this;
        window.onpopstate = function(e) {
            vm.isFirst = true;
            if(e.state) {
                vm.list(e.state.p,e.state.s,null,JSON.parse(e.state.q));
            }
        };
    }
});

// month format filter
Vue.filter('month', function(month) {
    if(month < 10) {
        return '0' + month;
    } else {
        return month;
    }
});
// date format filter
// 2020-04-22
// timezone 설정 추가
Vue.filter('date', function(timestamp, format, timezone) {
	if (timezone === undefined || timezone === 'undefined') {
		timezone = 'Asia/Seoul';
	}	
    return moment(new Date(timestamp)).tz(timezone).format(format);
});
// dateStr format filter
Vue.filter('dateStr', function(dateStr, orgFormat, format) {
    return moment(dateStr, orgFormat).format(format);
});
// time filter
Vue.filter('time',function(timeStr) {
    if(timeStr && timeStr.length == 4) {
        return timeStr.substr(0,2) + ':' + timeStr.substr(2,2);
    } else {
        return null;
    }
});
// weekday filter
Vue.filter('dayOfWeek', function(dateStr) {
    if(dateStr && dateStr.length == 8) {
        return moment().year(dateStr.substr(0,4)).month(dateStr.substr(4,2)-1).date(dateStr.substr(6,2)).format('ddd');
    } else {
        return null;
    }
});
// number comma filter
Vue.filter('number', function(value) {
    return window.cmc.util.number(value);
});
// remove tag filter
Vue.filter('removeTag', function(value) {
    return window.cmc.util.removeTag(value);
});
// date parsing and formatting filter
Vue.filter('dateParse', function(dateString, parseFormat, format) {
    if(dateString === undefined || dateString === 'undefined' || dateString.length !== parseFormat.length) {
        return '';
    }

    parseFormat = parseFormat.toUpperCase();

    var year = '', month = '', day = '', hour = '', minute = '', second = '';

    for(var i=0; i<parseFormat.length; i++) {
        switch(parseFormat[i]) {
        case 'Y':
            year = year + dateString[i];
            break;
        case 'M':
            month = month + dateString[i];
            break;
        case 'D':
            day = day + dateString[i];
            break;
        case 'H':
            hour = hour + dateString[i];
            break;
        case 'I':
            minute = minute + dateString[i];
            break;
        case 'S':
            second = second + dateString[i];
            break;
        }
    }

    var returnDate = new Date(year, parseInt(month) - 1, day);
    if(hour.length > 0) {
        returnDate.setHours(parseInt(hour));
    }
    if(minute.length > 0) {
        returnDate.setMinutes(parseInt(minute));
    }
    if(second.length > 0) {
        returnDate.setSeconds(parseInt(second));
    }

    return moment(returnDate).format(format);
});