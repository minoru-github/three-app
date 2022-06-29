import * as THREE from "three";

export function onChangeRightImages(event: any) {
    let files = event.target.files as FileList;
    const file = files[0];
    loadAsDataURL(file);
}

function loadAsDataURL(file: File) {
    const promise = createDataURL(file);
    promise.then((path) => {
        console.log("load complete");
        addImage(path);
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

    function addImage(path: string) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(path, (tex) => {
            const rate = canvas.height / texture.image.height;
            const width = texture.image.width * rate;
            const height = canvas.height;

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshPhongMaterial({ map: texture });
            const plane = new THREE.Mesh(geometry, material);
            plane.scale.set(width, height, 1);
            scene.add(plane);
        })
    }
}

const scene = new THREE.Scene();

const canvas = document.getElementById("rightImage") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#rightImage') as HTMLCanvasElement
});
renderer.setClearColor(0xffffff, 1);
renderer.setSize(canvas.width, canvas.height);

var nearPlane = 0.01;
var farPlane = 1000;
const fov = 53.83746828060639;
const fovRad = (fov / 2) * (Math.PI / 180);
const dist = canvas.height / 2 / Math.tan(fovRad);
var camera = new THREE.PerspectiveCamera(fov, canvas.width / canvas.height, nearPlane, farPlane);
camera.position.z = dist;

// ライト
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

export function tickRightImage() {
    renderer.render(scene, camera);
}