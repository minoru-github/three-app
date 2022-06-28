import * as THREE from 'three';

import { createCamera, createCameraControl } from "./camera";
import { createLight } from "./light";
import { createHelpers } from "./helper";

import { canvas } from '../html/element';

export let scene: THREE.Scene;
export function initRenderer() {
    // レンダラーを作成
    const renderer = createRenderer();

    // シーンを作成
    scene = new THREE.Scene();

    // カメラを作成
    const camera = createCamera();
    // カメラコントロール作成
    const controls = createCameraControl(camera);

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

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas') as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);
    return renderer;
}

// 箱を作成(デバッグ用)
function createBox() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0x00FFFF });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(20, 20, 20);
    scene.add(box);
    return box;
}

document.addEventListener('mousedown', addAnnotationBox, false);
function addAnnotationBox(event: MouseEvent) {
    // X座標
    let x = event.clientX;
    let y = event.clientY;
    console.log("(x,y) = (%d, %d)",x,y);
}