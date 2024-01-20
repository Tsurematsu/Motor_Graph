import Graph from "../tools/Graph.js";
import System from "../tools/System.js";
import Logical from "./Heart/Logical.js";
import Draw from "./Heart/Draw.js";
import LoadResources from "./Heart/Resources.js";

export default  function Main (canvas, Document, size) {
    const graph = new Graph(canvas);
    const keyNames = {
        keydown: "keydown",
        keyup: "keyup",
    }

    graph.setSize(size);
    let Looping;
    this.fps = 20;
    this.time = 1000/this.fps;
    this.scripts = [];
    this.local_Graph = graph;
    let pause = false;
    
    this.keyPressed = new function () {
        this.keydown = (e)=>{}
        this.keyup = (e)=>{}
    }

    this.keyList={};

    this.start = async function () {
        let Config = await System.Import.json("/src/Game/Data/config.json");

        let Scripts = Config.scripts; // Alias
        this.fps = Config.fps;
        this.time = Config.time/this.fps;

        let objParam = {
            graph: graph,
            scripts: this.scripts,
            vars: null,
        };

        let localLoadResources = new LoadResources(Config);
        let localLogical = new Logical(Config);
        let localDraw = new Draw(Config);


        let ImportPromises = [];
        let ObjectScripts = [];
        
        Object.entries(Scripts).forEach(([key, value],) => {
             ImportPromises.push(new Promise(async (resolve, reject) => {
                let Script = await import(value);
                ObjectScripts.push(new Script.default(Config));
                resolve();
             }))
        });

        await Promise.all(ImportPromises);

        this.keyPressed = new function () {
            this.keydown = (e)=>{pressed(e, keyNames.keydown);}
            this.keyup = (e)=>{pressed(e, keyNames.keyup);}
            function pressed(e, key) {
                localLoadResources[key](e);
                localLogical[key](e);
                localDraw[key](e);
                ObjectScripts.forEach((script) => script[key](e));
            }
        }
        
        Document.addEventListener(keyNames.keydown, this.keyPressed.keydown);
        Document.addEventListener(keyNames.keyup, this.keyPressed.keyup);
        
        objParam = await localLoadResources.void(objParam);
        objParam = await localLogical.void(objParam);
        objParam = await localDraw.void(objParam);

        ObjectScripts.forEach((script) => objParam = script.void(objParam));

        this.keyList = objParam.vars.resources.keys??null;
        
        Looping = setInterval(async () => {
            if (!pause) {
                objParam = await localLoadResources.loop(objParam);
                objParam = await localLogical.loop(objParam);
                objParam = await localDraw.loop(objParam);
                ObjectScripts.forEach((script) => objParam = script.loop(objParam));
            }
        }, this.time);
    }

    this.stop = function () {clearInterval(Looping);}
    this.pause = function () {pause = true;}
    this.play = function () {pause = false;}

}