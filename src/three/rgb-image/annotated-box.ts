import * as THREE from "three";
import { cameraCalib, projectionMatrix } from "./load-calibrations";
import { getDistanceCameraToRgbImage, addObjectToImageScene } from "./rgb-image";

// 箱を作成(デバッグ用)
//let boxId = 0;
export function addAnnotationBoxToImage(x_m: number, y_m: number, z_m: number) {
    // TODO: THREE.Vector3()にしてboxIdで管理
    const canvas = document.getElementById("canvasImage") as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    if (context != null) {
        context.fillStyle = "red";
        const { x_pix, y_pix } = dot(x_m - cameraCalib.posX_m, y_m - cameraCalib.posY_m, z_m - cameraCalib.posZ_m);
        context.fillRect(x_pix, cameraCalib.height_pix - y_pix, 10, 10);
    }

    //addObjectToImageScene(box);

    // memo: 歪みやら切り出しやら考えると↓ではあってないと思う。
    // function convert(x_m: number, y_m: number, z_m: number) {
    //     const relativeX = -1 * cameraCalib.fx_pix * (x_m-cameraCalib.posX) / (z_m-cameraCalib.posZ);
    //     const relativeY = cameraCalib.fy_pix * (y_m - cameraCalib.posY) / (z_m - cameraCalib.posZ);
    //     const x_pix = cameraCalib.cx_pix + relativeX;
    //     const y_pix = cameraCalib.cy_pix + relativeY;

    //     return { x_pix, y_pix };
    // }

    function dot(x_m: number, y_m: number, z_m: number) {
        const mat3x4 = projectionMatrix;
        const mat3x1_0 = mat3x4[0][0] * x_m + mat3x4[0][1] * y_m + mat3x4[0][2] * z_m + mat3x4[0][3];
        const mat3x1_1 = mat3x4[1][0] * x_m + mat3x4[1][1] * y_m + mat3x4[1][2] * z_m + mat3x4[1][3];
        const mat3x1_2 = mat3x4[2][0] * x_m + mat3x4[2][1] * y_m + mat3x4[2][2] * z_m + mat3x4[2][3];
        const x_pix = mat3x1_0 / mat3x1_2;
        const y_pix = mat3x1_1 / mat3x1_2;

        return { x_pix, y_pix };
    }
}
