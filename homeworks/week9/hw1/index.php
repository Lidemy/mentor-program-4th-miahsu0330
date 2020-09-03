<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>留言板</title>
	<link rel="stylesheet" href="./style.css">
</head>

<?php
	// 引 入> 發出SQL語法拿到資料 > 錯誤 > fetch_assoc() 印出資料 > 將表單傳送到 handle_add_post 新增資料 
	// 新增會員功能:登入、註冊、登出、登入後才能留言
	session_start();
	require_once('conn.php');
	require_once('utils.php');

	// 從 cookie 讀除 PHPSESSID(token)
	// 從檔案裡面讀去內容
	// 放到 $_SESSION
	$username = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
	}
	 
	$result = $conn->query('SELECT * FROM mia_comments ORDER BY created_at DESC');
	if(!$result) {
		die('無效指令:' . $conn->error );
	}
?>
<body>
	<div class="wrap">
		<div class="board">
			<div class="board__header">
				<div class="btns">

					<?php if($username) { ?>
						<a class="btn btn-login" href="logout.php">Log out</a>
					<?php } else { ?>
						<a class="btn btn-signup" href="register.php">Sign up</a>
						<a class="btn btn-login" href="login.php">Log in</a>
					<?php } ?>
				
				</div>
				<div class="board__title">
					Boards
				</div>
				<div class="post">
					
					<?php if($username) { ?>
						<div class="post__desc">嗨！<?php echo $username; ?></div>
						<form action="handle_add_post.php" method="post" class="post__form">
							<textarea name="content" id="content"  rows="5" class="post__content"></textarea>
							<div>
								<?php 
								if(!empty($_GET['error'])) {
									if($_GET['error'] === '1') { echo '請輸入訊息'; }
								}
								?>
							</div>
							<input type="submit" value="提交" class="btn btn-submit">
						</form>
					<?php } else { ?>
						<div class="post__desc">請先登入會員</div>
					<?php } ?>

				</div>
			</div>
			<div class="board__body">
				<div class="comment">

					<?php while ($row = $result->fetch_assoc()) { ?>
						<div class="comment__card card">
								<div class="card__header">
								<span class="card__img"></span>
								<div class="card__name"><?php echo $row['nickname']; ?></div>
							</div>
							<div class="card__body">
								<div class="card__date"><?php echo $row['created_at']; ?></div>
								<div class="card__content"><?php echo $row['content']; ?></div>
							</div>
						</div>
					<?php }?>

				</div>
			</div>
		</div>
	</div>
</body>
</html>