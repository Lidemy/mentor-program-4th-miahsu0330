<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>新增文章 | 部落格</title>
	<link rel="stylesheet" href="./style.css">
</head>
<?php 
	require_once('conn.php');
	require_once('utils.php');
	session_start();

	$username = NULL;
	$user = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username);
	} else {
		header('Location: login.php');
		die();
	}

	$sql = 'SELECT * FROM mia_blog_articles order by id desc';
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if(!$result) {
		die('無效指令:' . $conn->error);
	}
	$result = $stmt->get_result();
?>
<body>
	<div class="wrap">
	<header class="header">
		<div></div>
		<div>
			<div class="controlbar">
				<ul class="controlbar__nav">
					<?php if($username) { ?>
						<li class="navbar__item"><a href="admin.php" class="controlbar__link">管理後台</a></li>
						<li class="navbar__item"><a href="index.php" class="controlbar__link">返回前台</a></li>
					<?php	} else { ?>				
						<li class="controlbar__item"><a href="login.php" class="controlbar__link">登入</a></li>
					<?php	}  ?>
				</ul>
			</div>
		</div>
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