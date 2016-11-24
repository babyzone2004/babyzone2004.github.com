# 模拟移动端tap事件

> 提供es6,amd,commonjs,umd版本

## Feature

1. 与IOS,Android点击交互保持一致，点击或长按触发‘tap’事件
2. 粒度小，包括注释不到50行代码
3. Chromium51+版本，默认开启passive:true（[Passive Event Listeners][https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md])，滚动优化，更流畅，效果对比点击[这里](https://rbyers.github.io/scroll-latency.html)

## Getting Started

```shell
$ npm install bTap
```

## API

### attach

| param | 描述                   |
| :---- | :------------------- |
| node  | 传入需要绑定的dom对象，一般是body |

## Usage

```js
//es6:
import * as tap from 'bTap';
var bd = document.body;
tap.attach(bd);
bd.addEventListener('tap', function () {
  console.log('tap fire');
});

//commonjs
var tap = require('bTap/dist/tap-commonjs.js');

//amd umd
...
```

## Sample

http://babyzone2004.github.io/modules/tap/sample/index.html