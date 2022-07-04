import * as THREE from "three";
import { createCamera } from "./create_camera";

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

export function getRightCanvasInstance() {
    return canvas;
}

export function getRightSceneInstance() {
    return scene;
}

export function tickRightImages() {
    renderer.render(scene, camera);
}