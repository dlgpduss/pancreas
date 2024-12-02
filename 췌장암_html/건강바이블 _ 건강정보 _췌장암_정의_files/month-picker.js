// / Vue Component 선언
Vue.component('month-picker', {
    template: '<select v-model="month" @change="fnSelectMonth()" style="margin-top: -7px;"><option v-for="monthItem in monthArray" :value="monthItem">{{ monthItem }}</option></select>',
    data: function() {
        return {
            monthArray: []
        };
    },
    props: {
        month: {
            type: String,
            default: moment().format('MM')
        },
        callback: {
            type: Function
        }
    },
    methods: {
        /**
         * 날짜 변경
         */
        fnSelectMonth: function() {
            this.callback(this.month);
        }
    },
    created: function() {
        var monthArray = [];
        for(var i=0; i<12; i++) {
            monthArray.push(i+1)
        }
        this.monthArray = monthArray;
    }
});