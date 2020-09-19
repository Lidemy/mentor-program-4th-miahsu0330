<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>登入 | 部落格</title>
	<link rel="stylesheet" href="./style.css">
</head>
<?php 
	require_once('conn.php');
	require_once('utils.php');
	session_start();

	$username = NULL;
	$user = NULL;
	if(!empty($username)) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username);
	}

	$sql = 'SELECT * FROM mia_blog_articles';
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
			<?php require_once('navbar.php'); ?>
		</header>
		<main class="main">
			<div class="title">
				<div class="title__inner">
					<div>
						<div class="title__main">登入</div>
					</div>
				</div>
			</div>
			<div class="content content-login">
				<form action="handle_login.php" method="post" class="post__form post__form-member">
					<label for="username">使用者名稱</label>
                    <input type="text" name="username" id="username">
					<label for="password">使用者密碼</label>
                    <input type="password" name="password" id="password">
					<div class="error">
						<?php
							if(!empty($_GET['error'])) {
								$error_code = $_GET['error'];
								if($error_code === '1')	 {
									echo '資料不齊全，請再次填寫';
								}
								if($error_code === '2') {
									echo '帳號或密碼有誤';
								}
							}
						?>
					</div>
					<input type="submit" value="登入" class="btn btn-submit">
				</form>
			</div>
		</main>
		<?php require_once('footer.php'); ?>
	</div>
</body>

</html>