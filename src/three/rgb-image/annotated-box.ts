import * as THREE from "three";
import { projectToImage } from "../xyz-space/pcd/depth-sensor";

//let boxId = 0;
export function addAnnotationBoxToImage(points: THREE.Vector3[]) {
    // TODO: THREE.Vector3()にしてboxIdで管理
    const canvas = document.getElementById("canvasImage") as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    if (context != null) {
        context.fillStyle = "red";
        context.beginPath();
        context.strokeStyle = "#00FFFF";
        for (let index = 0; index < points.length; index++) {
            const p = points[index];
            const { x_pix, y_pix } = projectToImage(p.x, p.y, p.z);

            if (index == 0) {
                context.moveTo(x_pix, y_pix);
            }
            context.lineTo(x_pix, y_pix);
        }
        context.stroke();
    }

    //addObjectToImageScene(box);

}
