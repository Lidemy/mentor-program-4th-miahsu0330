<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    // 檢查是否帶入 site_key
    if (empty($_POST['site_key'])) {
            $json = array(
                'ok' => false,
                'message' => 'Please add site_key'
            );
            $response = json_encode($json);
            echo $response;
            die();
    }
    $site_key = $_POST['site_key'];

    // 檢查是否填入值
    if(empty($_POST['content'])) {
        $json = array(
            'ok' => false,
            'message' => 'Please input a value'
        );
        $response = json_encode($json);
        echo $response;
        die(); 
    }
    $content = $_POST['content'];


    // 執行 sql：新增資料
    $sql = 'INSERT INTO mia_todos (content, site_key) VALUES (?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $content, $site_key);
    $result = $stmt->execute();

    if(!$result) {
        $json = array(
            'ok' => false,
            'message' => $conn->error()
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    // 執行 sql：取到 資料 id
    $sql = 'SELECT id FROM mia_todos WHERE content = ? AND site_key = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $content, $site_key);
    $result = $stmt->execute();

    if(!$result) {
        $json = array(
            'ok' => false,
            'message' => $conn->error()
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $json = array(
        'ok' => true,
        'message' => 'add success!',
        'id' => $row['id'] // 將 id 傳回去
    );
    $response = json_encode($json);
    echo $response;
    die();
?>
