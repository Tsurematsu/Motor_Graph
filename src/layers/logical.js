export default new function logical(){
    let importMain, keyEvents, Area, buildInit = true, promisesBuild =true, properties = {}, EventsObjects = [];
    this.void =async (url)=>{
        importMain = await url;
        keyEvents = importMain.game.keyEvents;
        Area = importMain.game.getArea()
        keyEvents.KeyUp = (event)=>{}
        keyEvents.KeyDown = (event)=>{}
    }
    this.loop = async ()=>{
        
        importMain.objects.forEach((object)=>{
            if (buildInit) {
                properties = {...properties , ...object.getProperties()};
            } else if(!promisesBuild){
                Object.entries(object.getProperties()).map(([key])=>{
                    EventsObjects[key](object, Area);
                })    
            }
        });
        if (buildInit){
            buildInit = false;
            let keysEvents = Object.keys(properties);
            EventsObjects =[];
            keysEvents.map((nameEvent)=>{
                let uri = importMain.routes.events + nameEvent + ".js";
                EventsObjects.push(new Promise(async (resolve, reject)=>{
                    let event = {};
                    try {
                        event[nameEvent] = await import(uri).then((select) => {return select.default;})
                        console.log("Loading event: ", {[nameEvent]: uri});
                    } catch (error) {
                        console.error("Not exist event: ", {[nameEvent]: uri});
                        event[nameEvent] = ()=>{};
                    }
                    resolve(event);
                }));
            });
            EventsObjects = await Promise.all(EventsObjects);
            if (EventsObjects.length === 0) {EventsObjects = {};}else{
                EventsObjects = EventsObjects.reduce((autoIncrement, ArrayList)=>{
                    return {...autoIncrement, ...ArrayList};
                });
            }
            promisesBuild = false;
        }
    }
};