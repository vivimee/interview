function getN(arr, n) {
  if (n === 1) return arr.slice();
  let res = [];
  for (let i = 0; i < n; ++i) {
    const char = arr[i];
    // const subStrs = getN(arr.filter((item, idx) => idx !== i), n - 1);
    const subStrs = getN(arr.slice(i + 1, arr.length), n - 1);
    const subArr = subStrs.map((str) => char + str);
    res = res.concat(subArr);
  }
  return res;
}

function fn(arr) {
  let res = [];
  for (let i = 1; i <= arr.length; ++i) {
    res = res.concat(getN(arr, i));
  }
  return res;
}

console.log(fn(['a', 'b']));