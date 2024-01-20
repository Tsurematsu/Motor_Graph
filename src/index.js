





class testClass1{
    constructor(){}
    variable1 = "Hello World";
}


class testClass2 extends testClass1{
    constructor(){
        super();
    }
    changeVariable(){
        this.variable1 = "Hello World 3";
    }
}

let objeto1 = new testClass1();
let objeto2 = new testClass2();

console.log(objeto1.variable1);
objeto2.changeVariable();
console.log(objeto2.variable1);
console.log(objeto1.variable1);























// console.log("line 1 ", this);

// let example = new function(){
//     this.apply1 = "Hello World";
//     this.apply2 = "Hello World";
//     let apply3 = "Hello World";
//     // console.log("line 2 ", this);
// }

// class example2{
//     #apply1 ="Hello World";
//     get apply1(){
//         return this.#apply1;
//     }
// }

// let example3 = {
//     apply1: "Hello World",
//     apply2: "Hello World",
//     apply3: "Hello World",
//     apply4: function(){
//         console.log(this.apply1);
//     }
// }

// console.log(example.apply1);

// let objeto1 = new example2();



// objeto1.apply1 = "Hello World 2";
// console.log(objeto1.apply1);

// console.log("line 3 ", this);

// console.log(example.apply3);