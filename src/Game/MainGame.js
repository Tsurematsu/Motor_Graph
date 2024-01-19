import Graph from "../tools/Graph.js";

import Logical from "./Heart/Logical.js";
import Draw from "./Heart/Draw.js";
import LoadResources from "./Heart/LoadResources.js";
export default  function mainGame (canvas, Document) {
    const graph = new Graph(canvas);
    let Looping;
    this.fps = 60;
    this.time = 1000/60;
    this.scripts = [];
    graph.setSize({ width: 500, height: 300, resolution: 1 });
    let pause = false;
    this.start = async function () {
        let objParam = {
            graph: graph,
            scripts: this.scripts,
            vars: null,
        };

        let Local_LoadResources = new LoadResources();
        let Local_Logical = new Logical();
        let Local_Draw = new Draw();
        
        Document.addEventListener("keydown", Local_LoadResources.keydown);
        Document.addEventListener("keyup", Local_LoadResources.keyup);
        
        Document.addEventListener("keydown", Local_Logical.keydown);
        Document.addEventListener("keyup", Local_Logical.keyup);
        
        Document.addEventListener("keydown", Local_Draw.keydown);
        Document.addEventListener("keyup", Local_Draw.keyup);
        
        // scripts.forEach(script => {
        //     if(script.draw != undefined) {
        //         let Return = script.draw({ graph, scripts, vars });
        //         if(Return != undefined) {
        //             graph = Return.graph;
        //             scripts = Return.scripts;
        //             vars = Return.vars;
        //         };
        //     };
        // });

        objParam = await Local_LoadResources.void(objParam);
        objParam = await Local_Logical.void(objParam);
        objParam = await Local_Draw.void(objParam);

        Looping = setInterval(async () => {
            if (!pause) {
                objParam = await Local_LoadResources.loop(objParam);
                objParam = await Local_Logical.loop(objParam);
                objParam = await Local_Draw.loop(objParam);
            }
        }, this.time);
    }
    this.stop = function () {
        clearInterval(Looping);
    }
    this.pause = function () {
        pause = true;
    }
    this.play = function () {
        pause = false;
    }

}