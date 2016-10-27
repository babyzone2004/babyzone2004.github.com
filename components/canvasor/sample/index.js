
// import * as query from '../src/canvasor.js';

var Canvasor = require('../src/canvasor.js');
console.log(Canvasor);
var domLogo = document.getElementById('logo');
var logo = new Canvasor(domLogo, 360, 360);


var sprite = {
	x: 1,
	update: function (ctx, fps, stageWidth, stageHeight) {
		// console.log(fps);
		this.x++;
	},
	paint: function (ctx, stageWidth, stageHeight) {
		// console.log(ctx, stageWidth, stageHeight);
		ctx.fillStyle = 'green';
		ctx.fillRect(this.x, 10, 100, 100);
	},
	visible: true
};
logo.addSprite(sprite);
logo.play();

document.getElementById('stop').onclick = function() {
	logo.stop();
}
document.getElementById('start').onclick = function() {
	logo.play();
}
