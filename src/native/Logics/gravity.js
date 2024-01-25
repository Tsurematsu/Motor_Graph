
export default function gravity(object){
    let point = object.getPoint();
    if (object.cacheGravity === undefined) {object.cacheGravity = {};}
    if (object.cacheGravity.constan === undefined) {object.cacheGravity.constan = 0;} 
    if (point.y >= object.limits.height) {
        point.y = object.limits.height;
        object.cacheGravity.constan = 0;
    }else {
        object.cacheGravity.constan += object.getProperties().gravity;
        point.y += object.cacheGravity.constan;
    }
    point.y -=10;
} 