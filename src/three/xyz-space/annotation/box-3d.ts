import * as THREE from "three";

import { get3dSpaceSceneInstance } from "../xyz-space";
import { addAnnotationBoxToImage } from "../../rgb-image/annotated-box";

import { text } from "../../../html/element";

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
    console.log(box3d.rotation.euler);
    const points = createLinePoints(box3d.center_m, box3d.size_m, box3d.rotation);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function setBox0() {
    const center_m = new THREE.Vector3(4.0, -0.1, 13.4);
    const size_m = new THREE.Vector3(1.8, 1.9, 4.4);
    const rotation = new Rotation(0.0, 32.0, 0);
    const points = createLinePoints(center_m, size_m, rotation);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function setBox1() {
    const center_m = new THREE.Vector3(-2.3, 0.0, 5.7);
    const size_m = new THREE.Vector3(0.6, 1.75, 1.6);
    const rotation = new Rotation(0.0, 6.0, 0);
    const points = createLinePoints(center_m, size_m, rotation);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function setBox2() {
    const center_m = new THREE.Vector3(-6.9, 0.0, 8.5);
    const size_m = new THREE.Vector3(0.6, 1.68, 1.0);
    const rotation = new Rotation(0.0, 30.0, 0);
    const points = createLinePoints(center_m, size_m, rotation);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function setBox3() {
    const center_m = new THREE.Vector3(4.2, 0.0, 7.2);
    const size_m = new THREE.Vector3(0.3, 1.2, 0.6);
    const rotation = new Rotation(0.0, 0.0, 0);
    const points = createLinePoints(center_m, size_m, rotation);
    addAnnotationBoxTo3dSpace(points);
    addAnnotationBoxToImage(points);
}

function createLinePoints(center: THREE.Vector3, size: THREE.Vector3, rotation: Rotation) {
    const p0 = new THREE.Vector3(center.x - size.x / 2, center.y, center.z - size.z / 2);
    const p1 = new THREE.Vector3(center.x - size.x / 2, center.y, center.z + size.z / 2);
    const p2 = new THREE.Vector3(center.x + size.x / 2, center.y, center.z + size.z / 2);
    const p3 = new THREE.Vector3(center.x + size.x / 2, center.y, center.z - size.z / 2);

    const p4 = new THREE.Vector3(center.x - size.x / 2, center.y + size.y, center.z - size.z / 2);
    const p5 = new THREE.Vector3(center.x - size.x / 2, center.y + size.y, center.z + size.z / 2);
    const p6 = new THREE.Vector3(center.x + size.x / 2, center.y + size.y, center.z + size.z / 2);
    const p7 = new THREE.Vector3(center.x + size.x / 2, center.y + size.y, center.z - size.z / 2);

    const vertexVec = new Array<THREE.Vector3>;
    vertexVec.push(p0);
    vertexVec.push(p1);
    vertexVec.push(p2);
    vertexVec.push(p3);
    vertexVec.push(p4);
    vertexVec.push(p5);
    vertexVec.push(p6);
    vertexVec.push(p7);

    for (let index = 0; index < vertexVec.length; index++) {
        const vertex = vertexVec[index];
        vertex.sub(center);
        vertex.applyEuler(rotation.euler);
        vertex.add(center);
    }

    const linePoints = new Array<THREE.Vector3>;
    linePoints.push(vertexVec[0]);
    linePoints.push(vertexVec[1]);
    linePoints.push(vertexVec[2]);
    linePoints.push(vertexVec[3]);
    linePoints.push(vertexVec[0]);

    linePoints.push(vertexVec[4]);
    linePoints.push(vertexVec[5]);
    linePoints.push(vertexVec[6]);
    linePoints.push(vertexVec[7]);
    linePoints.push(vertexVec[4]);

    linePoints.push(vertexVec[5]);
    linePoints.push(vertexVec[1]);
    linePoints.push(vertexVec[2]);
    linePoints.push(vertexVec[6]);
    linePoints.push(vertexVec[7]);
    linePoints.push(vertexVec[3]);

    return linePoints;
}

class Rotation {
    readonly pitch: { deg: number, rad: number };
    readonly yaw: { deg: number, rad: number };
    readonly roll: { deg: number, rad: number };
    readonly euler: THREE.Euler;

    private toRad(deg: number) {
        return deg * Math.PI / 180.0;
    };

    constructor(pitch_deg: number, yaw_deg: number, roll_deg: number) {
        this.pitch = { deg: pitch_deg, rad: this.toRad(pitch_deg) };
        this.yaw = { deg: yaw_deg, rad: this.toRad(yaw_deg) };
        this.roll = { deg: roll_deg, rad: this.toRad(roll_deg) };
        this.euler = new THREE.Euler(this.toRad(pitch_deg), this.toRad(yaw_deg), this.toRad(roll_deg), 'XYZ');
    }

    setPitch(degree: number) {
        this.pitch.deg = degree;
        this.pitch.rad = this.toRad(degree);
        this.euler.x = this.toRad(degree);
    }

    setYaw(degree: number) {
        this.yaw.deg = degree;
        this.yaw.rad = this.toRad(degree);
        this.euler.y = this.toRad(degree);
    }

    setRoll(degree: number) {
        this.roll.deg = degree;
        this.roll.rad = this.toRad(degree);
        this.euler.z = this.toRad(degree);
    }
}

export const box3d = {
    x_m: 0,
    y_m: 0,
    z_m: 10,
    center_m: new THREE.Vector3(0, 0, 10),
    w_m: 1,
    h_m: 1.5,
    d_m: 1,
    size_m: new THREE.Vector3(1, 1.5, 1),
    pitch_deg: 0.0,
    yaw_deg: 0.0,
    roll_deg: 0.0,
    rotation: new Rotation(0.0, 0.0, 0.0),
    set: function () { setBox() },
    set0: function () { setBox0() },
    set1: function () { setBox1() },
    set2: function () { setBox2() },
    set3: function () { setBox3() },
}

