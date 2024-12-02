(function () {
    'use strict';

    /**
     *  cmc 유효성 체크
     *  @namespace
     */
    cmc.validate = new (cmc.Class(/** @lends cmc.validate */{
        /**
         * 이메일 확인
         */
        email : function(value) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        },
        /**
         * 일반전화번호(하이픈 포함) 확인
         */
        tel : function(value) {
            var re = /^(0(2|3[1-3]|4[1-4|9]|5[1-5]|6[1-4]|70))-(\d{3,4})-(\d{4})$/;
            return re.test(value);
        },
        /**
         * 일반전화번호(하이픈 미포함) 확인 - 모바일용
         */
        telMobile : function(value) {
            var re = /^(0(2|3[1-3]|4[1-4|9]|5[1-5]|6[1-4]|70))(\d{3,4})(\d{4})$/;
            return re.test(value);
        },
        /**
         * 휴대전화번호(하이픈 포함) 확인
         */
        phone : function(value) {
            var re = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
            return re.test(value);
        },
        /**
         * 휴대전화번호(하이픈 미포함) 확인 - 모바일용
         */
        phoneMobile : function(value) {
            var re = /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/;
            return re.test(value);
        },
        /**
         * 해외 전화번호(+,-,(,),공백,숫자 만 포함) 확인
         */
        telLang : function(value) {
            var re = /^[0-9+\-() ]+$/;
            return re.test(value);
        }
    }));

})();
