import * as THREE from "three";
import { Scene } from "three";

import { tickMainCamera } from "./cameras/main-camera";
import { tickTopCamera } from './cameras/top-camera';
import { tickFrontCamera } from './cameras/front-camera';
import { tickSideCamera } from './cameras/side-camera';

// シーンを作成
const scene = new THREE.Scene();
export function get3dSpaceSceneInstance() {
    return scene;
}

// ヘルパー追加
addHelpers(scene);

// 平行光源
addLight(scene);

export function tick3dSpace() {
    tickMainCamera(scene);
    tickTopCamera(scene);
    tickFrontCamera(scene);
    tickSideCamera(scene);
}

function addHelpers(scene: Scene) {
    // グリッド追加
    const gridHelper = new THREE.GridHelper(200, 20);
    scene.add(gridHelper);

    // 座標軸追加 X軸は赤、Y軸は緑色、Z軸は青。
    const axesHelper = new THREE.AxesHelper(100);
    axesHelper.position.setY(2);
    scene.add(axesHelper);
}

function addLight(scene: Scene) {
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1);
    scene.add(light);
}
