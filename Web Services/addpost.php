<?php
    // utk nunjukin error nya
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);    

    header("Access-Control-Allow-Origin: *");  
    $arr=null;
    $conn = new mysqli("localhost", "hybrid_160419015","ubaya","hybrid_160419015");
    //$conn = new mysqli("localhost", "root","","movies_hmp");
    if($conn->connect_error) {
        $arr= ["result"=>"error","message"=>"unable to connect"];
    }
    
    extract($_POST);
    $sql="INSERT INTO post(title,caption,date,username) VALUES(?,?,CURRENT_TIMESTAMP,?)";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param("sss",$title,$caption,$username);
    $stmt->execute();

    if ($stmt->affected_rows) {
	$id = $conn->insert_id;
  	$img = str_replace('data:image/jpeg;base64,', '',$url);
  	$img = str_replace(' ', '+', $img);
  	$data = base64_decode($img);
  	file_put_contents('images/'.$id.'.jpg', $data);
	$url = $id.".jpg";

	$sql="UPDATE post SET image = ? WHERE id = ?";
  	$stmt = $conn->prepare($sql);
  	$stmt->bind_param("si", $url, $id);
  	$stmt->execute();

        $arr=["result"=>"Post successfully added!","id"=>$conn->insert_id]; 
    } else {
        $arr=["result"=>"Add failed!","Error"=>$conn->error];
    }
    echo json_encode($arr);

$stmt->close();
$conn->close();
?>