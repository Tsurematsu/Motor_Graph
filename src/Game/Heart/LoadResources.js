import System from '../../tools/System.js';
export default function LoadResources () {

    this.keydown = (e) => {};
    this.keyup = (e) => {};

    this.void= async ({ graph, scripts, vars })=>{        
        vars = {};
        vars.resources = {};
        console.log("Loading resources...");
        let resources = [
            {name:"player", url:"/src/img/player.png"},
            {name:"blocks", url:"/src/img/blocks.png"},

        ]
        vars.resources.keys = await System.Import.json("/src/Game/Data/Keys.json");
        vars.resources.images = await System.Import.img(resources)
        
        async function make_Player(){
            let File_player = vars.resources.images.File.player;
            let player_Sheet = graph.draw.spriteSheet(File_player, {cols: 4, rows: 4}).create();
            let save_images = {
                up:{list:[], index:3}, 
                down:{list:[], index:0},
                left:{list:[], index:1},
                right:{list:[], index:2},
            };
            let Promises = [];  
            for (const key in save_images) {
                let select_orientation = save_images[key].index;
                player_Sheet.draw[select_orientation].forEach((animate, index) => {
                    Promises.push(new Promise(async (resolve, reject) => {
                        save_images[key].list.push((await animate.get()).image);
                        resolve();
                    }))
                });
            }
            for (const key in save_images) {save_images[key] = save_images[key].list;}
            console.log("Load player...");
            await Promise.all(Promises);
            vars.resources.player = save_images;
            console.log("Load player =>OK");    
        }
        await make_Player()

        async function make_Blocks(){
            let File_blocks = vars.resources.images.File.blocks;
            let blocks_Sheet = graph.draw.spriteSheet(File_blocks, {cols: 6, rows: 3}).create();
            // vars.resources.blocks = blocks_Sheet.draw;
            blocks_Sheet.draw[1][0].apply()
        }
        await make_Blocks()

        console.log("Loading resources =>OK");
        return { graph, scripts, vars};
    };

    this.loop = ({ graph, scripts, vars })=>{
        return { graph, scripts, vars};
    }
}

