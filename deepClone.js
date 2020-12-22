function handleObject(obj, map) {
  if (map.has(obj)) return map.get(obj);
  let res = obj;
  switch (Object.prototype.toString.call(obj)) {
    case '[object Number]':
    case '[object String]':
    case '[object Date]':
    case '[object RegExp]':
      res = new obj.constructor(obj);
      break;
    case '[object Boolean]':
      res = new Boolean(Boolean.prototype.valueOf.call(obj));
      break;
    case '[object Array]':
      const tmpArr = [];
      map.set(obj, tmpArr);
      Array.prototype.forEach.call(obj, item => {
        tmpArr.push(clone(item, map));
      });
      res = tmpArr;
      break;
    case '[object Set]':
      const tmpSet = new Set();
      map.set(obj, tmpSet);
      Set.prototype.forEach.call(obj, item => {
        tmpSet.add(clone(item, map));
      });
      res = tmpSet;
      break;
    case '[object Map]':
      const tmpMap = new Map();
      map.set(obj, tmpMap);
      Map.prototype.forEach.call(obj, (val, key) => {
        tmpMap.set(key, clone(val, map));
      });
      res = tmpMap;
      break;
    case '[object Object]':
      const tmpObj = {};
      map.set(obj, tmpObj);
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        tmpObj[key] = clone(val, map);
      });
      res = tmpObj;
      break;
    default:
      break;
  }
  return res;
}

function clone(input, map) {
  if (typeof input === Symbol) return Symbol();
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  return handleObject(input, map);
}

function deepClone(input) {
  const map = new Map();
  return clone(input, map);
}

const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  }
};
target.target = target;

console.dir(target);
console.dir(deepClone(target));

