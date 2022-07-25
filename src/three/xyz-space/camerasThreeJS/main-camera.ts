import * as THREE from 'three';
import { Scene } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { annotatedBoxes } from '../annotation/box-3d';

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
    // TODO: 処理の場所変更
    const changeColorOfClickedBox = () => {
        raycaster.setFromCamera(mouse, cameraThreeJS);
        const intersects = raycaster.intersectObjects(scene.children);
        let object: THREE.Object3D<THREE.Event> | undefined = undefined;
        for (let index = 0; index < intersects.length; index++) {
            const id = intersects[index].object.id;
            const intersect = scene.getObjectById(id);
            if (intersect?.name == "annotatedBox") {
                object = intersect;
                break;
            }
        }

        annotatedBoxes.forEach(box => {
            if (object != undefined && box.id == object.id) {
                box.material.color = new THREE.Color(0xff0000);
            } else {
                box.material.color = new THREE.Color(0x00ffff);
            }
        });
    }

    changeColorOfClickedBox();

    controls.update();
    renderer.render(scene, cameraThreeJS);
}