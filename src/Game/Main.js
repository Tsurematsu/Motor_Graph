import Graph from "../tools/Graph.js";
import System from "../tools/System.js";
import Logical from "./Heart/Logical.js";
import Draw from "./Heart/Draw.js";
import LoadResources from "./Heart/Resources.js";
export default  function Main (canvas, Document, size) {
    const graph = new Graph(canvas);
    graph.setSize(size);
    let Looping;
    this.fps = 20;
    this.time = 1000/this.fps;
    this.scripts = [];
    this.local_Graph = graph;
    let pause = false;
    
    this.event_Keys = new function () {this.keydown = ()=>{};this.keyup = ()=>{};};
    this.keyList={};
    this.start = async function () {
        let Config = await System.Import.json("/src/Game/Data/config.json");
        
        this.fps = Config.fps;
        this.time = Config.time/this.fps;

        let objParam = {
            graph: graph,
            scripts: this.scripts,
            vars: null,
        };

        let Local_LoadResources = new LoadResources(Config);
        let Local_Logical = new Logical(Config);
        let Local_Draw = new Draw();

        this.event_Keys.keydown = (e)=>{e = {keyCode:e}; Local_LoadResources.keydown(e);Local_Logical.keydown(e);Local_Draw.keydown(e);};
        this.event_Keys.keyup = (e)=>{e = {keyCode:e}; Local_LoadResources.keyup(e);Local_Logical.keyup(e);Local_Draw.keyup(e);}
        
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
        this.keyList = objParam.vars.resources.keys??null;
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