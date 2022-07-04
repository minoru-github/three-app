import * as THREE from "three";
import { createCamera } from "./create_camera";

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#leftImage') as HTMLCanvasElement
});

const canvas = document.getElementById("leftImage") as HTMLCanvasElement;
const scene = new THREE.Scene();
renderer.setClearColor(0xffffff, 1);
renderer.setSize(canvas.width, canvas.height);
const camera = createCamera(canvas);
const light = new THREE.AmbientLight(0xffffff);
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