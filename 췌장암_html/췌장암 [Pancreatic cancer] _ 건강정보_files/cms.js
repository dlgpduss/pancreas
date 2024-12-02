window.undefined=window.undefined;Andwise={$:function(el){if(el.jquery){return el}else{return $(el)}}};Andwise.apply=function(o,c,defaults){if(defaults){Andwise.apply(o,defaults)}if(o&&c&&typeof c=='object'){for(var p in c){o[p]=c[p]}}return o};(function(){var idSeed=0,toString=Object.prototype.toString,ua=navigator.userAgent.toLowerCase(),check=function(r){return r.test(ua)},DOC=document,docMode=DOC.documentMode,isStrict=DOC.compatMode=="CSS1Compat",isOpera=check(/opera/),isChrome=check(/\bchrome\b/),isWebKit=check(/webkit/),isSafari=!isChrome&&check(/safari/),isSafari2=isSafari&&check(/applewebkit\/4/),isSafari3=isSafari&&check(/version\/3/),isSafari4=isSafari&&check(/version\/4/),isIE=!isOpera&&check(/msie/),isIE7=isIE&&(check(/msie 7/)||docMode==7),isIE8=isIE&&(check(/msie 8/)&&docMode!=7),isIE9=isIE&&check(/msie 9/),isIE6=isIE&&!isIE7&&!isIE8&&!isIE9,isGecko=!isWebKit&&check(/gecko/),isGecko2=isGecko&&check(/rv:1\.8/),isGecko3=isGecko&&check(/rv:1\.9/),isBorderBox=isIE&&!isStrict,isWindows=check(/windows|win32/),isMac=check(/macintosh|mac os x/),isAir=check(/adobeair/),isLinux=check(/linux/),isSecure=/^https/i.test(window.location.protocol);if(isIE6){try{DOC.execCommand("BackgroundImageCache",false,true)}catch(e){}}Andwise.apply(Andwise,{SSL_SECURE_URL:isSecure&&isIE?'javascript:""':'about:blank',isStrict:isStrict,isSecure:isSecure,isReady:false,enableForcedBoxModel:false,enableGarbageCollector:true,enableListenerCollection:false,enableNestedListenerRemoval:false,USE_NATIVE_JSON:false,applyIf:function(o,c){if(o){for(var p in c){if(!Andwise.isDefined(o[p])){o[p]=c[p]}}}return o},id:function(el,prefix){el=Andwise.getDom(el,true)||{};if(!el.id){el.id=(prefix||"ext-gen")+(++idSeed)}return el.id},extend:function(){var io=function(o){for(var m in o){this[m]=o[m]}};var oc=Object.prototype.constructor;return function(sb,sp,overrides){if(typeof sp=='object'){overrides=sp;sp=sb;sb=overrides.constructor!=oc?overrides.constructor:function(){sp.apply(this,arguments)}}var F=function(){},sbp,spp=sp.prototype;F.prototype=spp;sbp=sb.prototype=new F();sbp.constructor=sb;sb.superclass=spp;if(spp.constructor==oc){spp.constructor=sp}sb.override=function(o){Andwise.override(sb,o)};sbp.superclass=sbp.supr=(function(){return spp});sbp.override=io;Andwise.override(sb,overrides);sb.extend=function(o){return Andwise.extend(sb,o)};return sb}}(),override:function(origclass,overrides){if(overrides){var p=origclass.prototype;Andwise.apply(p,overrides);if(Andwise.isIE&&overrides.hasOwnProperty('toString')){p.toString=overrides.toString}}},namespace:function(){var len1=arguments.length,i=0,len2,j,main,ns,sub,current;for(;i<len1;++i){main=arguments[i];ns=arguments[i].split('.');current=window[ns[0]];if(current===undefined){current=window[ns[0]]={}}sub=ns.slice(1);len2=sub.length;for(j=0;j<len2;++j){current=current[sub[j]]=current[sub[j]]||{}}}return current},urlEncode:function(o,pre){var empty,buf=[],e=encodeURIComponent;Andwise.iterate(o,function(key,item){empty=Andwise.isEmpty(item);Andwise.each(empty?key:item,function(val){buf.push('&',e(key),'=',(!Andwise.isEmpty(val)&&(val!=key||!empty))?(Andwise.isDate(val)?Andwise.encode(val).replace(/"/g,''):e(val)):'')})});if(!pre){buf.shift();pre=''}return pre+buf.join('')},urlDecode:function(string,overwrite){if(Andwise.isEmpty(string)){return{}}var obj={},pairs=string.split('&'),d=decodeURIComponent,name,value;Andwise.each(pairs,function(pair){pair=pair.split('=');name=d(pair[0]);value=d(pair[1]);obj[name]=overwrite||!obj[name]?value:[].concat(obj[name]).concat(value)});return obj},urlAppend:function(url,s){if(!Andwise.isEmpty(s)){return url+(url.indexOf('?')===-1?'?':'&')+s}return url},toArray:function(){return isIE?function(a,i,j,res){res=[];for(var x=0,len=a.length;x<len;x++){res.push(a[x])}return res.slice(i||0,j||res.length)}:function(a,i,j){return Array.prototype.slice.call(a,i||0,j||a.length)}}(),isIterable:function(v){if(Andwise.isArray(v)||v.callee){return true}if(/NodeList|HTMLCollection/.test(toString.call(v))){return true}return((typeof v.nextNode!='undefined'||v.item)&&Andwise.isNumber(v.length))},each:function(array,fn,scope){if(Andwise.isEmpty(array,true)){return}if(!Andwise.isIterable(array)||Andwise.isPrimitive(array)){array=[array]}for(var i=0,len=array.length;i<len;i++){if(fn.call(scope||array[i],array[i],i,array)===false){return i}}},iterate:function(obj,fn,scope){if(Andwise.isEmpty(obj)){return}if(Andwise.isIterable(obj)){Andwise.each(obj,fn,scope);return}else if(typeof obj=='object'){for(var prop in obj){if(obj.hasOwnProperty(prop)){if(fn.call(scope||obj,prop,obj[prop],obj)===false){return}}}}},getDom:function(el,strict){if(!el||!DOC){return null}if(el.dom){return el.dom}else{if(typeof el=='string'){var e=DOC.getElementById(el);if(e&&isIE&&strict){if(el==e.getAttribute('id')){return e}else{return null}}return e}else{return el}}},getBody:function(){return Andwise.get(DOC.body||DOC.documentElement)},getHead:function(){var head;return function(){if(head==undefined){head=Andwise.get(DOC.getElementsByTagName("head")[0])}return head}}(),removeNode:isIE&&!isIE8?function(){var d;return function(n){if(n&&n.tagName!='BODY'){(Andwise.enableNestedListenerRemoval)?Andwise.EventManager.purgeElement(n,true):Andwise.EventManager.removeAll(n);d=d||DOC.createElement('div');d.appendChild(n);d.innerHTML='';delete Andwise.elCache[n.id]}}}():function(n){if(n&&n.parentNode&&n.tagName!='BODY'){(Andwise.enableNestedListenerRemoval)?Andwise.EventManager.purgeElement(n,true):Andwise.EventManager.removeAll(n);n.parentNode.removeChild(n);delete Andwise.elCache[n.id]}},isEmpty:function(v,allowBlank){return v===null||v===undefined||((Andwise.isArray(v)&&!v.length))||(!allowBlank?v==='':false)},isArray:function(v){return toString.apply(v)==='[object Array]'},isDate:function(v){return toString.apply(v)==='[object Date]'},isObject:function(v){return!!v&&Object.prototype.toString.call(v)==='[object Object]'},isPrimitive:function(v){return Andwise.isString(v)||Andwise.isNumber(v)||Andwise.isBoolean(v)},isFunction:function(v){return toString.apply(v)==='[object Function]'},isNumber:function(v){return typeof v==='number'&&isFinite(v)},isString:function(v){return typeof v==='string'},isBoolean:function(v){return typeof v==='boolean'},isElement:function(v){return v?!!v.tagName:false},isDefined:function(v){return typeof v!=='undefined'},isOpera:isOpera,isWebKit:isWebKit,isChrome:isChrome,isSafari:isSafari,isSafari3:isSafari3,isSafari4:isSafari4,isSafari2:isSafari2,isIE:isIE,isIE6:isIE6,isIE7:isIE7,isIE8:isIE8,isIE9:isIE9,isGecko:isGecko,isGecko2:isGecko2,isGecko3:isGecko3,isBorderBox:isBorderBox,isLinux:isLinux,isWindows:isWindows,isMac:isMac,isAir:isAir});Andwise.ns=Andwise.namespace})();Andwise.ns('Andwise.util','Andwise.lib','Andwise.data','Andwise.supports');Andwise.elCache={};Andwise.apply(Function.prototype,{createInterceptor:function(fcn,scope){var method=this;return!Andwise.isFunction(fcn)?this:function(){var me=this,args=arguments;fcn.target=me;fcn.method=method;return(fcn.apply(scope||me||window,args)!==false)?method.apply(me||window,args):null}},createCallback:function(){var args=arguments,method=this;return function(){return method.apply(window,args)}},createDelegate:function(obj,args,appendArgs){var method=this;return function(){var callArgs=args||arguments;if(appendArgs===true){callArgs=Array.prototype.slice.call(arguments,0);callArgs=callArgs.concat(args)}else if(Andwise.isNumber(appendArgs)){callArgs=Array.prototype.slice.call(arguments,0);var applyArgs=[appendArgs,0].concat(args);Array.prototype.splice.apply(callArgs,applyArgs)}return method.apply(obj||window,callArgs)}},defer:function(millis,obj,args,appendArgs){var fn=this.createDelegate(obj,args,appendArgs);if(millis>0){return setTimeout(fn,millis)}fn();return 0}});Andwise.applyIf(String,{format:function(format){var args=Andwise.toArray(arguments,1);return format.replace(/\{(\d+)\}/g,function(m,i){return args[i]})}});Andwise.applyIf(Array.prototype,{indexOf:function(o,from){var len=this.length;from=from||0;from+=(from<0)?len:0;for(;from<len;++from){if(this[from]===o){return from}}return-1},remove:function(o){var index=this.indexOf(o);if(index!=-1){this.splice(index,1)}return this}});
if(typeof(ctx) == 'undefined') {
	ctx = CMS.ctx;
}

/* 초기 실행할 메서드 모음 */
$(function(){

	//-----------------------------------
	// 플래쉬 맵 내용 Alert 호출
	//-----------------------------------
	alertFlashMap();

	//-----------------------------------
	// class 로 youtube 생성
	//-----------------------------------
	youtubeGen();

	//-----------------------------------
	// 폼유효성체크 css셀렉터 확인
	//-----------------------------------
	$('form.jw-form-valid').each(function() {

		var $this = $(this);
		$this.submit(function() {

			var validator = new Andwise.app.Validator($this);
			return validator.valid();
		});
	});

	//-----------------------------------
	// PDF export button
	//-----------------------------------
	bindExportPdfButton();

	//-----------------------------------
	// 컨텐츠 수정
	//-----------------------------------
	Andwise.app.FrontContentEdit.init();

	//-----------------------------------
	// 팝업 닫기/xx일간 보지않기
	//-----------------------------------
	Andwise.app.PopupCtrl.init();


});

/**
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */
!function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n():typeof define=="function"&&define.amd?define(t,n):e[t]=n()}(this,"bowser",function(){function t(t){function n(e){var n=t.match(e);return n&&n.length>1&&n[1]||""}function r(e){var n=t.match(e);return n&&n.length>1&&n[2]||""}function C(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return undefined}}var i=n(/(ipod|iphone|ipad)/i).toLowerCase(),o=/like android/i.test(t),u=!o&&/android/i.test(t),a=/nexus\s*[0-6]\s*/i.test(t),f=!a&&/nexus\s*[0-9]+/i.test(t),l=/CrOS/.test(t),c=/silk/i.test(t),h=/sailfish/i.test(t),p=/tizen/i.test(t),d=/(web|hpw)(o|0)s/i.test(t),v=/windows phone/i.test(t),m=/SamsungBrowser/i.test(t),g=!v&&/windows/i.test(t),y=!i&&!c&&/macintosh/i.test(t),b=!u&&!h&&!p&&!d&&/linux/i.test(t),w=r(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),E=n(/version\/(\d+(\.\d+)?)/i),S=/tablet/i.test(t)&&!/tablet pc/i.test(t),x=!S&&/[^-]mobi/i.test(t),T=/xbox/i.test(t),N;/opera/i.test(t)?N={name:"Opera",opera:e,version:E||n(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)}:/opr\/|opios/i.test(t)?N={name:"Opera",opera:e,version:n(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i)||E}:/SamsungBrowser/i.test(t)?N={name:"Samsung Internet for Android",samsungBrowser:e,version:E||n(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)}:/Whale/i.test(t)?N={name:"NAVER Whale browser",whale:e,version:n(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)}:/MZBrowser/i.test(t)?N={name:"MZ Browser",mzbrowser:e,version:n(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/coast/i.test(t)?N={name:"Opera Coast",coast:e,version:E||n(/(?:coast)[\s\/](\d+(\.\d+)?)/i)}:/focus/i.test(t)?N={name:"Focus",focus:e,version:n(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)}:/yabrowser/i.test(t)?N={name:"Yandex Browser",yandexbrowser:e,version:E||n(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:/ucbrowser/i.test(t)?N={name:"UC Browser",ucbrowser:e,version:n(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)}:/mxios/i.test(t)?N={name:"Maxthon",maxthon:e,version:n(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)}:/epiphany/i.test(t)?N={name:"Epiphany",epiphany:e,version:n(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)}:/puffin/i.test(t)?N={name:"Puffin",puffin:e,version:n(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)}:/sleipnir/i.test(t)?N={name:"Sleipnir",sleipnir:e,version:n(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)}:/k-meleon/i.test(t)?N={name:"K-Meleon",kMeleon:e,version:n(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)}:v?(N={name:"Windows Phone",osname:"Windows Phone",windowsphone:e},w?(N.msedge=e,N.version=w):(N.msie=e,N.version=n(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(t)?N={name:"Internet Explorer",msie:e,version:n(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:l?N={name:"Chrome",osname:"Chrome OS",chromeos:e,chromeBook:e,chrome:e,version:n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/edg([ea]|ios)/i.test(t)?N={name:"Microsoft Edge",msedge:e,version:w}:/vivaldi/i.test(t)?N={name:"Vivaldi",vivaldi:e,version:n(/vivaldi\/(\d+(\.\d+)?)/i)||E}:h?N={name:"Sailfish",osname:"Sailfish OS",sailfish:e,version:n(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(t)?N={name:"SeaMonkey",seamonkey:e,version:n(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel|fxios/i.test(t)?(N={name:"Firefox",firefox:e,version:n(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t)&&(N.firefoxos=e,N.osname="Firefox OS")):c?N={name:"Amazon Silk",silk:e,version:n(/silk\/(\d+(\.\d+)?)/i)}:/phantom/i.test(t)?N={name:"PhantomJS",phantom:e,version:n(/phantomjs\/(\d+(\.\d+)?)/i)}:/slimerjs/i.test(t)?N={name:"SlimerJS",slimer:e,version:n(/slimerjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(t)||/rim\stablet/i.test(t)?N={name:"BlackBerry",osname:"BlackBerry OS",blackberry:e,version:E||n(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:d?(N={name:"WebOS",osname:"WebOS",webos:e,version:E||n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(t)&&(N.touchpad=e)):/bada/i.test(t)?N={name:"Bada",osname:"Bada",bada:e,version:n(/dolfin\/(\d+(\.\d+)?)/i)}:p?N={name:"Tizen",osname:"Tizen",tizen:e,version:n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||E}:/qupzilla/i.test(t)?N={name:"QupZilla",qupzilla:e,version:n(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i)||E}:/chromium/i.test(t)?N={name:"Chromium",chromium:e,version:n(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i)||E}:/chrome|crios|crmo/i.test(t)?N={name:"Chrome",chrome:e,version:n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:u?N={name:"Android",version:E}:/safari|applewebkit/i.test(t)?(N={name:"Safari",safari:e},E&&(N.version=E)):i?(N={name:i=="iphone"?"iPhone":i=="ipad"?"iPad":"iPod"},E&&(N.version=E)):/googlebot/i.test(t)?N={name:"Googlebot",googlebot:e,version:n(/googlebot\/(\d+(\.\d+))/i)||E}:N={name:n(/^(.*)\/(.*) /),version:r(/^(.*)\/(.*) /)},!N.msedge&&/(apple)?webkit/i.test(t)?(/(apple)?webkit\/537\.36/i.test(t)?(N.name=N.name||"Blink",N.blink=e):(N.name=N.name||"Webkit",N.webkit=e),!N.version&&E&&(N.version=E)):!N.opera&&/gecko\//i.test(t)&&(N.name=N.name||"Gecko",N.gecko=e,N.version=N.version||n(/gecko\/(\d+(\.\d+)?)/i)),!N.windowsphone&&(u||N.silk)?(N.android=e,N.osname="Android"):!N.windowsphone&&i?(N[i]=e,N.ios=e,N.osname="iOS"):y?(N.mac=e,N.osname="macOS"):T?(N.xbox=e,N.osname="Xbox"):g?(N.windows=e,N.osname="Windows"):b&&(N.linux=e,N.osname="Linux");var k="";N.windows?k=C(n(/Windows ((NT|XP)( \d\d?.\d)?)/i)):N.windowsphone?k=n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):N.mac?(k=n(/Mac OS X (\d+([_\.\s]\d+)*)/i),k=k.replace(/[_\s]/g,".")):i?(k=n(/os (\d+([_\s]\d+)*) like mac os x/i),k=k.replace(/[_\s]/g,".")):u?k=n(/android[ \/-](\d+(\.\d+)*)/i):N.webos?k=n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):N.blackberry?k=n(/rim\stablet\sos\s(\d+(\.\d+)*)/i):N.bada?k=n(/bada\/(\d+(\.\d+)*)/i):N.tizen&&(k=n(/tizen[\/\s](\d+(\.\d+)*)/i)),k&&(N.osversion=k);var L=!N.windows&&k.split(".")[0];if(S||f||i=="ipad"||u&&(L==3||L>=4&&!x)||N.silk)N.tablet=e;else if(x||i=="iphone"||i=="ipod"||u||a||N.blackberry||N.webos||N.bada)N.mobile=e;return N.msedge||N.msie&&N.version>=10||N.yandexbrowser&&N.version>=15||N.vivaldi&&N.version>=1||N.chrome&&N.version>=20||N.samsungBrowser&&N.version>=4||N.whale&&s([N.version,"1.0"])===1||N.mzbrowser&&s([N.version,"6.0"])===1||N.focus&&s([N.version,"1.0"])===1||N.firefox&&N.version>=20||N.safari&&N.version>=6||N.opera&&N.version>=10||N.ios&&N.osversion&&N.osversion.split(".")[0]>=6||N.blackberry&&N.version>=10.1||N.chromium&&N.version>=20?N.a=e:N.msie&&N.version<10||N.chrome&&N.version<20||N.firefox&&N.version<20||N.safari&&N.version<6||N.opera&&N.version<10||N.ios&&N.osversion&&N.osversion.split(".")[0]<6||N.chromium&&N.version<20?N.c=e:N.x=e,N}function r(e){return e.split(".").length}function i(e,t){var n=[],r;if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r++)n.push(t(e[r]));return n}function s(e){var t=Math.max(r(e[0]),r(e[1])),n=i(e,function(e){var n=t-r(e);return e+=(new Array(n+1)).join(".0"),i(e.split("."),function(e){return(new Array(20-e.length)).join("0")+e}).reverse()});while(--t>=0){if(n[0][t]>n[1][t])return 1;if(n[0][t]!==n[1][t])return-1;if(t===0)return 0}}function o(e,r,i){var o=n;typeof r=="string"&&(i=r,r=void 0),r===void 0&&(r=!1),i&&(o=t(i));var u=""+o.version;for(var a in e)if(e.hasOwnProperty(a)&&o[a]){if(typeof e[a]!="string")throw new Error("Browser version in the minVersion map should be a string: "+a+": "+String(e));return s([u,e[a]])<0}return r}function u(e,t,n){return!o(e,t,n)}var e=!0,n=t(typeof navigator!="undefined"?navigator.userAgent||"":"");return n.test=function(e){for(var t=0;t<e.length;++t){var r=e[t];if(typeof r=="string"&&r in n)return!0}return!1},n.isUnsupportedBrowser=o,n.compareVersions=s,n.check=u,n._detect=t,n.detect=t,n});
/**
 * 쿠키
 * https://plugins.jquery.com/cookie/
 * 생성 : $.cookie('name', 'value');$.cookie('name', 'value', { expires: 7, path:'/', secure:true/false, domain: 'example.com' });
 * 읽기 : $.cookie('name');
 * 삭제 : $.removeCookie('name'); 삭제시는 생성한 옵션을 그대로 줘야 삭제됨
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(m){var i=/\+/g;function v(e){return k.raw?e:encodeURIComponent(e)}function x(e,n){var o=k.raw?e:function(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(i," ")),k.json?JSON.parse(e):e}catch(e){}}(e);return m.isFunction(n)?n(o):o}var k=m.cookie=function(e,n,o){if(void 0!==n&&!m.isFunction(n)){if("number"==typeof(o=m.extend({},k.defaults,o)).expires){var i=o.expires,r=o.expires=new Date;r.setTime(+r+864e5*i)}return document.cookie=[v(e),"=",function(e){return v(k.json?JSON.stringify(e):String(e))}(n),o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("")}for(var t,c=e?void 0:{},u=document.cookie?document.cookie.split("; "):[],a=0,d=u.length;a<d;a++){var f=u[a].split("="),p=(t=f.shift(),k.raw?t:decodeURIComponent(t)),s=f.join("=");if(e&&e===p){c=x(s,n);break}e||void 0===(s=x(s))||(c[p]=s)}return c};k.defaults={},m.removeCookie=function(e,n){return void 0!==m.cookie(e)&&(m.cookie(e,"",m.extend({},n,{expires:-1})),!m.cookie(e))}});
/** Cookies.set() Cookies.remove() **/
!function(e){if("function"==typeof define&&define.amd)define(e);else if("object"==typeof exports)module.exports=e();else{var n=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=n,o}}}(function(){function l(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}return function e(f){function u(e,n,o){var t;if("undefined"!=typeof document){if(1<arguments.length){if("number"==typeof(o=l({path:"/"},u.defaults,o)).expires){var i=new Date;i.setMilliseconds(i.getMilliseconds()+864e5*o.expires),o.expires=i}try{t=JSON.stringify(n),/^[\{\[]/.test(t)&&(n=t)}catch(e){}return n=f.write?f.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape),document.cookie=[e,"=",n,o.expires&&"; expires="+o.expires.toUTCString(),o.path&&"; path="+o.path,o.domain&&"; domain="+o.domain,o.secure?"; secure":""].join("")}e||(t={});for(var r=document.cookie?document.cookie.split("; "):[],c=/(%[0-9A-Z]{2})+/g,s=0;s<r.length;s++){var a=r[s].split("="),p=a[0].replace(c,decodeURIComponent),d=a.slice(1).join("=");'"'===d.charAt(0)&&(d=d.slice(1,-1));try{if(d=f.read?f.read(d,p):f(d,p)||d.replace(c,decodeURIComponent),this.json)try{d=JSON.parse(d)}catch(e){}if(e===p){t=d;break}e||(t[p]=d)}catch(e){}}return t}}return(u.set=u).get=function(e){return u(e)},u.getJSON=function(){return u.apply({json:!0},[].slice.call(arguments))},u.defaults={},u.remove=function(e,n){u(e,"",l(n,{expires:-1}))},u.withConverter=e,u}(function(){})});
/** jquery comment **/
jQuery.fn.comments=function(t){t=t||!1;var r=$([]);return this.each(function(e,n){for(var d=n.firstChild,i=$(this).attr("id");d;)8===d.nodeType?r=r.add("<div rel='"+i+"'>"+d.nodeValue+"</div>"):t&&1===d.nodeType&&(r=r.add($(d).comments(!0))),d=d.nextSibling}),r};

Cookies.remove('callAdm');
function loadJavascript(url, callback, charset) {

	loadedScript = typeof(loadedScript) == 'undefined' ? {} : loadedScript;

		$.ajaxSetup({async:false, cache: true});
		if($.isArray(url)) {

			$.each(url,function(i) {
				if(!loadedScript.hasOwnProperty(url[i])) {
					$.getScript(url[i], callback);
					loadedScript[url[i]] = true;
				}
			});

		} else {
			if(!loadedScript.hasOwnProperty(url)) {
				$.getScript(url, callback);
					loadedScript[url] = true;
			}
		}
		$.ajaxSetup({async:true, cache: false});

}

function loadCSS(url) {

	loadedCss = typeof(loadedCss) == 'undefined' ? {} : loadedCss;

	if(loadedCss.hasOwnProperty(url)) {
		return;
	}

	loadedCss[url] = true;

   var head = document.getElementsByTagName("head")[0];
   var css = document.createElement("link");

   css.setAttribute("rel", "stylesheet");
   css.setAttribute("type", "text/css");
   css.setAttribute("href",url);
   head.appendChild(css);
}


/**
 * 다국어 문자 리턴
 * @param {} code
 */
var isLoadMessageScript = false;
function $m(code,defaultMsg) {

	var retv;

	if(!isLoadMessageScript && typeof(messageCode) == 'undefined' && typeof(CMS.localeScriptPath) != 'undefined') {
		isLoadMessageScript = true;
		loadJavascript( CMS.localeScriptPath +'message_' + locale + '.js'  );

	} //else
	if(typeof(messageCode) != 'undefined') {
		retv = messageCode[code];
	}

	if(!retv) {
		if(!retv && defaultMsg) {
			retv = defaultMsg;
		}
		if(!retv) {
			retv = code;
		}
	}
	return retv;
}

App = {};
if(!$.browser) {
	$.browser = (function() {
		var s = navigator.userAgent.toLowerCase();
		var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
		/(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
		/(msie) ([\w.]+)/.exec(s) ||
		/(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
		[];
		return { name: match[1] || "", version: match[2] || "0" };
	}());
}

// String prototype -------------------------------------------
String.prototype.encodeURI = function( url ) {
	return encodeURIComponent(this);
};
String.prototype.test = function(regex, params){
	return ((typeof regex == 'string') ? new RegExp(regex, params) : regex).test(this);
};
String.prototype.toInt= function(base){
	return parseInt(this, base || 10);
};
String.prototype.htmlEncode = function(){
	return this.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
};
String.prototype.htmlDecode = function(){
  return this.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
};
String.prototype.replaceAll = function(FindString, ReplaceString) {
	if(!FindString) return FindString;
	var SearchIndex = 0;
	var NewString = "";
	while (this.indexOf(FindString,SearchIndex) != -1)    {
  	NewString += this.substring(SearchIndex,this.indexOf(FindString,SearchIndex));
  	NewString += ReplaceString;
  	SearchIndex = (this.indexOf(FindString,SearchIndex) + FindString.length);
 	}
	NewString += this.substring(SearchIndex,this.length);
	return NewString;
};
String.prototype.startsWith = function(compareString) {
	return this.substring(0,compareString.length) == compareString;
};
String.prototype.endsWith = function(compareString) {
	return this.substring(this.length-compareString.length) == compareString;
};
Number.prototype.fillZero = function(width) {
  var n = this + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function startsWith(value, compareString) {
	if(typeof(value) != 'string') return false;
	return value.startsWith(compareString);
};
function toCommaString(n) {
  var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
  n += '';                          // 숫자를 문자열로 변환

  while (reg.test(n))
    n = n.replace(reg, '$1' + ',' + '$2');

  return n;
};
function compress( value ) {
	if(typeof(LZString) == 'undefined') {
		loadJavascript(ctx+'/_res/_common/js/3rd/lz-string.min.js');
	}
	return '$cms$'+LZString.compressToEncodedURIComponent( value );
}
function decompress( value ) {
	if(typeof(LZString) == 'undefined') {
		loadJavascript(ctx+'/_res/_common/js/3rd/lz-string.min.js');
	}
	return LZString.decompressFromEncodedURIComponent( value.substring(5) );
}



$(
	function() {

		// 화면 확대 축소
		var scale = 1;
		try { parseInt(localStorage.getItem(CMS.siteId+'.scale') || '1'); } catch(e) {};

		// 초기
		if(scale !== 1) {
			changeScale();
		}

		$("#zoom-in").click(function() {
			scale += 0.05;
			changeScale();
		});
		$("#zoom-out").click(function() {
			scale -= 0.05;
			changeScale();
		});
		$("#zoom-default").click(function() {
			scale = 1;
			localStorage.setItem(CMS.siteId+'.scale', scale);
			$('body').css('transform','').css('transform-origin','');
		});

		function changeScale() {
			$('body').css('transform','scale(' + scale + ')').css('transform-origin','0 0');
			localStorage.setItem(CMS.siteId+'.scale', scale);
		}


		// 인쇄 클릭
		$("#cms-print").click(function(e) {

			e.preventDefault();

			if(typeof(printSelector) == 'undefined') {
				printSelector = '.cms-print';
			}
			var $printContent = $(printSelector);

			if($printContent.length == 0) {
				if(!confirm('인쇄영역이 지정되지 않았습니다. 전체페이지를 인쇄 하시겠습니까?')) {
					return;
				}
			}
			var $html = $('html').clone();
			assignValue($html);// html()에서 input value 가 들어가지 않기 때문에 강제로 value 할당

			var $pf = $('#cms-print-form');
			$pf.find('input').remove();

			var $inputHtml = $('<input type="hidden" name="text">');
			$inputHtml.val( compress($html.html()) ); // html 전체

			var $inputContent = $('<input type="hidden" name="content">');
			if($printContent.length > 0) {
				var $dest = $printContent.clone();
				assignValue($dest);// html()에서 input value 가 들어가지 않기 때문에 강제로 value 할당
				// 환경설정에 정의된 프린트에서 제외할 셀렉터 excludePrintSelector
				$dest.find(CMS.excludePrintSelector).remove(); // 제거

				$inputContent.val( compress($dest.get(0).outerHTML) );
			}
			$pf.append($inputHtml);
			$pf.append($inputContent);

			$pf.submit();


			function assignValue( $el ) {

				$el.find('input').each(function() { // html()에서 input value 가 들어가지 않기 때문에 강제로 value 할당
					var $input = $(this), type = $input.attr('type');
					if(/button|image|submit|hidden|file|password|rest/.test(type)) {
						return;
					} else if($input.prop('checked')) {
						$input.attr('checked','checked');
					} else {
						$input.attr('value',$input.val());
					}
				});

			}

			return false;

		});

		// 프린트버튼이 있으면 폼생성
		if($('#cms-print').length > 0) {
			$('body').append('<form id="cms-print-form" action="'+ctx+'/cms/print/print.do" method="post" target="_new"></form>');
		}

		// 본문 바로가기 생성
		var $li = [];
		if($('#cms-content').length > 0) {
			$li.push({ text: '본문 바로가기', href:'#cms-content' });
		}
		if($('#cms-gnb').length > 0) {
			$li.push({ text: '주메뉴 바로가기', href:'#cms-gnb' });
		}
		if($('#cms-lnb').length > 0) {
			$li.push({ text: '보조메뉴 바로가기', href:'#cms-lnb' });
		}

		if($li.length > 0) {
			var $ul = $('<ul id="go_main">');
			for(var i=0; i<$li.length; i++) {
				$ul.append('<li><a href="'+$li[i].href+'">'+$li[i].text+'</a></li>');
			}
			//$('body').prepend( $ul );
			// 다국어 지연 로딩
			$ul.find('>li>a').on('focus',function() {
				if($(this).data('compelete')) return;
				$(this).text($m($(this).text()));
				$(this).data('compelete',true);
			}).on('click',function() {
				var target = $($(this).attr('href'));
				target.attr('tabindex','0').trigger('click');
			});
		}




	}
)


/**
 * 게시판에서 youtube 사용
 * class="jwxe-youtubue src"
 */
var youtubeGen = function(){

	$('.jwxe-youtube').each(function() {
		var item = $(this), style = item.attr('style');
		var isWidth = style && style.indexOf('width') > -1;
		var width = (isWidth? item.css('width').toInt():560);
		var height = (isWidth? item.css('height').toInt():315);

		var center = style && style.indexOf('margin') > -1 && style.indexOf('auto') > -1;
		var src = item.attr('class');
		src = src.substring(src.indexOf(' ')+1);
		if(src) {
			var html = (center?'<center>':'')+'<iframe title="유투브 동영상" align="center" width="'+width+'" height="'+height+'" src="http://www.youtube.com/embed/'+src+'?wmode=transparent" frameborder="0" allowfullscreen';
			html += '></iframe>'+(center?'</center>':'');
			item.outerHTML(html);
		}
	});

}


Andwise.ns('Andwise.app');

//----------------------------------------------------------------
// 팝업 닫기/n일동안 열지 않기
//	<a data-popup-key="${param.popupKey}" data-popup-day="7" href="#popup-close">1주일간 보지않기</a>
//	<a data-popup-key="${param.popupKey}" data-popup-day="1" href="#popup-close">1일간 보지않기</a>
//	<a data-popup-close="" href="#popup-close">팝업닫기</a>
//----------------------------------------------------------------
Andwise.app.PopupCtrl = function() {
	return {
		init: function() {
			// 팝업 버튼을 찾아서 nn일간 닫기 처리
			$('[data-popup-key]').each(function() {
				var $item = $(this);
				$item.click(function(e) {

					e.preventDefault();

					var $btn = $(this)
					, key = $btn.attr('data-popup-key').replace(/\//g,'-')
					, isLayer = $btn.closest('[data-popup-container]').length > 0
					, day = parseInt($btn.attr('data-popup-day') || 1);

					// 쿠키 설정
					$.cookie(key, 'Y', { expires: day , path:'/' });

					if(isLayer) {

						$btn.closest('[data-popup-container]').hide();

					} else { // window

						window.close();
					}


				});

			});

			// 팝업 닫기
			$('[data-popup-close]').click(function(e) {

					e.preventDefault();

					var $btn = $(this)
					, isLayer = $btn.closest('[data-popup-container]').length > 0;

					if(isLayer) {

						$btn.closest('[data-popup-container]').hide();

					} else { // window

						window.close();
					}

			});

		}

	}
}();

//----------------------------------------------------------------
// 프론트에서 컨텐츠 수정
//----------------------------------------------------------------
Andwise.app.FrontContentEdit = function() {
	var self, $template;
	return {
		init: function() {

			self = this;
			if(!CMS.editActive || !CMS.contentEditAuth || CMS.isCallAdm) return;
			self.render();

		},
		render: function() {

			loadCSS(ctx+'/_res/_common/fonts/font-awesome/css/font-awesome.min.css');

			$template = $('<div class="cms-front-edit" >\
			<a class="front-edit-cancel" title="편집취소"><i class="fa fa-minus-circle"></i></a>\
			<a class="front-edit" title="컨텐츠편집"><i class="fa fa-edit"/></a>\
			<a class="front-access" title="접근성검사"><i class="fa fa-wheelchair"/></a>\
			<a class="show-hide-toggle"><i class="fa fa-angle-right"/></a>\
			</div>');
			$('body').append( $template );

			$template.on('click','a.front-edit',function(e) {
				e.preventDefault();
				self.startEdit();
			});
			$template.on('click','a.front-edit-cancel',function(e) {
				e.preventDefault();
				self.cancelEdit();
			});
			$template.on('click','a.show-hide-toggle',function(e) {
				e.preventDefault();
				$template.toggleClass('collpase');
				localStorage.setItem('hideFrontEdit', $template.is('.collpase')?'collpase':'');
			});
			$template.on('click','a.front-access',function(e) {
				e.preventDefault();
				self.checkAccess();
			});
			var cls = localStorage.getItem('hideFrontEdit');
			$template.addClass(cls?cls:'');

		},
		checkAccess: function() {

			loadCSS(ctx+'/_res/_common/js/3rd/accessibility.css');
			loadJavascript(ctx+'/_res/_common/js/3rd/accessibility.js');
			accessibilityCheck();

		},
		startEdit: function() {
			self.drawEditBox();
		},
		cancelEdit: function() {
			$template.toggleClass('editing');
			$('.cms-edit-wrap').each(function(i,item) {
				var $item = $(item).parent();
				var position = $item.data('position');
				$item.css('position',position);
				$item.find('.cms-edit-wrap').remove();
				$item.unbind('click',self.gotoClick);
			});
		},
		drawEditBox: function() {
			var cnt = 0;

			$template.toggleClass('editing');
			var template = '<div class="cms-edit-wrap"><a class="cms-front-edit front-content-edit" title="편집"><i class="fa fa-edit"></i></a></div>';
			// 메인컨텐츠 편집 버튼

			if(CMS.mainContentKey) {
				$( '#cms-content' ).each(function(i,item) {
					makeItem( item );
					$(item).data('data-cms-content',CMS.mainContentKey);
				});
			}

			if(!CMS.contentEditOnlyMain) {
				// 그외 컨텐츠 편집 버튼
				$('[data-cms-content]').each(function(i,item) { // 레이아웃에서 지정한 컨텐츠
					makeItem(item);
					$(item).data('data-cms-content',$(item).attr('data-cms-content'));
				});

				if(CMS.subContentKeyMap) {
					$('[data-cms-sub-content]').each(function(i,item) { // 서브컨텐츠
						var contentKey = CMS.subContentKeyMap[$(item).attr('data-cms-sub-content')];
						if(contentKey) {
							makeItem(item);
							$(item).data('data-cms-content',contentKey.replace(/\.jsp$/,''));
						}
					});
				}

			}

			function makeItem( item ) {
				cnt ++;
				var $item = $(item);
				var position = $item.css('position');
				$item.data('position',position);
				if(position == 'static') {
					$item.css('position','relative');
				}
				$item.append( $(template) );
				$item.click(self.gotoClick);
			}

			if(cnt == 0) {
				alert('편집 가능한 컨텐츠가 존재하지 않습니다.');
			}
		},
		gotoClick: function( e ) {
			e.preventDefault();
			self.gotoEdit( $(this) );
		},
		gotoEdit: function( $content ) {
			window.open(ctx+'/cms/front-edit.do?contentKey='+ encodeURIComponent($content.data('data-cms-content')));
		}

	}
}();



/**

 * validator 유효성 검사 클래스
 *
 * 엘리먼트의 class 에 jwvalid 로 시작한다.
 * jwvalid-xxxx 					-> xxx는 정규식 비교 ex) 								jwvalid-must-name
 * jwvalid-xxxx-yyyy 			-> yyyy 는 타이틀 (이름은, 나이는, ...)  	jwvalid-num-tel
 * jwvalid-xxxx-yyyy-zzz 	-> zzz 는 변수 	jwvalid-min-tel-4
 */


/**
 * must: 필수입력
 * min: 최소 길이 제한
 * max: 최대 길이 제한
 * len: 길이가 반드시 일치
 * a0: 영문,숫자가 반드시 포함
 * a0s: 영문,숫자,특수문자가 반드시 포함
 * aA0s: 영문소, 영문대, 숫자, 특수문자가 반드시 포함
 * mail: 메일형식 검사 (abc@abc.com)
 * mailtail : 메일형식 중 도메인만 검사 (abc.com)
 * tel: 전화번호 형식과 일치 (02-123-1234)
 * mobile: 휴대폰번호 형식과 일치 (011-123-1234)
 * zipcode: 우편번호 형식과 일치 (123-123)
 * num: 숫자 입력만 가능
 * date: 날짜 형식과 일치 yyyy-mm-dd
 *
 * addTitle( key, title)  // 정의되지 않은 타이틀을 추가한다.
 *
 * .pwd-chk 클래스가 있는 input 는 (모바일,전화번호) 비밀번호와 비교
 * ex)
 * function onSubmit() {
 * 	var validator = new Andwise.app.Validator();
 * 	validator.addTitle('cpwd','현재 비밀번호');
 * 	validator.addTitle('npwd','변경할 비밀번호');
 * 	return validator.valid();
 * }
 *
 */
Andwise.app.Validator = function( $form ) {

	if($form && !$form.jquery) {
		$form = $($form);
	}

	if($form) {
		this.items = $form.find('input[class*="jwvalid-"],select[class*="jwvalid-"],textarea[class*="jwvalid-"]');
	} else {
		this.items = $('input[class*="jwvalid-"],select[class*="jwvalid-"],textarea[class*="jwvalid-"]');
	}

}


/**
 * must: 필수입력
 * min: 최소 길이 제한
 * max: 최대 길이 제한
 * len: 길이가 반드시 일치
 * a0: 영문,숫자가 반드시 포함
 * a0s: 영문,숫자,특수문자가 반드시 포함
 * aA0s: 영문소, 영문대, 숫자, 특수문자가 반드시 포함
 * mail: 메일형식 검사 (abc@abc.com)
 * mailtail : 메일형식 중 도메인만 검사 (abc.com)
 * tel: 전화번호 형식과 일치 (02-123-1234)
 * mobile: 휴대폰번호 형식과 일치 (011-123-1234)
 * zipcode: 우편번호 형식과 일치 (123-123)
 * num: 숫자 입력만 가능
 * date: 날짜 형식과 일치 yyyy-mm-dd
 *
 * addTitle( key, title)  // 정의되지 않은 타이틀을 추가한다.
 *
 * .pwd-chk 클래스가 있는 input 는 (모바일,전화번호) 비밀번호와 비교
 * ex)
 * function onSubmit() {
 * 	var validator = new Andwise.app.Validator();
 * 	validator.addTitle('cpwd','현재 비밀번호');
 * 	validator.addTitle('npwd','변경할 비밀번호');
 * 	return validator.valid();
 * }
 *
 */

Andwise.app.Validator.prototype = {

	regex: {
		// 필수입력  ex) jwvalid-must-id
		must: {
			hanTail: ['은','는'],
			msg: function() { return $m('requireField'); },
			valid: function(val) { return val === true || (val && val.length > 0) ? true: false; }
		},
		// 최소 입력 ex) jwvalid-min-id-5
		min: {
			hanTail: ['의','의'],
			msg: function() { return String.format( $m('pw.minLength','{0} 자 이상 이어야 합니다.'), this.len);  },
			len: 0,
			valid: function(val, len ) { if(!val) return true; this.len = len; return val && val.length >= this.len  ? true: false; }
		},
		// 최대 입력 ex) jwvalid-max-name-16
		max: {
			hanTail: ['의','의'],
			msg: function() { return String.foramt($m('pw.maxLength','{0} 자 이하만 가능합니다.'), this.len); },
			len: 0,
			valid: function(val, len ) { if(!val) return true; this.len = len; return val && val.length <= this.len  ? true: false; }
		},
		// 길이가 일치
		len: {
			hanTail: ['의','의'],
			msg: function() { return ' 길이는 '+this.len+'자 이어야 합니다.'; },
			len: 0,
			valid: function(val, len ) { if(!val) return true; this.len = len; return val && val.length == this.len  ? true: false; }
		},
		// 영어 숫자 조합
		a0: {
			hanTail: ['은','는'],
			msg: function() { return '영어와 숫자가 모두 포함되어야 합니다.'; },
			valid: function(val) {
				if(!val) return true;
				return /^(?=.*\d)(?=.*[a-zA-Z]).+$/.test(val);
			}
		},
		// 영어,숫자,특수문자 조합
		a0s: {
			hanTail: ['은','는'],
			msg: function() { return '영어, 숫자, 특수문자가 모두 포함되어야 합니다.'; },
			valid: function(val) {
				if(!val) return true;
				return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^0-9a-zA-Z]).+$/.test(val);
			}
		},
		// 영어 대문자, 영어 소문자 ,숫자,특수문자 조합
		aA0s: {
			hanTail: ['은','는'],
			msg: function() { return '영어 소문자, 영어 대문자 ,숫자, 특수문자가 모두 포함되어야 합니다.'; },
			valid: function(val) {
				if(!val) return true;
				return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^0-9a-zA-Z]).+$/.test(val);
			}
		},
		// 이메일
		mail: {
			hanTail: ['의','의'],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex) abc@abc.com'; },
			valid: function(val) {
				if(!val) return true;
				return /^[_a-zA-Z0-9\.\-]+@[\._a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/.test(val);
			}

		},
		// 특수문자 거부
		nospchar: {
			hanTail: ['의','의'],
			msg: function() { return $m('형식오류','특수 문자를 사용할 수 없습니다.')+' ex) a-bc.123_123'; },
			valid: function(val) {
				if(!val) return true;
				return /[_a-zA-Z0-9\.\-]+/.test(val);
			}

		},		// 이메일 도메인
		emaildomain: {

			hanTail: ['의','의'],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex) abc.com'; },
			valid: function(val) {
				if(!val) return true;
				return /^[\._a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/.test(val);
			}

		},
		// 사업자 등록번호
		saupno: {
			hanTail: ['의','의'],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex) 123-12-12345'; },
			valid: function(val) {
				if(!val) return true;
				return /^[0-9]{3}\-[0-9]{2}\-[0-9]{5}$/.test(val);
			}

		},

		// 이메일 뒷부분만 체크
		mailtail: {
			hanTail: ['',''],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex) abc.com'; },
			valid: function(val) {
				if(!val) return true;
				return /^[\._a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/.test(val);
			}

		},
		// 전화번호 체크
		tel: {
			hanTail: ['',''],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex) 02-123-1234 또는 010-123-1234'; },
			valid: function(val) {
				if(!val) return true;
				return /^0[0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/.test(val);
			}

		},
		// 휴대폰번호 체크
		mobile: {
			hanTail: ['',''],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex) 010-123-1234'; },
			valid: function(val) {
				if(!val) return true;
				return /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(val);
			}

		},
		// 숫자만 가능
		num: {
			hanTail: ['은','는'],
			msg: function() { return $m('숫자만','숫자만 입력이 가능합니다.'); },
			valid: function(val) {
				if(!val) return true;
				return /^[0-9]+$/.test(val);
			}

		},
		// 우편번호
		zipcode: {
			hanTail: ['',''],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex) 123-123'; },
			valid: function(val) {
				if(!val) return true;
				return /^[0-9]{3}-[0-9]{3}$/.test(val);
			}

		},
		docOnly: {
			hanTail: ['은','는'],
			msg: function() { return '문서 파일만 업로드가 가능합니다. (docx, doc, pdf, hwp)'},
			valid: function(val) {
				if(!val) return true;
				return /\.(docx|doc|pdf|hwp)$/i.test(val);
			}
		},

		pdfOnly: {
			hanTail: ['은','는'],
			msg: function() { return 'PDF 파일만 업로드가 가능합니다.'},
			valid: function(val) {
				if(!val) return true;
				return /\.(pdf)$/i.test(val);
			}
		},

		imgfile: {
			hanTail: ['은','는'],
			msg: function() { return '이미지 파일만 업로드가 가능합니다. (gif, bmp, png, jpg, jpeg)'},
			valid: function(val) {
				if(!val) return true;
				return /\.(png|bmp|jpg|gif|jpeg)$/i.test(val);
			}
		},

		moviefile: {
			hanTail: ['은','는'],
			msg: function() { return '동영상 파일만 업로드가 가능합니다. (mp4)'},
			valid: function(val) {
				if(!val) return true;
				return /\.(mp4)$/i.test(val);
			}
		},

		xlsfile: {
			hanTail: ['은','는'],
			msg: function() { return '엑셀 파일만 업로드가 가능합니다. (xls)'},
			valid: function(val) {
				if(!val) return true;
				return /\.xls$/i.test(val);
			}
		},
		// 날짜형식
		date: {
			hanTail: ['의','의'],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex) 2013-05-05'; },
			valid: function(val) {
				if(!val) return true;
				return /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(val);
			}

		},
		url: {
			hanTail: ['은','는'],
			msg: function() { return $m('형식오류','형식에 맞지 않습니다.')+' ex)http://www.abc.com'; },
			valid: function(val) {
				if(!val) return true;
				return /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/.test(val);
			}

		},
		// 지정한 값보다 작거나 같아야함
		// 예) 날짜 범위에서 시작일이 종료일 보다 클경우
		// jwvalid-less-startdt-enddt
		less: {
			hanTail: ['은','는'],
			msg: function() { return ' 종료 보다 클 수 없습니다.;' },
			valid: function( val, targetName, $this ) {

				if(val > $('[name='+targetName+']').val()) {
					return false;
				}

				return true;

			}

		},
		// 지정한 값보다 크거나 같아야함
		// 예) 날짜 범위에서 시작일이 종료일 보다 클경우
		// jwvalid-less-startdt-enddt
		greater: {
			hanTail: ['은','는'],
			msg: function() { return ' 시작 보다 작을 수 없습니다.;' },
			valid: function( val, targetName, $this ) {

				if(val < $('[name='+targetName+']').val()) {
					return false;
				}

				return true;

			}
		},

		equals : {
			hanTail: ['은','는'],
			msg: function() { return ' 동일해야 합니다.' },
			valid: function( val, targetName, $this ) {

				if(val != $('[name='+targetName+']').val()) {
					return false;
				}

				return true;

			}
		},
		// 안전한 비밀번호
		// .pwd-chk 클래스가 있는 input 는 (모바일,전화번호) 비밀번호와 비교
		pwd: {
			hanTail: ['은','는'],
			msg: function() { return this.message; },
			len: 0,
			valid: function(val, len, $this ) {
				var retv = true;
				this.message = '동일한 문자가 연속으로 3회이상 들어갈 수 없습니다.';
				for(var i=0; i<val.length; i++) {
					var sub = val.substring(i);
					if(sub.length < 3) {
						retv = true;
						break;
					}
					var ch = sub.substring(0,1);
					if(sub.substring(1,2) == ch && sub.substring(2,3) == ch) {
						retv = false;
						break;
					}
				}
				// 휴대폰 또는 전화번호 체크
				var form = $this.parents('form');
				if(retv && $this.parents('form').length > 0) {

					this.message = '휴대폰 또는 전화번호중 세자이상 동일한 숫자를 사용할 수 없습니다.';
					form.find('.pwd-chk').each(function() {
						var value = $(this).val().replace(/-/g,'');
						for(var i=0; i<value.length; i++) {
							if(i+3 > value.length) {
								return false;
							}
							var sub = value.substring(i,i+3); // 3개 문자 추출
							if(val.indexOf(sub) > -1) {
								retv = false;
								return false;
							}

						}
					});

				}

				return retv;
			}
		}

	},

	initTitle: function() {

		if(this.title) return;

		this.title = {
			continent: '대륙구분', name: '이름', sex: '성별', id: '아이디', pwd: $m('password'), repwd: '비밀번호 확인란', mail: '이메일', tel: '전화번호', mobile: '휴대폰번호',
			zipcode: '우편번호', addr: '주소', article_title: $m('title'), article_text: $m('contents'), saupno : '사업자등록번호', category: '분류', search_val: '검색어',
			emailid: '이메일 아이디', emaildomain: '이메일 도메인', title: $m('title'), contents: $m('contents'), url: 'URL 경로', captcha: '보안문자', upload: '업로드'
		};

	},

	// 타이틀을 추가한다.
	addTitle: function(key, title) {

		this.initTitle();

		this.title[key] = title;

	},

	// 종성이 받침으로 끝나는지 여부
	isHanTail : function( a ) {

		if(a.length > 1) {
			a = a.substring(a.length-1);
		}
		var r = (a.charCodeAt(0) - parseInt('0xac00',16)) % 28;
		var t = String.fromCharCode(r + parseInt('0x11A8') -1);

		return (t.charCodeAt(0) != 4519);

	},

	valid: function() {

		var item, type, className, index, classes, regexKey, value, regVal;

		try {

			for(var i=0; i<this.items.length; i++) {

				item = $(this.items[i]);

				if(!item.parent().is(':visible') ) {
					continue;
				}

				className = item.attr('class').replace(/\s{2,20}/g,' ');
				classes = className.split(' '); // 클래스를 분리한다.

				for(var j=0; j<classes.length; j++) {
					className = classes[j];
					index = className.indexOf('jwvalid-');
					// validator class 가 존재
					if(index > -1) {
						var strs = className.split('-');

						// 정규식 key 추출
						regexKey = strs[1];
						if(!this.regex.hasOwnProperty(regexKey)) {
							//throw '클래스명 '+className+' 에서 regex key 추출 오류';
							alert('develop error : 클래스명 '+className+' 에서 regex key 추출 오류');
							return false;
						}

						// 타이틀 추출*********************************

						var attrTitle = item.attr('data-valid-title'), step = 3;
						// 타이틀이 어트리뷰트 data-valid-title 에 지정되어 있으면 그 값을 타이틀로 사용
						this.initTitle(); // message.js 를 미리로딩하지 않기위해
						if(attrTitle) {
							typeKey = Math.random();
							this.title[typeKey] = attrTitle;
							step = 2;
						} else {

							typeKey = strs[2];
							if(!this.title.hasOwnProperty(typeKey)) {
								//throw '클래스명 '+className+' 에서 type key 추출 오류';
								this.title[typeKey] = typeKey;
							}

						}


						// 그외의 변수 추출
						regVal = '';
						if(strs.length > step) {
							regVal = strs[step];
						}

						// 값추출
						value = this.getValue(item);


						/* 검증 */
						if(!this.regex[regexKey].valid( value, regVal, item )) {

							if(this.alertFunction) {
								this.alertFunction( this.getValidMessage(typeKey, regexKey, item ) );
							} else {
								alert( this.getValidMessage(typeKey, regexKey, item ) );
							}
							var t = item.offset().top;
							$('html,body').stop(true, false).animate({scrollTop: t - 160 }, 900, function() {
								item.focus();
							});

							return false;
						}

					}

				}
			}

		} catch(e) {
			alert('dev error : '+e);
			return false;
		}

		return true;

	},

	getValidMessage: function(typeKey, regexKey, item) {

		var name = this.title[typeKey] || item.attr('name') || item.attr('id');

		var title = '"'+name+'"';

		var tail = '';

		if((locale || 'ko') == 'ko') {

			tail = this.isHanTail(name)? this.regex[regexKey].hanTail[0]:this.regex[regexKey].hanTail[1]
		}

		return name + tail +' '+ this.regex[regexKey].msg();

	},

	getValue: function(item) {

			var value, elName ;

			inputType = item.attr('type');
			if(!inputType) {
				inputType = item.get(0).tagName.toLowerCase();
			}

			switch(inputType) {
				case 'radio' :
					//elName = item.attr('name');
					//value = $('input[name="'+elName+'"]:checked').val();
					value = $('input[name="'+item.attr('name')+'"]:checked').length > 0;
					break;
				case 'select':
					//elName = item.attr('name');
					//value = $('select[name="'+elName+'"] option:selected').val();
					value = item.val();

					break;
				case 'checkbox':
					value = $('input[name="'+item.attr('name')+'"]:checked').length > 0;
					break;
				default:
					value = item.val();
			}

			return value;

	},
	alertFunction: null


};
/**
 * 폼 유효성 체크 jquery 플러그인
 * title: 사용자 정의 타이틀 추가
 * alertFunction : 사용자 경고창 함수를 다른 함수로 적용할 경우
 * beforeSubmit :  기본 체크외에 사용자 유효성 체크 함수가 필요한 경우
 * $('#form').formValid({
 * 	title: [
		{title: 'emailid',	text: '이메일 아이디'	},
		{title: 'emaildomain',	text: '이메일 도메인'	},
		{title: 'mtel',	text: '연락처'},
 * ],
 * alertFunction: toastr.error,
 * beforeSubmit: function(validator) {
 *
 *  	if(false) {
 *  		alert('안됩니다');
 *  		return false;
 *  	}
 *  	return true;
 *
 * });
 */
(function($) {

  $.fn.formValid = function(opt) {

	opt = opt || {};

	this.each(function() {

		var $this = $(this);

		$this.submit(function(e) {

			//e.preventDefault();
			var validator = new Andwise.app.Validator($this);
			validator.alertFunction = opt.alertFunction ? opt.alertFunction: false;


			if(opt.title) {
				for(var i=0; i<opt.title.length; i++) {
					validator.addTitle(opt.title[i].title,opt.title[i].text);
				}
			}

			retv = validator.valid();;

			if(opt.beforeSubmit) {

				retv = retv && opt.beforeSubmit(validator);
			}

			if(!retv) {
				e.stopImmediatePropagation();
			}

		  window.cmsValidator = function() {

				return retv;
		  }


			return retv;
		});


	});

	return $(this);

  }

})(jQuery);

/**
 * 플래쉬 맵 내용 Alert 호출
 */
function alertFlashMap() {

	if( $('.flash-map').length > 0 ) {

		var msg = '';
		$('.flash-map').each(function( index ) {

			// 이전 스크립트에서 호출 했으면 스킵
			if(!$(this).data('flash-map')) {
				if(index != 0) {
					msg += '\n';
				}
				msg += $(this).text();
				$(this).data('flash-map',true)
			}

		});
		if(msg.length > 0) {
			alert(msg);
		}
	}

}

//---------------
// PDF export button
//---------------
function bindExportPdfButton() {

	if($('#pdfDown').length > 0) {
        var form = $('<form method="post" name="pdfForm" action="'+CMS.ctx+'/cms/plugin/pdf/pdfOpen.do" target="_blank">'
          +'<input type="hidden" name="siteId" value="'+_siteId+'"/>'
          +'<input type="hidden" name="locale" value="'+locale+'"/>'
          +'<input type="hidden" name="url" value="'+location.pathname+'"/>'
          +'<input type="hidden" name="href" value="'+location.href+'"/>'
          +'</form>');

        $('body').append(form);

		$('#pdfDown').click(function() {

			$('form[name=pdfForm]').submit();

		    return false;
		});

	}

};


var CKEDITOR = {
		instances : {}
}

var editorAdaptor = {};

/**
 * option.isImageFullUrl (boolean) : 이미지 링크를 http//host 를 포함한 절대 경로 사용
 * @param {} option
 * @return {}
 */
function initEditor( option ) {

	if(typeof(editorVendor) == 'undefined') {
		editorVendor = 'froala';
	}

	if(editorVendor == 'froala' && bowser.msie && parseInt(bowser.version) < 10) {
		editorVendor = 'daumEditor';
	} else if(editorVendor == 'ckeditor3' && bowser.msie && parseInt(bowser.version) > 9) {
		editorVendor = 'daumEditor';
	}

	var editorAdaptor = new EditorAdaptor[editorVendor]();

	editorAdaptor.init( option );

	return editorAdaptor;

}

var EditorAdaptor = function () {


	return {

		defaultHeight: 900,

		$textarea: [],
		//--------------------------------
		// 에디터에 내용을 주입할때 사용
		//--------------------------------
		getTextValue:function( index ) {

			return EditorAdaptor.$textarea[index].val();

		},

		//-------------------------
		// Innoditor
		//-------------------------
		innoditor: function(){
			var editor , $iframe;

			return {

				getData : function() {
					return $iframe[0].contentWindow.getValue();
				},

				init : function( option ){
					var height = option.height || EditorAdaptor.defaultHeight, index = option.index, $textarea = option.$textarea;

					$textarea.css('display','none');

					EditorAdaptor.$textarea[index] = $textarea;

					$iframe = $('<iframe>',{
						id: 'innoditor'+index,
						title: $m('편집'),
						frameBorder: 0
					}).css({
						'height' : (parseInt(height)+120)+'px',
						'width' : '100%'
					});

					$textarea.after($iframe);

					var css = [];
					$('link[rel="stylesheet"]').each(function() {
						css.push( this.href );
					});

					var html =
						'<!doctype html>\n'+
						'<html>\n'+
						'<head>\n'+
							'<meta http-equiv="expires" content="0" />\n'+
							'<meta http-equiv="expires" content="now" />\n'+
							'<meta http-equiv="Cache-Control" content="private" />\n'+
							'<meta http-equiv="Cache-Control" content="No-Cache" />\n'+
							'<meta http-equiv="Pragma" content="No-Cache" />\n'+
							'<meta http-equiv="content-type" content="text/html; charset=utf-8" />\n'+
							'<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n'+
							'<script language="javascript" type="text/javascript">\n'+
								'var g_arrSetEditorArea = new Array();\n' +
								'g_arrSetEditorArea[0] = "innoditor' + index + '";\n' +  // 이노디터를 위치시킬 영역의 ID값 설정

							'</script>\n'+

							'<script src="'+CMS.ctx+'/_common/js/jquery/jquery-1.9.1.js" type="text/javascript"></script>\n'+
							'<script language="javascript" src="'+CMS.ctx+'/_common/_plugin/innoditor/js/customize.js" type="text/javascript"></script>\n'+
							'<script language="javascript" src="'+CMS.ctx+'/_common/_plugin/innoditor/js/customize_ui.js" type="text/javascript"></script>\n'+
							'<script language="javascript" src="'+CMS.ctx+'/_common/_plugin/innoditor/js/loadlayer.js" type="text/javascript"></script>\n';

							for(var i=0; i<css.length; i++) {

								html += '<link remove="y" rel="stylesheet" href="' + css[i] + '"type="text/css">';

							}



						html += '<script language="javascript" type="text/javascript">\n'+

							'function setValue() {\n'+

								  'fnSetEditorHTMLCode( parent.EditorAdaptor.getTextValue(' + index  +' ),false, 0 )\n' +

							'}\n'+
							'function getValue() {\n'+

								'var text = fnGetEditorHTMLCode(false,' + index + ');\n' +

								'if (text == "<p><br></p>"){\n'  +
								' text = ""\n' +
								'}\n' +

								'return text;\n' +
								//'return fnGetEditorHTMLCode(false,' + index + ');\n' +

							'}\n'+


							'setValue()\n' +

							'document.close();\n'+
							'$(document).ready(function() { $("link[remove=y]").remove() } );'+
							'</script>\n'+
							'<body style="padding:0;margin:0;">\n'+

								'<div id="innoditor' + index +'"></div>\n'

							'</body>\n'+
							'</html>';

							var iframeDoc = $iframe[0].contentDocument || $iframe[0].contentWindow.document;

							iframeDoc.open();
							iframeDoc.write(html);

				}

			}
		},

		daumEditor: function() {

			var editor, $iframe;

			return {

				getData: function() {

					return $iframe[0].contentWindow.getValue();

				},

				init: function( option ) {

					var template, height = option.height || EditorAdaptor.defaultHeight, index = option.index, $textarea = option.$textarea;

					locale = typeof(locale) == 'undefined'? 'ko': locale;

					$textarea.css('display','none');

					EditorAdaptor.$textarea[index] = $textarea;

					$iframe = $('<iframe>',{
						id: 'daumIframe'+index,
						title: $m('편집'),
						frameBorder: 0
					}).css({
						'height' : height+'px',
						'width' : '100%'
					});

					$textarea.after( $iframe );

					var css = '[';
					$('link[rel="stylesheet"]').each(function( index ) {
						if(index !== 0) {
							css += ',';
						}
						css +=  "'"+$(this).attr('href')+"'";
					});
					css +=  ']';

					$.ajax({
						cache: true,
						async: false,
						url: CMS.ctx+'/_res/_common/_plugin/daumeditor/template.html',
						success: function( response ) {
							template = response;
							template = template.replace(/\$index/g,index);
							template = template.replace(/\$height/g,height);
							template = template.replace(/\$ctx/g,CMS.ctx);
							template = template.replace(/\$locale/g,CMS.locale);
							template = template.replace(/\$extcss/g,css);
							template = template.replace(/\$\{isImageFullUrl\}/g, typeof(option.isImageFullUrl) == 'undefined' ? 'false': (option.isImageFullUrl?'true':'false'));
						}
					});

					var iframeDoc = $iframe[0].contentDocument || $iframe[0].contentWindow.document;

					iframeDoc.open();
					iframeDoc.write(template);



				}

			}

		},

		froala: function() {
			var editor , $iframe;

			return {

				getData : function() {
					return $iframe[0].contentWindow.getValue();
				},

				init : function( option ){

					var template, height = option.height || EditorAdaptor.defaultHeight, index = option.index, $textarea = option.$textarea, extCss = '';
					locale = typeof(locale) == 'undefined'? 'ko': locale;

					$.ajax({
						cache: true,
						async: false,
						url: CMS.ctx+'/_res/_common/_plugin/froala-editor/template.html',
						success: function( response ) {
							template = response;
							template = template.replace(/\$index/g,index);
							template = template.replace(/\$height/g,height);
							template = template.replace(/\$ctx/g,CMS.ctx);
							template = template.replace(/\$locale/g,CMS.locale);
							template = template.replace(/\$\{isImageFullUrl\}/g, typeof(option.isImageFullUrl) == 'undefined' ? 'false': (option.isImageFullUrl?'true':'false'));
						}

					});


					$textarea.css('display','none');

					EditorAdaptor.$textarea[index] = $textarea;

					$iframe = $('<iframe>',{
						id: 'editorFrame'+index,
						title: $m('편집'),
						frameBorder: 0
					}).css({
						'height' : height+'px',
						'width' : '100%'
					});

					$textarea.after($iframe);

					$('link[rel="stylesheet"]').each(function() {
						extCss += '<link rel="stylesheet" href="'+$(this).attr('href') +'">' + '\n';
					});
					template = template.replace(/\$extcss/g,extCss);


					var iframeDoc = $iframe[0].contentDocument || $iframe[0].contentWindow.document;

					iframeDoc.open();
					iframeDoc.write(template);


				}
			}

		},

		//-------------------------
		// ckeditor
		//-------------------------
		ckeditor3: function() {

			var editor, $iframe;

			return {

				getData: function() {

					return $iframe[0].contentWindow.CKEDITOR.instances['textarea'].getData();

				},

				init: function( option ) {

					var template, height = option.height || EditorAdaptor.defaultHeight, index = option.index, $textarea = option.$textarea;
					locale = typeof(locale) == 'undefined'? 'ko': locale;

					$textarea.css('display','none');

					EditorAdaptor.$textarea[index] = $textarea;

					$iframe = $('<iframe>',{
						id: 'ckIframe'+index,
						title: $m('편집'),
						frameBorder: 0
					}).css({
						'height' : height+'px',
						'width' : '100%'
					});

					$textarea.after($iframe);

					var css = '[';
					$('link[rel="stylesheet"]').each(function( index ) {
						if(index !== 0) {
							css += ',';
						}
						css +=  "'"+$(this).attr('href')+"'";
					});
					css +=  ",'"+CMS.ctx+"/_common/_plugin/ckeditor/contents.css']";

					$.ajax({
						cache: true,
						async: false,
						url: CMS.ctx+'/_res/_common/_plugin/ckeditor/template.html',
						success: function( response ) {
							template = response;
							template = template.replace(/\$index/g,index);
							template = template.replace(/\$height/g,height);
							template = template.replace(/\$ctx/g,CMS.ctx);
							template = template.replace(/\$locale/g,CMS.locale);
							template = template.replace(/\$extcss/g,css);
							template = template.replace(/\$resPath/g,CMS.resPath);
						}
					});


					var iframeDoc = $iframe[0].contentDocument || $iframe[0].contentWindow.document;


					iframeDoc.open();
					iframeDoc.write(template);



				}

			}

		},


		//--------------------------------
		// 나모 에디터
		//--------------------------------
		namo3: function() {

			var $iframe;

			return {

				getData: function() {

					return $iframe[0].contentWindow.namoEditor.GetBodyValue();

				},

				init: function( option ) {

					var height = option.height || EditorAdaptor.defaultHeight, index = option.index, $textarea = option.$textarea;

					$textarea.css('display','none');

					EditorAdaptor.$textarea[index] = $textarea;

					$iframe = $('<iframe>',{
						title: $m('편집'),
						id: 'namoIframe'+index,
						frameBorder: 0
					}).css({
						'height' : height+'px',
						'width' : '100%'
					});

					$textarea.after($iframe);

					var css;
					if(typeof(_reouscePath) != 'undefined') {
						css = _reouscePath+'_css/user.css';
					}

					var lang = 'auto';
					if(typeof(locale) == 'undefined') {
					} else if(locale.startsWith('ja')) {
						lang = 'jpn';
					} else if(locale.startsWith('zh')) {
						lang = 'chs';
					} else if(locale.startsWith('en')) {
						lang = 'enu';
					};


					var source = [
					'<!doctype html><html>',
					'<head>',
					'<script type="text/javascript" src="'+CMS.ctx+'/_common/js/jquery/jquery-1.9.1.js"></script>',
					'<script type="text/javascript" src="'+CMS.ctx+'/_common/_plugin/namo_editor3/js/namo_scripteditor.js" ></script>',
					'</head>',
					'<body style="padding:0;margin:0">',
						'<script type="text/javascript">',
						'var namoEditor;',
						'ready();',
						'function ready() {',
							'setTimeout(function() {',
								'if(typeof(NamoSE) == "undefined") {',
									'ready(); return;',
								'}',
								'editorStart();',
							'},10);',
						'};',
						'function editorStart() {',
							'namoEditor = new NamoSE(\'namo'+index+'\');',
							'namoEditor.params.Height = '+height+';',
							'namoEditor.params.Width = "100%";',
							'namoEditor.params.UserLang = "'+lang+'";',
							'namoEditor.params.FullScreen = false;',
							css ? 'namoEditor.params.Css = "'+css+'";' : '',
							'namoEditor.editorStart();',
						'};',
						'function OnInitCompleted(e){',
							'parent.$("#namoIframe'+index+'").css("height",$(document.body).height()+20);',
							'e.editorTarget.SetBodyValue( parent.EditorAdaptor.getTextValue('+index+') );',
							'document.close();',
						'}',
						'</script>',
					'</body>',
					'</html>'].join('');

					var iframeDoc = $iframe[0].contentDocument || $iframe[0].contentWindow.document;


					iframeDoc.open();
					iframeDoc.write(source);



				}
			}
		}
	};
}();



//-----------------------------------
// $.ajax 를 권한을 처리하도록 확장
// 로그인이 필요할 경우 로그인 페이지로 이동한다.
// 이동시 메시지 출력은 다국어때문에 각 사이트의 cms-common.js 의 var beforeLoginMessage 에 저장한다.
//-----------------------------------
var _oldAjax = $.ajax;
$.ajax = function( opt ) {

	var tmpError = opt.error;

	opt.error = function( data ) {
		if(data.status == 401) {
			if( typeof(beforeLoginMessage) !== 'undefined' ) {
				alert(beforeLginMessage);
			}
			location.href = data.responseJSON.loginUrl + '?referer='+ encodeURIComponent( location.pathname + location.search );
			return;
		}
		if(tmpError) {
			tmpError.apply(this, arguments );
		}
	}

	return _oldAjax( opt );
};
