import * as THREE from "three";

import { drawCameraFov } from "../xyz-space/cameras/camera-fov";
import { getImageCanvasInstance, addObjectToImageScene } from "./rgb-image";

export function onChangeInputImages(event: any) {
    let files = event.target.files as FileList;
    // TODO : 入力順で左右を決定しているのを汎用的な仕組みに変える
    const image = files[0];
    const promise = createDataURL(image);
    promise.then((path:string) => {
        addImage(path);
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
            const canvas = getImageCanvasInstance();
            const rate = canvas.height / texture.image.height;
            const width = texture.image.width * rate;
            const height = canvas.height;

            const geometry = new THREE.PlaneGeometry(1, 1);
            const material = new THREE.MeshPhongMaterial({ map: texture, transparent:true, opacity:0.6 });
            const plane = new THREE.Mesh(geometry, material);
            plane.scale.set(width, height, 1);
            addObjectToImageScene(plane);
        })
    }
}
