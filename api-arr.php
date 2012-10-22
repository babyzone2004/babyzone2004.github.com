<?php
	$object[0] = array("name" => "白色", "order" => 14); 
	$object[1] = array("name" => "黑色", "order" => 11); 
	$object[2] = array("name" => "愤怒的小鸟", "order" => 19); 
	$object[3] = array("name" => "蓝色", "order" => 64); 
	$object[4] = array("name" => "喝死", "order" => 34); 
	$object[5] = array("name" => "百度", "order" => 44); 
	$object[6] = array("name" => "百度", "order" => 24); 
	$object[7] = array("name" => "搜狗", "order" => 94); 
	$object[8] = array("name" => "淘宝", "order" => 61); 
	$object[9] = array("name" => "奇异", "order" => 62); 
	$object[10] = array("name" => "百度", "order" => 66); 
	
	$arr = array("pageNum" => count($object), "comment" => $object);
	echo json_encode($arr);
?>
