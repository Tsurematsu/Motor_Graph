import System from '../tools/System.js';
// ...
// ...
export default async function LoadResources ({ graph, scripts, vars }, Document) {
    vars = {};
    vars.resources = {};
    console.log("Lodading resources");
    let resources = [
        {name:"player", url:"/src/img/player.png"},
        {name:"blocks", url:"/src/img/blocks.png"},
    ]

    vars.resources.images = await System.Import.img(resources)

    async function make_Player(){
        let File_player = vars.resources.images.File.player;
        let player_Sheet = graph.draw.spriteSheet(File_player, {cols: 4, rows: 4}).create();
        let save_images = {
            up:{list:[], index:0}, 
            down:{list:[], index:1},
            left:{list:[], index:2},
            right:{list:[], index:3},
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
        console.log("Loading player");
        await Promise.all(Promises);
        vars.resources.player = save_images;
        console.log("Player loaded");
    }
    await make_Player()

    async function make_Blocks(){
        let File_blocks = vars.resources.images.File.blocks;
        let blocks_Sheet = graph.draw.spriteSheet(File_blocks, {cols: 6, rows: 3}).create();
        vars.resources.blocks = blocks_Sheet.draw;
    }
    await make_Blocks()
    
    scripts.forEach(script => {
        // Valida si en los scrips hay una función llamada resources
        if(script.resources != undefined) {
            let Return = script.resources({ graph, scripts, vars });
            if(Return != undefined) {
                graph = Return.graph;
                scripts = Return.scripts;
                vars = Return.vars;
            };
        };
        
    });

    console.log("Resources loaded");
    return { graph, scripts, vars};
}




  // This function is used to test the canvas
  let testDraw = async ({image, block1, sheet, blocks, draw_player=false}) => {
    // clean screen
    this.draw.clean();

    // draw line
    this.draw.line({x:0, y:0}, {x:100, y:100}, "red");        
    
    // draw point
    this.draw.point({x:100, y:100}, 10, "blue");
    
    // draw rectangle
    this.draw.rect({x:100, y:100}, {width:100, height:100}, "green");
    
    // draw image
    this.draw.Image(image, {x:130, y:130}, {width:100, height:100});
    
    // make texture
    let texture = await this.draw.texture(block1, {width:200, height:200}, {width:200, height:200});
    // draw texture
    this.draw.Image(texture.image, {x:240, y:80}, texture.size);
    
    // make sprite sheet block
    let Blocks = this.draw.spriteSheet(blocks, {cols: 6, rows: 3}).create();
    // generate image of block
    let IMG_Generated_Block1 = await Blocks.getImage({cols: 0, rows: 0}, {width:100, height:100});
    // draw image of block
    this.draw.Image(IMG_Generated_Block1.image, {x:10, y:10}, {width:100, height:100});

    // generate image of block2
    let IMG_Generated_Block_2 = await Blocks.getImage({cols: 2, rows: 0}, {width:100, height:100});
    // set block size for texture
    let block_size = {width:50, height:50};
    //this function is used to calculate the size of the texture
    let size_texture = (blocks, size)=>{
        return {
            width: size.width * blocks.cols,
            height: size.height * blocks.rows
        }
    }
    // make size texture of block2
    let block_2 = size_texture({cols:2, rows:2}, block_size);
    // make texture of block2
    let Texture_to_Block = await this.draw.texture(IMG_Generated_Block_2.image, block_2, block_size);
    // draw texture of block2
    this.draw.Image(Texture_to_Block.image, {x:10, y:120}, block_2);
    
    // make sprite sheet player
    if (draw_player) {
        let drawSheet = this.draw.spriteSheet(sheet, {cols: 4, rows: 4}).create();
        let count =0;
        let orientation = 0;
        // let moveX = -100 % image.width; nota: Con el modulo es posible generar u movimiento infinito
        setInterval(()=>{
            this.draw.clean();
            drawSheet.draw[orientation][count]();
            count = (count + 1) % 4;
        }, 200);
    }

    // get area of canvas
    let image_short = await this.draw.getArea(this.canvas, {x:60, y:60}, {width:100, height:100});;
    this.draw.Image(image_short, {x:100, y:200}, {width:100, height:100});


}