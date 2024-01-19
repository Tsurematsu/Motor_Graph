import Main from "./Game/Main.js";
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
    // game.scripts.push(new test());
    await game.start();


    Object.entries(game.keyList).forEach(([key, value],) => {
        let elemento = document.getElementById(key);
        if (elemento) {
            elemento.addEventListener("mousedown", ()=>{game.event_Keys.keydown(value);});
            elemento.addEventListener("mouseup", ()=>{game.event_Keys.keyup(value);});
            elemento.addEventListener("mouseout", ()=>{game.event_Keys.keyup(value);});//Cuando se pierde el foco
        }
    });

    window.addEventListener("resize", ()=>{
        game.local_Graph.setSize({
            width: window.innerWidth, 
            height: window.innerHeight, 
            resolution: 1 
        })
    });
    
    let statusFullScreen = false;
    canvas.addEventListener("dblclick", ()=>{
        if (statusFullScreen) {
            statusFullScreen = false;
            document.exitFullscreen();
        }else{
            document.body.requestFullscreen();
            statusFullScreen = true;
        }
    })
}
main();



