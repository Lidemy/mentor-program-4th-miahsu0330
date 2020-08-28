<?php
    function generateToken() {
        $s = '';
        for($i = 1; $i <= 16; $i++) {
            $s .= chr(rand(65,90));
        }
        return $s;
    }

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
?>