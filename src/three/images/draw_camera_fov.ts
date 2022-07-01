import * as THREE from "three";
import { Camera } from "three";
import { cameraCalibration } from "./load_calibrations";
import { getSceneInstance } from "../renderer";

export function drawCameraFov(camera : Camera) {
    addCameraMeshToScene(cameraCalibration.offsetX, cameraCalibration.offsetY, cameraCalibration.offsetZ)
}

function addCameraMeshToScene(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000});
    const box = new THREE.Mesh(geometry, material);
    box.name = "camera";
    box.position.set(x, y, z);
    getSceneInstance().add(box);
}