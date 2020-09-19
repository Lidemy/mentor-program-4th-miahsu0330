<?php
	session_start();
	require_once('conn.php');
	$id = $_GET['id'];
	$username = $_SESSION['username'];
	$sql = 'UPDATE mia_comments set is_deleted=1 WHERE id = ? AND username=?';
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('is', $id, $username);
	$result = $stmt->execute();
	if(!$result) {
		header('Location: index.php?error=2');
		die('無效指令:' . $conn->error );
	}
	header('Location: index.php');
?>