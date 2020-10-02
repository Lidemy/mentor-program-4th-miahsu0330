<?php
    session_start();
    require_once('connect.php');

    if(empty($_POST['content'])) {
        header('Location: index.php?error=1');
        die();
    }
    
    $username = $_SESSION['username'];			// 得到目前登入者名稱
    $user = getUserFromUsername($username);		// 得到目前登入者資訊
    
    if(hasPermission($user, 'create', NULL)) {
        header('Location: index.php');
        exit;
    }

    $content = $_POST['content'];

    $sql = 'INSERT INTO comments (username, content) VALUE (?, ?)';
    $stmt = $connect->prepare($sql);
    $stmt->bind_param('ss', $username, $content);
    $result = $stmt->execute();

    if(!$result) {
        echo $connect->error;
        die();
    }

    header('Location: index.php');
?>
