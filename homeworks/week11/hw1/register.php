<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>留言板</title>
	<link rel="stylesheet" href="./style.css">
</head>
<?php
// 引入 > 發送出表單到 handle_register
require_once 'conn.php';
?>
<body>
	<div class="wrap">
		<div class="board">
			<div class="board__header">
				<div class="btns">
					<a class="btn btn-login" href="index.php">Go home</a>
				</div>
				<div class="board__title">
					Register
				</div>
				<div class="post">
					<form action="handle_register.php" method="post" class="post__form post__form-member">
						<label for="username">Username</label>
						<input type="text" name="username" id="username">
						<label for="password">Password</label>
						<input type="password" name="password" id="password">
						<label for="nickname">nickname</label>
						<input type="text" name="nickname" id="nickname">
						<div class="error">
						<?php
						if (!empty($_GET['error'])) {
							$error_code = $_GET['error'];
							if ($error_code === '1') {
								echo '資料不齊全，請再次填寫';
							} else if ($error_code === '2') {
								$duplicate_key = $_GET['duplicate'];
								echo $duplicate_key . ' 已被使用';
							}
						}
						?>
						</div>
						<input type="submit" value="提交" class="btn btn-submit">
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>