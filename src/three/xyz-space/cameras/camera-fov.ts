import * as THREE from "three";
import { cameraCalib } from "../../rgb-image/load-calibrations";
import { get3dSpaceSceneInstance } from "../xyz-space";

export function drawCameraFov() {
    addCameraMeshToScene(cameraCalib.posX_m, cameraCalib.posY_m, cameraCalib.posZ_m);
    drawImageArea(cameraCalib.posX_m, cameraCalib.posY_m, cameraCalib.posZ_m);
}

function addCameraMeshToScene(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    const box = new THREE.Mesh(geometry, material);
    box.name = "camera";
    box.position.set(x, y, z);
    get3dSpaceSceneInstance().add(box);
}

function drawImageArea(x_m: number, y_m: number, z_m: number) {
    const distance_m = 10;
    const width_m = distance_m * Math.tan(cameraCalib.fovHorizontal_deg / 2 * Math.PI / 180);
    const height_m = distance_m * Math.tan(cameraCalib.fovVertical_deg / 2 * Math.PI / 180);

    const left = cameraCalib.posX_m + width_m;
    const right = cameraCalib.posX_m - width_m;
    const down = cameraCalib.posY_m - height_m;
    const up = cameraCalib.posY_m + height_m;
    const leftdown = new THREE.Vector3(left, down, z_m + distance_m);
    const leftUp = new THREE.Vector3(left, up, z_m + distance_m);
    const rightdown = new THREE.Vector3(right, down, z_m + distance_m);
    const rightUp = new THREE.Vector3(right, up, z_m + distance_m);
    const cameraPos = new THREE.Vector3(x_m, y_m, z_m);

    const points = [];
    points.push(leftdown);
    points.push(leftUp);
    points.push(rightUp);
    points.push(rightdown);

    points.push(cameraPos);
    points.push(leftdown);
    points.push(cameraPos);
    points.push(leftUp);
    points.push(cameraPos);
    points.push(rightUp);
    points.push(cameraPos);
    points.push(rightdown);

    const material = new THREE.LineBasicMaterial({ color: 0xFF00FF });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    get3dSpaceSceneInstance().add(line);
}