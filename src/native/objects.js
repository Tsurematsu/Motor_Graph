export default function objects(draw, Area) {
    this.circle = function circle() {
        let point =  {x:0, y:0};
        let radius = 10;
        let color = "red";
        let properties = {}
        this.limits = {...Area};
        this.setProperties = (I_properties)=>{properties = I_properties; return this;}
        this.getProperties = ()=>{return properties;}
        this.addProperty = (object)=>{
            let key = Object.keys(object)[0];     
            properties[key] = object[key]; 
            return this;
        }
        
        this.setPoint = (I_point)=>{point = I_point; return this;}
        this.getPoint = ()=>{return point;}
        
        this.setColor = (I_color)=>{color = I_color; return this;}
        this.getColor = ()=>{return color;}
        
        this.setRadius = (I_radius)=>{radius = I_radius; return this;}
        this.getRadius = ()=>{return radius;}
        
        this.draw = ()=>{
            draw.point(point, radius, color);
            return this;
        }
    }
    
}