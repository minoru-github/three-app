import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const canvas = document.getElementById("mainCameraCanvas") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#mainCameraCanvas') as HTMLCanvasElement
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.width, canvas.height);

const perspectiveCamera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);
perspectiveCamera.position.set(10, 20, -10);
const orthographicCamera = new THREE.OrthographicCamera(-canvas.width / 20, canvas.width / 20, canvas.height / 20, -canvas.height / 20, -1000, 1000);
orthographicCamera.position.set(1, 2, -1);

const camera = perspectiveCamera;
//const camera = orthographicCamera;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const controls = new OrbitControls(camera, canvas);
controls.maxPolarAngle = Math.PI / 2;

export function tickMainCamera(scene: Scene) {
    controls.update();
    renderer.render(scene, camera);
}