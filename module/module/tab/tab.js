/**
 * Copyright 2016 babyzone2004
 * Licensed under the MIT License
 */

/**
 * Tab.js 给符合条件的dom附件tab交互
 * @param {[type]}
 */
function Tab(opt) {
  var opt = $.extend({
    tab: '.J_tab',
    tabInner: '.J_tabInner'
  }, opt);
  var me = this;
  this.$tab = $('.J_tab');
  this.$tabs = $('.J_tab span');
  this.total = this.$tabs.length;
  this.tabWidth = $(opt.tab).width();
  this.tabInnerWidth = $(opt.tabInner).width();
  console.log(this.tabWidth, this.tabWidth);
  $(opt.tab).on('click', 'span', function(e) {
    me.goto($(this).data('index'));
  });
}

Tab.prototype.goto = function(index) {
  var offsetLeft;
  this.$tabs.removeClass('selected');
  var $curTab = this.$tabs.eq(index).addClass('selected');
  var $nextTab = this.$tabs.eq(index + 1);
  var $prevTab = this.$tabs.eq(index - 1);
  var tabWidth = this.tabWidth;

  if (index === 0) {
    offsetLeft = 0;
  } else if (index === this.total - 1) {
    offsetLeft = this.tabInnerWidth - tabWidth;
  } else if ($nextTab.position().left + $nextTab.width() > tabWidth) {
    offsetLeft = $nextTab.position().left - tabWidth + $nextTab.width();
  } else if ($prevTab.position().left < 0) {
    offsetLeft = $prevTab.position().left;
  } else {
    return;
  }
  var curOffsetLeft = this.$tab.scrollLeft();
  this.$tab.scrollLeft(curOffsetLeft + offsetLeft);
}

module.exports = Tab;
