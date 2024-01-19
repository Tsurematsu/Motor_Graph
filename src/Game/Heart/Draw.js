export default function Draw() {

    this.keydown = (e) => {};
    this.keyup = (e) => {};
    
    this.void=({ graph, scripts, vars })=>{
        
        return { graph, scripts, vars};
    };
    
    let look = false;
    this.loop = ({ graph, scripts, vars })=>{
        // graph.draw.clean();
        // graph.draw.Image(vars.logic.player.image, vars.logic.player.point, vars.logic.player.size);
        
        // let image = vars.resources.player.left[0]
        // graph.draw.point(vars.logic.player.point, 10, "blue");
        // vars.logic.player.point
        return { graph, scripts, vars};
    }
}