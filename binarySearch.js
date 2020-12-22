


function binarySearch(arr, target) {
  let i = 0, j = arr.length - 1;
  while (i <= j) {
    let mid = Math.floor((i + j) / 2);
    if (arr[mid] === target) return mid;
    if (i < mid && arr[mid] < target) {
      i = mid;
    } else if (j > mid && arr[mid] > target) {
      j = mid;
    } else {
      return -1;
    }
  }
}

console.log(binarySearch([-1, 0, 3, 5, 7, 9, 10], -1));