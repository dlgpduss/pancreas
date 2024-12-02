var cmc = cmc || {};

(function () {
    'use strict';

    /**
     * CMC 코어 클래스.
     */
    cmc.Class = function (o, oParent) {
        var $init = null;
        var checkDirectCall = function () { return true; };
        var F;

		// 2020-12-28
		// 더블클릭 방지용 변수
		// alert 창이 호출될 경우 변수 초기화됨
		var cmcRunning = false;

        if ('$init' in o) {
            $init = o.$init;
            delete o.$init;
        }

        if (typeof oParent === 'undefined') {
            F = function () {
                var args = arguments;

                if (!(this instanceof F)) {
                    return new F(checkDirectCall, args);
                }

                if (args.length && args[0] === checkDirectCall) {
                    args = args[1];
                }

                if ($init !== null) {
                    $init.apply(this, args);
                }
            };
        } else {
            F = function () {
                var args = arguments;

                if (!(this instanceof F)) {
                    return new F(checkDirectCall, args);
                }

                if (args.length && args[0] === checkDirectCall) {
                    args = args[1];
                }

                // 부모의 생성자 실행
                oParent.apply(this, args);

                // 자식의 생성자 실행
                if ($init !== null) {
                    $init.apply(this, args);
                }
            };

            var Parent = function () {};
            Parent.prototype = oParent.prototype;
            F.$super = oParent.prototype;
            F.prototype = new Parent();
            F.prototype.constructor = F;
        }

        for (var i in o) {
            if (o.hasOwnProperty(i) && i !== 'prototype') {
                F.prototype[i] = o[i];
            }
        }

        return F;
    };

    // for IE
    if (typeof Object.assign != 'function') {
        Object.assign = function(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }

})();