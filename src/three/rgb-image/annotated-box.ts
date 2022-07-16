import * as THREE from "three";
import { toDepthSensorCoord } from "../xyz-space/depth/depth";
import { camera } from "./camera";

//let boxId = 0;
export function addAnnotationBoxToImage(points: THREE.Vector3[]) {
    // TODO: THREE.Vector3()にしてboxIdで管理

    const images = ["left_image", "right_image"];
    images.forEach(leftOrRight => {
        const canvas = document.getElementById(leftOrRight) as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        if (context != null) {
            context.fillStyle = "red";
            context.beginPath();
            context.strokeStyle = "#00FFFF";
            for (let index = 0; index < points.length; index++) {
                const p = points[index];
                const { x_pix, y_pix } = projectToImage(p.x, p.y, p.z, leftOrRight);

                if (index == 0) {
                    context.moveTo(x_pix, y_pix);
                }
                context.lineTo(x_pix, y_pix);
            }
            context.stroke();
        }
    });


}

function projectToImage(x_m: number, y_m: number, z_m: number, leftOrRight: string) {
    // lidar
    const { x_pix, y_pix } = projectFromLidar(x_m, y_m, z_m, leftOrRight);

    // stereo camera
    // function() {};

    return { x_pix, y_pix };

    function projectFromLidar(inX_m: number, inY_m: number, inZ_m: number, leftOrRight: string) {
        const { x_m, y_m, z_m } = toDepthSensorCoord(inX_m, inY_m, inZ_m);
        let mat3x4;
        if (leftOrRight == "left_image") {
            mat3x4 = camera.left.projectionMatrix;
        } else {
            mat3x4 = camera.right.projectionMatrix;
        }
        // three.jsとcamera座標系のxyが逆なので符号反転
        const { x_pix, y_pix } = dot(-1 * x_m, -1 * y_m, z_m, mat3x4);

        return { x_pix, y_pix };
    }

    // memo: ステカメ用。作りかけ。
    // function convert(x_m: number, y_m: number, z_m: number) {
    //     const relativeX = -1 * camera.fx_pix * (x_m-camera.posX) / (z_m-camera.posZ);
    //     const relativeY = camera.fy_pix * (y_m - camera.posY) / (z_m - camera.posZ);
    //     const x_pix = camera.cx_pix + relativeX;
    //     const y_pix = camera.cy_pix + relativeY;

    //     return { x_pix, y_pix };
    // }
}

function dot(x_m: number, y_m: number, z_m: number, mat3x4: number[][]) {
    const mat3x1_0 = mat3x4[0][0] * x_m + mat3x4[0][1] * y_m + mat3x4[0][2] * z_m + mat3x4[0][3];
    const mat3x1_1 = mat3x4[1][0] * x_m + mat3x4[1][1] * y_m + mat3x4[1][2] * z_m + mat3x4[1][3];
    const mat3x1_2 = mat3x4[2][0] * x_m + mat3x4[2][1] * y_m + mat3x4[2][2] * z_m + mat3x4[2][3];
    const x_pix = mat3x1_0 / mat3x1_2;
    const y_pix = mat3x1_1 / mat3x1_2;

    return { x_pix, y_pix };
}
