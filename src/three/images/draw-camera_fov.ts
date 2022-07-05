import * as THREE from "three";
import { cameraCalibration } from "./load-calibrations";
import { getSceneInstance } from "../renderer";

export function drawCameraFov() {
    addCameraMeshToScene(cameraCalibration.posX, cameraCalibration.posY, cameraCalibration.posZ);
    drawImageArea(cameraCalibration.posX, cameraCalibration.posY, cameraCalibration.posZ);
}

function addCameraMeshToScene(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000});
    const box = new THREE.Mesh(geometry, material);
    box.name = "camera";
    box.position.set(x, y, z);
    getSceneInstance().add(box);
}

function drawImageArea(x: number, y: number, z: number) {
    const fovRad = cameraCalibration.halfFovHorizontal * (Math.PI / 180);
    const distance = 10;
    const height = 2 * distance * Math.tan(fovRad);
    const width = height * cameraCalibration.aspect;
    const geometry = new THREE.PlaneGeometry(width, height);

    const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF , wireframe:true});
    const box = new THREE.Mesh(geometry, material);
    box.name = "imageArea";
    box.position.set(x, y, z + distance);
    getSceneInstance().add(box);
}