import * as THREE from "three";

import { get3dSpaceSceneInstance } from "../xyz-space";
import { addAnnotationBoxToImage } from "../../rgb-image/annotated-box";

import { text } from "../../../html/element";
import { Vector3 } from "three";

// 箱を作成(デバッグ用)
let boxId = 0;
const annotationBoxes = new Array<THREE.Mesh>;
function addAnnotationBoxTo3dSpace(points: THREE.Vector3[]) {
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
    const points = createPoints(box3d.center_m);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function setBox0() {
    box3d.center_m.x = 4;
    box3d.center_m.y = 0.8;
    box3d.center_m.z = 7;
    const points = createPoints(box3d.center_m);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function setBox1() {
    box3d.center_m.x = -2.2;
    box3d.center_m.y = 1.0;
    box3d.center_m.z = 5.8;
    const points = createPoints(box3d.center_m);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function setBox2() {
    box3d.center_m.x = -7.0;
    box3d.center_m.y = 0.9;
    box3d.center_m.z = 8.6;
    const points = createPoints(box3d.center_m);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function createPoints(center: THREE.Vector3) {
    const sizeX = 0.6;
    const sizeY = 1.6;
    const sizeZ = 1.4;

    const points = new Array<THREE.Vector3>;
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

    return points;
}

export const box3d = {
    x_m: 0,
    y_m: 0,
    z_m: 10,
    center_m: new THREE.Vector3(0, 0, 10),
    set: function () { setBox() },
    set0: function () { setBox0() },
    set1: function () { setBox1() },
    set2: function () { setBox2() },
}
