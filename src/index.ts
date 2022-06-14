import * as THREE from 'three';
console.log("Hello World!");

window.addEventListener('DOMContentLoaded', init);

const width = 960;
const height = 540;
function init() {
    // レンダラーを作成
    const renderer = create_renderer();

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = create_camera();

    // グリッド追加
    const gridHelper = new THREE.GridHelper(100, 10);
    scene.add(gridHelper);

    // 座標軸追加 X軸は赤、Y軸は緑色、Z軸は青。
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // 箱を作成
    const box = create_box();
    scene.add(box);

    // 平行光源
    const light = create_light();
    scene.add(light);

    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);

        // 箱を回転させる
        rotate_box(box);

        // レンダリング
        renderer.render(scene, camera);
    }
}

function create_renderer() {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas') as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    return renderer;
}

function create_camera() {
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 50, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}

function create_box() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0x00FFFF });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(20, 20, 20);
    return box;
}

function rotate_box(box: THREE.Mesh) {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
}

function create_light() {
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1);
    return light;
}