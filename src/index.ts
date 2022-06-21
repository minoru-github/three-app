import * as THREE from 'three';
import { LoaderUtils } from 'three';
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader"
console.log("Hello World!");

const input_files = document.getElementById("input_files") as HTMLElement;
const text = document.getElementById("text") as any;

input_files.addEventListener("change", function (event: any) {
    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/web-app/repositories/project-web-repository.ts#L24
    
    var files = event.target.files as FileList;
    const file = files[0];
    const promise = createDataURL(file);
    promise.then((path) => {
        load_pcd(path);
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
    const data_vec = pcdFile.slice(beginOfData).split("\n");
    
    const xyz_vec = new Array<XYZ>;
    for (var cnt = 0; cnt < points; cnt++){
        const data = data_vec[cnt].split(" ");
        const xyz: XYZ = { x: parseFloat(data[0]), y: parseFloat(data[1]), z: parseFloat(data[2]) };
        xyz_vec.push(xyz);
    }

    function debug(xyz_vec:Array<XYZ>) {
        for (var cnt = 0; cnt < 10; cnt++) {
            console.log("x:%f, y:%f, z:%f", xyz_vec[cnt].x, xyz_vec[cnt].y, xyz_vec[cnt].z);
        }
    }

    return xyz_vec;
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
    //const box = create_box();

    // pcd
    //load_pcd();

    // 平行光源
    create_light();

    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);

        // 箱を回転させる
        //rotate_box(box);

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

function load_pcd(path:string) {
    const loader = new PCDLoader();
    loader.load(
        path,
        function (mesh) {
            //mesh.geometry.center();
            //mesh.geometry.rotateX(Math.PI);
            //mesh.name = "sample.pcd";
            scene.add(mesh);
        }
    );
}