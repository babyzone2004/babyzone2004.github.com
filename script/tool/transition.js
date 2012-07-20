
/**
* transition
* author: yangweixian
* version: 1.1.0
* date: 2012/7/20
* 判断浏览器是否带有css动画功能
* @param   {Object} 对话框配置功能
* @event   
*/


define(function(require, exports) {
	exports.transition = function () {
	  var transitionEnd = (function () {
		var el = document.createElement('bootstrap')
		  , transEndEventNames = {
			   'WebkitTransition' : 'webkitTransitionEnd'
			,  'MozTransition'    : 'transitionend'
			,  'OTransition'      : 'oTransitionEnd'
			,  'msTransition'     : 'MSTransitionEnd'
			,  'transition'       : 'transitionend'
			};

		for (var name in transEndEventNames){
		  if (el.style[name] !== undefined) {
			return transEndEventNames[name]
		  }
		}

	  }());

	  return transitionEnd && {
		end: transitionEnd
	  }

	}
});
