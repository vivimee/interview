function bubbleSort(arr = []) {
  let sorted = true;
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length - 1 - i; ++j) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        sorted = false;
      }
    }
    if (sorted) break;
  }
  return arr;
}

console.log(bubbleSort([4, 6, 2, 3, 1, 8, 3, 9, 6, 2, 3, 4, 2, 1, 0]))