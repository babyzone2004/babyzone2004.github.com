

define(function(require) {
	require("./ui/dialog");
	require("./ui/dropdown");
	$("#J-btn").click(function() {
		$("#dialog-sucessful").modal({
			hasClose : false,
			autoCloseTime : 5
		});
	});

	require("./ui/accordion").init($('.accordion'));


});