


Promise.all = function(list) {
  if (!Array.isArray(list)) throw new Error('input not array');
  return new Promise((resolve, reject) => {
    let values = [];
    let doneCount = 0;
    list.forEach((p, idx) => {
      Promise.resolve(p)
        .then((res) => {
          values[idx] = res;
          doneCount++;
          if (doneCount === list.length) {
            resolve(values);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
