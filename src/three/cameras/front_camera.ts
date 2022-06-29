import * as THREE from 'three';

const canvas = document.getElementById("frontCameraCanvas") as HTMLCanvasElement;

const render = new THREE.WebGLRenderer({
    canvas: document.querySelector('#frontCameraCanvas') as HTMLCanvasElement
});
render.setPixelRatio(window.devicePixelRatio);
render.setSize(canvas.width, canvas.height);
export function getFrontCameraRenderer() {
    return render;
}

const orthographicCamera = new THREE.OrthographicCamera(-canvas.width / 20, canvas.width / 20, canvas.height / 20, -canvas.height / 20, -7.5, 7.5);
orthographicCamera.position.set(0, 0, -1);

const camera = orthographicCamera;
camera.lookAt(new THREE.Vector3(0, 0, 0));
export function getFrontCamera() {
    return camera;
}
