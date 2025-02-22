import { isLocalEnv } from "./common-utils";

export function consoleLog(...rest: any[]) { 
    if (isLocalEnv()) { 
        console.log(...rest);
    }
}