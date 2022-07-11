import * as THREE from "three";
import { cameraCalib } from "./load-calibrations";
import { drawCameraFov } from "../xyz-space/cameras/camera-fov";

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvasImage') as HTMLCanvasElement
});
function setRendererParameter(imageWidth: number, imageHeight: number) {
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(imageWidth, imageHeight);
}
export function tickCameraImage() {
    if (camera != undefined) {
        renderer.render(scene, camera);
    }
}

const scene = new THREE.Scene();
export function addObjectToImageScene(object: any) {
    scene.add(object);
}
export function initImageScene() {
    scene.clear();
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

let camera = new THREE.PerspectiveCamera(0, 1, 0, 0);
function createCamera(imageWidth: number, imageHeight: number) {
    var nearPlane = 0.01;
    var farPlane = 1000;
    const fov = cameraCalib.fovHorizontal;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = imageHeight / 2 / Math.tan(fovRad);
    camera = new THREE.PerspectiveCamera(fov, imageWidth / imageHeight, nearPlane, farPlane);
    camera.position.z = dist;
}

export function getDistanceCameraToRgbImage() {
    return camera.position.z;
}

export function drawRgbImages(file: File) {
    // TODO : 入力順で左右を決定しているのを汎用的な仕組みに変える
    const promise = createDataURL(file);
    promise.then((path: string) => {
        initImageScene();
        //addImage(path);
        setImageToCanvas(path);
    })

    drawCameraFov();

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
        loader.load(path, (texture) => {
            const width = texture.image.width;
            const height = texture.image.height;

            setCanvasSieze(width, height);
            createCamera(width, height);
            setRendererParameter(width, height);

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshPhongMaterial({ map: texture, transparent: true, opacity: 0.6 });
            const imagePlane = new THREE.Mesh(geometry, material);
            imagePlane.scale.set(width, height, 1);
            addObjectToImageScene(imagePlane);

            function setCanvasSieze(imageWidth: number, imageHeight: number) {
                const canvas = document.getElementById("canvasImage") as HTMLCanvasElement;
                canvas.width = imageWidth;
                canvas.height = imageHeight;
            }
        })
    }

    function setImageToCanvas(path :string) {
        const image = new Image();
        image.src = path;
        image.onload = function () {
            const canvas = document.getElementById("canvasImage") as HTMLCanvasElement;
            const context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            context?.drawImage(image, 0, 0);
        }
    }

}