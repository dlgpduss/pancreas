/* javascript */
//var page_array = Array("?cancer_seq=3341&menu_seq=3357", "?cancer_seq=4757&menu_seq=4769", "?cancer_seq=5117&menu_seq=5129", "?cancer_seq=5117&menu_seq=8723310","?cancer_seq=5237&menu_seq=5249");
var page_array = Array("", "", "", "","");
var chk = false;

jQuery(page_array).each(function(i,o){
	//var path = location.pathname;
	//var href = location.href;
	var search = location.search;
	//alert(search);
	if(search == page_array[i]){
		chk = true;
		//alert(i);
	}	
});
jQuery(document).ready(function(){
	jQuery(window).bind("beforeunload", function() { 
		if(chk){
			return window.open("https://goo.gl/forms/njy5ZKa8pI2QLAuw2", 'popup01','left=0, top =0, width=800, height=1000, scrollbars= 1, toolbar=0, menubar=no');
			 //confirm("Do you really want to close?") ;	
		}
	});
});

window.addEventListener('scroll', function() {
  var el = document.querySelector('.show-on-scroll');
  
  //if(window.scrollY >= 5600) el.classList.add('shown');
  //if(window.scrollY >= (document.body.scrollHeight - 900)) el.classList.add('shown');
  if(window.scrollY >= (document.body.scrollHeight -window.innerHeight - 50)) el.classList.add('shown');
  else el.classList.remove('shown');
});