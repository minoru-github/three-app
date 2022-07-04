import * as THREE from "three";
import { createAnnotatedBox } from "./annotated_box";
import { createCamera } from "./create_camera";
import { cameraCalibration } from "./load_calibrations";

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#leftImage') as HTMLCanvasElement
});

const canvas = document.getElementById("leftImage") as HTMLCanvasElement;
const scene = new THREE.Scene();
renderer.setClearColor(0xffffff, 1);
renderer.setSize(canvas.width, canvas.height);
const camera = createCamera(canvas);
const dist = camera.position.z;
const light = new THREE.AmbientLight(0xffffff);
const calib = cameraCalibration;
console.log(dist);
const box = createAnnotatedBox(calib.posX, calib.posY, calib.posZ, dist, 7, 0, 10.5);
scene.add(box);
scene.add(light);

export function getLeftCanvasInstance() {
    return canvas;
}

export function getLeftSceneInstance() {
    return scene;
}

export function tickLeftImages() {
    renderer.render(scene, camera);
}