import * as THREE from "three";

import { loadAsDataURL } from "./load_images";
import { drawCameraFov } from "./draw_camera_fov";
import { getLeftCanvasInstance, getLeftSceneInstance, tickLeftImages } from "./left_image";
import { getRightCanvasInstance, getRightSceneInstance, tickRightImages } from "./right_image";

export function onChangeInputImages(event: any) {
    let files = event.target.files as FileList;
    // TODO : 入力順で左右を決定しているのを汎用的な仕組みに変える
    const leftImage = files[0];
    const leftCanvas = getLeftCanvasInstance();
    const leftScene = getLeftSceneInstance();
    loadAsDataURL(leftImage, leftCanvas, leftScene);
    drawCameraFov();

    if (files.length == 2) {
        const rightImage = files[1];
        const rightCanvas = getRightCanvasInstance();
        const rightScene = getRightSceneInstance();
        loadAsDataURL(rightImage, rightCanvas, rightScene);
    }
}

export function tickImages() {
    tickLeftImages();
    tickRightImages();
}