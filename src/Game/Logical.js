let init = true;
export default function Logical ({ graph, scripts, vars }) {
    scripts.forEach(script => {
        if(script.logical != undefined) {
            let Return = script.logical({ graph, scripts, vars });
            if(Return != undefined) {
                graph = Return.graph;
                scripts = Return.scripts;
                vars = Return.vars;
            };
        };
    });

    return { graph, scripts, vars};
}