<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    // 轉換 字串 true & false
    // 參考：https://www.php.net/manual/zh/function.boolval.php#116547
    function is_true($val, $return_null=false){
        $boolval = ( is_string($val) ? filter_var($val, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) : (bool) $val );
        return ( $boolval===null && !$return_null ? false : $boolval );
    }

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

    // 檢查是否傳入 新的資料表
    if(empty($_POST['todos'])) {
        $json = array(
            'ok' => false,
            'message' => 'Please input a value'
        );
        $response = json_encode($json);
        echo $response;
        die(); 
    }
    $data = $_POST['todos'];

    // 用迴圈對每一筆資料執行 sql：ON DUPLICATE KEY UPDATE
    foreach ($data as $value) {
        $id = $value['id'];
        $content = $value['content'];
        if(is_true($value['is_finish'])) {
            $is_finish = 1;
        } else {
            $is_finish = NULL;
        }
        if(is_true($value['is_deleted'])) {
            $is_deleted = 1;
        } else {
            $is_deleted = NULL;
        }
        
        $sql = 'INSERT INTO mia_todos (id, content, site_key, is_finish, is_deleted) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE content = ?, site_key = ?, is_finish = ?, is_deleted = ?';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('issiissii', $id, $content, $site_key, $is_finish, $is_deleted, $content, $site_key, $is_finish, $is_deleted);
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

    }

    $json = array(
        'ok' => true,
        'message' => 'Update list!'
    );
    $response = json_encode($json);
    echo $response;
    die();
?>
