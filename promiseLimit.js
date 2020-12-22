function concurrencyPromise(promiseCreatorList, concurrency) {
  if (!Array.isArray(promiseCreatorList) || !(concurrency > 0 && Number.isInteger(concurrency))) throw new Error('Bad Input');
  let runningCount = 0;
  let doneCount = 0;
  let idx = -1;
  const len = promiseCreatorList.length;
  const values = [];
  return new Promise((resolve) => {
    function next() {
      if (runningCount >= concurrency) return;
      ++runningCount;
      ++idx;
      if (idx >= len) return;
      const p = promiseCreatorList[idx]();
      let index = idx;
      Promise.resolve(p)
        .then((res) => {
          values[index] = res;
        })
        .catch((err) => {
          values[index] = err;
        })
        .finally(() => {
          --runningCount;
          ++doneCount;
          if (doneCount === len) resolve(values);
          else next();
        });
      next();
    }

    next();
  });
}

function getRandomNum(second = 1) {
  return new Promise((resolve, reject) => {
    console.log('promise execute');
    setTimeout(() => {
      const rad = Math.random().toFixed(1);
      console.log('promise ready to done', rad);
      if (rad > 0.5) resolve(rad);
      else reject(rad);
    }, 1000 * second);
  });
}

let list = [() => getRandomNum(1), () => getRandomNum(2), () => getRandomNum(1)];

// let begin = new Date().getTime();
// concurrencyPromise(list, 2)
//   .then((values) => console.log(values))
//   .finally(() => console.log('cost', new Date().getTime() - begin));




// Promise.syncExecute = function (list) {
//   const values = [];
//   return new Promise(async (resolve) => {
//     for (let promiseCreator of list) {
//       let res;
//       try {
//         res = await Promise.resolve(promiseCreator());
//       } catch (e) {
//         res = e;
//       } finally {
//         values.push(res);
//       }
//     }
//     resolve(values);
//   });
// }

Promise.syncExecute = function (list) {
  const values = [];
  const len = list.length;
  return new Promise((resolve) => {
    let idx = -1;
    function next() {
      ++idx;
      const index = idx;
      const promiseCreator = list[idx];
      promiseCreator()
        .then((res) => values[index] = res)
        .catch((err) => values[index] = err)
        .finally(() => {
          if (idx === len - 1) resolve(values);
          else next();
        });
    }

    next();
  });
}

// Promise.syncExecute(list).then((res) => console.log(res));



function getConcurrencyPromise(concurrency) {
  if (!(Number.isInteger(concurrency) && concurrency > 0)) throw new Error('Bad Input');
  let runningCount = 0;

  class ConcurrencyPromise {
    constructor(executor) {
      return new Promise((resolve, reject) => {
        function next() {
          if (runningCount >= concurrency) {
            setTimeout(next, 0);
            return;
          }
          ++runningCount;
          const p = new Promise(executor);
          p.then(resolve, reject).finally(() => {
            --runningCount;
          });
        }
        next();
      })
    }
  }

  return ConcurrencyPromise;
}

const CPromise = getConcurrencyPromise(4);

function logPromise(p) {
  p.then((res) => console.log(res)).catch((e) => console.error(e));
}

logPromise(new CPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
}));
logPromise(new CPromise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
}));
logPromise(new CPromise((resolve) => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
}));
