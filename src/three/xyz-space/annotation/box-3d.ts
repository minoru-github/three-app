import * as THREE from "three";

import { get3dSpaceSceneInstance } from "../xyz-space";
import { text } from "../../../html/element";

// 箱を作成(デバッグ用)
const offsetY = 1.2;
let boxId = 0;
function createBox(x: number, y: number, z: number) {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: true });
    const box = new THREE.Mesh(geometry, material);
    box.name = "box-" + boxId;
    boxId++;
    box.position.set(x, y + offsetY, z);
    get3dSpaceSceneInstance().add(box);
    return box;
}

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

const annotationBoxes = new Array<THREE.Mesh>;
function setBox() {
    const annotationBox = createBox(box3d.x, box3d.y, box3d.z);
    annotationBoxes.push(annotationBox)
    let str = "";
    for (let index = 0; index < annotationBoxes.length; index++) {
        const annotationBox = annotationBoxes[index];
        str += annotationBox.name + " : (" + annotationBox.position.x + ", " + (annotationBox.position.y - offsetY) + ", " + annotationBox.position.z + ")\n";
        text.value = str;
    }
}

export const box3d = {
    x: -7,
    y: 0,
    z: 10.5,
    set: function () { setBox() }
}
