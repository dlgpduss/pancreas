function pageRows(rows){
	var f = document.articleSearchForm;
	f.rows.value = rows;
	f.submit();
	return false;
}

function pageCat(cat){
	var f = document.articleSearchForm;
	f.cat.value = cat;
	f.submit();
	return false;
}

function goPage(page){
	var f = document.articleSearchForm;
	f.cpage.value = page;
	f.submit();
	return false;
}

function del(article_seq, cpage, rows, condition, keyword){
	if(!confirm("정말 삭제하시겠습니까?")) return false;
	location.href="delete.do?article_seq="+article_seq+"&amp;cpage="+cpage+"&amp;rows="+rows+"&amp;condition="+condition+"&amp;keyword="+keyword;
}

var file_count = 0;
function fileListAdd(){
	var html = '<div id="file'+file_count+'"><input type="file" name="attach" style="margin-bottom:5px;" title="첨부파일 '+(file_count+2)+'"/> <a href="javascript:;" onclick="fileListDel(this);" class="btn_type_1"><img src="/images/article/del_btn.gif" alt="삭제" /></a></div>';
	$("#fileList").append(html);
	file_count++;
}

function fileListDel(obj){
	$(obj).parent().remove();
	file_count = file_count - 1;
}

function userReport(obj){
	$("#reportFrm").submit();
}

$(function(){
	$("#reportFrm").submit(function(){
		if($("[name='reportconts']").val()==''){
			alert("신고내용을 입력해 주세요.");
			$("[name='reportconts']").focus();
			return false;
		}
		$.post($(this).prop("action"), $(this).serializeObject(), function(data){
			if(data.rst=="-1"){
				alert(data.msg);
				$(".report_insert").css("display", "none");
			}else{
				alert("정상적으로 등록되었습니다. 감사합니다.");
				$(".report_insert").css("display", "none");
			}
		});
		return false;
	});
});


function table_caption_data(first, last){
	$(document).ready(function(){
		var caption_nm = $("#sub>h3").text().trim();
		var col_nm = "";
		$.each($(".list_style_1>thead>tr>th"),function(i,v){
			if($(this).text() != ""){
				if(i+1 == $(".list_style_1>thead>tr>th").length){
					col_nm += $(this).text();
				}else{
					col_nm += $(this).text()+", "
				}
			}
		});
		
		$(".list_style_1>caption").text(caption_nm + " " + first +" "+col_nm + " " + last);
	});
}