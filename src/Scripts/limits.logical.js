export default function Limits () {
    this.void = ({ graph, scripts, vars })=>{}
    this.loop = ({ graph, scripts, vars })=>{
        if (vars.logical.player.x < 0) {
            vars.logical.block.left = true;
        }
    }
}