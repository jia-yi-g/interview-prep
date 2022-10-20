//eg1
let a = 0;
let b = async () => {
  a = a + (await 10);
  console.log("2", a); // -> '2' 10
};
b();
a++;
console.log("1", a); // -> '1' 1
//eg2
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
  //输出1,3,2,Error:2,4,因为2中出现错误后，promise会忽略之后的

//eg3
async function async1() {
  await async2();
  console.log("async1");
  return "async1 success";
}
async function async2() {
  return new Promise((resolve, reject) => {
    console.log("async2");
    reject("error");
  });
}
async1().then((res) => console.log(res));
//结果为async2，uncaught error,因为在代码中如果有没有catch的错误，则代码会停止运行
//z直接打印一个promise会输出一个有state和value属性的对象

//eg4
Promise.resolve()
  .then(() => {
    console.log("1");
    throw "Error";
  })
  .then(() => {
    console.log("2");
  })
  .catch(() => {
    console.log("3");
    throw "Error";
  })
  .then(() => {
    console.log("4");
  })
  .catch(() => {
    console.log("5");
  })
  .then(() => {
    console.log("6");
  });
  //输出1356：无论是then还是catch中，只要throw 抛出了错误，就会被catch捕获，如果没有throw出错误，就被继续执行后面的then