/*******************************************************
 * 프로그램명   : akc.js
 * 설명         : 표준소스2 자동완성
 * 작성일       :  2012.01.05
 * 작성자       : 기술서비스팀 장진후
 * 수정내역     :
 *****************************************************/

var akc_url = "/api/search/autocomplete";		// 자동완성  페이지 경로를 적어준다.
// var akc_url = "common.search.akcAjax.sp";		// 자동완성  페이지 경로를 적어준다.

var AKCKwdID = "kwd";				// 키워드 input id
var AKCLstID = "keyword";				// 자동완성 리스트 id
var AKCArwID = "key_arr";				// 자동완성 화살표 id
var AKCRakID = "searchList";				// 인기순위 리스트 id

var InstNo = "instNo";


var akc_kwd = null;
var akc_lst = null;
var akc_arrow = null;
var akc_timeid = null;
var akc_cur_kwd = null;
var akc_prv_kwd = null;
var akc_show_flag = false;
var akc_enable = true;
var akc_opt = 0;

/* 병원코드 변수 */
var InstNo = "";

var akc_idx	= -1;
var akc_lst_len = 0;
var akc_evt_key = 0;

/**
 * 자동완성초기화 onload(Ready)시 호출
 * @ param
 * @ return
 **/
function akcInit() {
    akc_kwd = $('#'+AKCKwdID);
    akc_lst = $('#'+AKCLstID);
    akc_arrow = $('#'+AKCArwID);
    akc_rak = $('#'+AKCRakID);

    InstNo = $("#instNo").val();            /* 병원코드 값 가져오기. */


    akc_kwd.css('ime-mode', 'active');
    akc_kwd.attr("autocomplete","off");

    setAkcInterval();

    // 키보드 이벤트 등록
    akc_kwd.keyup(function(event){
        akc_evt_key = event.keyCode;

        if(event.keyCode == 38){	// up
            akc_idx--;
            if(akc_idx < 0) akc_idx = 0;
            pntAkcLst();
        }else if(event.keyCode == 40){	// down
            akc_idx++;
            if(akc_idx > akc_lst_len-1) akc_idx = akc_lst_len-1;
            pntAkcLst();
        }else{
            akc_idx	= -1;
        }
    });
    window.onscroll = function() {
        tglAkcEnd();
    };

    // kwd input창에 focus가 있을 경우
    akc_kwd.focus(function(event){
        if(akc_enable == true)	tglAkcVsb(true);
    });



    // 마우스 클릭시 반응할 이벤트 등록
    $(document).click(function(event){
        switch(event.target.id){
            case AKCKwdID :		// input box 클릭시
                if(akc_enable == true)	tglAkcVsb(true);
                break;
            case AKCArwID :		// 화살표 클릭시
                akc_arrow.text() == "▼" ? tglAkcVsb(true) : tglAkcVsb(false);
                break;
            case "akc_end" :	//인기순위 보기 클릭시
                tglAkcEnd();
                break;
            case "akc_able" :	// 끄기 클릭시
                tglAkcAbl();
                break;
            case "akc_end" :
                tglAkcEnd();
                break;
        }
    });
}

/**
 * 자동완성의 interval값을 세팅
 * @ param
 * @ return
 **/
function setAkcInterval() {
    if(akc_timeid == null)
        akc_timeid = window.setInterval("chkAkcKwd()", 10);
}

/**
 *
 * 자동완성의 interval값을 지운다
 * @ param
 * @ return
 **/
function clrAkcInterval() {
    window.clearInterval(akc_timeid);
    akc_timeid = null;
}

/**
 * 키값을 체크한다. 자동완성 페이지를 호출한다.
 * @ param
 * @ return
 **/
function chkAkcKwd(){
    if(akc_show_flag == true && akc_evt_key != 38 && akc_evt_key != 40 && akc_enable == true){
        akc_cur_kwd = akc_kwd.val().toLowerCase();

        if(akc_cur_kwd == "" || akc_cur_kwd == null){
            $(".del_txt").css("display", "none");
            akc_prv_kwd = "";
            akc_lst.children().first().html(wrtHelpMsg);
            return;
        } else {
            $(".del_txt").css("display", "block");
        }

        if(akc_cur_kwd != akc_prv_kwd) callAkcKwd();
    }
}

/**
 * 자동완성 페이지를 호출한다.
 * @ param
 * @ return
 **/
