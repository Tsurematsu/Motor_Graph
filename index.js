import Game from "./src/Game.js";
async function index(){
    let Resolution = 82;
    let thisSize = {
        width: (6 * Resolution),
        height: (4 * Resolution),
    }
    Game.setCanvas(document.getElementById("Game"));
    Game.setSize.
        area(thisSize).
        size(thisSize);
    Game.getCanvas().style.backgroundColor = "#000";
    await Game.Start();
    document.body.addEventListener("keydown", (event)=>{Game.keyEvents.KeyDown(event);});
    document.body.addEventListener("keyup", (event)=>{Game.keyEvents.KeyUp(event);});
}
index();
