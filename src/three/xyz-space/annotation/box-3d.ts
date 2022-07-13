import * as THREE from "three";

import { get3dSpaceSceneInstance } from "../xyz-space";
import { addAnnotationBoxToImage } from "../../rgb-image/annotated-box";

import { text } from "../../../html/element";

// 箱を作成(デバッグ用)
let boxId = 0;
const annotationBoxes = new Array<THREE.Mesh>;
function addAnnotationBoxTo3dSpace(x_m: number, y_m: number, z_m: number) {
    // TODO: 頂点を3D用と画像用で別々で作ってるので一元管理する
    const sizeX = 0.6;
    const sizeY = 1.6;
    const sizeZ = 1.4;

    const center = new THREE.Vector3(x_m, y_m, z_m);
    const points = [];
    const p0 = new THREE.Vector3(center.x - sizeX / 2, center.y - sizeY / 2, center.z - sizeZ / 2);
    const p1 = new THREE.Vector3(center.x - sizeX / 2, center.y - sizeY / 2, center.z + sizeZ / 2);
    const p2 = new THREE.Vector3(center.x + sizeX / 2, center.y - sizeY / 2, center.z + sizeZ / 2);
    const p3 = new THREE.Vector3(center.x + sizeX / 2, center.y - sizeY / 2, center.z - sizeZ / 2);

    const p4 = new THREE.Vector3(center.x - sizeX / 2, center.y + sizeY / 2, center.z - sizeZ / 2);
    const p5 = new THREE.Vector3(center.x - sizeX / 2, center.y + sizeY / 2, center.z + sizeZ / 2);
    const p6 = new THREE.Vector3(center.x + sizeX / 2, center.y + sizeY / 2, center.z + sizeZ / 2);
    const p7 = new THREE.Vector3(center.x + sizeX / 2, center.y + sizeY / 2, center.z - sizeZ / 2);

    points.push(p0);
    points.push(p1);
    points.push(p2);
    points.push(p3);
    points.push(p0);

    points.push(p4);
    points.push(p5);
    points.push(p6);
    points.push(p7);
    points.push(p4);

    points.push(p5);
    points.push(p1);
    points.push(p2);
    points.push(p6);
    points.push(p7);
    points.push(p3);

    const material = new THREE.LineBasicMaterial({ color: 0x00FFFF });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    get3dSpaceSceneInstance().add(line);

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
    addAnnotationBoxToImage(box3d.x_m, box3d.y_m, box3d.z_m);
}

function setBox0() {
    const x_m = 4;
    const y_m = 0.8;
    const z_m = 7;
    addAnnotationBoxTo3dSpace(x_m, y_m, z_m);
    addAnnotationBoxToImage(x_m, y_m, z_m);
}

function setBox1() {
    const x_m = -2.2;
    const y_m = 1.0;
    const z_m = 5.8;
    addAnnotationBoxTo3dSpace(x_m, y_m, z_m);
    addAnnotationBoxToImage(x_m, y_m, z_m);
}

function setBox2() {
    const x_m = -7;
    const y_m = 0.9;
    const z_m = 8.6;
    addAnnotationBoxTo3dSpace(x_m, y_m, z_m);
    addAnnotationBoxToImage(x_m, y_m, z_m);
}


export const box3d = {
    x_m: 0,
    y_m: 0,
    z_m: 17,
    set: function () { setBox() },
    set0: function () { setBox0() },
    set1: function () { setBox1() },
    set2: function () { setBox2() },
}
