/**
 * Accordion
 */
define(function(require, exports) {
	var transition = require('../tool/transition');
	exports.init = function(panel) {
		var lis = panel.find('.accordion-con');
		var btns = panel.find('h3');
		var switchable = require("../tool/switchable").init(lis);

		switchable.on('afterSwitch', function(e) {
			//如果当前点击已经打开，退出
			if(e.oldCur != undefined && e.oldCur == e.cur){
				return;
			}
			if(transition) {
				lis.eq(e.cur).addClass('open');
				if(e.oldCur != undefined){
					lis.eq(e.oldCur).removeClass('open');
				}
			}else{
				lis.eq(e.cur).stop(1, 1).animate({'height': '60px'}, 300);	
				if(e.oldCur != undefined){
					lis.eq(e.oldCur).stop(1, 1).animate({'height': '0'}, 300);
				}
			}
		});

		btns.each(function(i, elem) {
			$(this).click(function() {
				switchable.switchTo(i);
			})
		});
	}
})
