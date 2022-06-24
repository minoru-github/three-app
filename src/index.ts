import * as THREE from 'three';
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";
import { createCamera, createCameraControl } from "./camera";
import { createLight } from "./light"
console.log("Hello World!");

const inputFiles = document.getElementById("input_files") as HTMLElement;
const text = document.getElementById("text") as any;
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

inputFiles.addEventListener("change", function (event: any) {
    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/web-app/repositories/project-web-repository.ts#L24

    var files = event.target.files as FileList;
    const file = files[0];
    const promise = createDataURL(file);
    promise.then((path) => {
        loadPcd(path);
    });

});

function createDataURL(file: File) {
    const promise = new Promise<string>((resolve, reject) => {
        //FileReaderオブジェクトの作成
        const reader = new FileReader();
        // onload = 読み込み完了したときに実行されるイベント
        reader.onload = (event) => {
            resolve(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    });
    return promise;
}

type XYZ = {
    x: number;
    y: number;
    z: number;
}

// https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/editor-module/utils/pcd-util.ts#L43
// https://www.sejuku.net/blog/21049
function parseHeader(data: string) {
    data.indexOf("WIDTH");
}

// https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/editor-module/utils/pcd-util.ts#L125
function extractData(pcdFile: string) {
    const headerOfPoints = "POINTS ";
    const beginOfPoints = pcdFile.indexOf(headerOfPoints) + headerOfPoints.length;
    //pcdFile.match(/POINTS (.*)/);
    // ()で囲まれたところを抽出してくれる
    const result = pcdFile.match(/POINTS (.*)/);
    var points = 0;
    if (result != null) {
        points = parseInt(result[1]);
        console.log(points);
    }

    // とりあえずascii固定
    // TODO:DATAの検索を正規表現に変える
    const headerOfData = "DATA ascii\n";
    const beginOfData = pcdFile.indexOf(headerOfData) + headerOfData.length;
    const dataVec = pcdFile.slice(beginOfData).split("\n");

    const xyzVec = new Array<XYZ>();
    for (var cnt = 0; cnt < points; cnt++) {
        const data = dataVec[cnt].split(" ");
        const xyz: XYZ = { x: parseFloat(data[0]), y: parseFloat(data[1]), z: parseFloat(data[2]) };
        xyzVec.push(xyz);
    }

    function debug(xyzVec: Array<XYZ>) {
        for (var cnt = 0; cnt < 10; cnt++) {
            console.log("x:%f, y:%f, z:%f", xyzVec[cnt].x, xyzVec[cnt].y, xyzVec[cnt].z);
        }
    }

    return xyzVec;
}

window.addEventListener('DOMContentLoaded', init);

let scene: THREE.Scene;
function init() {
    // レンダラーを作成
    const renderer = createRenderer();

    // シーンを作成
    scene = new THREE.Scene();

    // カメラを作成
    const camera = createCamera();
    // カメラコントロール作成
    const controls = createCameraControl(camera);

    // グリッド追加
    const gridHelper = new THREE.GridHelper(200, 100);
    scene.add(gridHelper);

    // 座標軸追加 X軸は赤、Y軸は緑色、Z軸は青。
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

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

function loadPcd(path: string) {
    const loader = new PCDLoader();
    loader.load(
        path,
        function (mesh) {
            mesh.geometry.center();
            mesh.geometry.rotateX(-Math.PI / 2);

            scene.add(mesh);
            //console.log(mesh.geometry.attributes);
            text.value = "complete";
        }
    );
}