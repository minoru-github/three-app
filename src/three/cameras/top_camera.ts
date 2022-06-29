import * as THREE from 'three';

const canvas = document.getElementById("topCameraCanvas") as HTMLCanvasElement;

const render = new THREE.WebGLRenderer({
    canvas: document.querySelector('#topCameraCanvas') as HTMLCanvasElement
});
render.setPixelRatio(window.devicePixelRatio);
render.setSize(canvas.width, canvas.height);
export function getTopCameraRenderer() {
    return render;
}

const orthographicCamera = new THREE.OrthographicCamera(-canvas.width / 20, canvas.width / 20, canvas.height / 20, -canvas.height / 20, -1000, 1000);
orthographicCamera.position.set(0, 1, 0);

const camera = orthographicCamera;
camera.lookAt(new THREE.Vector3(0, 0, 0));
export function getTopCamera() {
    return camera;
}
