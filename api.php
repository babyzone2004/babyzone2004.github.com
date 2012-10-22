<?php
	$page=$_GET["page"];
	$object[0] = array("name" => "评论的内容1"); 
	$object[1] = array("name" => "评论的内容2"); 
	$object[2] = array("name" => "评论的内容3"); 
	$object[3] = array("name" => "评论的内容4"); 
	
	$arr = array("pageNum" => 4, "comment" => $object[$page]);
	echo json_encode($arr);
?>
