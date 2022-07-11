import * as THREE from "three";
import { cameraCalib } from "../../rgb-image/load-calibrations";
import { get3dSpaceSceneInstance } from "../xyz-space";

export function drawCameraFov() {
    addCameraMeshToScene(cameraCalib.posX, cameraCalib.posY, cameraCalib.posZ);
    drawImageArea(cameraCalib.posX, cameraCalib.posY, cameraCalib.posZ);
}

function addCameraMeshToScene(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000});
    const box = new THREE.Mesh(geometry, material);
    box.name = "camera";
    box.position.set(x, y, z);
    get3dSpaceSceneInstance().add(box);
}

function drawImageArea(x: number, y: number, z: number) {
    const fovRad = cameraCalib.halfFovHorizontal * (Math.PI / 180);
    const distance = 10;
    const height = 2 * distance * Math.tan(fovRad);
    const width = height * cameraCalib.aspect;
    const geometry = new THREE.PlaneGeometry(width, height);

    const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF , wireframe:true});
    const box = new THREE.Mesh(geometry, material);
    box.name = "imageArea";
    box.position.set(x, y, z + distance);
    get3dSpaceSceneInstance().add(box);
}