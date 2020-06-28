function multiply(a, b) {
    /*
    |  建立 result 空陣列，將 a b 字串分割成陣列並將型態轉為數字後，反轉整個陣列，才能從個位數開始計算
    |  與 99 乘法表相同的雙重迴圈得值(num)， index 為 i+j 這樣起始會是 i 位數，每次加一位數
    |  檢查 result[index] 是否為空(undefined)，空的話要補 0 這樣計算才不會 NaN 
    |  將 result[index] 原本的值加上 值(num)
    */
    let arrA = a.split('').map(Number).reverse();
    let arrB = b.split('').map(Number).reverse();
    let result = [];
    for(let i = 0; i < arrA.length; i++) {
        for(let j = 0; j < arrB.length; j++) {
            let num = arrA[i] * arrB[j];
            let index = i+j;
            if(result[index] === undefined) {
                result[index] = 0;
            }
            result[index] += num;
            /*
            |  用 while 檢查 result[index] 是否大於 9 ，決定要不要進位
            |  得個位數及進位數，將個位數放入 result[index]；進位數放入 result[index+1] （一樣要檢查 result[index+1] 是否為空）
            */
            while(result[index] > 9) {
                let digits = result[index] % 10;
                let tenDigits = Math.floor(result[index] / 10);
                result[index] = digits;
                if(result[index+1] === undefined){
                    result[index+1] = 0;
                } 
                result[index+1] += tenDigits;
            }
        }
    }
    /*
    |  將陣列轉回字串
    */
    return result.reverse().join('');
}



console.log(multiply('97853','97853'))
console.log(multiply('123', '123'))
