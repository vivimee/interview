const arr = [5, 2, 6, 3, 8, 9, 4, 0, 1, 3];

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
