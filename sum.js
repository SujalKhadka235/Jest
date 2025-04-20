function addNum(a, b) {
  return a + b;
}
function something(input) {
  if (typeof input !== "number") {
    throw new Error("invalid input");
  }
}
function asyncFn(callback) {
  setTimeout(() => {
    callback("hello");
  }, 1000);
}
function promiseExample() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("sucess");
    }, 1000);
  });
}
module.exports = { addNum, something, asyncFn, promiseExample };
