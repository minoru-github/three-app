import * as THREE from 'three';
import { Scene } from 'three';

export function createHelpers(scene: Scene) {
    // グリッド追加
    const gridHelper = new THREE.GridHelper(200, 100);
    scene.add(gridHelper);

    // 座標軸追加 X軸は赤、Y軸は緑色、Z軸は青。
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    return { gridHelper, axesHelper }
}