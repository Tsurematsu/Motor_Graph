export default function Graph(canvas) {
    const context = canvas.getContext("2d");
    this.canvas = canvas;
    this.context = context;

    this.setSize = function({ width, height, resolution=1 }) {
        canvas.width = width * resolution;
        canvas.height = height * resolution;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
    }

    this.block = (blocks, size)=>{
        return {
            width: size.width * blocks.cols,
            height: size.height * blocks.rows
        }
    }

    this.draw = new function () {

        // This function to generate image for ofter canvas
        this.Graphs = async function (callback, { width, height, resolution=1 }, ...ags){
            let canvas = document.createElement('canvas');        
            let context = canvas.getContext("2d");
            canvas.width = width * resolution;
            canvas.height = height * resolution;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";
            callback(context, { width, height, resolution }, ...ags);
            let image = new Image();
            image.src = canvas.toDataURL('image/png');
            let data = await new Promise((resolve, reject) => {
                image.onload = () => {resolve(image);}
            })
            return { data,canvas, context, image};
        }

        // This function is used to draw a line
        this.line = function(pointA, pointB, color) {
            context.moveTo(pointA.x, pointA.y);
            context.lineTo(pointB.x, pointB.y);
            context.strokeStyle = color;
            context.stroke();
        }
        
        // This function is used to draw a point
        this.point = function(point, radius, color) {
            context.beginPath();
            context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
            context.fillStyle = color;
            context.fill();
        }
        
        // This function is used to draw a rectangle
        this.rect = function(point, size, color) {
            context.fillStyle = color;
            context.fillRect(point.x, point.y, size.width, size.height);
        }
        
        // This function is used to draw an image
        this.Image = function(image, point, size) {
            context.drawImage(image, point.x, point.y, size.width, size.height);
        }
        
        // This function is used to clean the canvas
        this.clean = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        // this function is used to draw text
        this.text = function(text, x, y, color, size) {
            context.fillStyle = color;
            context.font = size + "px Arial";
            context.fillText(text, x, y);
        }

        // This object is used to store the local resources
        let Basic_Resources =  {
            Graphs:this.Graphs,
            Line:this.line,
            Point:this.point,
            Rect:this.rect,
            Image:this.Image,
            Clean:this.clean,
            Text:this.text,
        };
        
        // This function is used to create a texture
        this.texture = async function(image, size, inSize) { 
            let ResizeImage = await this.Graphs((ctx, {width, height}, image) => {
                ctx.drawImage(image, 0, 0, width, height);
            }, inSize, image);
            
            let TextureImg = await this.Graphs((ctx, {width, height}, image) => {
                let texture = context.createPattern(image, "repeat");
                ctx.fillStyle = texture;  
                ctx.fillRect(0, 0, width, height);  
            }, size, ResizeImage.image)

            return {
                draw: (point={x:0, y:0})=>{context.drawImage(TextureImg.image, point.x, point.y, size.width, size.height);},
                image: TextureImg.image,
                size,
                inSize
            }
        }

        this.texture2 = async function(image, matrix, size) {
            return await this.texture(image, {width:size.width*matrix.cols, height:size.height*matrix.rows}, size);
        }
        
        // This function is used to create a sprite sheet
        this.spriteSheet = function(sheet, matrix) {
            let Return = []
            let Short = {
                width: sheet.width / matrix.cols,
                height: sheet.height / matrix.rows
            }
            return new function(){
                // This is the point of the sprite sheet
                let Intern_point= {x:0, y:0};
                
                // This is the size of the sprite sheet
                let Intern_size = {width:100, height:100};
                
                // This function is used to set the point of the sprite sheet
                this.setPoint = (x, y)=>{Intern_point.x = x; Intern_point.y = y; return this;}
                
                // This function is used to set the size of the sprite sheet
                this.setSize = (width, height)=>{Intern_size.width = width; Intern_size.height = height; return this;}
                
                // This function is used to create a sprite sheet
                this.create = (point, size)=>{
                    if (size != undefined) {Intern_size = size;}
                    if (point != undefined) {Intern_point = point;}
                    for (let rows = 0; rows < matrix.rows; rows++) {
                        let row = [];
                        for (let cols = 0; cols < matrix.cols; cols++) {
                            row.push(new function(){
                                this.apply = (size, point)=>{
                                    let Local_size = size==undefined?{...Intern_size}:{...size};
                                    let Local_point = point==undefined?{...Intern_point}:{...point};
                                    Draw_Extended(sheet, context, {cols, rows}, Local_point, Local_size, Short);
                                }
                                this.get = (size)=>{
                                    let Local_size = size==undefined?{...Intern_size}:{...size};
                                    return Basic_Resources.Graphs((ctx, Local_size, image) => {
                                        Draw_Extended(image, ctx, {cols, rows}, {x:0, y:0}, Local_size, Short);
                                    }, Local_size, sheet);
                                }
                            });
                        }
                        Return.push(row);
                    }
                    return this;
                }

                // This function is used to draw the sprite sheet
                this.draw = Return;
                
                // This function is used to get the image of a sprite sheet
                this.getImage = async (select, sizeTemp)=>{
                    return await Basic_Resources.Graphs((ctx, {width, height}, image) => {
                        Draw_Extended(image, ctx, select, {x:0, y:0}, {width, height}, Short);
                    }, sizeTemp, sheet);
                }
                
                // The function is used to draw the sprite sheet
                function Draw_Extended(sheet, ctx, matrix, point, size, inSize){
                    ctx.drawImage(
                        sheet,
                        inSize.width*matrix.cols, 
                        inSize.height*matrix.rows, 
                        inSize.width, 
                        inSize.height, 
                        point.x, 
                        point.y, 
                        size.width, 
                        size.height
                    );
                }
            };
        }
        
        // This function is used to get an area of the canvas
        this.getArea = async function(canvas, point, size) {
            let local_canvas = document.createElement('canvas');
            let local_context = local_canvas.getContext("2d");
            local_canvas.width = size.width;
            local_canvas.height = size.height;
            local_context.drawImage(canvas, point.x, point.y, size.width, size.height, 0, 0, size.width, size.height);
            let image = new Image();
            image.src = local_canvas.toDataURL('image/png');
            return await new Promise((resolve, reject) => {
                image.onload = () => {resolve(image);}
            })
        }

        let Compound_resources = {
            Texture:this.texture,
            SpriteSheet:this.spriteSheet,
            getArea:this.getArea    
        }
    }

    this.testGift = async (img)=>{

    }


    // This function is used to test the canvas
    this.testDraw = async ({image, block1, sheet, blocks, draw_player=false}) => {
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
        
        // make size texture of block2
        let block_2 = this.block({cols:2, rows:2}, block_size);
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



}

