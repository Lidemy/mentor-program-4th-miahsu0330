<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    // 檢查是否帶入 site_key
    if (empty($_GET['site_key'])) {
            $json = array(
                'ok' => false,
                'message' => 'Please add site_key in URL'
            );
            $response = json_encode($json);
            echo $response;
            die();
    }
    $site_key = $_GET['site_key'];

    // 執行 sql：撈出整個資料表
    $sql = 'SELECT id, content, is_finish FROM mia_todos WHERE site_key = ? AND is_deleted IS NULL ORDER BY id DESC';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $site_key);
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
    // 將資料打包成 array
    $todos = array();
    while($row = $result->fetch_assoc()) {
        array_push($todos, array(
            "id" => $row['id'],
            "content" => $row['content'],
            "is_finish" => $row['is_finish']
        ));
    }

    $json = array(
        'ok' => true,
        'message' => 'success!',
        'todos' => $todos
    );
    $response = json_encode($json);
    echo $response;
    die();
?>
