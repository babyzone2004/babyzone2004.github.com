/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
		items_per_page: 1, //每页显示数量
		num_display_entries: 4,  //中间显示数字
		current_page: 0,         //默认的页面数
		num_edge_entries: 3,     //两边的页面数
		link_to: "#",
		prev_text: "上一页",
		next_text: "下一页",
		ellipse_text: "...",
		prev_show_always: true,
		next_show_always: true,
		callback: function(){return false;},

	},opts || {});
	
	return this.each(function() {

		//从选项中提取current_page
		var current_page = opts.current_page;
		//创建一个显示条数和每页显示条数值
		maxentries = (!maxentries || maxentries < 0)? 1 : maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)? 1 : opts.items_per_page;
		//存储DOM元素，以方便从所有的内部结构中获取
		var panel = jQuery(this)
		, pageNum = getPagesNum();
		// 所有初始化完成，初始化绘制
		drawLinks();
        // 回调函数
        opts.callback(current_page, this);

		/**
		 * 计算最大分页显示数目
		 */
		function getPagesNum() {
			return Math.ceil(maxentries / opts.items_per_page);
		}
		/**
		 * 极端分页的起始和结束点，这取决于current_page 和 num_display_entries.
		 * @返回 {数组(Array)}
		 */
		function getInterval() {
			var cenNum = opts.num_display_entries
			, ne_half = Math.ceil(cenNum / 2)
			, upper_limit = pageNum - cenNum
			, start = current_page > ne_half? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0
			, end = current_page > ne_half? Math.min(current_page + ne_half, pageNum) : Math.min(cenNum, pageNum);
			return [start, end];
		}
		
		/**
		 * 分页链接事件处理函数
		 * @参数 {int} page_id 为新页码
		 */
		function pageSelected(page_id, evt){
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		/**
		 * 此函数将分页链接插入到容器元素中
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			// 这个辅助函数返回一个处理函数调用有着正确page_id的pageSelected。
			var getClickHandler = function(page_id) {
				return function(evt){
					return pageSelected(page_id, evt);
				}
			}
			//拼接dom
			var appendItem = function(page_id, appendopts) {
				page_id = page_id < 0? 0 : (page_id < pageNum? page_id : pageNum-1); // 修正page id值
				appendopts = jQuery.extend({text: page_id + 1, classes:""}, appendopts || {});
				var link;
				if(page_id == current_page){
					link = jQuery("<span class='current'>" + (appendopts.text) + "</span>");
				}else{
					link = jQuery("<a href='javascript:'>" + (appendopts.text) + "</a>")
						.on("click", getClickHandler(page_id));		
				}
				if (appendopts.classes) {
					link.addClass(appendopts.classes);
				}
				panel.append(link);
			}
			// 产生"Previous"-链接
			if (current_page > 0 || opts.prev_show_always) {
				appendItem(current_page - 1, {text:opts.prev_text, classes:"prev"});
			}
			// 产生起始点
			if (interval[0] > 0 && opts.num_edge_entries > 0) {
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i = 0; i < end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text) {
					jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(panel);
				}
			}
			// 产生中间链接
			for(var i = interval[0]; i < interval[1]; i++) {
				appendItem(i);
			}
			// 产生结束点
			if (interval[1] < pageNum && opts.num_edge_entries > 0){
				if(pageNum - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
					jQuery("<span>" + opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(pageNum - opts.num_edge_entries, interval[1]);
				for(var i = begin; i < pageNum; i++) {
					appendItem(i);
				}
			}
			// 产生 "Next"-链接
			if(opts.next_text && (current_page < pageNum - 1 || opts.next_show_always)){
				appendItem(current_page+1,{text: opts.next_text, classes: "next"});
			}
		}

	});
}


