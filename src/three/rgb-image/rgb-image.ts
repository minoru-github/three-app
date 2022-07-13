import * as THREE from "three";
import { drawCameraFov } from "../xyz-space/camerasThreeJS/camera-fov";
import { text } from "../../html/element";

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#rightImage') as HTMLCanvasElement
});
export function tickCameraImage() {
    if (cameraThreeJS != undefined) {
        renderer.render(scene, cameraThreeJS);
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

let cameraThreeJS = new THREE.PerspectiveCamera(0, 1, 0, 0);
export function getDistanceCameraToRgbImage() {
    return cameraThreeJS.position.z;
}

export function drawRgbImages(file: File) {
    // TODO : 入力順で左右を決定しているのを汎用的な仕組みに変える
    const promise = createDataURL(file);
    promise.then((path: string) => {
        initImageScene();
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

    function setImageToCanvas(path: string) {
        const image = new Image();
        image.src = path;
        image.onload = function () {
            const canvas = document.getElementById("leftImage") as HTMLCanvasElement;
            let context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            text.value = "canvas width " + canvas.width + "\n";
            if (context != null) {
                context.drawImage(image, 0, 0);
            }
        }
    }
}
