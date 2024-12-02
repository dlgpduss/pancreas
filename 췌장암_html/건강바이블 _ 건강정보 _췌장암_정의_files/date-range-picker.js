var dateRangePickerData = {
    param: {},
    calendar: [
        {   // from
            selected: true,
            year: '',
            month: '',
            selectedDate: '',
            obj: null
        },
        {   // to
            selected: true,
            year: '',
            month: '',
            selectedDate: '',
            obj: null
        }
    ],
    sectionPbNum: 0 // 효과용
};
// / Vue Component 선언
Vue.component('date-range-picker', {
    template: '<span class="form-text" style="width:280px;">' +
              '    <label class="placeholder " :for="\'f_date\' + elId" style="cursor: pointer;">{{ from | dateStr(\'YYYYMMDD\', \'YYYY.MM.DD\') }} ~ {{ to | dateStr(\'YYYYMMDD\', \'YYYY.MM.DD\') }}</label>' +
              '    <input type="text" :id="\'f_date\' + elId" autocomplete="off" readonly="readonly" style="cursor: pointer;" @click="fnTogglePicker()">' +
              '    <div class="calendar_wrap" style="z-index: 10;">' +
              '        <a href="javascript:;" class="btn_toggle" @click="fnTogglePicker()">달력에서 날짜 선택</a>' +
              '        <div class="calendar_box" v-for="calCnt in 2" :style="{ height: (calendar[0].obj && calendar[0].obj.length == 6) || (calendar[1].obj && calendar[1].obj.length == 6) ? \'308px\' : \'\', borderLeft: calCnt == 1 ? \'\' : \'0px\', borderRight: calCnt == 1 ? \'0px\' : \'\', marginRight: calCnt == 1 ? \'\': \'-278px\' }">' +
              '            <div class="month">' +
              '                <strong class="title">{{ calendar[calCnt-1].year }}.{{ calendar[calCnt-1].month | dateStr(\'M\', \'MM\') }}</strong>' +
              '                <a href="javascript:;" class="move prev" @click="fnPrevMonth(calCnt-1)">이전 달로 이동</a>' +
              '                <a href="javascript:;" class="move next" @click="fnNextMonth(calCnt-1)">다음 달로 이동</a>' +
              '            </div>' +
              '            <div class="calendar">' +
              '                <table>' +
              '                    <thead>' +
              '                    <tr>' +
              '                        <th>일</th>' +
              '                        <th>월</th>' +
              '                        <th>화</th>' +
              '                        <th>수</th>' +
              '                        <th>목</th>' +
              '                        <th>금</th>' +
              '                        <th>토</th>' +
              '                    </tr>' +
              '                    </thead>' +
              '                    <tbody>' +
              '                    <tr v-if="calendar[calCnt-1].obj" v-for="dateRow in calendar[calCnt-1].obj">' +
              '                        <td v-for="dateObj in dateRow"  :class="{ \'active\': fnEqualRange(dateObj), \'start\': calCnt == 1 && fnEqualFrom(dateObj), \'end\': calCnt == 2 && fnEqualTo(dateObj)}">' +
              '                            <button type="button" :style="{ \'color\': fnParseDateObj(dateObj).isBefore(fromMinDate) || fnParseDateObj(dateObj).isAfter(toMaxDate) ? \'#ccc\' : dateObj.month != calendar[calCnt-1].month ? \'#ccc\' : \'\' }" @click="fnSelectDate(calCnt-1, dateObj)">{{ dateObj.date }}</button>' +
              '                        </td>' +
              '                    </tr>' +
              '                    </tbody>' +
              '                </table>' +
              '            </div>' +
              '        </div>' +
              '    </div>' +
              '</span>',
    data: function() {
        return dateRangePickerData;
    },
    props: {
        opened: {
            type: Boolean,
            default: false
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        elId: {
            type:String,
            default: ''
        },
        fromMinDate: {
            type: Object
        },
        toMaxDate: {
            type: Object
        },
    },
    methods: {
        /**
         * 달력 그리기
         */
        fnInitCalendar: function(calIndex, moveMonth) {
            var vm = this;
            var selectedDate = calIndex == 0 ? this.from : this.to;
            if(!moveMonth) {
                moveMonth = 0;
                vm.calendar[calIndex].year = selectedDate && selectedDate.length == 8 ? selectedDate.substring(0,4) : moment().format('YYYY');
                vm.calendar[calIndex].month = selectedDate && selectedDate.length == 8 ? selectedDate.substring(4,6) : moment().format('MM');
            }
            var calObj = moment().year(vm.calendar[calIndex].year).month((parseInt(vm.calendar[calIndex].month) + moveMonth)-1).date(1);
            vm.calendar[calIndex].year = calObj.format('YYYY');
            vm.calendar[calIndex].month = calObj.format('M');
            vm.calendar[calIndex].obj = window.cmc.util.calendar(vm.calendar[calIndex].year, vm.calendar[calIndex].month);
        },
        /**
         * 이전 달로 이동
         */
        fnPrevMonth: function(calIndex) {
            this.fnInitCalendar(calIndex, -1);
            
			var _aaa = this.calendar[1].year  - this.calendar[0].year;
			var _bbb = this.calendar[1].month - this.calendar[0].month;
			var _ccc = _aaa*12 + _bbb;

			var _index = calIndex == 0 ? 1 : 0;
			if (_ccc > 12 || _ccc < 0) {
				this.fnInitCalendar(_index, -1);
			}            
        },
        /**
         * 다음 달로 이동
         */
        fnNextMonth: function(calIndex) {
            this.fnInitCalendar(calIndex, 1);
            
			var _aaa = this.calendar[1].year  - this.calendar[0].year;
			var _bbb = this.calendar[1].month - this.calendar[0].month;
			var _ccc = _aaa*12 + _bbb;

			var _index = calIndex == 0 ? 1 : 0;
			if (_ccc > 12 || _ccc < 0) {
				this.fnInitCalendar(_index, 1);
			}            
        },
        /**
         * Picker 열기/닫기
         */
        fnTogglePicker: function() {
            if(this.opened == false) {  // 열기
                this.calendar[0].selectedDate = this.from;
                this.calendar[1].selectedDate = this.to;
                this.calendar[0].selected = true;
                this.calendar[1].selected = true;
                this.fnInitCalendar(0);
                this.fnInitCalendar(1);
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
                        $cBox.show();
                        $(vm.$el.querySelector('.calendar_box')).focus();
                        if($cBox.position().top + parseInt($cBox.outerHeight(true)) > $('.cmc_network').position().top){
                            $subSection.css('padding-bottom', parseInt(vm.sectionPbNum)+($cBox.offset().top+parseInt($cBox.outerHeight(true)) - $('.cmc_network').offset().top) + 50);
                        }
                    } else {
                        $btn_toggle.removeClass('active');
                        $cBox.hide();
                        $(vm.$el.querySelector('.form-text input')).focus();
                        $subSection.css('padding-bottom',vm.sectionPbNum);
                    }
                });
            });
        },
        /**
         * 기간내 날짜인지 여부
         */
        fnEqualRange: function(dateObj) {
            dateObj = this.fnParseDateObj(dateObj);
            return moment(this.calendar[0].selectedDate, 'YYYYMMDD').isSameOrBefore(dateObj, 'date') && moment(this.calendar[1].selectedDate, 'YYYYMMDD').isSameOrAfter(dateObj, 'date');
        },
        /**
         * 시작일과 동일한지 여부
         */
        fnEqualFrom: function(dateObj) {
            return moment(this.calendar[0].selectedDate, 'YYYYMMDD').isSame(this.fnParseDateObj(dateObj), 'date');
        },
        /**
         * 종료일과 동일한지 여부
         */
        fnEqualTo: function(dateObj) {
            return moment(this.calendar[1].selectedDate, 'YYYYMMDD').isSame(this.fnParseDateObj(dateObj), 'date');
        },
        /**
         * 달력을 클릭하여 날짜 선택
         * @param dateObj
         */
        fnSelectDate: function(calIndex, dateObj) {
            var selectedDate = this.fnParseDateObj(dateObj).format('YYYYMMDD');
            if(calIndex == 0 && this.fnParseDateObj(dateObj).isBefore(this.fromMinDate)) {
                return false;
            }
            if(calIndex == 1 && this.fnParseDateObj(dateObj).isAfter(this.toMaxDate)) {
                return false;
            }
            if(calIndex == 0) {
                if(moment(this.calendar[1].selectedDate, 'YYYYMMDD').isSameOrAfter(this.fnParseDateObj(dateObj), 'date')) {
                    this.from = selectedDate;
                    this.$emit('update:from', selectedDate);

					// 검색기간이 1년이 넘는지 확인
					if (moment(moment(this.from).add(1, 'year'), 'YYYYMMDD').isAfter(moment(moment(this.to), 'YYYYMMDD'), 'date')) {
					} else {
						window.cmc.util.alert('검색기간은 1년을 넘을수 없어 1년 이내로 자동조정됩니다.');

						this.$emit('update:to', moment(moment(this.from).add(1, 'year'), 'YYYYMMDD').format('YYYYMMDD'));
						this.to = moment(moment(this.from).add(1, 'year'), 'YYYYMMDD').format('YYYYMMDD');

						var aaa = this.to.substring(0,4);
						var bbb = this.to.substring(4,6);
						var ccc = this.to.substring(6,8);

						this.calendar[1].year  = aaa;
						this.calendar[1].month = bbb;
						this.calendar[1].obj = window.cmc.util.calendar(aaa, bbb);
					}
                } else {
                    this.from = selectedDate;
                    this.$emit('update:from', selectedDate);
					
					window.cmc.util.alert('시작일이 종료일보다 이후일 수 없습니다.');

					this.$emit('update:to', moment(moment(this.from), 'YYYYMMDD').format('YYYYMMDD'));
					this.to = moment(moment(this.from), 'YYYYMMDD').format('YYYYMMDD');
                }
            } else {
                // 종료일 선택
                if(moment(this.calendar[0].selectedDate, 'YYYYMMDD').isSameOrBefore(this.fnParseDateObj(dateObj), 'date')) {
                    this.to = selectedDate;
                    this.$emit('update:to', selectedDate);

					// 검색기간이 1년이 넘는지 확인
					if (moment(moment(this.from).add(1, 'year'), 'YYYYMMDD').isAfter(moment(moment(this.to), 'YYYYMMDD'), 'date')) {
					} else {
						window.cmc.util.alert('검색기간은 1년을 넘을수 없어 1년 이내로 자동조정됩니다.');

						this.$emit('update:from', moment(moment(this.to).add(-1, 'year'), 'YYYYMMDD').format('YYYYMMDD'));
						this.from = moment(moment(this.to).add(-1, 'year'), 'YYYYMMDD').format('YYYYMMDD');

						var aaa = this.from.substring(0,4);
						var bbb = this.from.substring(4,6);
						var ccc = this.from.substring(6,8);

						this.calendar[0].year  = aaa;
						this.calendar[0].month = bbb;
						this.calendar[0].obj = window.cmc.util.calendar(aaa, bbb);
					}
                } else {
                    this.to = selectedDate;
                    this.$emit('update:to', selectedDate);

                    window.cmc.util.alert('종료일이 시작일보다 이전일 수 없습니다.');

					this.$emit('update:from', moment(moment(this.to), 'YYYYMMDD').format('YYYYMMDD'));
					this.from = moment(moment(this.to), 'YYYYMMDD').format('YYYYMMDD');
				}
            }
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
        from: function(value) {
            this.calendar[0].selectedDate = value;
        },
        to: function(value) {
            this.calendar[1].selectedDate = value;
        }
    },
    created: function() {
        if(!this.from || moment(this.from, 'YYYYMMDD').isValid() == false) {
            this.$emit('update:from', moment().add(-3, 'months').format('YYYYMMDD'));
        }
        if(!this.to || moment(this.to, 'YYYYMMDD').isValid() == false) {
            this.$emit('update:to', moment().format('YYYYMMDD'));
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