import * as THREE from "three";
import { RgbImage } from "./rgb-image";

const scene = new THREE.Scene();
const canvas = document.getElementById("left_image") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#left_image') as HTMLCanvasElement
});

renderer.setClearColor(0xffffff, 1);
renderer.setSize(canvas.width, canvas.height);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);


const image = new RgbImage(scene);
export function tickLeftImage() {
    if (image.camera != undefined) {
        renderer.render(scene, image.camera);
    }
}

export const leftImage = image;
