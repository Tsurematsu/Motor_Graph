import System from '../libs/System.js';
import Native_Objects from '../native/objects.js';
export default new function resources(){
    let importMain;
    let Maps;
    this.void = async (url)=>{
        importMain = await url;
        Maps = await System.import.json(importMain.routes.maps);
        importMain.map = await import(Maps[importMain.game.selectMap]).then(mines=>mines.default);
        importMain.nativeObjects = new Native_Objects(importMain.Graph.draw, importMain.game.getArea())
        if (importMain.map.load) {await importMain.map.load(url)}
    }
};