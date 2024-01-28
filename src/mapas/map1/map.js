export default new function map1(){
    let importMain;
    this.load = async (url)=>{ importMain = await url;
        
        let {circle} = importMain.nativeObjects;
        
        importMain.objects.push(new circle()
            .addProperty({gravity: 0.5})
            .setPoint({x:100, y:10}));
    
    }
}