// import Main from "./Game/Main.js";
async function main() {
    const canvas = document.getElementById("canvas");
    canvas.style.border = "1px solid red";
    canvas.style.backgroundColor = "white";
    
    let sizeScreen ={ 
        width: window.innerWidth, 
        height: window.innerHeight, 
        resolution: 1 
    };

    let game = new Main(canvas, document.body, sizeScreen);
    
    await game.start();

    Object.entries(game.keyList).forEach(([key, value],) => {
        let elemento = document.getElementById(key);
        if (elemento) {
            elemento.addEventListener("mousedown", ()=>{game.event_Keys.keydown(value);});
            elemento.addEventListener("mouseup", ()=>{game.event_Keys.keyup(value);});
            elemento.addEventListener("mouseout", ()=>{game.event_Keys.keyup(value);});//Cuando se pierde el foco
        }
    });
    
    // let statusFullScreen = false;
    // canvas.addEventListener("dblclick", ()=>{
    //     if (statusFullScreen) {
    //         statusFullScreen = false;
    //         document.exitFullscreen();
    //     }else{
    //         document.body.requestFullscreen();
    //         statusFullScreen = true;
    //     }
    // })
    
}
// main();






// console.log("line 1 ", this);

let example = new function(){
    this.apply1 = "Hello World";
    this.apply2 = "Hello World";
    let apply3 = "Hello World";
    // console.log("line 2 ", this);
}

let example2 = class{
    constructor(){
        this.apply1 = "Hello World";
        this.apply2 = "Hello World";
        let apply3 = "Hello World";
        // console.log("line 2 ", this);
    }
}

let example3 = {
    apply1: "Hello World",
    apply2: "Hello World",
    apply3: "Hello World",
    apply4: function(){
        console.log(this.apply1);
        console.log("line 2 ", this);
    }

}

console.log(example3.apply4());

// console.log("line 3 ", this);

// console.log(example.apply3);