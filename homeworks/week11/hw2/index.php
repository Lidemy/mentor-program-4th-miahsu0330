<?php 
	session_start();
	require_once('conn.php');
	require_once('utils.php');

	$username = NULL;
    if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username);
    }

	$sql = 'SELECT * FROM mia_blog_articles ' . 
		   'WHERE is_deleted IS NULL ' . 
		   'order by id desc ' .
		   'limit 5';
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
	<title>部落格</title>
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
						<div class="title__main">存放技術之地</div>
						<div class="title__sub">Welcome to my blog</div>
					</div>
				</div>
			</div>
			<div class="content content-articles">
				<?php while ($row = $result->fetch_assoc()) { ?>
					<article class="article">
					<div class="article__header">
						<div class="article__title"><?php echo escape($row['title']); ?></div>
						<?php if($username) {?>
						<a href="update_article.php?id=<?php echo escape($row['id']);?>" class="btn btn-edit">編輯</a>
						<?php }?>
					</div>
					<div class="article__content"><?php echo escape($row['content']); ?></div>
					<a class="btn btn-more" href="article.php?id=<?php echo escape($row['id']);?>">繼續閱讀</a>
				</article>
				<?php } ?>
			</div>
		</main>
		<?php require_once('footer.php'); ?>
	</div>
</body>

</html>