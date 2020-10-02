<?php 
	session_start();
	require_once('conn.php');
	require_once('utils.php');
	require_once('check_permission.php');

	$sql = $sql = 'SELECT * FROM mia_blog_articles ' . 
	'WHERE is_deleted IS NULL ' . 
	'order by id desc ';
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
	<title>管理後台 ｜ 部落格</title>
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
						<div class="title__main">存放技術之地 - 後台</div>
						<div class="title__sub">Welcome to my blog</div>
					</div>
				</div>
			</div>
			<div class="content content-list">
				<ul class="list">
					<?php while ($row = $result->fetch_assoc()) { ?>
						<li class="list__item">
							<div class="article__title">
								<a href="article.php?id=<?php echo escape($row['id']);?>"><?php echo escape($row['title']); ?></a>
							</div>
							<div class="article__create"><?php echo escape($row['create_at']); ?></div>
							<a href="update_article.php?id=<?php echo escape($row['id']);?>" class="btn btn-edit">編輯</a>
							<a href="handle_delete_article.php?id=<?php echo escape($row['id']);?>" class="btn">刪除</a>
						</li>
					<?php } ?>
					
				</ul>
			</div>
		</main>
		<?php require_once('footer.php'); ?>
	</div>
</body>

</html>