(function() {
  Yonsei.Modal = {
	  defaultConfig : {
		  hideHeader : true,
		  hideBorder : true
	  },
	  
      alert : function(option) {    	 
        option = $.extend({}, this.defaultConfig, option);
        
        var id = 'modal_' + Math.random().toString(36).substr(2);

        var htmlStr = ['<div class="yonsei-modal modal-popup show ' + (option.modalSize || 'modal-sm') + '" id="' + id + '" style="z-index:1110;">',
        		'<div class="dimed"></div>',
                '<div class="popup-inner">',
                    (option.hideHeader ? '' : '<div class="popup-header">'),
                    (option.hideHeader ? '' : '<h2 class="popup-title">' + (option.title || '알림') + '</h2>'),
                    (option.hideHeader ? '' : '</div>'),
                    '<div class="popup-body ' + (option.hideBorder ? '' : 'popup-body-box') + '">',
                    	'<div class="scroll-inner text-center">',
	                          option.content || '알림입니다.',
                        '</div>',
                    '</div>',
                    '<div class="popup-footer">',
                    	'<div class="text-center">',
                        	'<button type="button" name="closeBtn" class="btn btn-md btn-primary js-layer-close">' + (option.closeText || '닫기') + '</button>',
                        '</div>',
                    '</div>',
                    '<button type="button" name="closeBtn" class="btn btn-close-popup">닫기</button>',
                '</div>',
        '</div>'].join('');
        
        var $alert = $(htmlStr);
        
        $('body').append($alert);
        $alert.find('.popup-body').mCustomScrollbar()
        
        //버튼 콜백있으면 버튼에 할당
        if(option.callback && option.callback.closeBtn) $alert.find('button[name="closeBtn"]').click(option.callback.closeBtn);
        
        //창 열 때 콜백
        if(option.callback && option.callback.openModal) {          
          $alert.on('show-modal', option.callback.openModal);
        }
        
        //창 닫을 때 콜백
        if(option.callback && option.callback.closeModal) {
        	$alert.on('hidden-modal', option.callback.closeModal);
        }
        
        // 다른 모달 제거 여부
        if(option.removeOther == true) {
          $('body > div.yonsei-modal').remove();
        }
        
        return $alert;
      },
      
      confirm : function(option) {
    	option = $.extend({}, this.defaultConfig, option);
        
        var id = 'modal_' + Math.random().toString(36).substr(2);
        
        var htmlStr = ['<div class="yonsei-modal modal-popup show ' + (option.modalSize || 'modal-sm') + '" id="' + id + '" style="z-index:1110;">',
				    		'<div class="dimed"></div>',
				            '<div class="popup-inner">',
				                (option.hideHeader ? '' : '<div class="popup-header">'),
				                (option.hideHeader ? '' : '<h2 class="popup-title">' + (option.title || '확인') + '</h2>'),
				                (option.hideHeader ? '' : '</div>'),
				                '<div class="popup-body ' + (option.hideBorder ? '' : 'popup-body-box') + '">',
				                	'<div class="scroll-inner">',
					                	'<p>',
					                      option.content || '확인입니다.',
					                    '</p>',
				                    '</div>',
				                '</div>',
				                '<div class="popup-footer">',
		                    		'<div class="text-center">',
					                    '<button type="button" name="okBtn" class="btn btn-md btn-primary js-layer-close">' + (option.okText || '확인') + '</button>',
					                    '<button type="button" name="closeBtn" class="btn btn-md btn-default js-layer-close">' + (option.closeText || '취소') + '</button>',
					                '</div>',
				                '</div>',
				                '<button type="button" name="closeBtn" class="btn btn-close-popup">닫기</button>',
				            '</div>',
				        '</div>'].join(''); 
        
        var $confirm = $(htmlStr);
        
        $('body').prepend($confirm);
        $confirm.find('.popup-body').mCustomScrollbar()
        
        //버튼 콜백있으면 버튼에 할당
        if(option.callback && option.callback.closeBtn) $confirm.find('button[name="closeBtn"]').click(option.callback.closeBtn);
        if(option.callback && option.callback.okBtn) $confirm.find('button[name="okBtn"]').click(option.callback.okBtn);
        
        //창 열 때 콜백
        if(option.callback && option.callback.openModal) {
          if(option.removeOther == true) $('body > div.yonsei-modal').remove();
          $confirm.on('show-modal', option.callback.openModal);
        }
        
        //창 닫을 때 콜백
        if(option.callback && option.callback.closeModal) {
          $confirm.on('hidden-modal', option.callback.closeModal);          
        }
        
        // 다른 모달 제거 여부
        if(option.removeOther == true) {
          $('body > div.yonsei-modal').remove();
          $('body > div.modal-backdrop.fade.in').remove();
        }
        
        return $confirm;
      },      
  };
})();