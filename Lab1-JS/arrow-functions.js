
// function sayHello() {
//     return "Hello, world!";
// }

const sayHelloArrow = () => "Hello, world!";



// Regular function
// function double(x) {
//     return x * 2;
// }

const double = (x) => x * 2;

// Regular function
// function add(x, y) {
//     return x + y;
// }

const add = (x, y) => x + y;


// Regular function
// const person = {
//     name: "Alice",
//     sayHi: function() {
//         return "Hi, " + this.name + "!";
//     }
// };

const person = {
    name: "Alice",
    sayHi: () => "Hi, " + this.name + "!"
};

// const numbers = [1, 2, 3, 4, 5];

// const doubled = [];
// numbers.forEach(function(num) {
//   doubled.push(num * 2);
// });

const numbers = [1, 2, 3, 4, 5];
const doubled = [];

numbers.forEach(num => doubled.push(num * 2));




