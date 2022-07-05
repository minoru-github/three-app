import * as THREE from "three";
import { cameraCalib } from "./load-calibrations";
import { getCameraPosZ } from "./rgb-image";

// 箱を作成(デバッグ用)
const offsetY = 1.2;
let boxId = 0;
export function createAnnotatedBox(xWorld: number, yWorld: number, zWorld: number) {
    const geometry = new THREE.BoxGeometry(20, 40, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
    const box = new THREE.Mesh(geometry, material);
    box.name = "annotated box-" + boxId;
    boxId++;

    let dist = getCameraPosZ();
    const xImage = dist * calculateTangent(cameraCalib.posX, xWorld);
    const yImage = dist * calculateTangent(cameraCalib.posY, yWorld);

    box.position.set(xImage, yImage, -dist);

    function calculateTangent(posCamera: number, posWorld: number) {
        return (posWorld - posCamera) / (zWorld - cameraCalib.posZ);
    }

    return box;
}
