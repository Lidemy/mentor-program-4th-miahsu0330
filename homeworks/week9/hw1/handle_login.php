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
	$sql = sprintf('SELECT * FROM mia_users WHERE username = "%s" AND password = "%s"', 
		$username, $password
	);
	$result = $conn->query($sql);
	if(!$result) {
		die($conn->error);
	}
	if($result->num_rows) {
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