function callAkcKwd(){
    var send_url = akc_url + "?kwd=" + akc_cur_kwd + "&opt=" + akc_opt;
    var akc_html = "";
    var temp_hilight =  "";
    var lower_temp_str = "";
    var i = 0;
    // get으로 보내면 파폭에서 한글 전송이 안됨.
    $.ajax({
        type: "POST",
        url: akc_url,
        dataType: "json",
        data: "kwd="+akc_cur_kwd+"&opt="+akc_opt+"&instNo="+InstNo,
        success: function(data){
            $.each(data.akc, function(){

                temp_hilight = this["highlight"];
                temp_hilight = temp_hilight.replace("<b>","");
                temp_hilight = temp_hilight.replace("</b>","");
                lower_temp_str = temp_hilight.toLowerCase();

                if(lower_temp_str.indexOf(akc_cur_kwd.toLowerCase()) > -1){
                    if( temp_hilight.indexOf(akc_cur_kwd)==0){
                        temp_hilight = "<strong>" + temp_hilight.substring(0, akc_cur_kwd.length) + "</strong>" +
                            temp_hilight.substring(akc_cur_kwd.length, temp_hilight.length);
                    }else{
                        temp_hilight = temp_hilight.substring(0, temp_hilight.length-akc_cur_kwd.length) +
                            "<strong>" + temp_hilight.substring(temp_hilight.length-akc_cur_kwd.length, temp_hilight.length) + "</strong>";
                    }
                }

                akc_html += "<li class=\"akclist\" id=\"akc" + i + "\">";
                akc_html += "<a href='#'>" + temp_hilight + "</a>";
                akc_html += "</li>";
                i++;

            });

            akc_lst_len = data.akc.length;
            if(data.akc[0].kwd == "" && data.akc.length <= 1){
                akc_lst.children().first().html(wrtHelpMsg());
                akc_lst.show();
                akc_arrow.text('▼');
            }else{
                akc_lst.children().first().html(akc_html);
                akc_lst.show();
                akc_arrow.text('▲');
            }

            $('.akclist').children('a').bind('click', function(){
                dftSchKwd($(this).text());
            });
        }, error:function (request, status, error) {
            alert("code :: " + request.status + "\n" + "error " + error);
        }

    });
    akc_prv_kwd = akc_cur_kwd;
}

/**
 * 키보드 이벤트에 따른 자동완성 선택 css 처리
 * @ param
 * @ return
 **/
function pntAkcLst(){
    var slt_kwd = $('#akc'+akc_idx).removeClass('akclist').addClass('akc_select').text();

    if( slt_kwd != "" ){
        $('.akc_select').removeClass('akc_select').addClass('akclist');
        akc_kwd.val($('#akc'+akc_idx).removeClass('akclist').addClass('akc_select').text());
    }
}

/**
 * 자동완성 도움말
 * @ param
 * @ return help_msg (도움말)
 **/
function wrtHelpMsg(){
    var help_msg = "";
    if(akc_enable == true){
        if($("#kwd").val() == "") {
            help_msg = "<li ><a href=\"#none\">검색어 자동완성 기능을 사용중입니다.</a></li>";
        } else {
            help_msg = "<li ><a href=\"#none\">해당 검색어가 없습니다.</a></li>";
        }
    }else{
        help_msg = "<li ><a href=\"#none\">자동 완성 기능이 중지된 상태입니다.</a></li>";
    }

    return help_msg;
}

/**
 * 자동완성창 toggle
 * @ param type ( false : hide,  true : show )
 * @ return
 **/
function tglAkcVsb( type ){
    if( type == false ){
        clrAkcInterval();
        akc_show_flag = false;
        akc_lst.hide();
        akc_arrow.text('▼');
        /*document.getElementById('searchList').style.display="block";*/
    }else if( type == true ){
        setAkcInterval();
        akc_show_flag = true;
        akc_lst.show();
        akc_arrow.text('▲');
        /*document.getElementById('searchList').style.display="none";*/
    }
}

/**
 * 첫단어, 끝단어 보기 toggle
 * @ param
 * @ return
 **/
function tglAkcOpt(){
    if( akc_opt == 0 ){
        akc_opt = 1;
        $('#akc_opt').text('첫단어보기');
    }else{
        akc_opt = 0;
        $('#akc_opt').text('끝단어보기');
    }
    callAkcKwd();
}

/**
 * 자동완성 켜기, 끄기 Flag
 * @ param
 * @ return
 **/
function tglAkcAbl(){
    var akc_able_text = $('#akc_able');
    if(akc_able_text.text() == "자동 완성 끄기"){
        akc_show_flag = false;
        akc_enable = false;
        $("#akc_able").text("자동 완성 켜기");
        akc_lst.children().first().html(wrtHelpMsg);
    }
    else {
        akc_enable = true;
        $("#akc_able").text("자동 완성 끄기");
        callAkcKwd();
    }
}

function tglAkcEnd(){
    var akc_able_text = $('#akc_end');
    if(akc_able_text.text() == "닫기") {
        akc_lst.hide();
    }
}

function tglkwddel(){
    akc_kwd.val("");
}


