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

    //檢查是否有帶上 id
    if(empty($_GET['id'])) {
        // header('location: index.php');
        die();
    }
    $id = $_GET['id'];

    //檢查是否有填入內容
    if(empty($_POST['content']) ||  empty($_POST['title'])) {
        header('location: update_article.php?id=' . $id . '&error=1');
        die();
    }
    $content = $_POST['content'];
    $title = $_POST['title'];

    $sql = 'UPDATE mia_blog_articles SET content=?, title=? WHERE id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi',$content, $title, $id);
    $result = $stmt->execute();
    if(!$result) {
        die('無效指令:' . $conn->error);
    }
    header('location: article.php?id=' . $id);
?>