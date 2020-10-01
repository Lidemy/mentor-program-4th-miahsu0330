<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    // 檢查是否有輸入值
    if(
        empty($_POST['site_key']) ||
        empty($_POST['nickname']) ||
        empty($_POST['content']) 
    ) {
        $json = array(
            "ok" => false,
            "message" => 'Please input missing fields'
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $site_key = $_POST['site_key'];
    $nickname = $_POST['nickname'];
    $content = $_POST['content'];

    // 執行 sql 語法
    $sql = 'INSERT INTO mia_discussions(site_key, nickname, content) VALUES (?, ?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $site_key, $nickname, $content);
    $result = $stmt->execute();
    if(!$result) {
        $json = array(
            "ok" => false,
            "message" => $conn->error()
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $json = array(
        "ok" => true,
        "message" => 'success'
    );
    $response = json_encode($json);
    echo $response;
    die();
?>

<!-- 
    step1. 引入連線檔案  
    step2. 在 header 說明輸出 JSON 格式 request header 必須帶上 
    step3. 檢查是否有輸入值，如果沒有進行錯誤處理 => 回傳錯誤訊息
    step4. 準備好 SQL 語法，用問號替換查詢中的所有變量
    step5. 準備結果查詢
    step6. 將所有變量綁定到先前準備的語句
    step7. 執行語句
    step8. 做執行錯誤處理 => 回傳錯誤訊息
    step9. 做執行成功處理 => 印出成功訊息
-->