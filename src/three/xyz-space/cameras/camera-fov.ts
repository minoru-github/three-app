import * as THREE from "three";
import { cameraCalib } from "../../rgb-image/load-calibrations";
import { get3dSpaceSceneInstance } from "../xyz-space";

export function drawCameraFov() {
    addCameraMeshToScene(cameraCalib.posX, cameraCalib.posY, cameraCalib.posZ);
    drawImageArea(cameraCalib.posX, cameraCalib.posY, cameraCalib.posZ);
}

function addCameraMeshToScene(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    const box = new THREE.Mesh(geometry, material);
    box.name = "camera";
    box.position.set(x, y, z);
    get3dSpaceSceneInstance().add(box);
}

function drawImageArea(x: number, y: number, z: number) {
    const distance = 10;
    const height = 2 * (cameraCalib.height * distance) / cameraCalib.fy_pix;
    const width = 2 * (cameraCalib.width * distance) / cameraCalib.fx_pix;
    console.log("imageArea w:{%f}, h:{%f}", width, height);

    const offsetX = cameraCalib.widthFull / 2 - cameraCalib.cx;
    const offsetY = cameraCalib.heightFull / 2 - cameraCalib.cy;
    console.log("offset X:{%f}, Y:{%f}", offsetX, offsetY);

    const left = cameraCalib.posX + ((cameraCalib.width - offsetX) * distance) / cameraCalib.fx_pix;
    const right = cameraCalib.posX - ((cameraCalib.width + offsetX) * distance) / cameraCalib.fx_pix;;
    const down = cameraCalib.posY - ((cameraCalib.height - offsetY) * distance) / cameraCalib.fy_pix;
    const up = cameraCalib.posY + ((cameraCalib.height + offsetY) * distance) / cameraCalib.fy_pix;
    const leftdown = new THREE.Vector3(left, down, z + distance);
    const leftUp = new THREE.Vector3(left, up, z + distance);
    const rightdown = new THREE.Vector3(right, down, z + distance);
    const rightUp = new THREE.Vector3(right, up, z + distance);
    const cameraPos = new THREE.Vector3(x, y, z);

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