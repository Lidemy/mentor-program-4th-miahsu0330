<?php
	session_start();
	require_once('conn.php');
	require_once('utils.php');
	if(empty($_GET['id'])) {
        header('Location: index.php');
        die();
	}
	
    $id = $_GET['id'];                          // 得到留言 id
	$username = $_SESSION['username'];			// 得到目前登入者名稱
    $user = getUserFromUsername($username);		// 得到目前登入者資訊

	$username = $_SESSION['username'];
	$sql = 'UPDATE mia_comments set is_deleted=1 WHERE id = ? AND username=?';
	$stmt = $conn->prepare($sql);

	// 判斷是否為管理者
	if(isAdmin($user)) {
        // 抓出留言者名稱，直接帶入變數
        $comment_username = getCommentUsername($id);
		$stmt->bind_param('is', $id, $comment_username);
	} else {
		// 檢查目前登入者名稱是否同留言者
        $stmt->bind_param('is', $id, $username);
    }

	$result = $stmt->execute();
	if(!$result) {
		header('Location: index.php?error=2');
		die('無效指令:' . $conn->error );
	}
	header('Location: index.php');
?>