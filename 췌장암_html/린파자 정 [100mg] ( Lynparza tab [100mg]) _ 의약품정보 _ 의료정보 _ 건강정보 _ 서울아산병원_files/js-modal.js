
// 모달
$(function(){

var Modal = function(element, _options){
	this.isShown = false;
	
	this.$element  = $(element);
	this.$target;
	
	this.$backdrop;
	this.$layout;
	
	this.$element
		.attr("tabindex", 0)
		.on("click", ".modal-close", $.proxy(function(e){ this.hide(); return false; }, this));
}

Modal.DEFAULTS = {
	show : true
}

Modal.prototype.show = function(params){
	var breforeEvt = $.Event('show.ui.modal', this.$element),
		afterEvt   = $.Event('shown.ui.modal', this.$element),
		$body      = $("body"),
		prevObj    = $body.data("ui.Modal");
	
	this.$element.trigger(breforeEvt);
	if (this.isShown || breforeEvt.isDefaultPrevented()) return;
	
	this.enforceFocus();
	
	this.isShown = true;
	
	params && params.depth ||
	prevObj && prevObj.hide && prevObj !== this && prevObj.hide();
		
	this.$backdrop = $('<div class="modal-backdrop"/>').appendTo("body");
	if( !this.$element.parent().hasClass('modal-layout') ) this.$layout = this.$element.wrap('<div class="modal-layout"/>').parent(); 

	$("html, body").addClass("modal-open");
	
	if( params && params.zIndex ){
		this.$backdrop.css("zIndex", params.zIndex);
		this.$layout.css("zIndex", params.zIndex+1);
	}
	
	this.$backdrop.animate({ opacity : "0.8" }, "slow");
	this.$layout.show();
	this.$element.show().focus();

	$body.data("ui.Modal", this);
	if( params && params.escape ) this.$element.data("ui.modal.escape", params.escape);
	this.$element.trigger(afterEvt);
}

Modal.prototype.hide = function(params){
	var breforeEvt = $.Event('hide.ui.modal', this.$element),
		afterEvt   = $.Event('hidden.ui.modal', this.$element);

	if(this.isShown == false) return false;

	this.$element.trigger(breforeEvt);
	this.isShown = false;
	
	$(document).off('focusin.ui.modal');
	
	$("html, body").removeClass("modal-open");
	this.$backdrop.remove();
	this.$layout.hide();
	
	this.$element.trigger(afterEvt)
	$(params && params.escape || this.$element.data("ui.modal.escape") || {}).trigger('focus');
}

Modal.prototype.enforceFocus = function(){
	$(document)
		.off('focusin.ui.modal')
		.on('focusin.ui.modal', $.proxy(function(e){
			if(this.$element[0] !== e.target && !this.$element.has(e.target).length){
				this.$element.trigger("focus");
			}
		}, this));
}

$.fn.modal = function(_options, _params){
	return this.each(function(){
		var $this   = $(this),
			data    = $this.data('ui.modal'),
			options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof _options == 'object' && _options);

		if(!data) $this.data('ui.modal', (data = new Modal(this, options)));
		if(typeof _options == 'string') data[_options](_params);
		else if (options.show) data.show(_params);
	});
};

$("body").on("click", ".btn-modal-close", function(e){
	var $modalLayer = $(this).closest(".modal-layout").find(">div:first");
	$modalLayer.modal("hide");
	e.preventDefault();
});

});