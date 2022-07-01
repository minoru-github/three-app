import * as THREE from "three";

import { loadAsDataURL } from "./load_images";
import { drawCameraFov } from "./draw_camera_fov";

export function onChangeInputImages(event: any) {
    let files = event.target.files as FileList;
    const leftImage = files[0];
    loadAsDataURL(leftImage, leftCanvas, leftScene);

    drawCameraFov(leftCamera);

    if (files.length == 2) {
        const rightImage = files[1];
        loadAsDataURL(rightImage, rightCanvas, rightScene);
    }
}

function createCamera(canvas:HTMLCanvasElement) {
    var nearPlane = 0.01;
    var farPlane = 1000;
    const fov = 53.83746828060639;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = canvas.height / 2 / Math.tan(fovRad);
    const camera = new THREE.PerspectiveCamera(fov, canvas.width / canvas.height, nearPlane, farPlane);
    camera.position.z = dist;
    return camera
}

// TODO:右画像と左画像をそれぞれモジュール化
const leftCanvas = document.getElementById("leftImage") as HTMLCanvasElement;
const leftScene = new THREE.Scene();
const leftRenderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#leftImage') as HTMLCanvasElement
});
leftRenderer.setClearColor(0xffffff, 1);
leftRenderer.setSize(leftCanvas.width, leftCanvas.height);
const leftCamera = createCamera(leftCanvas);
const leftLight = new THREE.AmbientLight(0xffffff);
leftScene.add(leftLight);

const rightCanvas = document.getElementById("rightImage") as HTMLCanvasElement;
const rightScene = new THREE.Scene();
const rightRenderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#rightImage') as HTMLCanvasElement
});
rightRenderer.setClearColor(0xffffff, 1);
rightRenderer.setSize(rightCanvas.width, rightCanvas.height);
const rightCamera = createCamera(rightCanvas);
const rightLight = new THREE.AmbientLight(0xffffff);
rightScene.add(rightLight);

export function tickImages() {
    leftRenderer.render(leftScene, leftCamera);
    rightRenderer.render(rightScene, rightCamera);
}