/**
* Accumulate 数字展示器
* author: yangweixian
* @description: 展示一个可以根据输入刷新的数字，将数字分为span
*/
define(function(require) {
  /**
  * @param {JQuery} container 包含数字的容器
  * @param {int} num 要展示的数字
  */
  var accumelate = function(container, num) {
    var nums = num.toString().split("").reverse();
    container.empty();
    for (var i = 0, ii = nums.length; i < ii; i++) {
        var singleNum = nums[i];
        if (i != 0 && i % 3 === 0) {
            container.prepend("<span class='accumulate-dot'></span>");
        }
        container.prepend("<span class=accumelate-num-" + singleNum + ">" + singleNum + "</span>");
    };
  }
  return accumelate;
})