# 图片懒加载 lazyload

> 提供es6,amd,commonjs,umd版本

## Feature

1. 只会在缓存dom节点的时候一次性读取位置信息，更高效
2. 提供window或者dom节点的滚动监控
3. 支持横向滚动监控
4. 不会出现加载失败的图片，加载失败的图片支持再次加载，直到成功
5. 支持高性能模式：小图片立即加载，大图片请求前置，渲染后置

## Getting Started

```shell
$ npm install b_lazy
```

### Constructor

| param          | 描述                                   |
| :------------- | :----------------------------------- |
| handler        | 滚动的容器                                |
| selector       | 被监控的元素selector,被cache后，这个selector会被删除 |
| buffer         | 上下buffer                             |
| interval       | throttle的时间间隔                        |
| fadeIn         | 是否渐现                                 |
| bufferWidth    | 左右buffer                             |
| loadImmdiately | 是否立即加载非lazy=1的图片，需要设置dom的data-lazy=1 |

## API

### cacheImg

将新的元素更新到缓存中

### addExtralHandler

增加横向滚动的监听

| param     | 描述           |
| :-------- | :----------- |
| container | 监听横向滚动的dom容器 |



### updateCache

更新缓存元素的位置信息，通常页面位置发生变化后需要执行此操作

### clearMemory

根据提供的top和bottom，清除这一高度区域的缓存

| param  | 描述          |
| :----- | :---------- |
| top    | 元素顶部相对页面的高度 |
| bottom | 元素底部相对页面的高度 |

### updateContainSize

更新容器尺寸，通常容器发生改变执行此操作

### clearElemMemory

删除某个元素的缓存

### getScrollTop

获取页面滚动高度

## Usage

需要实现lazyload-show和lazyload-fadein的css，示例

```css
.lazyload {
  opacity: 0;
}
.lazyload-show {
  opacity: 1;
}
.lazyload-fadein {
  position: relative;
  z-index: 1;
  transition: opacity .2s ease-in;
  opacity: 1;
}
```

```js
//es6:
function id(name) {
  return document.getElementById(name);
}

import {Lazyload} from 'b_lazyload';

var lazyload = new Lazyload({
  extralHandler: id('J_scroll'),
  loadImmdiately: true
});
lazyload.cacheImg();
lazyload.addExtralHandler(id('J_scroll1'));

//commonjs
var Lazyload = require('b_lazyload/dist/lazyload.js').Lazyload;

//amd umd
...
```

## Sample

http://babyzone2004.github.io/modules/lazyload/sample/index.html