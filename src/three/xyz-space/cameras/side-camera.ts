import * as THREE from 'three';
import { Scene } from 'three';

const canvas = document.getElementById("sideCameraCanvas") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#sideCameraCanvas') as HTMLCanvasElement
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.width, canvas.height);

const orthographicCamera = new THREE.OrthographicCamera(-canvas.width / 20, canvas.width / 20, canvas.height / 20, -canvas.height / 20, -7.5, 7.5);
orthographicCamera.position.set(-1, 0, 0);

const camera = orthographicCamera;
camera.lookAt(new THREE.Vector3(0, 0, 0));

export function tickSideCamera(scene: Scene) {
    renderer.render(scene, camera);
}