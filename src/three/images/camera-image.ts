import * as THREE from "three";

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

export function getImageCanvasInstance() {
    return canvas;
}

export function getImageSceneInstance() {
    return scene;
}

export function tickCameraImage() {
    renderer.render(scene, camera);
}

function createCamera(canvas: HTMLCanvasElement) {
    var nearPlane = 0.01;
    var farPlane = 1000;
    const fov = 53.83746828060639;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = canvas.height / 2 / Math.tan(fovRad);
    const camera = new THREE.PerspectiveCamera(fov, canvas.width / canvas.height, nearPlane, farPlane);
    camera.position.z = dist;
    return camera
}