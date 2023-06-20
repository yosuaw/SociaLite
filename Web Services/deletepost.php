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

    $sql0="SELECT id FROM comment WHERE id_post=?";
    $stmt=$conn->prepare($sql0);
    $stmt->bind_param("i",$id);
    $stmt->execute();
    $result = $stmt -> get_result();

    if ($result->num_rows > 0) {
        while ($obj = $result -> fetch_assoc()) {
            $sql1="SELECT id FROM reply WHERE id_comment=?";
            $stmt=$conn->prepare($sql1);
            $stmt->bind_param("i",$obj['id']);
            $stmt->execute();
            $result2 = $stmt -> get_result();

            if ($result2 -> num_rows > 0) {
                while ($obj2 = $result2->fetch_assoc()) {
                    $sql2="DELETE FROM reply WHERE id_comment=?";
                    $stmt=$conn->prepare($sql2);
                    $stmt->bind_param("i", $obj['id']);
                    $stmt->execute();
                }
            }
        }
        
        $sql3="DELETE FROM comment WHERE id_post=?";
        $stmt=$conn->prepare($sql3);
        $stmt->bind_param("i",$id);
        $stmt->execute();
    }

    $sql4="DELETE FROM likes WHERE id_post=?";
    $stmt=$conn->prepare($sql4);
    $stmt->bind_param("i",$id);
    $stmt->execute();

    $sql5="DELETE FROM post WHERE id=?";
    $stmt=$conn->prepare($sql5);
    $stmt->bind_param("i",$id);
    $stmt->execute();

    if(file_exists('images/'.$id.".jpg")) {
        unlink('images/'.$id.".jpg");
    }

    if ($stmt->affected_rows > 0) {
        $arr=["result"=>"Post deleted successfully!"]; 
    } else {
        $arr=["result"=>"Post delete failed!"];
    }
    echo json_encode($arr);

$stmt->close();
$conn->close();
?>