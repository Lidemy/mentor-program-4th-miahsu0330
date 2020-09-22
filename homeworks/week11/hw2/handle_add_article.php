<?php
    require_once('conn.php');
    require_once('utils.php');
    session_start();
    
    if(empty($_POST['title']) || empty($_POST['content'])) {
        header('Location: login.php?error=1');
        die();
    }

    //檢查是否登入
    $username = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
	} else {
		header('Location: login.php');
		die();
	}

    $title = $_POST['title'];
    $content = $_POST['content'];

    $sql = 'INSERT INTO mia_blog_articles (title, content, username) VALUES (?, ?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $title, $content, $username);
    $result = $stmt->execute();
    if(!$result) {
        die('無效指令:' . $conn->error);
    }
    header('Location: index.php');
?>