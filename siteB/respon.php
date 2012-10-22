<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>siteb</title>
</head>
<body>
<p>域：http://localhost/kuayu/siteB/siteb.html</p>
<span>收到参数：</span><input id="param" type="text"  />
<input id="button" type="button" value="延至原域" onclick="gotoLocal()" /><br />
<input  type="button" value="显示父域" onclick="alert(parent.document);" />
<iframe id="local"></iframe><br />
<span>处理结果是：</span>
<input type="text" id="result" /><br />
<script type="text/javascript">
	var local=document.getElementById("local").contentWindow;
	var param=document.getElementById("param");
	var result=document.getElementById("result");
	
	param.value=location.hash.substring(1);
	result.value=param.value+"world";	
	
	function gotoLocal(){
		local.location=result.value;	
	}
</script>
</body>
</html>
