import * as THREE from 'three';

import { getCamera, getCameraControl } from "./camera";
import { createLight } from "./light";
import { createHelpers } from "./helper";
import { getGUI } from './gui/gui';


import { canvas, text } from '../html/element';

export let scene: THREE.Scene;
export function initRenderer() {
    // レンダラーを作成
    const renderer = getRenderer();

    // シーンを作成
    scene = new THREE.Scene();

    // カメラを作成
    const camera = getCamera();
    // カメラコントロール作成
    const controls = getCameraControl();

    // ヘルパー追加
    createHelpers(scene);

    // 平行光源
    createLight(scene);

    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);

        controls.update();

        // レンダリング
        renderer.render(scene, camera);
    }
}

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas') as HTMLCanvasElement
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.width, canvas.height);
function getRenderer() {
    return renderer;
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
    const camera = getCamera();
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
