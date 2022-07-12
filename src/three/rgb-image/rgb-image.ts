import * as THREE from "three";
import { cameraCalib, projectionMatrix } from "./load-calibrations";
import { drawCameraFov } from "../xyz-space/cameras/camera-fov";
import { text } from "../../html/element";

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#rightImage') as HTMLCanvasElement
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
    const fov = cameraCalib.fovHorizontal_deg;
    const fovRad = fov * (Math.PI / 180);
    camera = new THREE.PerspectiveCamera(fov, imageWidth / imageHeight, nearPlane, farPlane);
    const distance_m = imageHeight / 2 / Math.tan(fovRad/2);
    camera.position.z = distance_m;
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
                const canvas = document.getElementById("rightImage") as HTMLCanvasElement;
                canvas.width = imageWidth;
                canvas.height = imageHeight;
            }
        })
    }

    function setImageToCanvas(path: string) {
        const image = new Image();
        image.src = path;
        image.onload = function () {
            const canvas = document.getElementById("canvasImage") as HTMLCanvasElement;
            let context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            text.value = "canvas width " + canvas.width + "\n";
            if (context != null) {
                context.drawImage(image, 0, 0);
                context.fillStyle = "red";
                const { x_pix, y_pix } = dot(1.6 + cameraCalib.posX_m, 1.8 - cameraCalib.posY_m, 6 - cameraCalib.posZ_m);
                text.value += x_pix + " " + y_pix;
                context.fillRect(x_pix, y_pix, 10, 10);
            }
        }

        // memo: 歪みやら切り出しやら考えると↓ではあってないと思う。
        // function convert(x_m: number, y_m: number, z_m: number) {
        //     const relativeX = -1 * cameraCalib.fx_pix * (x_m-cameraCalib.posX) / (z_m-cameraCalib.posZ);
        //     const relativeY = cameraCalib.fy_pix * (y_m - cameraCalib.posY) / (z_m - cameraCalib.posZ);
        //     const x_pix = cameraCalib.cx_pix + relativeX;
        //     const y_pix = cameraCalib.cy_pix + relativeY;

        //     return { x_pix, y_pix };
        // }

        function dot(x_m: number, y_m: number, z_m: number) {
            const mat3x4 = projectionMatrix;
            const mat3x1_0 = mat3x4[0][0] * x_m + mat3x4[0][1] * y_m + mat3x4[0][2] * z_m + mat3x4[0][3];
            const mat3x1_1 = mat3x4[1][0] * x_m + mat3x4[1][1] * y_m + mat3x4[1][2] * z_m + mat3x4[1][3];
            const mat3x1_2 = mat3x4[2][0] * x_m + mat3x4[2][1] * y_m + mat3x4[2][2] * z_m + mat3x4[2][3];
            const x_pix = mat3x1_0 / mat3x1_2;
            const y_pix = mat3x1_1 / mat3x1_2;

            return { x_pix, y_pix };
        }
    }

}