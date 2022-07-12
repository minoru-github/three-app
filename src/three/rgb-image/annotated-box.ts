import * as THREE from "three";
import { cameraCalib } from "./load-calibrations";
import { getDistanceCameraToRgbImage, addObjectToImageScene } from "./rgb-image";

// 箱を作成(デバッグ用)
let boxId = 0;
export function createAnnotatedBox(xWorld: number, yWorld: number, zWorld: number) {
    const geometry = new THREE.BoxGeometry(10, 20, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
    const box = new THREE.Mesh(geometry, material);
    box.name = "rgb image box-" + boxId;
    boxId++;

    let dist = getDistanceCameraToRgbImage();
    const xImage = dist * calculateTangent(cameraCalib.posX_m, xWorld);
    const yImage = dist * calculateTangent(cameraCalib.posY_m, yWorld);
    console.log("world (x, y, z) : (%f, %f, %f), image (x,y) : (%f, %f)", xWorld, yWorld, zWorld, xImage, yImage);
    box.position.set(xImage, yImage, 0);

    function calculateTangent(posCamera: number, posWorld: number) {
        return (posWorld - posCamera) / (zWorld - cameraCalib.posZ_m);
    }

    return box;
}

export function addAnnotationBoxToImageScene(xWorld: number, yWorld: number, zWorld: number) {
    const box = createAnnotatedBox(xWorld, yWorld, zWorld);
    addObjectToImageScene(box);
}