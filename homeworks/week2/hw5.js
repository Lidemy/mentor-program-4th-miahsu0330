function join(arr, concatStr) {
  let result = '';
  result += arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    result += concatStr + arr[i];
  }
  return result;
}

function repeat(str, times) {
  let result = '';
  for (let i = 0; i < times; i += 1) {
    result += str;
  }
  return result;
}

console.log(join(['a'], '!'));
// console.log(join([1, 2, 3], ''));
// console.log(join(["a", "b", "c"], "!"));
// console.log(join(["a", 1, "b", 2, "c", 3], ','));
// console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
