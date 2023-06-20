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

    $sql = "SELECT username, name, image FROM user";
    $result = $conn->query($sql);
    $data = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $arr=["result"=>"success", "data" => $data]; 
    } else {
        $arr=["result"=>"fail","Error"=>$conn->error];
    }
    echo json_encode($arr);

$conn->close();
?>