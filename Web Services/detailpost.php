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
	$sql1 = "SELECT * FROM post WHERE id = ?";
    $stmt = $c->prepare($sql1);
	$stmt->bind_param("i", $id);
    $stmt->execute();
    $result1 = $stmt->get_result();

    $post = array();

	if ($result1 -> num_rows > 0) {
        while ($obj = $result1->fetch_assoc()) {
            $sql2 = "SELECT COUNT(username) as jumlah FROM likes WHERE id_post = ?";
            $stmt = $c->prepare($sql2);
            $stmt -> bind_param("i", $id);
            $stmt->execute();
            $result2 = $stmt -> get_result();
            $row = $result2->fetch_assoc();

            $sql3 = "SELECT * FROM likes WHERE id_post = ? AND username = ?";
            $stmt = $c->prepare($sql3);
            $stmt -> bind_param("is", $id, $username);
            $stmt->execute();
            $result3 = $stmt -> get_result();

            $post[0]['id'] = addslashes(htmlentities($obj['id']));
            $post[0]['title'] = addslashes(htmlentities($obj['title']));
            $post[0]['caption'] = addslashes(htmlentities($obj['caption']));
            $post[0]['username'] = addslashes(htmlentities($obj['username']));
            $post[0]['image'] = addslashes(htmlentities($obj['image']));
            $newDate = date("d M Y", strtotime(addslashes(htmlentities($obj['date']))));
            $post[0]['date'] = $newDate;
            $post[0]['like'] = $row['jumlah'];
		
            if($result3 -> num_rows > 0) {
                $post[0]['status'] = 1;
            } else {
                $post[0]['status'] = 0;
            }

	    $sql4 = "SELECT image FROM user WHERE username = ?";
            $stmt = $c->prepare($sql4);
            $stmt -> bind_param("s", $post[0]['username']);
            $stmt->execute();
            $result4 = $stmt -> get_result();
	    $row = $result4->fetch_assoc();
	    $post[0]['profilepic'] = $row['image'];

        }
        
    } else {
        $post = ['result' => 'failed', "message" => "Connection Error!"];		
	}

	echo json_encode($post);

	$stmt->close();
	$c->close();
?>