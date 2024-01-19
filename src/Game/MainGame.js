import Graph from "../tools/Graph.js";
import System from "../tools/System.js";

import Logical from "./Logical.js";
import Draw from "./Draw.js";
import LoadResources from "./LoadResources.js";
export default  function mainGame (canvas, Document) {
    const graph = new Graph(canvas);
    let Looping;
    this.fps = 60;
    this.time = 1000/60;
    this.scripts = [];
    graph.setSize({ width: 500, height: 300, resolution: 1 });
    let LoadStatus = true;
    let pause = false;
    this.start = function () {
        let objParam = {
            graph: graph,
            scripts: this.scripts,
            vars: null,
        };
        
        Looping = setInterval(async () => {
            if (!pause) {
                if (LoadStatus) {
                    LoadStatus = false; 
                    objParam = await LoadResources(objParam, Document);
                }
                objParam = await Logical(objParam);
                objParam = await Draw(objParam);
            }
        }, this.time);
    }
    this.stop = function () {
        clearInterval(Looping);
        LoadStatus = true;
    }
    this.pause = function () {
        pause = true;
    }
    this.play = function () {
        pause = false;
    }

}
    // let images = await System.Import.img([
    //     { name: "cat", url: "/src/img/cat.jpg" },
    //     { name: "block", url: "/src/img/block1.jpeg" },
    //     { name: "player", url: "/src/img/player.png" },
    //     { name: "blocks", url: "/src/img/blocks.png" },
    // ]);

    // const canvas = document.getElementById("canvas");
    // const graph = new Graph(canvas);
    // graph.testDraw({
    //                 image:images.File.cat, 
    //                 block1:images.File.block, 
    //                 sheet:images.File.player, 
    //                 blocks:images.File.blocks,
    //                 draw_player:false
    //             });
    