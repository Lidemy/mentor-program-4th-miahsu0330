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
	require_once('utils.php');

	$username = NULL;
	$user = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username);
	}


	// 檢查 進來的 user 的權限，如果不是 admin 導回首頁，如果是可以繼續操作
	$role = intval($user['role']);
	if ($role !== 0 ) {
		header('Location: index.php');
		die();
	}

	$stmt = $conn->prepare(
		'SELECT * FROM `mia_users`'
	);
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
					<a class="btn btn-login" href="index.php">Go home</a>				
				</div>
				<div class="board__title">
					Admin
				</div>
				<div class="error">
					<?php
						if(!empty($_GET['feedback'])) {
							$feedback_code = $_GET['feedback'];
							if($feedback_code === '1')	 {
								echo '資料修改成功';
							}
						}
					?>
				</div>
				<br>
				<table class="table" cellspacing=0>
					<thead>
						<tr>
							<td>id</td>
							<td>username</td>
							<td>nickname</td>
							<td>Authority</td>
							<td>action</td>
						</tr>
					</thead>	
					<tbody>
						<?php 
							// 渲染出資料
							while($row = $result->fetch_assoc()) {
						?>
						<tr>
							<form action="handle_update_role.php" method="post">
							<td><?php echo escape($row['id']); ?></td>
							<td><?php echo escape($row['username']); ?></td>
							<td><?php echo escape($row['nickname']); ?></td>
							<td>
								<input type="hidden" name="id" value="<?php echo $row['id'] ?>">
								<?php 
									$role = intval($row['role']);
									if($role === 0) { ?>
										<select name="role" id="">
											<option value="0" selected>admin</option>
											<option value="1">user</option>
											<option value="2">disabled</option>
										</select>
								<?php } 
									if($role === 1) { ?>
										<select name="role" id="">
											<option value="0">admin</option>
											<option value="1" selected>user</option>
											<option value="2">disabled</option>
										</select>									
								<?php } 
									if($role === 2) { ?>
										<select name="role" id="">
											<option value="0">admin</option>
											<option value="1">user</option>
											<option value="2" selected>disabled</option>
										</select>									
								<?php } ?>
							</td>
							<td><input type="submit" value="save" class="btn btn btn-submit"></td>
							</form>
						</tr>
						<?php } ?>
					</tbody>	
				</table>
			</div>
		</div>
	</div>
</body>
</html>