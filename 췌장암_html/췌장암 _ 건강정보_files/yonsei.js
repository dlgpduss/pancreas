var Yonsei = {};

(function(root) {
  'use strict';
  Yonsei = {
	YONSE_BASE_PATH : '/_res/user/js/',
    init : function() {
      if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position) {
          position = position || 0;
          return this.indexOf(searchString, position) === position;
        };
      }
      
      if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(search, this_len) {
            if (this_len === undefined || this_len > this.length) {
                this_len = this.length;
            }
            return this.substring(this_len - search.length, this_len) === search;
        };
      }
      
      if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function(search, replace) {            
            return this.split(search).join(replace);
        };
      }
      
      if (!Array.prototype.groupBy) {
        Array.prototype.groupBy = function(prop) {
          return this.reduce(function(groups, item) {
            var val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
          }, {});
        };
      }
      
      if (typeof Object.assign != 'function') {
		  // Must be writable: true, enumerable: false, configurable: true
		  Object.defineProperty(Object, "assign", {
		    value: function assign(target, varArgs) { // .length of function is 2
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
		    },
		    writable: true,
		    configurable: true
		  });
		}
      
      	if (!Array.prototype.includes) {
    	  Object.defineProperty(Array.prototype, "includes", {
    	    enumerable: false,
    	    value: function(obj) {
    	        var newArr = this.filter(function(el) {
    	          return el == obj;
    	        });
    	        return newArr.length > 0;
    	      }
    	  });
    	}
      
      	$(document).on('click', 'a, button', function() {
      		$(this).blur();
      	})

      	$(document).ready(function() {
      		var url = window.location.href;
      		//로그인 redirect url 설정
    		$('a[href="/member/login.do"]').each(function(index, value) {
    			value.setAttribute('href', '/member/login.do?redirectUrl=' + url)
    		});
    		
    		//로그인 redirect url 설정
    		$('a[href="/member/join.do"]').each(function(index, value) {
    			value.setAttribute('href', 'https://member.severance.healthcare/member/join.do?redirectUrl=' + url)
    		});
			
			Yonsei.sessionCheck();
      	})		
    },
    
    // 자바스크립트 모듈을 읽어서 body에 append 한다.
    loadScript : function(url, callback, append) {
      var script = document.createElement('script');
      script.src = this.YONSE_BASE_PATH + url;
      script.onload = callback;
      document.getElementsByTagName('head')[0].appendChild(script);
    },
	  
    sessionCheck : function() {
		if($('.ico-top-join').length > 0){
		  var iframe = '<iframe style="display:none;" src="/sessionCheck.jsp"></iframe>'
          $('body').append(iframe);
		}
    }
	  
  }
  
  Yonsei.init();
})(this);
