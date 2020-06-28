function toBit(arrA, arrB) {
    /*
    |  建立 result 空陣列及是否要進位的暫存
    |  將所有可能條件列出（8種），得到最終結果反轉陣列並改回10進位回傳
    */
    let result = [];
    let tmp = 0;
    for(let i = 0; i < arrA.length; i++) {
        if(arrA[i] === undefined) {
            arrA[i] = 0;
        } 
        if(arrB[i] === undefined) {
            arrB[i] = 0;
        } 
        if(tmp === 0 && arrA[i] === 0 && arrB[i] === 0) {
            result.push(0);
        }

        if(tmp === 1 && arrA[i] === 1 && arrB[i] === 1) {
            result.push(1);
        }

        if(tmp === 1 && arrA[i] === 1 && arrB[i] === 0) {
            result.push(0);
        }
        if(tmp === 1 && arrA[i] === 0 && arrB[i] === 1) {
            result.push(0);
        }
        if(tmp === 0 && arrA[i] === 1 && arrB[i] === 1) {
            tmp = 1;
            result.push(0);
        }

        if(tmp === 1 && arrA[i] === 0 && arrB[i] === 0) {
            tmp = 0;
            result.push(1);
        }
        if(tmp === 0 && arrA[i] === 1 && arrB[i] === 0) {
            result.push(1);
        }
        if(tmp === 0 && arrA[i] === 0 && arrB[i] === 1) {
            result.push(1);
        }
    }
    if(tmp === 1) {
        result.push(tmp);
    }
    return (parseInt(result.reverse().join(''),2));

}

function add(a, b) {
    /*
    |  將 a b 值變成二進位分割成陣列並將型態轉為數字後，反轉整個陣列，才能從個位數開始計算
    |  檢查 a b 哪個值長度比較長，作為後續迴圈基底
    */
   let num1 = a.toString(2).split('').map(Number).reverse();
    let num2 = b.toString(2).split('').map(Number).reverse();
    if(num1.length > num2.length) {
        return toBit(num1,num2);
    }else {
        return toBit(num2,num1);
    }
}



console.log(add(100,1));
