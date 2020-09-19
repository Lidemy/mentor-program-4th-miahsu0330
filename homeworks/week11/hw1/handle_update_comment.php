<?php
	session_start();
	require_once('conn.php');
	require_once('utils.php');
	$id = $_GET['id'];
	if(empty($_POST['content'])) {
		header('Location: update_comment.php?id=' . $id . '&error=1');
		die();
	}
	// 抓出留言的 user
	$sql = 'SELECT username FROM mia_comments WHERE id=?';
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('i', $id);
	$result = $stmt->execute();
	if(!$result) {
		die('無效指令:' . $conn->error );
	}
	$result = $stmt->get_result();
	$row = $result->fetch_assoc();
	$comment_user = $row['username'];
	$username = $_SESSION['username'];
	$user = NULL;
	if(!empty($_SESSION['username'])) {
		$user = getUserFromUsername($username);
		// 抓出目前登入 user 的權限
		$role = intval($user['role']);
	}


	$content = $_POST['content'];
	$sql = 'UPDATE mia_comments SET content=? WHERE id=? AND username = ?';
	$stmt = $conn->prepare($sql);

	// 如果是管理者，直接帶入 留言的 user 的名字，如果不是就要檢查是否是本人修改
	if($role === 0 ) {
		$stmt->bind_param('sis', $content, $id, $comment_user);
	} else {
		$stmt->bind_param('sis', $content, $id, $username);
	}
	$result = $stmt->execute();
	if(!$result) {
		header('Location: index.php?error=2');
		die('無效指令:' . $conn->error );
	}
	header('Location: index.php');
?>
