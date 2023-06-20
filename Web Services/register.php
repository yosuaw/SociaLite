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
    $sql = "SELECT username FROM user WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt -> bind_param("s", $username);
    $stmt->execute();
    $result = $stmt -> get_result(); 

    if ($result -> num_rows > 0) {
        $arr = ['result' => 'failed', "message" => "Username already exist!"];
    } else {
        $sql = "INSERT INTO user VALUES (?,?,?,?,'','')";
        $stmt = $conn->prepare($sql);
        $stmt -> bind_param("ssss", $username, $password, $name, $email);
        $stmt->execute();
        $result = $stmt -> get_result(); 

        $arr = ['result' => 'success', "message" => "Registration success!"];
    }
    echo json_encode($arr);

$stmt->close();
$conn->close();
?>