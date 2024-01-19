import Main from "./Game/Main.js";
async function main() {
    const canvas = document.getElementById("canvas");
    canvas.style.border = "1px solid red";
    canvas.style.backgroundColor = "white";
    let game = new Main(canvas, document.body);
    // game.scripts.push(new test());
    game.start();
}
main();



