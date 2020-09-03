<?php
	require_once('conn.php');
	if( empty($_POST['username']) ||
		empty($_POST['password']) ||
		empty($_POST['nickname']) 
	) {
		header('Location: register.php?error=1');
		die();
	}

	$username = $_POST['username'];
	$password = $_POST['password'];
	$nickname = $_POST['nickname'];

	$sql = sprintf('INSERT INTO mia_users (username, password, nickname) VALUES ("%s", "%s", "%s")',
		$username,
		$password,
		$nickname);
		echo $sql;
	$result = $conn->query($sql);
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
	header('Location: index.php');
?>
