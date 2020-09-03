<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>留言板</title>
	<link rel="stylesheet" href="./style.css">
</head>
<?php
	require_once('conn.php');
?>
<body>
	<div class="wrap">
		<div class="board">
			<div class="board__header">
				<div class="btns">
					<a class="btn btn-login" href="index.php">Go home</a>
				</div>
				<div class="board__title">
					login
                </div>
                
				<div class="post">
					<form action="handle_login.php" method="post" class="post__form post__form-member">
					<label for="username">Username</label>
                    <input type="text" name="username" id="username">
					<label for="password">Password</label>
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
						<input type="submit" value="送出" class="btn btn-submit">
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>