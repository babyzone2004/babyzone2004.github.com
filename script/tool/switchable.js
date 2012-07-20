
/**
* switchable
* author: yangweixian
* version: 1.1.0
* date: 2012/7/19
* 各种slide类组件的切换功能
* @param   {Array} lis
* @event  {event}  
*/
define(function(require, exports) {
	var Switchable = function(lis) {
		this.lis = lis;
		this.total = lis.length;
		this.e = {
			total: lis.length
		}
	}


	Switchable.prototype = {
		on: function(type, fn) {
			var events = this.events = this.events || {}; //绑定this事件
			events[type] = events[type] || {};
			events[type][fn] = fn;
		},
		trigger: function(type, e) {
			var events = this.events || {};
			if (events[type]) {
				var fns = events[type]; //取得绑定的回调函数
				for(var i in fns) {
					fns[i] instanceof Function && fns[i](e);
				}
			}
		},
		switchTo: function(cur) {
			var e = this.e;
			e.oldCur = e.cur;
			e.cur = cur;
			this.trigger('afterSwitch', e);
		},
		next: function() {
			this.e.oldCur = cur;
			switchTo(cur++);
		},
		prev: function() {
			this.e.oldCur = cur;
			switchTo(cur--);
		}
	}

	exports.init = function(config) {
		var switchable = new Switchable(config);
		return switchable;
	}

});
