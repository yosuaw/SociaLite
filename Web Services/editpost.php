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
    $sql="UPDATE post SET title=?, caption=? WHERE id=?";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param("ssi",$title,$caption,$id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $arr=["result"=>"Post edited successfully!"]; 
    } else {
        $arr=["result"=>"Post edit failed!"];
    }
    echo json_encode($arr);

$stmt->close();
$conn->close();
?>