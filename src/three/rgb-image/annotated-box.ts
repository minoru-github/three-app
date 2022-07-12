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

        const sizeX = 0.6;
        const sizeY = 1.6;
        const sizeZ = 1.0;

        const center = new THREE.Vector3(x_m, y_m, z_m);
        const points = [];
        const p0 = new THREE.Vector3(center.x - sizeX / 2, center.y - sizeY / 2, center.z - sizeZ / 2);
        const p1 = new THREE.Vector3(center.x - sizeX / 2, center.y - sizeY / 2, center.z + sizeZ / 2);
        const p2 = new THREE.Vector3(center.x + sizeX / 2, center.y - sizeY / 2, center.z + sizeZ / 2);
        const p3 = new THREE.Vector3(center.x + sizeX / 2, center.y - sizeY / 2, center.z - sizeZ / 2);

        const p4 = new THREE.Vector3(center.x - sizeX / 2, center.y + sizeY / 2, center.z - sizeZ / 2);
        const p5 = new THREE.Vector3(center.x - sizeX / 2, center.y + sizeY / 2, center.z + sizeZ / 2);
        const p6 = new THREE.Vector3(center.x + sizeX / 2, center.y + sizeY / 2, center.z + sizeZ / 2);
        const p7 = new THREE.Vector3(center.x + sizeX / 2, center.y + sizeY / 2, center.z - sizeZ / 2);

        points.push(p0);
        points.push(p1);
        points.push(p2);
        points.push(p3);
        points.push(p0);

        points.push(p4);
        points.push(p5);
        points.push(p6);
        points.push(p7);
        points.push(p4);

        points.push(p5);
        points.push(p1);
        points.push(p2);
        points.push(p6);
        points.push(p7);
        points.push(p3);

        console.log(points);
        context.beginPath();
        context.strokeStyle = "#00FFFF";
        for (let index = 0; index < points.length; index++){
            const p = points[index];
            const { x_pix, y_pix } = dot(p.x - cameraCalib.posX_m, p.y - cameraCalib.posY_m, p.z - cameraCalib.posZ_m);
            const yReversed_pix = cameraCalib.height_pix - y_pix;
            if (index == 0) {
                context.moveTo(x_pix, yReversed_pix);
            }
            context.lineTo(x_pix, yReversed_pix);
            //context.fillRect(x_pix, cameraCalib.height_pix - y_pix, 5, 5);
        }
        context.stroke();

        // const { x_pix, y_pix } = dot(x_m - cameraCalib.posX_m, y_m - cameraCalib.posY_m, z_m - cameraCalib.posZ_m);
        // context.fillRect(x_pix, cameraCalib.height_pix - y_pix, 10, 10);
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
