import * as THREE from "three";

import { get3dSpaceSceneInstance } from "../xyz-space";
import { addAnnotationBoxToImage } from "../../rgb-image/annotated-box";

import { text } from "../../../html/element";

// 箱を作成(デバッグ用)
let boxId = 0;
const annotationBoxes = new Array<THREE.Mesh>;
function addAnnotationBoxTo3dSpace(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: true });
    const box = new THREE.Mesh(geometry, material);
    box.name = "xyz space box-" + boxId;
    boxId++;
    box.position.set(x, y, z);
    get3dSpaceSceneInstance().add(box);
    annotationBoxes.push(box)

    function debug() {
        let str = "";
        for (let index = 0; index < annotationBoxes.length; index++) {
            const annotationBox = annotationBoxes[index];
            str += annotationBox.name + " : (" + annotationBox.position.x + ", " + annotationBox.position.y + ", " + annotationBox.position.z + ")\n";
            text.value = str;
        }
    }
}

// TODO: クリックでアノテボックス配置
document.addEventListener('mousedown', addAnnotationBox, false);
function addAnnotationBox(event: MouseEvent) {
    // X座標
    let x = event.offsetX;
    let y = event.offsetY;
    // console.log("(w,h) = (%d, %d)", canvas.width, canvas.height);
    // console.log("offset (x,y) = (%d, %d)", event.offsetX, event.offsetY);
    // console.log("client (x,y) = (%d, %d)", event.clientX, event.clientY);
    // console.log(event);
}

function setBox() {
    // TODO: 右手座標系から左手座標系に変える
    addAnnotationBoxTo3dSpace(box3d.x_m, box3d.y_m, box3d.z_m);
    addAnnotationBoxToImage(-box3d.x_m, box3d.y_m, box3d.z_m);
}

export const box3d = {
    x_m: -1.6,
    y_m: 1.8,
    z_m: 6,
    set: function () { setBox() }
}
