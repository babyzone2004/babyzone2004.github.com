/**
* 排序
* author: yangweixian
* version: 1.1.0
* date: 2012/9/27
* 对数据进行排序
*
*/

define(function(require, exports) {

	function sortByDown (a, b) {
		return a - b;
	}

	function sortByUp (a, b) {
		return b - a;
	}

	exports.sortByDict = function(panel) {
		data.sort();
	}

	exports.sortByDown = function(data) {
		data.sort(sortByDown);
	}

	exports.sortByUp = function(data) {
		data.sort(sortByUp);
	}
})