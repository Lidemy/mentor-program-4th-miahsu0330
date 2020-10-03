<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    // 檢查是否有帶入 site_key
    if( empty($_GET['site_key']) ) {
        $json = array(
            "ok" => false,
            "message" => 'Please add site_key in URL'
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $site_key = $_GET['site_key'];

    // 執行 sql 語法
    $sql = 'SELECT nickname, content, created_at FROM mia_discussions WHERE site_key = ?  ORDER BY id DESC';
    $stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $site_key);
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
    $result = $stmt->get_result();
    // 將資料儲存成 array
    $discussions = array();
    while($row = $result->fetch_assoc()) {
        array_push( $discussions, array(
            "nickname" => $row['nickname'],
            "content" => $row['content'],
            "created_at" => $row['created_at']
        ));
    }
    $json = array(
        "ok" => true,
        "message" => 'success',
        "discussions" => $discussions
    );
    $response = json_encode($json);
    echo $response;
    die();


?>



<!-- 
    step1. 引入連線檔案  
    step2. 在 header 說明輸出 JSON 格式 request header 必須帶上 
    step3. 檢查是否有傳入 site_key，如果沒有做錯誤處理 => 回傳錯誤訊息
    step4. 準備好 SQL 語法，用問號替換查詢中的所有變量
    step5. 準備結果查詢
    step6. 將所有變量綁定到先前準備的語句
    step7. 執行語句
    step8. 做執行錯誤處理 => 回傳錯誤訊息
    step9. 做執行成功處理 => 印出資料
-->