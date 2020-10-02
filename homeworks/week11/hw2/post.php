<?php 
	session_start();
	require_once('conn.php');
	require_once('utils.php');
	require_once('check_permission.php');

	$username = $_SESSION['username'];
	$user = getUserFromUsername($username);
	$sql = 'SELECT * FROM mia_blog_articles order by id desc';
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if(!$result) {
		die('無效指令:' . $conn->error);
	}
	$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>新增文章 | 部落格</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<div class="wrap">
	<header class="header">
		<?php require_once('navbar.php'); ?>
	</header>
		<main class="main">
			<div class="title">
				<div class="title__inner">
					<div>
						<div class="title__main">新增文章</div>
					</div>
				</div>
			</div>
			<div class="content">
			<form action="handle_add_article.php" method="post" class="post__form">
					<label for="title">文章標題</label>
                    <input type="text" name="title" id="title">
					<label for="content">文章內容</label>
                    <textarea name="content" id="content" cols="30" rows="10" ></textarea>
					<div class="error">
						<?php
							if(!empty($_GET['error'])) {
								$error_code = $_GET['error'];
								if($error_code === '1')	 {
									echo '資料不齊全，請再次填寫';
								}
							}
						?>
					</div>
					<input type="submit" value="新增文章" class="btn btn-submit">
				</form>
			</div>
		</main>
		<?php require_once('footer.php'); ?>
	</div>
</body>

</html>