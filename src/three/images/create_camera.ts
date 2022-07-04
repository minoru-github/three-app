import * as THREE from "three";

export function createCamera(canvas: HTMLCanvasElement) {
    var nearPlane = 0.01;
    var farPlane = 1000;
    const fov = 53.83746828060639;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = canvas.height / 2 / Math.tan(fovRad);
    const camera = new THREE.PerspectiveCamera(fov, canvas.width / canvas.height, nearPlane, farPlane);
    camera.position.z = dist;
    return camera
}