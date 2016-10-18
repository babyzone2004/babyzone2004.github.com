/*
 * require zepto 
 * 轮播
 * description:只接受固定宽度的slide
 * example:
    <div id="J_carousel" class="carousel">
       <div class="J_slidContain carousel-con">
         <div class="J_slide carousel-item" data-tab-title="1">
           <img src="http://file.market.xiaomi.com/thumbnail/jpeg/l300/AppStore/0b5a15e1adc466b68744bb683fb12b1f8194064a5">
         </div><div class="J_slide carousel-item" data-tab-title="2">
           <img src="http://file.market.xiaomi.com/thumbnail/jpeg/l300/AppStore/0b5a15e1a8c463b68b44b56837b12d1f8794064a5">
         </div>
       </div>
       <div class="J_carouselControl carousel-control"></div>
     </div>
*/

var Carousel = function (opt) {
  opt = $.extend({
    slide: '.J_slide',
    controlContain: '.J_carouselControl',
    slidContain: '.J_slideContain',
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

  this.init(opt);
};

Carousel.prototype.init = function(opt) {
  var me = this;
  // 点击时候的X坐标
  var touchStartPageX;
  // 当前触控事件位移距离
  var detalX;
  var $contain = $(opt.contain);
  // 轮播slide容器
  var $slidContain = $contain.find(opt.slidContain);
  var $controlContain = $(opt.controlContain);
  var $slides = me.$slides = $contain.find(opt.slide);
  // slide总数
  var total = $slides.length;
  var slideWidth = me.slideWidth = $slides.eq(0).width();
  var slidesWidth = slideWidth * (total - 1) + $slides.eq(total - 1).width();
  var slideContainWidth = $slidContain.width();
  me.maxSlides = Math.ceil((slideWidth * total) / slideContainWidth);
  
  var controlItems = '';
  $slides.each(function(i, elem) {
    controlItems += '<a href="javascript:;" data-index="' + i + '">' + $(elem).data('tab-title') + '</a>';
  });

  var leftRebond = opt.reboundDistance;
  var maxTranslateX = me.maxTranslateX = 0 - (slidesWidth - slideContainWidth);
  var rightRebound = maxTranslateX - leftRebond;

  me.$controlItems = $(controlItems);
  $controlContain.append(me.$controlItems);

  $slidContain.on('touchstart', function(e) {
    touchStartPageX = e.touches[0].pageX;
  });
  $slidContain.on('touchmove', function(e) {
    detalX = e.touches[0].pageX - touchStartPageX;
    $slides.each(function(i, elem) {
      var curTranslatex = me.tranSlateX + detalX;
      if(curTranslatex < leftRebond && curTranslatex > rightRebound) {
        $(elem).css({
          transform: 'translate3d(' + curTranslatex + 'px, 0px, 0px)',
          transition: 'none'
        });
      }
    });
  });

  /*设置当前的位移值*/
  var setTranSlateX = function() {
    me.tranSlateX = me.tranSlateX + detalX;
    if(me.tranSlateX > 0) {
      me.goto(0);
      return;
    }
    if(me.tranSlateX < maxTranslateX) {
      me.goto(total - 1);
      return;
    }
    
    curSlide = Math.floor(Math.abs(me.tranSlateX) / slideWidth);

    if(detalX > 0) {
      me.goto(curSlide);
    } else {
      me.goto(curSlide + 1);
    }
  }

  $slidContain.on('touchend', function(e) {
    setTranSlateX();
  });
  $slidContain.on('touchcancel', function(e) {
    setTranSlateX();
  });
  
  me.goto(0);
  me.addControEvent($controlContain);
}

Carousel.prototype.addControEvent = function($controlContain) {
  var me = this;
  $controlContain.on('click', 'a', function(e) {
    me.goto($(this).data('index'));
  });
}

Carousel.prototype.goto = function(num) {
  var me = this;
  me.$controlItems.removeClass('selected').eq(num).addClass('selected');
  me.curSlide = num;
  if(num < me.maxSlides) {
    me.tranSlateX = 0 - num * me.slideWidth;
  } else {
    me.tranSlateX = me.maxTranslateX;
  }
  me.$slides.each(function(i, elem) {
    $(elem).css({
      transform: 'translate3d(' + me.tranSlateX + 'px, 0px, 0px)',
      transition: 'transform .200s ease'
    })
  });
}

function carousel(opt) {
  return new Carousel(opt);
}

module.exports = carousel;