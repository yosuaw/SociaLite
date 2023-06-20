<?php
    // utk nunjukin error nya
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);   

    header("Access-Control-Allow-Origin: *");
    $c = new mysqli("localhost", "hybrid_160419015","ubaya","hybrid_160419015");
    if($c->connect_error) {
        $arr= ["result"=>"error","message"=>"unable to connect"];
    }

    extract($_POST);
	$sql = "INSERT INTO reply(id_comment, username, comment) VALUES (?, ?, ?)";
    $stmt = $c -> prepare($sql);
    $stmt -> bind_param("iss", $id, $username, $comment);
    $stmt -> execute();
    
    if ($stmt->affected_rows > 0) {
        $arr=["result"=>"success"]; 
    } else {
        $arr=["result"=>"fail","Error"=>$c->error];
    }
	echo json_encode($arr);

	$stmt->close();
	$c->close();
?>
