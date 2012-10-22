/**
 * Star.js
 */
define(function(require, exports) {
	//rating：标记的评分
	var rating = 0, lis = [];
	var hover = {
		mouseenter : function(e){
			var _this = $(this);
			lis.removeClass('hover');
			_this.addClass('hover');
			_this.prevAll().addClass('hover');
		},
		mouseleave : function(e){
			lis.removeClass('hover');
			resetRating();
		}
	};
	function resetRating() {
		if (rating > 0) {
			lis.slice(0, rating).addClass('hover');	
		}
	}
	exports.init = function(panel) {
		panel.on(hover, 'a');
		lis = panel.find('a');
		var ratingIpt = $('.stars input');
		rating = ratingIpt.val();
		resetRating();
		lis.each(function(i, elem) {
			var _this = $(this);
			_this.click(function(e) {
				rating = i + 1;
				ratingIpt.val(rating);
				panel.trigger('click-rating',[rating]); //触发评分事件
			});
		})
	}
})