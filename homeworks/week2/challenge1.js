function search(arr, num) {
    let star = 0; 
    let end = arr.length - 1;
    let center = null;
    //先檢查頭尾是否為答案
    if (num === arr[star]) return star
    if (num === arr[end]) return end

    //如果頭尾為相鄰 index 代表找不到答案，結束迴圈
    while(end - star > 1){
        center = star + Math.floor((end - star)/2);
        if(arr[center] === num) return center;
        if(arr[center] > num ) {
            end = center;
        }else {
            star = center;
        }
    }
    return -1;
}



// console.log(search([1, 3, 10, 14, 39], 9))
console.log(search([1, 3, 10, 14, 39], 2))
