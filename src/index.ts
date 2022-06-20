import * as THREE from 'three';
import { LoaderUtils } from 'three';
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader"
console.log("Hello World!");

const input_files = document.getElementById("input_files") as HTMLElement;
const text = document.getElementById("text") as any;

function printType(x: any) {
    console.log(`${typeof (x)} ${Object.prototype.toString.call(x)}`);
}

input_files.addEventListener("change", function (event: any) {
    // https://hakuhin.jp/js/file_reader.html
    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/web-app/repositories/project-web-repository.ts#L24
    
    var files = event.target.files as FileList;

    const promise = readFile(files[0]);
    promise.then((data: ArrayBuffer) => {
        let view_u8 = new Uint8Array(data);
        let decoded_text = LoaderUtils.decodeText(view_u8);
        console.log(decoded_text);
        text.value = decoded_text;
    });

    // const buffer = files[0].arrayBuffer();
    // buffer.then((data:any) => {
    //     // viewオブジェクトへの変換
    //     let view_u8 = new Uint8Array(data);
    //     console.log(view_u8);
    //     text.value = view_u8.slice(0,20);
    // });
});

// https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/web-app/repositories/project-web-repository.ts#L24
// https://qiita.com/cheez921/items/41b744e4e002b966391a
function readFile(file: File) {
    const promise = new Promise<ArrayBuffer>((resolve, reject) => {
        //FileReaderオブジェクトの作成
        const reader = new FileReader();
        // onload = 読み込み完了したときに実行されるイベント
        reader.onload = (event) => {
            resolve(event.target?.result as ArrayBuffer);
            console.log(reader.result);
        };
        // readAsArrayBufferで読み込み(非同期実行)
        reader.readAsArrayBuffer(file);
        // テキスト形式で読み込む(非同期実行)
        //reader.readAsText(file[0]);
    });
    return promise;
}

window.addEventListener('DOMContentLoaded', init);

const width = 960;
const height = 540;
let scene:THREE.Scene;
function init() {
    // レンダラーを作成
    const renderer = create_renderer();

    // シーンを作成
    scene = new THREE.Scene();

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

    // pcd
    //load_pcd();

    // 平行光源
    create_light();

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
    scene.add(box);
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
    scene.add(light);
    return light;
}

function load_pcd() {
    const loader = new PCDLoader();
    loader.setPath("./pcd_frames");
    loader.load(
        "/0001/3.pcd",
        function (points) {
            points.geometry.center();
            points.geometry.rotateX(Math.PI);
            points.name = "sample.pcd";
            scene.add(points);
        }
    );
}