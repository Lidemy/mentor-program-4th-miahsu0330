<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>留言板</title>
	<link rel="stylesheet" href="./style.css">
</head>

<?php
	session_start();
	require_once('conn.php');

	$comment_id = $_GET['id'];
	$sql = 'SELECT * FROM `mia_comments` WHERE id = ?';
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('i', $comment_id);
	$result = $stmt->execute();
	if(!$result) {
		echo $conn->error;
		die();
	}
	$result = $stmt->get_result();
	$row = $result->fetch_assoc();
?>
<body>
	<div class="wrap">
		<div class="board">
			<div class="board__header">
				<div class="btns">
					<a class="btn btn-login" href="index.php">Go back</a>
				</div>
				<div class="board__title">
					Boards
				</div>
				<div class="post">
					<p>Update Comment</p>
					<form action="handle_update_comment.php?id=<?php echo $_GET['id']?>" method="post" class="post__form">
						<textarea name="content" id="content"  rows="5" class="post__content"><?php echo $row['content']?></textarea>
						<div class="error">
							<?php 
							if(!empty($_GET['error'])) {
								if($_GET['error'] === '1') { echo '請輸入訊息'; }
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