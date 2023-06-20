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
	$sql1 = "SELECT u.name AS name, u.image AS image, c.comment AS comment, c.username AS username, c.id AS idcomment
    FROM comment c INNER JOIN user u ON c.username=u.username WHERE c.id_post = ? ORDER BY c.id ASC";
	
    $stmt = $c -> prepare($sql1);
    $stmt -> bind_param("i", $id);
    $stmt -> execute();
    $result1 = $stmt -> get_result();
    
	$comment = array();
    $reply = array();
    $i = 0;
    if ($result1 -> num_rows > 0) {
        while ($obj = $result1 -> fetch_assoc()){
            $j = 0;
            $comment[$i]['username'] = addslashes(htmlentities($obj['username']));
            $comment[$i]['comment'] = addslashes(htmlentities($obj['comment']));
            $comment[$i]['name'] = addslashes(htmlentities($obj['name']));
            $comment[$i]['image'] = addslashes(htmlentities($obj['image']));
            $comment[$i]['idcomment'] = $obj['idcomment'];

            $sql2 = "SELECT r.comment AS reply, r.username AS username, u.name AS name, u.image AS image FROM reply r
            INNER JOIN user u ON r.username = u.username WHERE r.id_comment=? ORDER BY r.id ASC";
            $stmt = $c -> prepare($sql2);
            $stmt -> bind_param("i", $obj['idcomment']);
            $stmt -> execute();
            $result2 = $stmt -> get_result();
            if ($result2 -> num_rows > 0) {
                while ($obj2 = $result2 -> fetch_assoc()) {
                    $reply[$j]['username'] = addslashes(htmlentities($obj2['username']));
                    $reply[$j]['reply'] = addslashes(htmlentities($obj2['reply']));
                    $reply[$j]['name'] = addslashes(htmlentities($obj2['name']));
                    $reply[$j]['image'] = addslashes(htmlentities($obj2['image']));
                    $j++;
                }
                $comment[$i]['reply'] = $reply;
            } else {
                $comment[$i]['reply'] = array();
            }
            $i++;
        }
    }
	echo json_encode($comment);

	$stmt->close();
	$c->close();
?>
