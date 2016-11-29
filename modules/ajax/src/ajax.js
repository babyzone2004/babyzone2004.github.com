/**
 * ajax.js 
 * @author babyzone2004
 * 
 * @param url {String} url
 * @param type {String} GET | POST
 * @param data {Object} 传输的数据
 * @param success {Function} 成功回调
 * @param error {Function} 失败回调
 * @param withCredentials {Boolean} 跨域参数
 * 
 * @return {xhr} 
 */

var serializeParam = function(param) {
  if (!param) return '';
  var s = [];
  for (var key in param) {
    s.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]));
  }
  return s.join('&');
};

var ajax = function(option) {
  var o = option;
  var m = o.type.toLocaleUpperCase();
  var isPost = 'POST' == m;
  var isComplete = false;
  var timeout = o.timeout;
  var withCredentials = o.withCredentials; //跨域ajax
  var xhr = new XMLHttpRequest();
  var qstr = serializeParam(o.data);
  var url = o.url;
  !isPost && (url += (url.indexOf('?') > -1 ? '&' : '?') + qstr);

  xhr.open(m, url, true);
  if (withCredentials) xhr.withCredentials = true;

  isPost && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var timer = 0;

  xhr.onreadystatechange = function() {
    if (4 == xhr.readyState) {
      var status = xhr.status;
      if ((status >= 200 && status < 300) || status == 304) {
        var response = xhr.responseText;
        var json = null;
        try {
          json = JSON.parse(response);
        } catch (e) {
          throw (e);
        }
        o.success && o.success(json, xhr);
      } else {
        o.error && o.error(xhr.statusText);
      }
      isComplete = true;
      if (timer) {
        clearTimeout(timer);
      }
    }
  };

  xhr.send(isPost ? qstr : void(0));

  if (timeout) {
    timer = setTimeout(function() {
      if (!isComplete) {
        xhr.abort();
      }
    }, timeout);
  }

  return xhr;
};

export {
  ajax
};