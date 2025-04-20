const { addNum, something, asyncFn, promiseExample } = require("./sum");
test("test if 2 plus 1 equals 3", () => {
  expect(addNum(1, 2)).toBe(3);
});
test("test if objects are equal", () => {
  const a = 2;
  expect(a).toBeTruthy();
});
test("if input is invalid", () => {
  const invalid_input = "sujal";
  expect(() => something(invalid_input)).toThrow("invalid input");
});
test("if data revcieved is hello", (done) => {
  function callback(data) {
    try {
      expect(data).toBe("hello");
      done();
    } catch (err) {
      done(err);
    }
  }
  asyncFn(callback);
});
test("if promise returns sucess", async () => {
  const result = await promiseExample();
  return expect(result).toBe("sucess");
});
