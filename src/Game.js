import mechanism from "./mechanism.js";
export default new function Game(){
    let url = (new URL(import.meta.url)).pathname;
    let canvas;
    let context;
    let ScreenSize;
    let ScreenArea;
    this.selectMap = 0;
    this.keyEvents = {};
    this.setCanvas = (element)=>{
        canvas = element;
        context = canvas.getContext("2d");
        return this;
    }
    this.getCanvas = ()=>{
        return canvas;
    }
    this.getContext = ()=>{
        return context;
    }
    this.getArea = ()=>{
        return {
            width: canvas.width,
            height: canvas.height
        };
    }
    this.setSize = new function () {
        this.area = function (size) {
            ScreenArea = size;
            canvas.width = size.width;
            canvas.height = size.height;
            return this;
        }
        this.size = function (size) {
            ScreenSize = size;
            canvas.style.width = size.width + "px";
            canvas.style.height = size.height + "px";
            return this;
        }
    }
    this.getSize = ()=>{return ScreenSize;}
    this.getArea = ()=>{return ScreenArea;}
    this.Start = async (args)=>{await mechanism.begin(url, args)};
    this.Stop = mechanism.stop;
    this.Pause = mechanism.pause;
    this.Play = mechanism.play;
}
