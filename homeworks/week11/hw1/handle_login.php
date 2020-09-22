<?php
	session_start(); //php 內建 session
	require_once('conn.php');
	require_once('utils.php');
	if( empty($_POST['username']) || empty($_POST['password']) ) {
		header('Location: login.php?error=1');
		die();
	}
	$username = $_POST['username'];
	$password = $_POST['password'];
	$sql = 'SELECT * FROM mia_users WHERE username = ?';
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $username);
	$result = $stmt->execute();
	if(!$result) {
		die($conn->error);
	}

	$result = $stmt->get_result();

	if($result->num_rows === 0) {
		header('Location: login.php?error=2');
		exit();
	}

	// 有查到使用者
	$row = $result->fetch_assoc();
	if(password_verify($password, $row['password'])) {
		// 登入成功
		// 1. session id (token)
		// 2. 把 username 寫入檔案
		// 3. set-cookie: session-id
		$_SESSION['username'] = $username;
	} else {
		header('Location: login.php?error=2');
		die();
	}
	header('Location: index.php');
?>