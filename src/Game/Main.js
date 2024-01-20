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
        let Scripts = Config.scripts;
        this.fps = Config.fps;
        this.time = Config.time/this.fps;

        let objParam = {
            graph: graph,
            scripts: this.scripts,
            vars: null,
        };

        let Local_LoadResources = new LoadResources(Config);
        let Local_Logical = new Logical(Config);
        let Local_Draw = new Draw(Config);


        let ImportPromises = [];
        let ObjectScripts = [];
        Object.entries(Scripts).forEach(([key, value],) => {
             ImportPromises.push(new Promise((resolve, reject) => {
                System.Import.js(value).then((Script) => {
                    ObjectScripts.push(new Script(Config));
                    resolve();
                });
             }))
        });
        await Promise.all(ImportPromises);

        this.event_Keys.keydown = (e)=>{
            e = {keyCode:e}; 
            Local_LoadResources.keydown(e);
            Local_Logical.keydown(e);
            Local_Draw.keydown(e);
            ObjectScripts.forEach((script) => script.keydown(e));
        };

        this.event_Keys.keyup = (e)=>{
            e = {keyCode:e}; 
            Local_LoadResources.keyup(e);
            Local_Logical.keyup(e);
            Local_Draw.keyup(e);
            ObjectScripts.forEach((script) => script.keyup(e));
        }
        
        Document.addEventListener("keydown", Local_LoadResources.keydown);
        Document.addEventListener("keyup", Local_LoadResources.keyup);
        
        Document.addEventListener("keydown", Local_Logical.keydown);
        Document.addEventListener("keyup", Local_Logical.keyup);
        
        Document.addEventListener("keydown", Local_Draw.keydown);
        Document.addEventListener("keyup", Local_Draw.keyup);

        ObjectScripts.forEach((script) => Document.addEventListener("keydown", script.keydown));
        ObjectScripts.forEach((script) => Document.addEventListener("keyup", script.keyup));

        objParam = await Local_LoadResources.void(objParam);
        objParam = await Local_Logical.void(objParam);
        objParam = await Local_Draw.void(objParam);

        ObjectScripts.forEach((script) => objParam = script.void(objParam));

        this.keyList = objParam.vars.resources.keys??null;
        Looping = setInterval(async () => {
            if (!pause) {
                objParam = await Local_LoadResources.loop(objParam);
                objParam = await Local_Logical.loop(objParam);
                objParam = await Local_Draw.loop(objParam);
                ObjectScripts.forEach((script) => objParam = script.loop(objParam));
            }
        }, this.time);
    }

    this.stop = function () {clearInterval(Looping);}
    this.pause = function () {pause = true;}
    this.play = function () {pause = false;}

}