import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { searchBoxAtCursor } from '../annotation/box-3d';

const canvas = document.getElementById("mainCameraCanvas") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#mainCameraCanvas') as HTMLCanvasElement
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.width, canvas.height);

const cameraThreeJS = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 1, 10000);
cameraThreeJS.position.set(0, 15, -20);

const controls = new OrbitControls(cameraThreeJS, canvas);
controls.maxPolarAngle = Math.PI / 2;

export function tickMainCamera(scene: Scene) {
    searchBoxAtCursor(scene,cameraThreeJS);

    controls.update();
    renderer.render(scene, cameraThreeJS);
}