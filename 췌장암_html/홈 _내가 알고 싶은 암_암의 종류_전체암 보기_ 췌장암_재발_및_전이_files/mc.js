if(window.console == undefined) console = {log:function(){}};
var console_text = "";
console_text +="   __  _____________  _______  _______		\n";
console_text +="  /  |/  / ___/ ___ \\/ ___/  |/  / __/		\n";
console_text +=" / /|_/ / /__/ / _ `/ /__/ /|_/ /\\ \\  	\n";
console_text +="/_/  /_/\\___/\\ \\_,_/\\___/_/  /_/___/  	\n";
console_text +="              \\___/                   		\n";
console.log("%c"+console_text, "color:blue;font-size:10pt;");

var DEBUG = true;
var MC_EDITOR = "crosseditor";//ck-editor,smarteditor,crosseditor
//var MC_EDITOR = "smarteditor";//ck-editor,smarteditor,crosseditor
function ajaxPost(url, json) {
	var deferred = $.Deferred();
	$.ajax({
		method: "POST",
		contentType: "application/json",
		url: url,
		data: JSON.stringify(json),
		success: function(data) {
			deferred.resolve(data);
		},
		error: function() {
			deferred.reject();
		}
	});
	return deferred.promise();
}
function ajaxGet(url, json) {
	var deferred = $.Deferred();
	$.ajax({
		method: "GET",
		contentType: "application/json",
		url: url,
		data: JSON.stringify(json),
		success: function(data) {
			deferred.resolve(data);
		},
		error: function() {
			deferred.reject();
		}
	});
	return deferred.promise();
}
function getJSON(targetURL, params, callback){
	var promise = $.ajax({
		url : targetURL, 
		type: "POST", 
		data : params, 
		dataType : "json", 
		async: true,
		cache : false
	}).fail(errorProc);
	
	promise.done(function(data){
		if(!!callback){
			callback(data);
		}
	});
	return promise;
}
function getSyncJSON(targetURL, params, callback){
	var promise = $.ajax({
		url : targetURL, 
		type: "POST", 
		data : params, 
		dataType : "json", 
		async: false,
		cache : false
	}).error(errorProc);
	
	promise.then(function(data){
		if(!!callback){
			callback(data);
		}
	});
	return promise;
}

function addOptions(array, value, text, obj, defaultValue){
	var html = "";
	if(array == null || array == ""){
		obj.empty();
		html = "<option value = ''>데이터없음</option>";
	}
	$.each(array, function(){
		obj.empty();
		html += "<option value='" + this[value] + "' ";
		if(this[value] == defaultValue)
			html += "selected='selected'";
		html += ">" + this[text] + "</option>";
	});
	obj.append(html);
}

function errorProc(jqXHR,textStatus,errorThrown){
	if(jqXHR.status == 401){
		var returnURL = location.pathname + location.search;
		if(confirm("세션이 끊어졌습니다.\n로그인 후 다시 시도해 주세요.\n로그인페이지로 이동하시겠습니까?")){
			window.top.location.href = "/super/login/index.do?returnURL="+returnURL;
		}
	}else if(jqXHR.status == 403){
		var returnURL = location.pathname + location.search;
		if(confirm("새로운 사용자가 로그인하였거나, 로그아웃되었습니다.\n로그인페이지로 이동하시겠습니까?")){
			window.top.location.href = "/super/login/index.do?returnURL="+returnURL;
		}
	}else if(jqXHR.status == 404){
		alert("요청하신 페이지를 찾을수 없습니다.");
	}else{
		var msg = $.parseJSON(jqXHR.responseText);
		if("Y"==msg.debug){
			alert("=================에러코드("+jqXHR.status+")=================\n"+jqXHR.statusText+" 자세한 에러내용은 콘솔확인\n====================END====================");
			console.error(msg.error_message);
		}else{
			alert("==============="+jqXHR.statusText+"================\n관리자에게 문의하십시오\n=====================END====================");
		}
	}
}
if(!String.prototype.startsWith) {
	String.prototype.startsWith = function(str){
		if (this.length < str.length) { return false; }
		return this.indexOf(str) == 0;
	}
}
if(!String.prototype.endsWith) {
	String.prototype.endsWith = function(str){
		if (this.length < str.length) { return false; }
		return this.lastIndexOf(str) + str.length == this.length;
	}
}
if (!window.location.origin) {
    window.location.origin  = window.location.protocol + "//" + window.location.hostname + ( window.location.port ? ':'+window.location.port : '' );
}

