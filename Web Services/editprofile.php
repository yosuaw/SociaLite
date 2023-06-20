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
    if(!$status) {
        $sql="UPDATE user SET password = ?, name = ?, email = ?, bio = ? WHERE username = ?";
        $stmt=$conn->prepare($sql);
        $stmt->bind_param("sssss", $password, $name, $email, $bio, $username);
        $result = $stmt->execute();

        if($result) {
            $arr=["result"=>"Profile updated successfully"]; 
        } else {
            $arr=["result"=>"Update failed!","Error"=>$conn->error];
        }
    } else {
        $sql="UPDATE user SET password = ?, name = ?, email = ?, bio = ? WHERE username = ?";
        $stmt=$conn->prepare($sql);
        $stmt->bind_param("sssss", $password, $name, $email, $bio, $username);
        $result = $stmt->execute();

        if($result) {
        $img = str_replace('data:image/jpeg;base64,', '',$image);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
	if(file_exists('images/'.$username.".jpg")) {
        	unlink('images/'.$username.".jpg");
    	}
        file_put_contents('images/'.$username.'.jpg', $data);
        $image = $username.".jpg";

        $sql="UPDATE user SET image = ? WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $image, $username);
        $stmt->execute();

        $arr=["result"=>"Profile updated successfully"]; 
        } else {
            $arr=["result"=>"Update failed!","Error"=>$conn->error];
        }
    }
    echo json_encode($arr);

$stmt->close();
$conn->close();
?>