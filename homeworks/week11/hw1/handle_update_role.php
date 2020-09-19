<?php
	session_start();
	//引入>得到值>確認值是否為空>從 cookie 得到 username > 尋找對應 nickname > 發出 增加 comment 資料指令 > 回 index.php
	require_once('conn.php');
	require_once('utils.php');
	if(empty($_POST['role'] || $_POST['id'])) {
		header('Location: index.php?error=1');
		die();
	}
	$id = $_POST['id'];
	$role = $_POST['role'];
	$sql = 'UPDATE mia_users SET role=? WHERE id=?';
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ii', $role, $id);

	$result = $stmt->execute();
	if(!$result) {
		header('Location: index.php?error=2');
		die('無效指令:' . $conn->error );
	}
	header('Location: admin.php?feedback=1');
?>
