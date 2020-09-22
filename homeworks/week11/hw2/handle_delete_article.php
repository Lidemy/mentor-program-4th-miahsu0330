<?php
    require_once('conn.php');
    require_once('utils.php');
    session_start();
    
    //檢查是否登入
    $username = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
	} else {
		header('Location: login.php');
		die();
	}

    //檢查 id 是否為空
    if(empty($_GET['id'])) {
        header('location: admin.php');
        die();
    }
    
    $id = $_GET['id'];

    $sql = 'UPDATE mia_blog_articles SET is_deleted=1 WHERE id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();
    if(!$result) {
        die('無效指令:' . $conn->error);
    }
    header('Location: admin.php');
?>