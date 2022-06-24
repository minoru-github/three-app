import * as THREE from 'three';
import { Scene } from 'three';

export function createLight(scene: Scene) {
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1);
    scene.add(light);
    return light;
}