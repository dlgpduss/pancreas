// / Vue Component 선언
Vue.component('year-picker', {
    template: '<select v-model="year" @change="fnSelectYear()" style="margin-top: -7px;"><option v-for="yearItem in yearArray" :value="yearItem">{{ yearItem }}</option></select>',
    data: function() {
        return {
            yearArray: []
        };
    },
    props: {
        year: {
            type: String,
            default: moment().format('YYYY')
        },
        callback: {
            type: Function
        }
    },
    methods: {
        /**
         * 날짜 변경
         */
        fnSelectYear: function() {
            this.callback(this.year);
        }
    },
    created: function() {
        var yearArray = [];
        var nowYear = moment().add(10,'years').format('YYYY')
        for(var i=nowYear; i>nowYear-80; i--) {
            yearArray.push(i)
        }
        this.yearArray = yearArray;
    }
});