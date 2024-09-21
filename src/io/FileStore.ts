import { existsSync } from "fs";
import path from "path";

export class FileStore {

    private dataDir;

    constructor(){
        this.dataDir = path.resolve(__dirname,'../../data');
        if ( ! existsSync(this.dataDir) ){
            throw new Error(`dataDir=${this.dataDir} not found!`);
        }
    }

    getAbsolutePath(relativePath: string){
        return path.resolve(this.dataDir,relativePath);
    }

}