if(!!$.blockUI){
	$.blockUI.defaults = {
			message : "<img src='/images/common/ajax-loader.gif' alt='로딩중...'/> 페이지 로딩중입니다.",
		    overlayCSS:  { 
		        backgroundColor: '#968d8d', 
		        opacity:         0.6, 
		        cursor:          'wait' ,
				'z-index' : 200000
		    }, 
		    centerX: true, // <-- only effects element blocking (page block controlled via css above) 
		    centerY: true,
		    bindEvents: true,
		    constrainTabKey : true,
		    showOverlay : true,
			css : {
			    border: 'none', 
			    padding: '5px', 
			    backgroundColor: '#676767', 
			    '-webkit-border-radius': '10px', 
			    '-moz-border-radius': '10px', 
			    opacity: .6, 
			    color: '#fff',
				'z-index' : 200001
			}
	}
}

function submitHiddenForm(b,e){
	var a=$("#_hidden_iframe_");
	if(!a[0]){
		a=$('<iframe id="_hidden_iframe_" name="_hidden_iframe_" style="display: none;"></iframe>');
		$("body").append(a)
	}
	var d=$("#_hidden_form_");
	if(!d[0]){
		d=$('<form method="post" id="_hidden_form_" target="_hidden_iframe_" style="display: none;"></form>');
		$("body").append(d)
	}
	d.empty();
	d.attr("action",b);
	for(var c in e){
		if(e.hasOwnProperty(c)){
			$('<input type="hidden">').attr("name",c).attr("value",e[c]).appendTo(d)
		}
	}
	d.submit();
}

//화면캡쳐(오브젝트,파일명)
function capture(captureObj,file_name) {
	html2canvas($(captureObj), {
		//allowTaint: true,
		//taintTest: false,
		useCORS: true,
		//proxy: '/etc/proxy_image',
		onrendered: function(canvas) {
			var image = canvas.toDataURL();
			submitHiddenForm("/etc/bypass_image", { image : image, filename:file_name+".png"});
		}
	});
}

function popOpen(url, title, width, height) {
	var w = width; // 팝업창 넓이
	var h = height; // 팝업창 높이
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	var settings = 'height=' + h + ',';
	settings += 'width=' + w + ',';
	settings += 'top=' + wint + ',';
	settings += 'left=' + winl + ',';
	settings += 'scrollbars=yes,';
	settings += 'resizable=yes';
	window.open(url, title, settings);
}

function twtLink(){
	var shortUrl = shorturl(location.href);
	var title = encodeURIComponent($("title").text());
	window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent("[CMS데모]") + title + ":" + "&url=" + shortUrl);
}

function fbLink(){
	var title = encodeURIComponent($("title").text());
	window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(location.href));
}
function ksLink(){
	var title = $("title").text();
	var shortUrl = shorturl(location.href);
	Kakao.Story.share({
		url: shortUrl,
		text: $("title").text()
	});
}

function shorturl(url){
	var rst = url;
	$.ajax({
		type : "POST",
		url : "/shorturl.do",
		async: false,
		data : {
			longUrl : encodeURIComponent(url),
			login : "o_3qojukp8ip",
			apiKey : "R_c52d594730d94c058959c1e12efa17da",
			format : "xml"
		},
		dataType : "text",
		success : function(transUrl){
			rst = transUrl;
		}
	});	
	return rst;
}

function copyClipboard(address) {
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	textarea.value = address;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
}

function copyLink(){
	if(window.prompt('아래의 URL을 복사하여 사용하실수 있습니다.', location.href)) {
		copyClipboard(location.href);
	};
}