
var carousel = require('/assets/js/module/carousel.js');
var tpl = __inline('slide.tpl');

function render (opt) {
  var contain = opt.contain;
  contain.innerHTML = tpl;
  carousel({
    contain: contain
  });
}

exports.render = render;