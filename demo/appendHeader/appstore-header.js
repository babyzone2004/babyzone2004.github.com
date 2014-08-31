/**
 * file: header.js
 * ver: 0.0.1
 * auth: yangweixian@xiaomi.com
 * date: 11:48 2014/8/25
 */
(function() {
  var headerDom = document.createElement("div");
  var bd = document.body;
  headerDom.className = "head";

  var str = [];
  str.push('<div class="head"><a href="/" class="logo">小米开发者站</a><div class="head-right"><ul class="head-nav">');
  // 菜单栏
  str.push('<li><a href="/" class="active">应用管理</a></li>');
  str.push('<li><a href="http://developer.xiaomi.com/doc/" target="_blank">文档</a></li>');
  str.push('<li><a href="http://www.miui.com/forum-423-1.html" target="_blank">开发者论坛</a></li>');
  str.push('</ul><div class="login">');

  // 如果已经登录显示
  str.push('<div class="login-dropdown"><div class="login-user"><span class="user-name">');
  str.push('babyzone'); //登录的名字
  str.push('</span><span class="caret"></span></div><ul class="login-menu">');
  str.push('<li><a href="/user">资料修改</a></li>');
  str.push('<li><a href="/logout">注销</a></li>');
  str.push('</ul></div>');

  // 未登录显示
  // str.push('<div class="login-regist"><a href="/login">登录</a><span class="head-divide">|</span><a href="https://account.xiaomi.com/pass/register">注册</a></div>');
  
  str.push('</div></div></div>');

  headerDom.innerHTML = str.join('');
  bd.insertBefore(headerDom, bd.firstChild);

  // 插入css内容
  var css = 'html,body{margin:0;padding:0}.head{background-color:#262626;box-shadow:0 2px 3px rgba(2,2,2,0.15);background-image:-webkit-linear-gradient(bottom,#2c2e30,#37393c);background-image:linear-gradient(to top,#2c2e30,#37393c);font-family:"Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;color:#fff;height:60px;position:relative}.head a{color:#fff;text-decoration:none}.head ul{list-style:none}.head-right{float:right}.head-nav{float:left;padding:0 0 0 56px;margin:0 36px 0 0}.head-nav li{float:left}.head-nav li a{display:inline-block;padding:0 23px;line-height:60px;font-size:16px;margin-right:1px}.head-nav li a.active{background:#f60}.logo{text-indent:-9999px;display:block;float:left;width:206px;height:40px;margin:10px 0 0 33px;background:url(http://resource.xiaomi.net/miuimarket/dev/v2/logo1.png) 0 0 no-repeat}.login{position:relative;display:inline-block;height:60px;margin:0 30px 0 25px;width:146px}.login-user{height:60px;padding:0 12px;cursor:pointer;color:#919191}.login-dropdown:hover .caret{opacity:1;-webkit-transform-origin:50% 50%;-webkit-transform:rotate(180deg);transform-origin:50% 50%;transform:rotate(180deg)}.login-dropdown:hover .login-user{color:#fff}.login-dropdown:hover .login-menu{display:block}.login-dropdown{display:inline-block;height:60px}.login-dropdown span{line-height:60px;vertical-align:middle}.user-name{display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:103px;text-align:right;margin-right:6px}.login-menu{display:none;position:absolute;width:140px;top:60px;right:0;margin:0;padding:3px 0;background:#262626;position:absolute;border:1px solid #ccc;border-top:0;border-radius:5px;box-shadow:0 5px 10px rgba(0,0,0,0.2);background-clip:padding-box;border-top-left-radius:0;border-top-right-radius:0}.login-menu a{display:block;padding:7px 18px;text-align:center}.login-menu a:hover{background:#f60}.login .caret{display:inline-block;width:0;height:0;border-top:4px solid #fff;border-right:4px solid transparent;border-left:4px solid transparent;content:"";opacity:.6;-webkit-transition:-webkit-transform .3s ease;transition:transform .3s ease}.login-regist{float:right}.login-regist a{margin:0 10px 0 0;line-height:60px;vertical-align:middle}.head-divide{margin:0 10px 0 0;line-height:60px;vertical-align:middle;color:#acaaaa}';
  var style = document.createElement("style");
  style.type = "text/css";
  try {
    style.appendChild(document.createTextNode(css));
  } catch(ex) {
    style.styleSheet.cssText = css;
  }
  
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
})()