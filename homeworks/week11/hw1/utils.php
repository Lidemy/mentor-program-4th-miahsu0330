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

        return $row; //username id nickname
    }

    // XSS
    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }
?>