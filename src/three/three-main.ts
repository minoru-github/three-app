import * as THREE from 'three';

import { getMainCamera, getMainCameraControl, getMainCameraRenderer } from "./3d-space/cameras/main-camera";
import { getTopCamera, getTopCameraRenderer } from './3d-space/cameras/top-camera';
import { getFrontCamera, getFrontCameraRenderer } from './3d-space/cameras/front-camera';
import { getSideCamera, getSideCameraRenderer } from './3d-space/cameras/side-camera';
import { tickCameraImage } from './rgb-image/rgb-image';
import { getGUI } from './gui/gui';
import { drawCameraFov } from "./3d-space/cameras/camera-fov";

import { text } from '../html/element';

let scene: THREE.Scene;
export function getSceneInstance() {
    return scene;
}
export function initRenderer() {
    // レンダラーを作成
    const mainCameraRenderer = getMainCameraRenderer();
    const topCameraRenderer = getTopCameraRenderer();
    const frontCameraRenderer = getFrontCameraRenderer();
    const sideCameraRenderer = getSideCameraRenderer();

    // シーンを作成
    scene = new THREE.Scene();

    // カメラを作成
    const mainCamera = getMainCamera();
    const topCamera = getTopCamera();
    const frontCamera = getFrontCamera();
    const sideCamera = getSideCamera();

    // カメラコントロール作成
    const mainCameraControls = getMainCameraControl();

    // ヘルパー追加
    addHelpers();

    // 平行光源
    addLight();

    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);

        mainCameraControls.update();

        // レンダリング
        mainCameraRenderer.render(scene, mainCamera);
        topCameraRenderer.render(scene, topCamera);
        frontCameraRenderer.render(scene, frontCamera);
        sideCameraRenderer.render(scene, sideCamera);
        tickCameraImage();
    }

    function addLight() {
        const light = new THREE.DirectionalLight(0xFFFFFF);
        light.intensity = 2; // 光の強さを倍に
        light.position.set(1, 1, 1);
        scene.add(light);
        return light;
    }

    function addHelpers() {
        // グリッド追加
        const gridHelper = new THREE.GridHelper(200, 20);
        scene.add(gridHelper);

        // 座標軸追加 X軸は赤、Y軸は緑色、Z軸は青。
        const axesHelper = new THREE.AxesHelper(100);
        axesHelper.position.setY(2);
        scene.add(axesHelper);

        return { gridHelper, axesHelper }
    }
}


// 箱を作成(デバッグ用)
const offsetY = 1.2;
let boxId = 0;
function createBox(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe:true });
    const box = new THREE.Mesh(geometry, material);
    box.name = "box-" + boxId;
    boxId++;
    box.position.set(x, y + offsetY, z);
    scene.add(box);
    return box;
}

document.addEventListener('mousedown', addAnnotationBox, false);
function addAnnotationBox(event: MouseEvent) {
    // X座標
    let x = event.offsetX;
    let y = event.offsetY;
    // console.log("(w,h) = (%d, %d)", canvas.width, canvas.height);
    // console.log("offset (x,y) = (%d, %d)", event.offsetX, event.offsetY);
    // console.log("client (x,y) = (%d, %d)", event.clientX, event.clientY);
    // console.log(event);
    const camera = getMainCamera();
}

const annotationBoxes = new Array<THREE.Mesh>;
function setBox() {
    const box = createBox(obj.x, obj.y, obj.z);
    annotationBoxes.push(box)
    let str = "";
    for (let index = 0; index < annotationBoxes.length; index++) {
        const box = annotationBoxes[index];
        str += box.name + " : (" + box.position.x + ", " + (box.position.y - offsetY) + ", " + box.position.z + ")\n";
        text.value = str;
    }
}

const obj = {
    x: -7,
    y: 0,
    z: 10.5,
    set: function() {setBox()}
}

const gui = getGUI();
gui.addFolder("Box")
gui.add(obj, "x");
gui.add(obj, "y");
gui.add(obj, "z");
gui.add(obj, "set")
