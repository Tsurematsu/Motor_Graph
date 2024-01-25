import Graph from "./libs/Graph.js";
import System from "./libs/System.js";
export default new function mechanism(){
    let Timer;
    let runTime = false;
    this.seconds = 1000;
    this.frames = 60;
    this.map = [];
    this.nativeObjects = {};
    this.objects = [];
    this.begin = async (URLGame, args) =>{
        this.routes = await System.import.json("/src/routes.json");
        this.game = await import(URLGame).then((select) => {return select.default;});
        this.Graph = new Graph(this.game.getContext(), this.game.getCanvas());
        let url = (new URL(import.meta.url)).pathname;
        let Layers = [
            this.routes.layers.resources,
            this.routes.layers.logical,
            this.routes.layers.draw
        ]
        let promises=[];
        Layers.forEach((layer)=>{
            promises.push(import(layer).then(async (select) => {
                if(select.default.void){
                    console.log("Loading "+layer+" ...");
                    await select.default.void(
                        import(url).then((select) => {return select.default;})
                    );
                    return select.default;
                }else{
                    return null;
                }
            }));
        });
        promises = await Promise.all(promises);
        let Loop = ()=>{
            if (runTime) {
                promises.forEach((select)=>{
                    if (select!=null && select.loop) {
                        select.loop()
                    }
                });
            }
        }
        runTime = true;
        Timer = setInterval(Loop, this.seconds/this.frames);
    }
    this.pause = ()=>{runTime = false;}
    this.play = ()=>{runTime = true;}
    this.stop = ()=>{clearInterval(Timer);}
}