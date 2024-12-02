var datePickerData = {
    param: {},
    calendar: {
        year: '',
        month: '',
        selectedDate: '',
        obj: null
    },
    sectionPbNum: 0 // 효과용
};
// / Vue Component 선언
Vue.component('date-picker', {
    template: '<span class="form-text">\n    <label class="placeholder " for="f_date" style="cursor: pointer;"><span v-if="selectedDate && selectedDate.length == 8">{{ selectedDate | dateStr(\'YYYYMMDD\', \'YYYY.MM.DD\') }}</span></label>\n    <input type="text" autocomplete="off" readonly="readonly" style="cursor: pointer;" @click="fnTogglePicker()">\n    <div class="calendar_wrap" style="z-index: 10;">\n        <a href="javascript:;" class="btn_toggle" @click="fnTogglePicker()">달력에서 날짜 선택</a>\n        <div class="calendar_box">\n            <div class="month">\n                <strong class="title"><year-picker v-if="changeYear == true" :year="calendar.year" :callback="fnChangeYear"></year-picker><span v-else>{{ calendar.year }}.</span><month-picker v-if="changeYear == true" :month="calendar.month" :callback="fnChangeMonth"></month-picker><span v-else>{{ calendar.month | dateStr(\'M\', \'MM\') }}</span></strong>\n                <a href="javascript:;" class="move prev" @click="fnPrevMonth()">이전 달로 이동</a>\n                <a href="javascript:;" class="move next" @click="fnNextMonth()">다음 달로 이동</a>\n            </div>\n            <div class="calendar">\n                <table>\n                    <thead>\n                    <tr>\n                        <th v-for="weekItem in week">{{weekItem}}</th>\n             </tr>\n                    </thead>\n                    <tbody>\n                    <tr v-if="calendar.obj" v-for="dateRow in calendar.obj">\n                        <td v-for="dateObj in dateRow" :class="{ \'start\': fnEqualDate(dateObj) }" :style="{ \'background\': \'#fff\' }">\n                            <button type="button" :style="{ \'color\': fnParseDateObj(dateObj).isBefore(minDate) || fnParseDateObj(dateObj).isAfter(maxDate) || (onlyWeekday && (fnParseDateObj(dateObj).day() == 0 || fnParseDateObj(dateObj).day() == 6)) ? \'#ccc\' : dateObj.month != calendar.month ? \'#888\' : \'\' }" @click="fnSelectDate(dateObj)">{{ dateObj.date }}</button>\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</span>',
    data: function() {
        return datePickerData;
    },
    props: {
        opened: {
            type: Boolean,
            default: false
        },
        selectedDate: {
            type: String
        },
        minDate: {
            type: Object
        },
        maxDate: {
            type: Object
        },
        changeYear: {
            type: Boolean,
            default: false
        },
        lang: {
            type: String,
            default: 'KO'
        },
        onlyWeekday: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        week: function() {
            var week = ['일','월','화','수','목','금','토'];
            if(this.lang == 'EN') {
                week = ['Su','Mo','Tu','We','Th','Fr','Sa'];
            }
            return week;
        }
    },
    methods: {
        /**
         * 달력 그리기
         */
        fnInitCalendar: function(moveMonth) {
            if(!moveMonth) {
                moveMonth = 0;
                this.calendar.year = this.selectedDate && this.selectedDate.length == 8 ? this.selectedDate.substring(0,4) : moment().format('YYYY');
                this.calendar.month = this.selectedDate && this.selectedDate.length == 8 ? this.selectedDate.substring(4,6) : moment().format('MM');
            }
            var calObj = moment().year(this.calendar.year).month((parseInt(this.calendar.month) + moveMonth)-1).date(1);
            this.calendar.year = calObj.format('YYYY');
            this.calendar.month = calObj.format('M');
            this.calendar.obj = cmc.util.calendar(this.calendar.year, this.calendar.month);
        },
        /**
         * 년도 변경
         */
        fnChangeYear: function(year) {
            this.calendar.year = year;
            this.calendar.obj = cmc.util.calendar(this.calendar.year, this.calendar.month);
        },
        /**
         * 월 변경
         */
        fnChangeMonth: function(month) {
            this.calendar.month = parseInt(month);
            this.calendar.obj = cmc.util.calendar(this.calendar.year, this.calendar.month);
        },
        /**
         * 이전 달로 이동
         */
        fnPrevMonth: function() {
            this.fnInitCalendar(-1);
        },
        /**
         * 다음 달로 이동
         */
        fnNextMonth: function() {
            this.fnInitCalendar(1);
        },
        /**
         * Picker 열기/닫기
         */
        fnTogglePicker: function() {
            if(this.opened == false) {  // 열기
                this.calendar.selectedDate = this.selectedDate;
                this.fnInitCalendar(0);
            }
            this.opened = !this.opened;
            var vm = this;
            vm.$nextTick(function() {
                setTimeout(function() {
                    var $btn_toggle= $(vm.$el.querySelector('.btn_toggle'));
                    var $subSection = $('#sub_section');
                    var $cBox = $btn_toggle.siblings('.calendar_box');
                    if(vm.opened == true) {
                        $btn_toggle.addClass('active');
                        $(vm.$el.querySelector('.calendar_box')).focus();
                        if($cBox.position().top + parseInt($cBox.outerHeight(true)) > $('.cmc_network').position().top){
                            $subSection.css('padding-bottom', parseInt(vm.sectionPbNum)+($cBox.offset().top+parseInt($cBox.outerHeight(true)) - $('.cmc_network').offset().top) + 10);
                        }
                    } else {
                        $btn_toggle.removeClass('active');
                        $(vm.$el.querySelector('.form-text input')).focus();
                        $subSection.css('padding-bottom',vm.sectionPbNum);
                    }
                });
            });
        },
        /**
         * 선택일과 동일한지 여부
         */
        fnEqualDate: function(dateObj) {
            return moment(this.calendar.selectedDate, 'YYYYMMDD').isSame(this.fnParseDateObj(dateObj), 'date');
        },
        /**
         * 달력을 클릭하여 날짜 선택
         * @param dateObj
         */
        fnSelectDate: function(dateObj) {
            if(this.minDate && this.fnParseDateObj(dateObj).isBefore(this.minDate)) {
                return;
            }
            if(this.maxDate && this.fnParseDateObj(dateObj).isAfter(this.maxDate)) {
                return;
            }
            if(this.onlyWeekday && (this.fnParseDateObj(dateObj).day() === 0 || this.fnParseDateObj(dateObj).day() === 6)) {
                return;
            }
            var selectedDateStr = this.fnParseDateObj(dateObj).format('YYYYMMDD');
            // 선택한 날짜 변경
            this.calendar.selectedDate = selectedDateStr;
            this.$emit('update:selectedDate', this.calendar.selectedDate);
            this.fnTogglePicker();
        },
        /**
         * 달력 객체를 moment 객체로 치환
         * @param dateObj
         */
        fnParseDateObj: function(dateObj) {
            return moment().year(dateObj.year).month(dateObj.month-1).date(dateObj.date);
        },
        /**
         * 외부 클릭시 Picker 닫기
         */
        fnClickDocument: function(e) {
            var el = this.$el;
            var target = e.target;
            if(this.opened == true && el !== target && !el.contains(target)) {
                this.fnTogglePicker();
            }
        }
    },
    watch: {
        selectedDate: function(value) {
            this.calendar.selectedDate = value;
        },
        minDate: function(value) {
            this.fnInitCalendar();
        },
        maxDate: function(value) {
            this.fnInitCalendar();
        }
    },
    created: function() {
        if(!this.selectedDate || moment(this.selectedDate, 'YYYYMMDD').isValid() == false) {
            this.$emit('update:selectedDate', moment().format('YYYYMMDD'));
        }
        document.addEventListener('click', this.fnClickDocument);
    },
    mounted: function() {
        this.sectionPbNum = $('#sub_section').css('padding-bottom');
    },
    destroyed: function() {
        document.removeEventListener('click', this.fnClickDocument);
    }
});