<?php
    require_once('conn.php');
    require_once('utils.php');
    session_start();
    
    if(empty($_POST['username']) || empty($_POST['password'])) {
        header('Location: login.php?error=1');
        die();
    }
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = 'SELECT * FROM mia_blog_users WHERE username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if(!$result) {
        die('無效指令:' . $conn->error);
    }
    $result = $stmt->get_result();
    print_r($result->num_rows);
    if($result->num_rows === 0) {
        header('Location: login.php?error=2');
        die();
    }
    $row = $result->fetch_assoc();
    if(password_verify($password, $row['password'])) {
        $_SESSION['username'] = $username;
    } else {
		header('Location: login.php?error=2');
		die();
	}

    header('Location: index.php');
?>