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
	$sql1 = "SELECT * FROM post ORDER BY id DESC";
	$post = array();
	$result1 = $c->query($sql1);
	$i = 0;	

	if ($result1 -> num_rows > 0) {
		while ($obj = $result1->fetch_assoc()) {
			$sql2 = "SELECT COUNT(username) as jumlah FROM likes WHERE id_post = ?";
			$stmt = $c->prepare($sql2);
    		$stmt -> bind_param("i", $obj['id']);
    		$stmt->execute();
   			$result2 = $stmt -> get_result();
			$row = $result2->fetch_assoc();

			$sql3 = "SELECT * FROM likes WHERE id_post = ? AND username = ?";
			$stmt = $c->prepare($sql3);
    		$stmt -> bind_param("is", $obj['id'], $username);
    		$stmt->execute();
   			$result3 = $stmt -> get_result();
			
			$post[$i]['id'] = $obj['id'];
			$post[$i]['title'] = addslashes(htmlentities($obj['title']));
			$post[$i]['caption'] = addslashes(htmlentities($obj['caption']));
			$post[$i]['username'] = addslashes(htmlentities($obj['username']));
			$post[$i]['image'] = addslashes(htmlentities($obj['image']));
			$newDate = date("d M Y", strtotime(addslashes(htmlentities($obj['date']))));
			$post[$i]['date'] = $newDate;
			$post[$i]['like'] = $row['jumlah'];

			if($result3 -> num_rows > 0) {
				$post[$i]['status'] = 1;
			} else {
				$post[$i]['status'] = 0;
			}
			
			$sql4 = "SELECT image FROM user WHERE username = ?";
			$stmt = $c->prepare($sql4);
			$stmt -> bind_param("s", $obj['username']);
			$stmt->execute();
   			$result4 = $stmt -> get_result();
			$row2 = $result4->fetch_assoc();
			$post[$i]['profilepic'] = $row2['image'];

			
			$i++;
		}
    	} else {
		$arr = ['result' => 'failed', "message" => "Username already exist!"];		
	}

	echo json_encode($post);

	$stmt->close();
	$c->close();
?>
