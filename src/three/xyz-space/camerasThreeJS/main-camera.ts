import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const canvas = document.getElementById("mainCameraCanvas") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#mainCameraCanvas') as HTMLCanvasElement
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.width, canvas.height);

const cameraThreeJS = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 1, 10000);
cameraThreeJS.position.set(0, 15, -20);

const controls = new OrbitControls(cameraThreeJS, canvas);
controls.maxPolarAngle = Math.PI / 2;

canvas.addEventListener('mousemove', handleMouseMove);

// マウス座標管理用のベクトルを作成
const mouse = new THREE.Vector2();
// マウスを動かしたときのイベント
function handleMouseMove(event: any) {
    const element = event.currentTarget;
    // canvas要素上のXY座標
    const x_pix = event.offsetX;
    const y_pix = event.offsetY;
    // canvas要素の幅・高さ
    const width_pix = element.offsetWidth;
    const height_pix = element.offsetHeight;

    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = (x_pix / width_pix) * 2 - 1;
    mouse.y = 1 - (y_pix / height_pix) * 2;
}

const raycaster = new THREE.Raycaster();

export function tickMainCamera(scene: Scene) {
    // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    raycaster.setFromCamera(mouse, cameraThreeJS);

    scene.children.forEach(object => {
        if (object.name == "annotatedBoxes" && object.children.length > 0) {
            // その光線とぶつかったオブジェクトを得る
            const intersects = raycaster.intersectObject(object);

            if (intersects.length > 0) {
                intersects.forEach(element => {
                    console.log(element, intersects.length);
                });
            }
        }
    });

    controls.update();
    renderer.render(scene, cameraThreeJS);
}