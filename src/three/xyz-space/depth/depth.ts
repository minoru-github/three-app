//  測距センサーから路面におろしたところを本ツールの原点(ステカメの場合は真ん中)とする。座標系はthree.jsに従う。
const depthSensorToOrigin = {
    x_m: 0.0,
    y_m: -1.73,
    z_m: 0.0,
}

export function toOrigin(inX_m: number, inY_m: number, inZ_m: number) {
    const x_m = inX_m - depthSensorToOrigin.x_m;
    const y_m = inY_m - depthSensorToOrigin.y_m;
    const z_m = inZ_m - depthSensorToOrigin.z_m;
    return { x_m, y_m, z_m };
}

export function toDepthSensorCoord(inX_m: number, inY_m: number, inZ_m: number) {
    const x_m = inX_m + depthSensorToOrigin.x_m;
    const y_m = inY_m + depthSensorToOrigin.y_m;
    const z_m = inZ_m + depthSensorToOrigin.z_m;
    return { x_m, y_m, z_m };
}

import { loadPcdAsString } from "./load-pcd";
export class Depth {
    data: Array<File>;
    calib: Array<File>;
    frames: number = 0;
    constructor() {
        this.data = new Array<File>();
        this.calib = new Array<File>();
    }

    addData(data:File) {
        this.data.push(data);
        this.frames += 1;
    }

    addCalib(calib: File) {
        this.calib.push(calib);
    }

    draw(frame: number) {
        if (this.frames < frame || this.data.length == 0) {
            return;
        }
        loadPcdAsString(this.data[frame]);
    }

    totalFrames() {
        return this.frames;
    }
}
