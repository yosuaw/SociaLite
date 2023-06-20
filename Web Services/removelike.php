<?php
    // utk nunjukin error nya
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);    

    header("Access-Control-Allow-Origin: *");  
    $arr=null;
    $conn = new mysqli("localhost", "hybrid_160419015","ubaya","hybrid_160419015");
    if($conn->connect_error) {
        $arr= ["result"=>"error","message"=>"unable to connect"];
    }

    extract($_POST);
    $sql = "DELETE FROM likes WHERE username = ? AND id_post = ?";
        
    $stmt = $conn->prepare($sql);
    $stmt -> bind_param("si", $username, $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $arr=["result"=>"success"]; 
    } else {
        $arr=["result"=>"fail","Error"=>$conn->error];
    }
    echo json_encode($arr);

$stmt->close();
$conn->close();
?>