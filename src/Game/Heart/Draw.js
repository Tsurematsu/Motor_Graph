export default function Draw() {

    this.keydown = (e) => {};
    this.keyup = (e) => {};
    
    this.void=({ graph, scripts, vars })=>{
        
        return { graph, scripts, vars};
    };
    
    let look = true;
    this.loop = ({ graph, scripts, vars })=>{
        graph.draw.clean();
        graph.draw.Image(vars.resources.blocks.pared.image, {x:0, y:0}, vars.resources.blocks.pared.size);
        graph.draw.Image(vars.logic.player.image, vars.logic.player.point, vars.logic.player.size);
        
        // let image = vars.resources.player.left[0]
        // graph.draw.point(vars.logic.player.point, 10, "blue");
        // vars.logic.player.point
        return { graph, scripts, vars};
    }
}