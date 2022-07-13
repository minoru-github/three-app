import * as THREE from "three";
import { text } from "../../html/element";
import { projectToImage } from "../xyz-space/pcd/depth-sensor";

//let boxId = 0;
export function addAnnotationBoxToImage(x_m: number, y_m: number, z_m: number) {
    // TODO: THREE.Vector3()にしてboxIdで管理
    const canvas = document.getElementById("canvasImage") as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    if (context != null) {
        context.fillStyle = "red";

        const sizeX = 0.6;
        const sizeY = 1.6;
        const sizeZ = 1.4;

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

        context.beginPath();
        context.strokeStyle = "#00FFFF";
        for (let index = 0; index < points.length; index++) {
            const p = points[index];

            const { x_pix, y_pix } = projectToImage(p.x, p.y, p.z);
            text.value = "x_pix: " + x_pix + ", y_pix: " + y_pix;

            if (index == 0) {
                context.moveTo(x_pix, y_pix);
            }
            context.lineTo(x_pix, y_pix);
        }
        context.stroke();
    }

    //addObjectToImageScene(box);

}
