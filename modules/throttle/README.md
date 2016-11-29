# throttle 截流函数

> 提供es6,amd,commonjs,umd版本

## Getting Started

```shell
$ npm install b_throttle
```

## Param

| param       | 描述                                       |
| :---------- | :--------------------------------------- |
| fn          | 传入需要截流的函数                                |
| time        | 间隔执行时间，单位是毫秒                             |
| immediately | 是否需要立即执行一次，像lazyload这种情况，没必要设置true。如果开启，最后一次执行可能会被setTimeout abort掉 |

## Usage

```js
//es6:
import {throttle} from '../src/throttle.js';
document.getElementById('btn').addEventListener('click', throttle(function() {
  console.log('连续点击，只会每隔1000毫秒执行一次');
}, 1000, true));

//commonjs
var tap = require('bTap/dist/throttle-commonjs.js');

//amd umd
...
```

## Sample

http://babyzone2004.github.io/modules/throttle/sample/index.html 