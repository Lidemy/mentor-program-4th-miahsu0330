<?php
    require_once('conn.php');

    // 從資料庫得到 Username
    function getUserFromUsername($username) {
        global $conn;
        $sql = sprintf('SELECT * FROM mia_users WHERE username = "%s"', $username);
        $result = $conn->query($sql);
        if(!$result) {
            die($conn->error);
        }
        $row = $result->fetch_assoc();
        $username = $row['username'];

        return $row; //username, id, nickname, role
    }

    // XSS
    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }

    // 權限: $action: update, delete, create
    function hasPermission($user, $action, $comment) {
        if($user['role'] === 'ADMIN') {
            return true;
        }

        if($user['role'] === 'NORMAL') {
            if($action === 'create') return true;
            return $comment['username'] === $user['username'];
        }

        if($user['role'] === 'BANNED') {
            return $action !== 'create';
        }
    }
    // 判斷是否是 admin
    function isAdmin($user) {
        return $user['role'] === 'ADMIN';
    }

    // 得到 留言 user
    function getCommentUsername($id) {
        global $conn;
        $sql = 'SELECT username FROM mia_comments WHERE id=?';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $result = $stmt->execute();
        if(!$result) {
            die('無效指令:' . $conn->error );
        }
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['username'];
    }
?>