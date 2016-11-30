# canvasser

> 一个渲染精灵对象的底层动画引擎，提供es6,amd,commonjs,umd版本

## Feature

1. 支持高清屏适配
2. 提供精灵对象的渲染和销毁
3. 兼容主流移动系统

## Getting Started

```shell
$ npm install b_cavasor
```

## API

### addSprite

向动画引擎增加精灵对象

| option   | 描述   |
| -------- | :--- |
| `sprite` | 精灵对象 |

### play

播放动画

### stop

暂停动画

## 精灵对象

可以渲染的独立单位，需要提供以下属性，当visible为true，在下次渲染之前该对象会被销毁

```javascript
var sprite = {
  update: function(ctx, fps, stageWidth, stageHeight) {
    console.log(fps);
    this.x++;
    if (this.x > 50) {
      this.visible = false;
    }
  },
  paint: function(ctx, stageWidth, stageHeight) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, 10, 100, 100);
  },
  visible: true
};
```

## Usage

```js
//es6:
var Canvasor = require('b_canvasor');
var domLogo = document.getElementById('logo');
var logo = new Canvasor(domLogo, 360, 360);

var sprite = {
  x: 1,
  update: function(ctx, fps, stageWidth, stageHeight) {
    console.log(fps);
    this.x++;
    if (this.x > 50) {
      this.visible = false;
    }
  },
  paint: function(ctx, stageWidth, stageHeight) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, 10, 100, 100);
  },
  visible: true
};
logo.addSprite(sprite);
logo.play();

//commonjs
var Canvasor = require('canvasor/dist/canvasor-commonjs.js');

//amd umd
...
```

## Sample

http://babyzone2004.github.io/components/canvasor/sample/index.html