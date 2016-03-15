define('module/carousel/carousel.js', function(require, exports, module){ /**
 * carousel.js
 * Copyright 2016 babyzone2004
 * Licensed under the MIT License
 */

/**
 * carouse.js
 * require zepto.js
 * @require module/carousel/carousel.css
 * 只接受固定宽度的slide
 */
/**
 * @param {String} slide 滚动的slide
 * @param {String} controlContain 切换按钮
 * @param {String} slideWrap 父容器
 * @param {String} slideCon 自容器
 * @param {Int} reboundDistance 回弹距离
 */
var Carousel = function(opt) {
  opt = $.extend({
    slide: '.J_slide',
    controlContain: '#J_carouselControl',
    slideWrap: '#J_carouselWrap',
    slideCon: '#J_carouselCon',
    reboundDistance: 50
  }, opt);

  // 控制器
  this.$controlItems;
  // 轮播
  this.$slides;
  // 当前slide
  this.curSlide = 0;
  // 组件位移距离
  this.tranSlateX = 0;
  this.slideWidth;
  // 最多显示的slide
  this.maxSlides;
  // 可以位移的最大位置
  this.maxTranslateX;
  // 翻页后回调函数
  this.switchCb = opt.switchCb;

  this.init(opt);
};

Carousel.prototype.init = function(opt) {
  var me = this;
  // 点击时候的X坐标
  var touchStartPageX;
  // 当前触控事件X坐标位移距离
  var detalX;
  // 点击时候的Y坐标
  var touchStartPageY;
  // 当前触控事件Y坐标位移距离
  var detalY;

  // 轮播slideWrap容器
  var $slideWrap = $(opt.slideWrap);
  var slideWrapWidth = $slideWrap.width();

  var $slideCon = me.$slideCon = $(opt.slideCon);
  var $controlContain = $(opt.controlContain);
  var $slides = me.$slides = $slideCon.find(opt.slide);
  // slide总数
  var total = $slides.length;
  var slideWidth = me.slideWidth = $slides.eq(0).width();
  var slidesWidth = slideWidth * (total - 1) + $slides.eq(total - 1).width();
  me.maxSlides = Math.ceil((slideWidth * total) / slideWrapWidth);

  // 生成控制器
  var controlItems = '';
  $slides.each(function(i, elem) {
    controlItems += '<span class="J_carouselIndex" data-index="' + i + '">' + $(elem).data('tab-title') + '</span>';
  });
  me.$controlItems = $(controlItems);
  $controlContain.append(me.$controlItems);
  $controlContain.on('click', '.J_carouselIndex', function(e) {
    me.goto($(this).data('index'));
  });

  // 左右超出的最大边界和最大向左移动的位置
  var leftRebond = opt.reboundDistance;
  var maxTranslateX = me.maxTranslateX = 0 - (slidesWidth - slideWrapWidth);
  var rightRebound = maxTranslateX - leftRebond;

  var startTime;
  var isHorizontal;
  // 每次touch只需判断一次用户行为
  var needJudge;
  // touch事件调用标识，防止多指误操作
  var started = false;

  $slideWrap.on('touchstart', function(e) {
    if (started) {
      return;
    }
    started = true;
    isHorizontal = false;
    needJudge = true;
    console.log("touchstart")
    startTime = Date.now();
    var touches = e.touches[0];
    touchStartPageX = touches.pageX;
    touchStartPageY = touches.pageY;
  });

  $slideWrap.on('touchmove', function(e) {
    if (!started) {
      return;
    }
    // 前5毫秒，先判断用户是否垂直滚动
    if (needJudge && Date.now() - startTime > 5) {
      needJudge = false;
      var touches = e.touches[0];
      detalX = touches.pageX - touchStartPageX;
      detalY = touches.pageY - touchStartPageY;
      if (Math.abs(detalX) > Math.abs(detalY)) {
        isHorizontal = true;
      } else {
        isHorizontal = false;
      }
      console.log("isHorizontal", isHorizontal);
    }

    if (isHorizontal) {
      e.preventDefault();
      detalX = e.touches[0].pageX - touchStartPageX;
      var curTranslatex = me.tranSlateX + detalX;
      if (curTranslatex < leftRebond && curTranslatex > rightRebound) {
        $slideCon.css({
          "-webkit-transform": 'translate3d(' + curTranslatex + 'px, 0px, 0px)',
          "-webkit-transition": 'none'
        });
      }
    }
  });

  /*设置当前的位移值*/
  var setTranSlateX = function() {
    me.tranSlateX = me.tranSlateX + detalX;
    if (me.tranSlateX > 0) {
      me.goto(0);
      return;
    }
    if (me.tranSlateX < maxTranslateX) {
      me.goto(total - 1);
      return;
    }

    curSlide = Math.floor(Math.abs(me.tranSlateX) / slideWidth);

    if (detalX > 0) {
      me.goto(curSlide);
    } else {
      me.goto(curSlide + 1);
    }
  }
  $slideWrap.on('touchend touchcancel', function(e) {
    started = false;
    if (isHorizontal) {
      setTranSlateX();
    }
  });
}

Carousel.prototype.goto = function(num, noTransition) {
  var me = this;
  me.$controlItems.removeClass('selected').eq(num).addClass('selected');

  me.curSlide = num;
  if (num < me.maxSlides) {
    me.tranSlateX = 0 - num * me.slideWidth;
  } else {
    me.tranSlateX = me.maxTranslateX;
  }
  var cssClass = {
    '-webkit-transform': 'translate3d(' + me.tranSlateX + 'px, 0px, 0px)',
    'transform': 'translate3d(' + me.tranSlateX + 'px, 0px, 0px)',
    '-webkit-transition': '-webkit-transform .200s ease-out',
    'transition': '-webkit-transform .200s ease-out'
  };
  if (noTransition) {
    cssClass['-webkit-transition'] = 'none';
    cssClass['transition'] = 'none';
  }
  me.$slideCon.css(cssClass);

  me.switchCb && me.switchCb(num);
}

function carousel(opt) {
  return new Carousel(opt);
}

module.exports = carousel;
 
});