
/**
* dialog对话框
* author: yangweixian
* version: 1.1.0
* date: 2012/6/28
* 实现提示，警告等对话框的功能
* @param   {Object} 对话框配置功能
* @event  {event}  触发show, shown, hide, hidden四种事件
*/


define(function(require, exports) {
	var Modal = function (content, options) {
		this.options = options;
		var dialog = $(content);
		this.$element = dialog.delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));
		//右上角是否添加关闭按钮
		if(this.options.hasClose){
			dialog.find(".modal-header").prepend('<a href="#" class="close" data-dismiss="modal">×</a>');
		}
	}


	Modal.prototype = {
		constructor: Modal
		, toggle: function () {
			return this[!this.isShown ? 'show' : 'hide']()
		}
		, show: function () {
			var that = this, e = $.Event('show');
			this.$element.trigger(e);
			if (this.isShown || e.isDefaultPrevented()) return;
			//是否自动关闭
			if(this.options.autoCloseTime){
				autoClose.call(this);
			}
			this.isShown = true;
			backdrop.call(this, function () {
				that.$element.show();
				that.$element.trigger('shown');
			})
		}
		, hide: function (e) {
			e && e.preventDefault();
			e = $.Event('hide');
			this.$element.trigger(e);
			if (!this.isShown || e.isDefaultPrevented()) return;
			this.isShown = false;
			hideModal.call(this);
			if(this.timeHandler){
				clearInterval(this.timeHandler);
				this.$element.find(".resume").remove();
			}
		}
	}


	function autoClose(){
		var that = this;
		var _autoCloseTime = this.options.autoCloseTime;
		var dialog = this.$element;//对话框dom
		dialog.find("#J-autoclose").append('<span class="resume">(' + _autoCloseTime + ')</span>');
		that.timeHandler = setInterval(function(){
			_autoCloseTime--;
			if(_autoCloseTime > 0){
				$('.resume').text("("+ _autoCloseTime + ")");
			}else{
				that.hide();
			}
		}, 1000)
	}


	function hideModal() {
		this.$element.hide().trigger('hidden');
		backdrop.call(this);
	}


	function backdrop(callback) {
		if (this.isShown && this.options.backdrop) {
			this.$backdrop = $('<div class="modal-backdrop" />').appendTo(document.body);
			if($.browser.version == 6.0){
				this.$backdrop.width($(window).width()).height($(document).height());
			}
			if (this.options.backdrop != 'static') {
				this.$backdrop.click($.proxy(this.hide, this));
			}
			callback();
		} else if (!this.isShown && this.$backdrop) {
			removeBackdrop.call(this);
		} else if (callback) {
			callback();
		}
	}


	function removeBackdrop() {
		this.$backdrop.remove();
		this.$backdrop = null;
	}


	//设置是否自动关闭
	//data为Modal
	$.fn.modal = function (option) {
		return this.each(function () {
			var $this = $(this), data = $this.data('modal')
			, options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('modal', (data = new Modal(this, options)));
			if (typeof option == 'string') data[option]();
			else if (options.show) data.show();
		})
	}


	//默认背景点击不关闭
	$.fn.modal.defaults = {
		backdrop: "static"
		, show: true
		, hasClose: true
		, autoCloseTime: 0
	}
	$.fn.modal.Constructor = Modal;

	
	$(function () {
		$('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
			var $this = $(this), href
			, $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
			, option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data());
			e.preventDefault();
			$target.modal(option);
		})
	})
});
