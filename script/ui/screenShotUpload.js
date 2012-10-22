/*
 * MiuiMarket
 * Copyright xiaomi.com
 * path: screenShotUpload.js
 * author: yangweixian
 * version: 1.1.0
 * date: 2012/8/21
 */
/**
 * 市场应用级联下拉列表
 * @param {array} opts.urls 图片地址数组
 * @param {int} opts.maxcount 最大上传图片数
 * @param {int} opts.maxcount 最大上传图片数
 * @param {string} opts.content 容器
 */
define(function(require, exports) {
	var ScreenshotUpload = function(opts){
		this.urlArr = opts.urls || [];
		this.maxcount = opts.maxcount || 5;
		this.self = opts.self;
		this.content = $('#'+opts.content);
		this.index = this.urlArr.length;
		this.action = opts.action;
		this.init();
	};
	ScreenshotUpload.prototype = {
		init:function(){
			var html = [];
			for(var i=0;i<this.urlArr.length;i++){
			html.push(this.itemTemplete(i,this.urlArr[i]));
			}
			this.content.append('<ul id="sortable"></ul>');
			$("#sortable").prepend('<div id="addFileBtn" class="fileadd"></div>');
			this.content.append('<iframe id="ifr" name="ifr" src="" style="display:none" width="1" height="1"></iframe>');
			this.addFileBtn = $('#addFileBtn');
			if(this.urlArr.length>this.maxcount-1){
			this.addFileBtn.hide();
			}
			$( "#sortable" ).append(html.join(''));
			this.addItem();
		},
		upload:function(obj,n){
			var screeninp = $('#li'+n).find('[name=screen]'); 
			if(screeninp.val()){
				screeninp.val('');
				$('#li'+n).find('.filethumb').remove();
			}
			$('#li'+n).find('.filename').html('载入中...');
			$("#ifr").attr("src", this.action);
			$('#li'+n).find('form').trigger('submit');
			this.addItem();
		},
		setScreenshot:function(n,src){
			if(src) {
				$('#li'+n).find('.filethumb-con').html('<img class="filethumb" src="'+src+'" width="100" height="166">');
				$('#li'+n).find('[name=screen]').val(src);
				$('#li'+n).removeClass("current");
			} else {
				$('#li'+n).find('.filename').html('上传失败');
				$('#li'+n).removeClass("current");
			}
		},
		itemTemplete:function(i,imgsrc){
			var html = [];
			html.push('<li id="li'+i+'" class="current" >');
			html.push('<div class="filename"></div>');
			html.push('<div class="filethumb-con">');
			if(imgsrc) {html.push('<img class="filethumb" src="'+imgsrc+'" width="100" height="166">');}
			html.push('</div>');
			html.push('<input type="hidden" name="screen" value="'+(imgsrc||'')+'">');
			html.push('<a class="filebtn" href="#">浏览图片</a>');
			html.push('<form action="'+this.action+'" target="ifr" method="post" enctype="multipart/form-data">');
			html.push('<input type="file" accept="image/*" name="screenshot'+i+'" class="file" size="28" onchange="'+this.self+'.upload(this,'+i+')">');
			html.push('<input type="hidden" name="index" value="'+i+'">');
			html.push('<input type="hidden" name="instance" value="'+this.self+'">');
			html.push('<input type="hidden" name="method" value="setScreenshot">');
			html.push('</form>');
			html.push('<a class="filedel" href="#" onclick="'+this.self+'.delItem('+i+');return false;">删除</a>');
			html.push('</li>');
			return html.join('');
		},
		getItemCount:function(){
			return $("#sortable li").length;
		},
		updateAddBtnStatus:function(){
		if(this.getItemCount()>this.maxcount-1){
			this.addFileBtn.hide();
		} else {
			this.addFileBtn.show();
		}
		},
		addItem:function(){
			$( "#sortable" ).append(this.itemTemplete(this.index++));
			this.updateAddBtnStatus();
		},
		delItem:function(n){
			$( "#li" +n ).remove();
			this.updateAddBtnStatus();
		}
	}
	exports.init = function(opts) {
		return new ScreenshotUpload(opts);
	}
})
