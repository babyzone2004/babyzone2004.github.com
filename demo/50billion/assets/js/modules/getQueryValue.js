/**
* game getQueryValue
* @description: 获取query值
* author: yangweixian
*/
define(function(require) {
  var getQueryValue = function (name) {
    var arrHash = location.search.slice(1).split('&')
      , oHash = {};
      for(var i = 0, ii = arrHash.length; i < ii; i++) {
        var arrTmp = arrHash[i].split('=');
        oHash[arrTmp[0]] = arrTmp[1];
      }
      return oHash[name];
  };
  return getQueryValue;
})