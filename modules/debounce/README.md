# throttle 截流函数

> 提供es6,amd,commonjs,umd版本

## Getting Started

```shell
$ npm install b_debounce
```

## Param

| param | 描述                |
| :---- | :---------------- |
| fn    | 实际要执行 debounce的函数 |
| delay | 延迟时间，单位是毫秒        |

## Usage

```js
//es6:
import {debounce} from 'b_debounce';
document.getElementById('btn').addEventListener('click', debounce(function() {
  console.log('在设置的时间内连续的点击，只会执行一次');
}, 300));

//commonjs
var tap = require('bTap/dist/debounce-commonjs.js');

//amd umd
...
```

## Sample

http://babyzone2004.github.io/modules/debounce/sample/index.html 