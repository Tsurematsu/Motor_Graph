import mainGame from "./Game/MainGame.js";

import test from "./Game/Scripts/test.js";
async function main() {
    const canvas = document.getElementById("canvas");
    canvas.style.border = "1px solid red";
    canvas.style.backgroundColor = "black";
    let game = new mainGame(canvas, document.body);
    game.scripts.push(new test());
    game.start();
}
main();



