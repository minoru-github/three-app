import * as THREE from "three";
import { cameraCalib } from "./load-calibrations";

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#rightImage') as HTMLCanvasElement
});

const canvas = document.getElementById("rightImage") as HTMLCanvasElement;
const scene = new THREE.Scene();
renderer.setClearColor(0xffffff, 1);
renderer.setSize(canvas.width, canvas.height);
const camera = createCamera(canvas);
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

export function getImageCanvasInstance() {
    return canvas;
}

export function addObjectToImageScene(object : any) {
    scene.add(object);
}

export function tickCameraImage() {
    renderer.render(scene, camera);
}

// TODO 画像読み込んでからcreateCameraする。理由：canvasサイズを画像サイズに変更してからcamera作らないとデフォルトのcanvasサイズで作られる。
function createCamera(canvas: HTMLCanvasElement) {
    var nearPlane = 0.01;
    var farPlane = 1000;
    const fov = cameraCalib.fovHorizontal;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = canvas.height / 2 / Math.tan(fovRad);
    const camera = new THREE.PerspectiveCamera(fov, canvas.width / canvas.height, nearPlane, farPlane);
    camera.position.z = dist;
    return camera
}

export function getCameraPosZ() {
    return camera.position.z;
}