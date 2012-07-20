$.fn.extend({
  pSlide : function(slidHeight) {
    $(this).each(function(){
      var _this = $(this), conHeight = $(this).height(), oriWidth = _this.width();
      _this.css({
        overflow : "hidden",
        height : slidHeight
      });
      var conWidth = _this.width();
      var slidBtn = $("<a href='javascript:' class='sliddown'><span class='slide-text'>展开全文</span><span class='caret'></span></a>");
      _this.after(slidBtn);
      if (conHeight <= slidHeight) {
        slidBtn.hide();
      }
      slidBtn.toggle(
        function() {
          _this.css({
            "height" : "auto"
          });
          $(this).find(".slide-text").text("收起全文");
          $(this).addClass("open");
        },
        function() {
          _this.delay(500).css({
            "height" : slidHeight
          });
          $(this).find(".slide-text").text("展开全文");
          $(this).removeClass("open");
        }
      )
    });
  }
});
$(".pslide").pSlide(40);