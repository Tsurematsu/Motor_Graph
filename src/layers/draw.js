export default new function draw(){
    let importMain;
    let draw;
    this.void =async (url)=>{
        importMain = await url;
        draw = importMain.Graph.draw;    
    }
    this.loop = ()=>{
        draw.clean();
        importMain.objects.forEach((object)=>{
            object.draw();
        });   
    }
}