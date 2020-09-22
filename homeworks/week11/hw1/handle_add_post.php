<?php
	session_start();
	//引入>得到值>確認值是否為空>從 cookie 得到 username > 尋找對應 nickname > 發出 增加 comment 資料指令 > 回 index.php
	require_once('conn.php');
	require_once('utils.php');


	if(empty($_POST['content'])) {
		header('Location: index.php?error=1');
		die();
	}
	$username = $_SESSION['username'];

	$content = $_POST['content'];
	$sql = 'INSERT INTO mia_comments (username, content) VALUES (?, ?)';
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ss', $username, $content);

	$result = $stmt->execute();
	if(!$result) {
		die('無效指令:' . $conn->error );
	}
	header('Location: index.php');
?>
