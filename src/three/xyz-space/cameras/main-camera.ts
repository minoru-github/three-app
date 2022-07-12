import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { cameraCalib } from '../../rgb-image/load-calibrations';

const canvas = document.getElementById("mainCameraCanvas") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#mainCameraCanvas') as HTMLCanvasElement
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.width, canvas.height);

const camera = new THREE.PerspectiveCamera(cameraCalib.fovVertical_deg, canvas.width / canvas.height, 1, 10000);
camera.position.set(0, 15, -20);

const controls = new OrbitControls(camera, canvas);
controls.maxPolarAngle = Math.PI / 2;

export function tickMainCamera(scene: Scene) {
    controls.update();
    renderer.render(scene, camera);
}