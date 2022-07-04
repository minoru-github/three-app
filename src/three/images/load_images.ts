import * as THREE from "three";
import { Scene } from "three";

export function loadAsDataURL(file: File, canvas: HTMLCanvasElement, scene: Scene) {
    const promise = createDataURL(file);
    promise.then((path) => {
        console.log("load complete");
        // TODO : addImageをdrawモジュールへ移植
        addImage(path, canvas, scene);
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

    function addImage(path: string, canvas: HTMLCanvasElement, scene: Scene) {
        const loader = new THREE.TextureLoader();
        loader.load(path, (texture) => {
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