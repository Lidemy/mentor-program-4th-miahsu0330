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
	$user = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username);
		$role = intval($user['role']);
	}

	$page = 1;
	if(!empty($_GET['page'])) {
		$page = intval($_GET['page']);
	}
	$items_pre_page = 5;
	$offset = ($page - 1) * $items_pre_page;

	$stmt = $conn->prepare(
		'select '.
			'C.id as id, C.content as content, '.
			'C.created_at as created_at, U.nickname as nickname, U.username as username '.
		'from mia_comments as C ' .
		'left join mia_users as U on C.username = U.username '.
		'where C.is_deleted is NULL ' .	
		'order by C.id desc ' .
		'limit ? offset ?'
	);
	$stmt->bind_param('ii', $items_pre_page, $offset);
	$result = $stmt->execute();
	if(!$result) {
		die('無效指令:' . $conn->error );
	}
	$result = $stmt->get_result();
?>
<body>
	<div class="wrap">
		<div class="board">
			<div class="board__header">
				<div class="btns">
					<?php if($username) { ?>
						<?php if($role === 0) { ?>
							<a class="btn" href="admin.php">Dashboard</a>
						<?php } ?>
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
						<div class="post__desc">嗨！<?php echo escape($user['nickname']); ?><button class="btn btn-submit btn-s" id="editNickname">編輯暱稱</button></div>	
						<form action="handle_update_user.php" method="post" class="updateUser hide">
						<label for="nickname">新的暱稱</label>
							<div>
							<input type="text" name="nickname" id="nickname">
								<div class="error">
								<?php 
									if(!empty($_GET['error'])) {
										if($_GET['error'] === '2') { echo '此暱稱已被使用'; }
									}
									?>
								</div>
							</div>
							<input class="btn btn-submit" type="submit" value="更新">
							
						</form>

						<?php if($role !== 2) { ?>
							<form action="handle_add_post.php" method="post" class="post__form">
								<textarea name="content" id="content"  rows="5" class="post__content"></textarea>
								<div class="error">
									<?php 
									if(!empty($_GET['error'])) {
										if($_GET['error'] === '1') { echo '請輸入訊息'; }
									}
									?>
								</div>
								<input type="submit" value="提交" class="btn btn-submit">
							</form>
						<?php } ?>
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
								<div class="card__name"><?php echo escape($row['nickname']); ?></div>
								<?php if(!empty($_SESSION['username'])) { 
									if($role === 0) { ?>
										<a class="card__edit" href="update_comment.php?id=<?php echo $row['id']?>">編輯</a>
										<a class="card__deleted" href="handle_delete_comment.php?id=<?php echo $row['id']?>">刪除</a>
									<?php } else {
											if($row['username'] === $_SESSION['username']) { ?>
											<a class="card__edit" href="update_comment.php?id=<?php echo $row['id']?>">編輯</a>
											<a  class="card__deleted" href="handle_delete_comment.php?id=<?php echo $row['id']?>">刪除</a>
									<?php }	} 
								  } ?>
							</div>
							<div class="card__body">
								<div class="card__date"><?php echo escape($row['created_at']); ?></div>
								<div class="card__content"><?php echo escape($row['content']); ?></div>
							</div>
						</div>
					<?php } ?>
				</div>
				<?php
						$sql = 'select count(id) as count from mia_comments where is_deleted IS NULL';
						$stmt = $conn->prepare($sql);
						$result = $stmt->execute();
						if(!$result) {
							die('無效指令:' . $conn->error );
						}
						$result = $stmt->get_result();
						$row = $result->fetch_assoc();
						$conut = $row['count'];
						$total_page = ceil($conut/ $items_pre_page);
				
				?>
				<div class="page">
					<?php if($page != 1) {?>
								<a href="index.php?page=1">第一頁</a>
								<a href="index.php?page=<?php echo $page - 1 < 1?>">上一頁</a>
							
							<?php } ?>
							<?php if($page != $total_page) {?>
								<a href="index.php?page=<?php echo $page + 1?>">下一頁</a>
								<a href="index.php?page=<?php echo $total_page?>">最後一頁</a>
							<?php } ?>
							<p class="page_count">總共有 <? echo $conut ?> 筆，頁數 <?php echo $page?> / <?php echo $total_page?> 頁</p>
				</div>
						

			</div>
		</div>
	</div>
	<script>
		document.querySelector('#editNickname').onclick = function() {
			document.querySelector('.updateUser').classList.toggle("hide");
		 }
	</script>
</body>
</html>