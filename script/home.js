

define(function(require) {
	var $ = jQuery;
	require("./ui/dialog");
	require("./ui/dropdown");
	$("#J-btn").click(function() {
		var str = [];
		str.push('已将 “');
		str.push("appName");
		str.push('” 推送到您的手机<br />请查看手机完成安装。<br />提醒：您需要登录米聊，才可以接收到推送哟');
		str.push('<div class="modal-noremind"><input type="checkbox" id="J-noremind" /><label for="J-noremind">不再提醒我</label></div>');
		$("#dialog-sucessful p").html(str.join(''));
		$("#dialog-sucessful").modal({
			hasClose : false
		});
	});



	require("./ui/accordion").init($('.accordion'));



	require("./ui/star.js").init($('.stars'));
	// $('.stars').on('click-rating', function(e,rating1) {console.log(e,rating1)})
	$('#Jcomment-btn').click(function(e) {
		$.ajax({
			type: 'post',
			url: 'http://localhost/opensource/upload.php',
			data: {
				uid: 1,
				rating: $('#Jstars').val(),
				content: $('#Jcomment-con').val(),
				appId: 1,
				appVersion: 1.21
			},
			success: function(msg) {
				var tmp = $(creatDom());
				$('#Jcomment-list').prepend(tmp);
				var tmpHeight = tmp.height();
				tmp.css({'height': 0, 'opacity': 0, 'overflow': 'hidden'});
				tmp.animate({'height': tmpHeight, 'opacity': 1}, 500);
			}
		});
	});
	function creatDom() {
		var tmp = [];
		tmp.push('<li><div class="comment-wrap"><div><div class="star-rank s3"></div><span>');
		tmp.push('2011年12月31日 1.3.3版');
		tmp.push('</span></div><p><strong>');
		tmp.push('${username}');
		tmp.push('</strong>');
		tmp.push('MIUI相机很好的相机，是在是非常好用，最棒的是可以拍照这一点，远比其他相机好太多了，他们都没法拍照片，另外的好处就是拍照后能存下来，如果存不下来不是白拍了么！');
		tmp.push('</strong></p></div></li>');
		var html = tmp.join('');
		return html;
	}
	



	var su = require("./ui/screenShotUpload").init({
		urls:[],
		maxcount:5,
		self:'su',
		content:'sortableWrap',
		action:'http://localhost/opensource/babyzone-git/test.html'
	});
	window['su'] = su;


	
});