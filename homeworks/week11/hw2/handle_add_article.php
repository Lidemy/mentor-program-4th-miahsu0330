<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');
    require_once('check_permission.php');

    if(empty($_POST['title']) || empty($_POST['content'])) {
        header('Location: login.php?error=1');
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