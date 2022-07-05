import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { getGUI } from '../gui/gui';

const canvas = document.getElementById("mainCameraCanvas") as HTMLCanvasElement;

const render = new THREE.WebGLRenderer({
    canvas: document.querySelector('#mainCameraCanvas') as HTMLCanvasElement
});
render.setPixelRatio(window.devicePixelRatio);
render.setSize(canvas.width, canvas.height);
export function getMainCameraRenderer() {
    return render;
}

const perspectiveCamera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);
perspectiveCamera.position.set(10, 20, -10);
const orthographicCamera = new THREE.OrthographicCamera(-canvas.width / 20, canvas.width / 20, canvas.height / 20, -canvas.height / 20, -1000, 1000);
orthographicCamera.position.set(1, 2, -1);

//const camera = perspectiveCamera;
const camera = orthographicCamera;
camera.lookAt(new THREE.Vector3(0, 0, 0));
export function getMainCamera() {
    return camera;
}

const controls = new OrbitControls(camera, canvas);
controls.maxPolarAngle = Math.PI / 2;
export function getMainCameraControl() {
    return controls;
}

const gui = getGUI();
const cameraFolder = gui.addFolder('Camera')
//cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()