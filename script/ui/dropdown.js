/**
* dropdown下拉菜单
* author: yangweixian
* version: 1.1.0
* date: 2012/6/28
* @description:   data-toggle="dropdown"
*/
define(function(require, exports) {
	var elem = '[data-toggle="dropdown"]'; 
	function toggle(e) {
		var target = $(e.target),
		parent = target.parent(),
		isActive = parent.hasClass("open");
		//先清除所有的下拉菜单
		clearMenus();
		if(!isActive) {
			parent.toggleClass('open');
		}
		e.stopPropagation();
		$('html').on('click.dropdown.data-api', function() {
			clearMenus();
		})
	}
	function clearMenus() {
		$(elem).parent().removeClass('open')
	}
	$(function() {
		$('body').on('click.dropdown.data-api', elem, toggle);
	})
});
 
