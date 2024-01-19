export default function Draw({ graph, scripts, vars }) {
    
    
    
    
    
    
    // validamos si hay una función llamada draw en los scripts
    scripts.forEach(script => {
        if(script.draw != undefined) {
            let Return = script.draw({ graph, scripts, vars });
            if(Return != undefined) {
                graph = Return.graph;
                scripts = Return.scripts;
                vars = Return.vars;
            };
        };
    });
    
    return { graph, scripts, vars};
}