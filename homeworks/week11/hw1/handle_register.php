<?php
	session_start();
	require_once('conn.php');
	if( empty($_POST['username']) ||
		empty($_POST['password']) ||
		empty($_POST['nickname']) 
	) {
		header('Location: register.php?error=1');
		die();
	}



	$username = $_POST['username'];
	$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
	$nickname = $_POST['nickname'];
	
	$sql = 'INSERT INTO mia_users (username, password, nickname) VALUES (?, ?, ?)';
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('sss', $username, $password, $nickname);
	$result = $stmt->execute();
	if(!$result) {
		if(strpos($conn->error, 'Duplicate entry') !== false) {
			echo $conn->error;
			if(strpos($conn->error, 'username') !== false) {
				header('Location: register.php?error=2&duplicate=' . 'username');
				die();
			}
			if(strpos($conn->error, 'nickname') !== false) {
				header('Location: register.php?error=2&duplicate=' . 'nickname');
				die();
			}
		}
	}
	$_SESSION['username'] = $username;
	header('Location: index.php');
?>
