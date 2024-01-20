export default new function System() {
    this.Import = new function () {
        this.json = async(url) => {
            return await new Promise((resolve, reject) => { fetch(url).then(respond => { resolve(respond.json()) }).catch(err => { reject(err) }) });
        }
        this.img = async(Files_URL) => {
            let promises = [];
            let Data = {};
            let File = {};
            let Loaded = {};
            let Canvas = {}
            Files_URL.forEach(file => {
                promises.push(new Promise((resolve, reject) => {
                    let Load_File = new Image();
                    Load_File.src = file.url;
                    Load_File.onload = (e) => {
                        let canvas = document.createElement('canvas');
                        canvas.width = e.target.width;
                        canvas.height = e.target.height;
                        let ctx = canvas.getContext('2d');
                        ctx.drawImage(e.target, 0, 0);
                        Loaded[file.name] = canvas.toDataURL('image/png');
                        Data[file.name] = canvas;
                        File[file.name] = Load_File;
                        Canvas[file.name] = canvas;
                        resolve();
                    }
                }))
            });
            await Promise.all(promises);
            return { Data, File, Loaded, Canvas };
        }
    }
    
    /*
    @param {string} stringCalling
    this.Make = new function () {
        this.callback = (stringCalling) => {
            return (new Function('return ' + stringCalling))();
        }
    }
    */   
}