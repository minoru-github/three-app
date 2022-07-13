import * as THREE from 'three';
import { Scene } from 'three';

const canvas = document.getElementById("topCameraCanvas") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#topCameraCanvas') as HTMLCanvasElement
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.width, canvas.height);

const orthographicCamera = new THREE.OrthographicCamera(-canvas.width / 20, canvas.width / 20, canvas.height / 20, -canvas.height / 20, -1000, 1000);
orthographicCamera.position.set(0, 1, 0);

const cameraThreeJS = orthographicCamera;
cameraThreeJS.lookAt(new THREE.Vector3(0, 0, 0));

export function tickTopCamera(scene: Scene) {
    renderer.render(scene, cameraThreeJS);
}