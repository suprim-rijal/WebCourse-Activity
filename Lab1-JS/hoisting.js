// // 1.
// function cube(x) {
//   return x * x * x;
// }

// // 2.
// function fullName(first, last) {
//   return first + " " + last;
// }

// // 3.
// function power(base, exp) {
//   if (exp === 0) {
//     return 1;
//   }
//   return base * power(base, exp - 1);
// }

// // 4.
// function sumCubes(numbers) {
//   let total = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     total = total + cube(numbers[i]);
//   }
//   return total;
// }

// Writing this as function expressions 

const cube = (x) => x * x * x;

const fullName = (first, last) => first + " " + last;

const power = (base, exp) => {
  if (exp === 0) {
    return 1;
  }
  return base * power(base, exp - 1);
};

const sumCubes = (numbers) => {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + cube(numbers[i]);
  }
  return total;
};

// What is the difference between function declaration and function expression
 // function declaration
// function square(x) {
//   return x * x;
// }

// function expression
// const square = function(x) {
//   return x * x;
// };

//The difference between function declaration and function expression
// is that function declaration is hoisted and function expression is not hoisted.


// Why does JavaScript throw an error instead of logging undefined in the following code?
// console.log(message);
// let message = 'Hi there!';
//Answer: because let is block scoped and it is not hoisted.   

// Explain precisely what happens when the following code is executed.
// console.log(showMessage());
// const showMessage = function(){
//   return 'Hi there!';
// };
//Answer: In the first line, it tries to access the showMessage function, but it is not hoisted, so it throws an error.

// Why does JavaScript not throw any errors when the following code is executed?
// console.log(showMessage());
// function showMessage(){
//   return 'Hi there!';
// }
//Answer: Because the function declaration is hoisted.


// 1.
// for(let i = 0; i < values.length; i++){
//   console.log(values[i]);
// }

// let values = [10, 20, 30];

//Answer: 

let values = [10, 20, 30];
for(let i = 0; i < values.length; i++){
  console.log(values[i]);
}

// 2.
// console.log(welcome('Charlie', 'Munger'));

// function welcome(first, last) {
//   return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`
// };

// let lastLogin = '1/1/1970';

//Answer:

let lastLogin = '1/1/1970';
function welcome(first, last) {
  return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`
};
console.log(welcome('Charlie', 'Munger'));