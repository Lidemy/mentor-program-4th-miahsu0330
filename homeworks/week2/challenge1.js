function search(arr, num) {
    let L = 0; 
    let R = arr.length - 1;
    //先檢查頭尾是否為答案
    if (num === arr[L]) return L
    if (num === arr[R]) return R

    /*
    |  用 while 檢查 
    |  center 等於 L + R)/2
    |  如果 center 等於 num 代表找到
    |  如果 center 小於 num，代表數值應該在 center ~ R 間，所以讓 L = center + 1（+1 排除 center），反之如果 center 大於 num 代表數值應該在 L ~ center 間，所以讓 R = center - 1（-1 排除 center）
    */
    while(R >= L){
        let center = Math.floor((L + R)/2);
        if(arr[center] === num) {
            return center;
        }
        if(arr[center] < num ) {
            L = center + 1;
        }else {
            R = center - 1;
        }
    }
    return -1;
}



console.log(search([1, 3, 10, 14, 39], 16))
// console.log(search([1, 3, 10, 14, 39], 2))
